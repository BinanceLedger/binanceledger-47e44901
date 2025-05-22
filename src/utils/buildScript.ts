
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

// EmailJS configuration
// These values will be embedded in the build
// IMPORTANT: These are your actual EmailJS credentials
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_r7sis9a", // Your actual EmailJS Service ID
  TEMPLATE_ID: "template_dec5tz3", // Your actual EmailJS Template ID
  USER_ID: "hDX5LRevxoenkHrjk", // Your actual EmailJS User ID
};

// Create a configuration file during build
console.log('Creating EmailJS configuration file with hardcoded values...');
const configContent = `
// Auto-generated file - DO NOT EDIT MANUALLY
export const EMAILJS_CONFIG = {
  SERVICE_ID: "${EMAILJS_CONFIG.SERVICE_ID}",
  TEMPLATE_ID: "${EMAILJS_CONFIG.TEMPLATE_ID}",
  USER_ID: "${EMAILJS_CONFIG.USER_ID}"
};
`;

// Ensure the directory exists
const configDir = path.join(__dirname, '..', 'config');
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// Write the configuration file
fs.writeFileSync(path.join(configDir, 'emailjs.config.ts'), configContent);
console.log('EmailJS configuration file created successfully!');

// Create a .htaccess file for Apache servers (like Hostnet) to handle React routing
const htaccessContent = `
# Enable rewrite engine
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # If the request is not for a file or directory that exists
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Redirect all other requests to index.html for SPA routing
  RewriteRule ^ index.html [QSA,L]
</IfModule>

# Set correct MIME types
<IfModule mod_mime.c>
  AddType application/javascript .js
  AddType text/css .css
  AddType application/json .json
  AddType image/svg+xml .svg
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json image/svg+xml
</IfModule>

# Enable browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
`;

// Run the build command
console.log('Building your Binance Ledger application...');
try {
  // Use base URL that works with relative paths (important for Hostnet)
  execSync('npm run build -- --base=./', { stdio: 'inherit' });
  console.log('Build completed successfully!');
  
  // Write the .htaccess file to the dist directory
  fs.writeFileSync(path.join(process.cwd(), 'dist', '.htaccess'), htaccessContent);
  console.log('Created .htaccess file for server configuration (including Hostnet)');
  
  // Create a _redirects file for Netlify or similar hosts
  fs.writeFileSync(
    path.join(process.cwd(), 'dist', '_redirects'),
    '/* /index.html 200'
  );
  console.log('Created _redirects file for Netlify-like hosting');
  
  // Create a web.config for IIS servers
  const webConfigContent = `
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
            <add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".js" mimeType="application/javascript" />
      <mimeMap fileExtension=".json" mimeType="application/json" />
    </staticContent>
  </system.webServer>
</configuration>
  `;
  fs.writeFileSync(path.join(process.cwd(), 'dist', 'web.config'), webConfigContent);
  console.log('Created web.config file for IIS servers');
  
  // Define the output directory for downloads
  const downloadsDir = path.join(process.cwd(), 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }
  
  // Create a zip file of the build with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const zipFileName = `binance-ledger-build-${timestamp}.zip`;
  const zipFilePath = path.join(downloadsDir, zipFileName);
  const latestBuildPath = path.join(downloadsDir, 'latest-build.zip');
  
  // Create a proper zip archive
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', {
    zlib: { level: 9 },      // Maximum compression
    forceLocalTime: false,   // Use UTC time
    forceZip64: false        // Only use ZIP64 if required
  });
  
  // Handle archive events
  output.on('close', () => {
    const fileSizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
    console.log('===========================================');
    console.log('📦 BUILD PACKAGE CREATED SUCCESSFULLY! 📦');
    console.log('===========================================');
    console.log(`📁 ZIP File: ${zipFileName}`);
    console.log(`📊 Size: ${fileSizeInMB} MB`);
    console.log(`📍 Location: ${zipFilePath}`);
    console.log(`📍 Latest Build Link: ${latestBuildPath}`);
    console.log('\n📋 INSTRUCTIONS FOR HOSTNET:');
    console.log('1. Your build files are in the dist/ folder');
    console.log('2. Upload ALL files from the dist/ folder to your Hostnet webspace');
    console.log('3. Make sure index.html is in the root directory of your hosting');
    console.log('4. Ensure the .htaccess file is uploaded (this is crucial for routing)');
    console.log('\n💡 HOSTNET-SPECIFIC TIPS:');
    console.log('- In Hostnet File Manager, make sure to display hidden files to verify .htaccess was uploaded');
    console.log('- Ensure mod_rewrite is enabled on your Hostnet hosting (it usually is by default)');
    console.log('- If you see a blank page, check if JavaScript execution is enabled in your browser');
    console.log('- Verify all files were uploaded and have correct permissions (usually 644 for files, 755 for directories)');
    console.log('- For detailed Hostnet troubleshooting, contact their support with error logs');
    console.log('===========================================');
    
    // Create a copy for the latest build (instead of symlink which can cause issues)
    try {
      if (fs.existsSync(latestBuildPath)) {
        fs.unlinkSync(latestBuildPath);
      }
      // Always use copy instead of symlink for better compatibility
      fs.copyFileSync(zipFilePath, latestBuildPath);
      console.log('Latest build reference created successfully.');
    } catch (err) {
      console.error('Error creating latest build reference:', err);
    }
  });
  
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      console.warn('Archive warning:', err);
    } else {
      console.error('Archive error:', err);
      throw err;
    }
  });
  
  archive.on('error', function(err) {
    console.error('Error creating archive:', err);
    throw err;
  });
  
  // Pipe archive data to the file
  archive.pipe(output);
  
  // Add files directly from the dist directory
  archive.directory('dist/', false);
  
  // Finalize the archive
  archive.finalize();
  
} catch (error) {
  console.error('❌ Error building the application:', error);
  process.exit(1);
}
