import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Wallet, Sparkles, ArrowRight, Link as LinkIcon, MessageCircle, Vote, ShoppingBag, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setShowSparkle(true);
    const timer = setTimeout(() => setShowSparkle(false), 1000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    document.body.style.backgroundColor = '#000';
    const mainContent = document.createElement('div');
    mainContent.style.position = 'fixed';
    mainContent.style.top = '50%';
    mainContent.style.left = '50%';
    mainContent.style.width = '30rem';
    mainContent.style.height = '30rem';
    mainContent.style.transform = 'translate(-50%, -50%)';
    mainContent.style.filter = 'blur(120px)';
    mainContent.style.background = 'radial-gradient(circle, rgba(255,179,0,0.15) 0%, rgba(255,102,0,0.1) 100%)';
    mainContent.style.animation = 'float 8s ease-in-out infinite';
    mainContent.style.zIndex = '0';
    document.body.appendChild(mainContent);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(mainContent);
      clearTimeout(timer);
    };
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setShowSparkle(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 800);
      } else {
        alert('Please install a Web3 wallet like MetaMask');
      }
    } catch (error) {
      console.error(error);
      setIsConnecting(false);
    }
  };

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Request Payments",
      description: "Send payment requests via text or social media with instant blockchain settlement"
    },
    {
      icon: <Vote className="w-6 h-6" />,
      title: "Governance Voting",
      description: "Enable DAO voting directly from chat platforms and communication tools"
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "NFT Trading",
      description: "Buy and sell NFTs anywhere through shareable blockchain links"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Head>
        <title>Zeus Blinks - Web3 Links for the Zeus Ecosystem</title>
        <meta name="description" content="Transform Zeus transactions into shareable links. Create Web3 actions that work anywhere - no third party required." />
      </Head>

      {/* Animated background effect */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,179,0,0.15) 0%, rgba(0,0,0,0) 50%)`
        }}
      />

      {/* Navigation */}
      <nav className="relative z-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Zap className="w-8 h-8 text-yellow-500" />
              <span className="text-xl font-bold">Zeus Blinks</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Main content */}
            <div className="space-y-8">
              <h1 className="text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-yellow-200 to-orange-400 bg-clip-text text-transparent">
                  Turn Zeus Actions Into Shareable Links
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed">
                Create Web3 links that work anywhere on the internet. No third-party apps required. 
                Just pure Zeus ecosystem power in every link.
              </p>

              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 
                         rounded-xl font-medium text-xl text-black hover:shadow-lg hover:shadow-yellow-500/20 
                         transition-all duration-300"
              >
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                    Start Building
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>

            {/* Right column - Feature cards */}
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm
                           hover:border-yellow-500/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 
                                group-hover:from-yellow-500/20 group-hover:to-orange-500/20 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow-500 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom section - Use cases */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold mb-12">
              Created with ❤️ for Zeus Ecosystem
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}