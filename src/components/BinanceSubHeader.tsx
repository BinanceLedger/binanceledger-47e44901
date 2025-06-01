
import { FC } from "react";

const BinanceSubHeader: FC = () => {
  return (
    <div className="bg-binance-dark border-b border-gray-800 relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative">
        <div className="flex items-center justify-center">
          <div className="z-10 text-center">
            <h1 className="text-5xl font-bold font-binance">
              <span style={{ color: '#F0B90B' }}>Binance Ledger</span>{' '}
              <span className="text-white">Portal</span>
            </h1>
          </div>
          
          {/* Background image on the right */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-20 z-0">
            <img 
              src="/lovable-uploads/a0788db6-c869-4b97-82c5-96002bc4b14b.png"
              alt="Security Lock Background"
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinanceSubHeader;
