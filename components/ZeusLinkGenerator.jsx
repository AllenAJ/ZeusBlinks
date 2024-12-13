import { useState } from 'react';
import DexLinkGenerator from './DexLinkGenerator';

export default function ZeusLinkGenerator() {
  const [selectedDapp, setSelectedDapp] = useState('muses');
  
  const dapps = {
    muses: {
      title: "Zeus Muses Mlink Generator",
      description: "Generate a Mlink for Muses on Zeus Network. Enter the token address you want to swap to.",
      baseUrl: "https://muses.apollobyzeus.app",
      inputParam: "inputCurrency",
      outputParam: "outputCurrency",
      nativeToken: "ZEUS"
    },
    guardian: {
      title: "Zeus Guardian Mlink Generator",
      description: "Generate a Mlink for Zeus Guardian. Enter the token address you want to swap to.",
      baseUrl: "https://app.zeusguardian.io",
      inputParam: "inputCurrency",
      outputParam: "outputCurrency",
      nativeToken: "ZEUS"
    }
  };

  return (
    <div className="space-y-8">
      {/* DApp Selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setSelectedDapp('muses')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${selectedDapp === 'muses' 
              ? 'bg-yellow-500 text-black' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
        >
          Zeus Muses
        </button>
        <button
          onClick={() => setSelectedDapp('guardian')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${selectedDapp === 'guardian' 
              ? 'bg-yellow-500 text-black' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
        >
          Zeus Guardian
        </button>
      </div>

      {/* Link Generator */}
      <DexLinkGenerator
        title={dapps[selectedDapp].title}
        description={dapps[selectedDapp].description}
        baseUrl={dapps[selectedDapp].baseUrl}
        inputParam={dapps[selectedDapp].inputParam}
        outputParam={dapps[selectedDapp].outputParam}
        nativeToken={dapps[selectedDapp].nativeToken}
        isSymbolBased={false}
      />
    </div>
  );
}