
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

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
