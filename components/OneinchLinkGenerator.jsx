import { useState, useEffect } from 'react';
import { fetchTokenMetadata } from '../utils/tokenMetadata';

export default function OneinchLinkGenerator({ 
  chainId,
  nativeToken,
  title, 
  description 
}) {
  const [outputToken, setOutputToken] = useState('');
  const [tokenMetadata, setTokenMetadata] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (outputToken.length >= 42) { // Basic address length check
      fetchTokenData();
    } else {
      setTokenMetadata(null);
    }
  }, [outputToken]);

  const fetchTokenData = async () => {
    setIsLoading(true);
    const metadata = await fetchTokenMetadata(chainId, outputToken);
    setTokenMetadata(metadata);
    setIsLoading(false);
  };

  const generateLink = () => {
    setIsGenerating(true);
    const timestamp = Date.now();
    
    // Create the 1inch URL
    const dexUrl = `https://app.1inch.io/#/${chainId}/simple/swap/${chainId}:${nativeToken}/${chainId}:${outputToken}`;
    const displayUrl = `https://ae88-163-47-210-29.ngrok-free.app/dapp/nav1?url=${dexUrl}&t=${timestamp}`;
    const actualUrl = `https://ae88-163-47-210-29.ngrok-free.app/dapp/nav1?url=${encodeURIComponent(dexUrl)}&t=${timestamp}`;
    
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
        <div className="p-3 bg-gray-800 rounded-lg text-gray-400">
          Input Token: {nativeToken}
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Output Token Address"
            value={outputToken}
            onChange={(e) => setOutputToken(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded-lg text-white pr-24"
          />
          {isLoading && (
            <span className="absolute right-3 top-3 text-blue-400">Loading...</span>
          )}
          {tokenMetadata && (
            <span className="absolute right-3 top-3 text-green-400">
              {tokenMetadata.symbol}
            </span>
          )}
        </div>
        
        <button
          onClick={generateLink}
          disabled={isGenerating || !outputToken || isLoading || !tokenMetadata}
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isGenerating ? 'Generating...' : 'Generate Mlink'}
        </button>
        
        {generatedLink && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Your Mlink:</p>
            <code className="text-green-400 break-all">
              {generatedLink.display}
            </code>
            <div className="mt-2 flex gap-2">
              <a 
                href={generatedLink.actual} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Open Link ↗
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(generatedLink.actual)}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Copy Link 📋
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 