
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

// Run the build command
console.log('Building your Binance Ledger application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
  
  // Define the output directory for downloads
  const downloadsDir = path.join(process.cwd(), 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }
  
  // Create a zip file of the build with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const zipFileName = `binance-ledger-build-${timestamp}.zip`;
  const zipFilePath = path.join(downloadsDir, zipFileName);
  
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });
  
  output.on('close', () => {
    const fileSizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
    console.log('===========================================');
    console.log('📦 BUILD PACKAGE CREATED SUCCESSFULLY! 📦');
    console.log('===========================================');
    console.log(`📁 ZIP File: ${zipFileName}`);
    console.log(`📊 Size: ${fileSizeInMB} MB`);
    console.log(`📍 Location: ${zipFilePath}`);
    console.log('\n📋 INSTRUCTIONS:');
    console.log('1. Your build files are in the dist/ folder');
    console.log(`2. A downloadable ZIP is available at: ${zipFilePath}`);
    console.log('3. To host your website, upload the contents of the dist/ folder to your web server');
    console.log('\n💡 TIP: For easy local access, check the downloads/ folder in your project root');
    console.log('===========================================');
  });
  
  archive.pipe(output);
  archive.directory('dist/', false);
  archive.finalize();
  
} catch (error) {
  console.error('❌ Error building the application:', error);
  process.exit(1);
}
