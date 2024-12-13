import { useState } from 'react';

export default function ZeusLinkBuilder() {
  const [selectedDapp, setSelectedDapp] = useState('muses');
  const [outputToken, setOutputToken] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  
  const generateLink = () => {
    setIsGenerating(true);
    const timestamp = Date.now();
    
    const baseUrl = selectedDapp === 'muses' 
      ? 'https://muses.apollobyzeus.app'
      : 'https://app.zeusguardian.io';
      
    const dexUrl = `${baseUrl}?inputCurrency=ZEUS&outputCurrency=${outputToken}`;
    const displayUrl = `https://unfold2024mlinks.vercel.app/dapp/nav1?url=${dexUrl}&t=${timestamp}`;
    const actualUrl = `https://unfold2024mlinks.vercel.app/dapp/nav1?url=${encodeURIComponent(dexUrl)}&t=${timestamp}`;
    
    setTimeout(() => {
      setGeneratedLink({
        display: displayUrl,
        actual: actualUrl
      });
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink.actual);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg font-mono">v0.1</span>
          <div className="h-6 w-px bg-gray-700" />
          <span className="text-yellow-500">⚡</span>
        </div>
        
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
          Zeus Network Frame Builder
        </h1>
        <p className="text-xl text-gray-400">
          Instantly create Zeus Network frames for Muses & Guardian
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        <div className="relative p-8 rounded-2xl border border-yellow-500/20 bg-black/50">
          {/* DApp Selector */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {['muses', 'guardian'].map((dapp) => (
              <button
                key={dapp}
                onClick={() => setSelectedDapp(dapp)}
                className={`p-4 rounded-xl font-medium transition-all duration-300
                  ${selectedDapp === dapp 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg' 
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
              >
                {dapp === 'muses' ? 'Zeus Muses' : 'Zeus Guardian'}
              </button>
            ))}
          </div>

          {/* Token Input */}
          <div className="space-y-2 mb-8">
            <label className="text-sm text-gray-400">Output Token Address</label>
            <input
              type="text"
              placeholder="Enter token address..."
              value={outputToken}
              onChange={(e) => setOutputToken(e.target.value)}
              className="w-full p-4 bg-gray-900 rounded-xl text-white font-mono
                       border border-gray-800 focus:border-yellow-500/50 focus:outline-none
                       transition-colors"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateLink}
            disabled={isGenerating || !outputToken}
            className="w-full p-4 rounded-xl font-medium transition-all duration-300
                     bg-gradient-to-r from-yellow-500 to-orange-500 text-black
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:shadow-lg hover:shadow-yellow-500/20"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                Building Frame...
              </span>
            ) : (
              'Create Frame'
            )}
          </button>

          {/* Generated Link */}
          {generatedLink && (
            <div className="mt-8 p-6 rounded-xl bg-gray-900 border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-400">Your Zeus Frame</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 text-sm rounded-lg bg-gray-800 hover:bg-gray-700
                             text-gray-300 transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                  <a
                    href={generatedLink.actual}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm rounded-lg bg-yellow-500 hover:bg-yellow-400
                             text-black transition-colors"
                  >
                    Open Frame
                  </a>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-black/50 font-mono text-sm">
                <code className="text-yellow-500 break-all">
                  {generatedLink.display}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}