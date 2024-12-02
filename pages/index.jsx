import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [apps] = useState([
    {
      name: 'Navi Protocol Market',
      url: 'https://app.naviprotocol.io/market'
    },
    {
      name: 'Uniswap',
      url: 'https://app.uniswap.org/'
    }
  ]);

  return (
    <div className="player-container">
      <Head>
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Memelinks Registry" />
        <meta 
          name="twitter:description" 
          content="MemeLinks - twitter Meme Links"
        />
        <meta 
          name="twitter:player" 
          content="https://www.starknet-monitor.com/" 
        />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta 
          name="twitter:image" 
          content="https://pbs.twimg.com/profile_images/1846897640677822470/8g6-quYE_400x400.jpg" 
        />
        
        {/* Content Security Policy */}
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="default-src 'self' https://app.naviprotocol.io/ https://app.uniswap.org/; frame-src https://app.naviprotocol.io/ https://app.uniswap.org/; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http:;"
        />
        
        <title>Blinks Registry</title>
      </Head>
      
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .player-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }

        iframe {
          width: 100%;
          height: 100%;
          border: none;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>

      {apps.map((app, index) => (
        <iframe 
          key={index}
          src={app.url} 
          allowFullScreen 
          allow="web3"
        />
      ))}
    </div>
  );
}