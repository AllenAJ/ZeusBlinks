import { useState } from 'react';

export default function DexLinkGenerator({ 
  title, 
  description, 
  baseUrl, 
  inputParam = 'inputCurrency',
  outputParam = 'outputCurrency'
}) {
  const [inputToken, setInputToken] = useState('');
  const [outputToken, setOutputToken] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    setIsGenerating(true);
    const timestamp = Date.now();
    
    // Create clean URL for display
    const dexUrl = `${baseUrl}?${inputParam}=${inputToken}&${outputParam}=${outputToken}`;
    const displayUrl = `https://ae88-163-47-210-29.ngrok-free.app/dapp/nav1?url=${dexUrl}&t=${timestamp}`;
    
    // Create encoded URL for actual use
    const encodedDexUrl = encodeURIComponent(`${baseUrl}?${inputParam}=${inputToken}&${outputParam}=${outputToken}`);
    const actualUrl = `https://ae88-163-47-210-29.ngrok-free.app/dapp/nav1?url=${encodedDexUrl}&t=${timestamp}`;
    
    setTimeout(() => {
      setGeneratedLink({
        display: displayUrl,
        actual: actualUrl
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Input Token Address"
          value={inputToken}
          onChange={(e) => setInputToken(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded-lg text-white"
        />
        
        <input
          type="text"
          placeholder="Output Token Address"
          value={outputToken}
          onChange={(e) => setOutputToken(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded-lg text-white"
        />
        
        <button
          onClick={generateLink}
          disabled={isGenerating || !inputToken || !outputToken}
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isGenerating ? 'Generating...' : 'Generate Blink'}
        </button>
        
        {generatedLink && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Your Blink:</p>
            <code className="text-green-400 break-all">
              {generatedLink.display}
            </code>
            <a 
              href={generatedLink.actual} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-blue-400 hover:text-blue-300"
            >
              Open Link ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}