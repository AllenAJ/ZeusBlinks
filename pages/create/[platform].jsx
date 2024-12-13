import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowLeft, Code2, Zap, Shield } from 'lucide-react';

export default function CreateFrame() {
  const router = useRouter();
  const { platform } = router.query;
  const [creatorAddress, setCreatorAddress] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [consoleMessages, setConsoleMessages] = useState([]);

  const generateLink = () => {
    setIsGenerating(true);
    setConsoleMessages([]);
    
    // Define messages to show
    const messages = [
      'Initializing Zeus Frame SDK v2.1.0',
      'Connecting to Zeus Network...',
      'Validating creator credentials...',
      'Loading frame templates...',
      'Generating secure endpoints...',
      'Deploying frame assets...',
      'Finalizing configuration...'
    ];

    // Add messages one by one with delay
    messages.forEach((message, index) => {
      setTimeout(() => {
        setConsoleMessages(prev => [...prev, message]);
      }, index * 600);
    });
    
    // Generate the actual link
    const timestamp = Date.now();
    const baseUrl = platform === 'muses' 
      ? 'https://muses.apollobyzeus.app'
      : 'https://app.zeusguardian.io';
    
    const dexUrl = `${baseUrl}?inputCurrency=ZEUS&creator=${creatorAddress}`;
    const displayUrl = `https://unfold2024mlinks.vercel.app/dapp/nav1?url=${dexUrl}&t=${timestamp}`;
    const actualUrl = `https://unfold2024mlinks.vercel.app/dapp/nav1?url=${encodeURIComponent(dexUrl)}&t=${timestamp}`;
    
    // Complete the generation after all messages are shown
    setTimeout(() => {
      setGeneratedLink({
        display: displayUrl,
        actual: actualUrl
      });
      setIsGenerating(false);
    }, messages.length * 600 + 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Create Frame - Zeus Network</title>
      </Head>

      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all
                     bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/10"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Frame Creator */}
          <div className="space-y-8">
            <div className="relative p-8 rounded-2xl border border-white/10 bg-[#0B0B0F]">
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                {platform === 'muses' ? <Zap className="w-8 h-8" /> : <Shield className="w-8 h-8" />}
                {platform === 'muses' ? 'Zeus Muses' : 'Zeus Guardian'}
              </h1>
              <p className="text-gray-400 mb-8">
                Create a frame for {platform === 'muses' ? 'Muses DEX' : 'Zeus Guardian'}
              </p>

              <div className="space-y-6">
                <div>
                  <label className="text-lg text-white/80 mb-2 block">
                    Frame Creator Address
                  </label>
                  <input
                    type="text"
                    value={creatorAddress}
                    onChange={(e) => setCreatorAddress(e.target.value)}
                    className="w-full p-4 bg-black/40 rounded-xl text-white font-mono
                             border border-white/10 focus:border-yellow-500/50 focus:outline-none"
                    placeholder="Enter creator address..."
                  />
                </div>

                <button
                  onClick={generateLink}
                  disabled={isGenerating || !creatorAddress}
                  className="w-full p-4 rounded-xl font-medium text-lg relative
                           bg-gradient-to-r from-yellow-500 to-orange-500 text-black
                           disabled:opacity-50 disabled:cursor-not-allowed
                           hover:shadow-lg hover:shadow-yellow-500/20"
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Generating Frame...
                    </span>
                  ) : (
                    'Generate Frame'
                  )}
                </button>
              </div>
            </div>

            {/* Generated Link */}
            {generatedLink && (
              <div className="p-6 rounded-xl bg-[#12131A] border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-400">Your Frame Link</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedLink.actual)}
                    className="px-4 py-2 text-sm rounded-lg bg-white/5 hover:bg-white/10"
                  >
                    Copy Link
                  </button>
                </div>
                <div className="p-4 bg-black/50 rounded-lg">
                  <code className="text-yellow-500 break-all text-sm">
                    {generatedLink.display}
                  </code>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Console Output */}
          <div className="space-y-8">
            {(isGenerating || consoleMessages.length > 0) && (
              <div className="p-6 rounded-xl bg-black border border-white/10 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                  <Code2 className="w-4 h-4" />
                  <span>Console Output</span>
                </div>
                <div className="space-y-2">
                  {consoleMessages.map((message, index) => (
                    <div key={index} className="text-green-500">
                      {'> ' + message}
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="text-yellow-500 animate-pulse">_</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}