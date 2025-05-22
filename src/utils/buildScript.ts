
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

// Create a .htaccess file for Apache servers to handle React routing
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
</IfModule>

# Enable CORS
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
</IfModule>
`;

// Run the build command
console.log('Building your Binance Ledger application...');
try {
  // Use base URL that works with relative paths
  execSync('npm run build -- --base=./', { stdio: 'inherit' });
  console.log('Build completed successfully!');
  
  // Write the .htaccess file to the dist directory
  fs.writeFileSync(path.join(process.cwd(), 'dist', '.htaccess'), htaccessContent);
  console.log('Created .htaccess file for server configuration');
  
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
    console.log('\n📋 INSTRUCTIONS:');
    console.log('1. Your build files are in the dist/ folder');
    console.log('2. Upload ALL files from the dist/ folder to your web server');
    console.log('3. Make sure index.html is in the root directory of your hosting');
    console.log('4. The .htaccess, _redirects, and web.config files handle routing');
    console.log('5. A downloadable ZIP is available at: ' + zipFilePath);
    console.log('6. The latest build is always available at: downloads/latest-build.zip');
    console.log('\n💡 TROUBLESHOOTING:');
    console.log('- If you see a blank page, check browser console for errors');
    console.log('- Ensure your server has the correct MIME types configured');
    console.log('- Verify that all files were uploaded correctly');
    console.log('- Check server logs for any 404 errors or permission issues');
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
