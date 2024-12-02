import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  const chains = [
    {
      id: 'aptos',
      name: 'Aptos',
      description: 'Generate Blinks for Cellana Finance',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      id: 'sui',
      name: 'Sui',
      description: 'Generate Blinks for Cetus',
      gradient: 'from-teal-400 to-blue-500'
    },
    {
      id: 'base',
      name: 'Base',
      description: 'Generate Blinks for 1inch',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'unichain',
      name: 'Unichain',
      description: 'Generate Blinks for Unichain',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      id: 'solana',
      name: 'Solana',
      description: 'Generate Blinks for Raydium',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'agoric',
      name: 'Agoric',
      description: 'Generate Blinks for Crescent',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  const navigateToChain = (chainId) => {
    router.push(`/${chainId}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Blink Generator</title>
        <meta name="description" content="Generate Meme Links for various chains" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Blink Generator
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Create memorable meme links for your favorite DeFi protocols across multiple chains
          </p>
        </div>

        {/* Chain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chains.map((chain) => (
            <div
              key={chain.id}
              onClick={() => navigateToChain(chain.id)}
              className={`
                relative overflow-hidden rounded-xl p-6 cursor-pointer
                transform transition-all duration-300 hover:scale-105
                bg-gradient-to-br ${chain.gradient}
                hover:shadow-2xl hover:shadow-${chain.gradient.split('-')[2]}/20
              `}
            >
              <div className="relative z-10">
                <div className="h-16 w-16 mb-4 relative">
                  <Image
                    src={`/${chain.id}.png`}
                    alt={chain.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {chain.name}
                </h3>
                <p className="text-white/80">
                  {chain.description}
                </p>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-32 w-32 bg-black/10 rounded-full blur-2xl" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-gray-500">
          <p>Select a chain to generate your Blink</p>
        </div>
      </div>
    </div>
  );
}