
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add a console message to verify when the new version loads
console.log(`Binance Ledger app loaded - Build version: ${new Date().toISOString()}`);

createRoot(document.getElementById("root")!).render(<App />);
