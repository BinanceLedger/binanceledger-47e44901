
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
  
  // Create a zip file of the build
  const output = fs.createWriteStream(path.join(__dirname, 'binance-ledger-build.zip'));
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });
  
  archive.pipe(output);
  archive.directory('dist/', false);
  
  archive.finalize();
  
  console.log('Build has been zipped and is ready for download!');
  console.log('You can find your build files in the dist/ folder.');
  console.log('The zipped build is available as binance-ledger-build.zip');
} catch (error) {
  console.error('Error building the application:', error);
}
