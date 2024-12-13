# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# components/DexLinkGenerator.jsx

```jsx
import { useState } from 'react';

export default function DexLinkGenerator({ 
  title, 
  description, 
  baseUrl, 
  inputParam = 'inputCurrency',
  outputParam = 'outputCurrency',
  nativeToken,
  isSymbolBased = false,
  isSolana = false,
  additionalParams = ''
}) {
  const [outputToken, setOutputToken] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    setIsGenerating(true);
    const timestamp = Date.now();
    
    let dexUrl;
    if (isSolana) {
      dexUrl = `${baseUrl}/?${inputParam}=${nativeToken}&${outputParam}=${outputToken}`;
    } else {
      dexUrl = `${baseUrl}?${inputParam}=${nativeToken}&${outputParam}=${outputToken}${additionalParams}`;
    }

    const displayUrl = `https://unfold2024mlinks.vercel.app/dapp/nav1?url=${dexUrl}&t=${timestamp}`;
    const encodedDexUrl = encodeURIComponent(dexUrl);
    const actualUrl = `https://unfold2024mlinks.vercel.app/dapp/nav1?url=${encodedDexUrl}&t=${timestamp}`;
    
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
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Input Token (Fixed)</p>
          <div className="text-white font-mono break-all">
            {nativeToken}
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm text-gray-400">
            {isSymbolBased ? 'Output Token Symbol' : 'Output Token Address'}
          </label>
          <input
            type="text"
            placeholder={isSymbolBased ? "Enter token symbol (e.g., bcre)" : "Enter token address..."}
            value={outputToken}
            onChange={(e) => setOutputToken(e.target.value)}
            className="w-full p-4 bg-gray-800 rounded-lg text-white font-mono
                     border border-gray-700 focus:border-blue-500 focus:outline-none
                     transition-colors"
          />
          {isSymbolBased && (
            <p className="text-xs text-gray-500 mt-1">
              Enter the token symbol in lowercase (e.g., bcre, usdc)
            </p>
          )}
        </div>
        
        <button
          onClick={generateLink}
          disabled={isGenerating || !outputToken}
          className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all
                   font-medium"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Mlink'
          )}
        </button>
        
        {generatedLink && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Your Mlink:</p>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 
                           rounded-md text-white transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <a 
                  href={generatedLink.actual}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 
                           rounded-md text-white transition-colors"
                >
                  Open Link
                </a>
              </div>
            </div>
            
            <div className="p-3 bg-gray-900 rounded-md">
              <code className="text-green-400 break-all text-sm">
                {generatedLink.display}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

# components/OneinchLinkGenerator.jsx

```jsx
import { useState } from 'react';

export default function OneinchLinkGenerator({ 
  chainId,
  nativeToken,
  title, 
  description 
}) {
  const [outputToken, setOutputToken] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    setIsGenerating(true);
    const timestamp = Date.now();
    
    // Create the 1inch URL with symbols instead of addresses
    const dexUrl = `https://app.1inch.io/#/${chainId}/simple/swap/${chainId}:${nativeToken}/${chainId}:${outputToken.toUpperCase()}`;
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Input Token (Fixed)</p>
          <div className="text-white font-mono">
            {nativeToken}
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm text-gray-400">Output Token Symbol</label>
          <input
            type="text"
            placeholder="Enter token symbol (e.g., USDC, USDT)"
            value={outputToken}
            onChange={(e) => setOutputToken(e.target.value)}
            className="w-full p-4 bg-gray-800 rounded-lg text-white font-mono
                     border border-gray-700 focus:border-blue-500 focus:outline-none
                     transition-colors uppercase"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the token symbol (e.g., USDC, USDT, DAI)
          </p>
        </div>
        
        <button
          onClick={generateLink}
          disabled={isGenerating || !outputToken}
          className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all
                   font-medium"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Blink'
          )}
        </button>
        
        {generatedLink && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Your Blink:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLink.actual);
                  }}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 
                           rounded-md text-white transition-colors"
                >
                  Copy Link
                </button>
                <a 
                  href={generatedLink.actual}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 
                           rounded-md text-white transition-colors"
                >
                  Open Link
                </a>
              </div>
            </div>
            
            <div className="p-3 bg-gray-900 rounded-md">
              <code className="text-green-400 break-all text-sm">
                {generatedLink.display}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
```

# components/SwapLinkGenerator.jsx

```jsx
import { useState } from 'react';

export default function SwapLinkGenerator({ 
  chainId,
  nativeToken,
  title, 
  description 
}) {
  const [outputToken, setOutputToken] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    setIsGenerating(true);
    const timestamp = Date.now();
    
    // Native token address for ETH
    const nativeTokenAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    
    // Create the ParaSwap URL
    const dexUrl = `https://app.paraswap.xyz/#/swap/${nativeTokenAddress}-${outputToken}/1/SELL?version=6.2&network=base`;
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Input Token (Fixed)</p>
          <div className="text-white font-mono">
            {nativeToken}
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm text-gray-400">Output Token Address</label>
          <input
            type="text"
            placeholder="Enter token address (e.g., 0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b)"
            value={outputToken}
            onChange={(e) => setOutputToken(e.target.value)}
            className="w-full p-4 bg-gray-800 rounded-lg text-white font-mono
                     border border-gray-700 focus:border-blue-500 focus:outline-none
                     transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the token contract address you want to swap to
          </p>
        </div>
        
        <button
          onClick={generateLink}
          disabled={isGenerating || !outputToken}
          className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all
                   font-medium"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Blink'
          )}
        </button>
        
        {generatedLink && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Your Blink:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLink.actual);
                  }}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 
                           rounded-md text-white transition-colors"
                >
                  Copy Link
                </button>
                <a 
                  href={generatedLink.actual}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 
                           rounded-md text-white transition-colors"
                >
                  Open Link
                </a>
              </div>
            </div>
            
            <div className="p-3 bg-gray-900 rounded-md">
              <code className="text-green-400 break-all text-sm">
                {generatedLink.display}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
```

# components/ZeusLinkBuilder.jsx

```jsx
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
```

# components/ZeusLinkGenerator.jsx

```jsx
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
```

# jsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

```

# next.config.mjs

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; frame-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http:;"
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
```

# package.json

```json
{
  "name": "unfold2024",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "lucide-react": "^0.468.0",
    "next": "15.0.3",
    "react": "19.0.0-rc-66855b96-20241106",
    "react-dom": "19.0.0-rc-66855b96-20241106"
  },
  "devDependencies": {
    "postcss": "^8",
    "tailwindcss": "^3.4.1"
  }
}

```

# pages/_app.js

```js
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

```

# pages/_document.js

```js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

```

# pages/api/frame/redirect.js

```js
export default async function handler(req, res) {
    const { t, p, c } = req.query;
    
    // Verify the token
    if (!t || !p || !c) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }
  
    try {
      // Decode token and verify timestamp
      const [timestamp] = atob(t).split(':');
      if (Date.now() - parseInt(timestamp) > 5 * 60 * 1000) { // 5 minutes expiry
        return res.status(400).json({ error: 'Token expired' });
      }
  
      // Construct the actual URL based on platform
      const baseUrl = p === 'muses' 
        ? 'https://muses.apollobyzeus.app'
        : 'https://app.zeusguardian.io';
      
      const finalUrl = `${baseUrl}?inputCurrency=ZEUS&creator=${c}`;
  
      // Add security headers
      res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
      res.setHeader('X-Frame-Options', 'DENY');
      
      // Redirect to the final URL
      res.redirect(302, finalUrl);
    } catch (error) {
      console.error('Redirect error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
```

# pages/create/[platform].jsx

```jsx
import { useState, useEffect } from 'react';
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

  // Simulate backend verification
  const verifyCreator = async (address) => {
    // In production, this would be an API call to your backend
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  };

  // Simulate secure token generation
  const generateSecureToken = () => {
    return btoa(Date.now() + ':' + Math.random().toString(36).substring(7));
  };

  const addConsoleMessage = (message) => {
    setConsoleMessages(prev => [...prev, message]);
  };

  const generateLink = async () => {
    try {
      setIsGenerating(true);
      setConsoleMessages([]);

      // Simulate complex initialization process
      addConsoleMessage('Initializing secure runtime environment...');
      await new Promise(resolve => setTimeout(resolve, 600));

      addConsoleMessage('Verifying creator address...');
      const isVerified = await verifyCreator(creatorAddress);
      if (!isVerified) throw new Error('Verification failed');

      addConsoleMessage('Generating frames...');
      await new Promise(resolve => setTimeout(resolve, 700));

      addConsoleMessage('Configuring frame security policies...');
      await new Promise(resolve => setTimeout(resolve, 900));

      // Generate secure token
      const secureToken = generateSecureToken();
      
      // Create an intermediary URL that will handle the actual redirect
      // This helps obscure the actual destination
      const redirectUrl = `/api/frame/redirect?t=${secureToken}&p=${platform}&c=${encodeURIComponent(creatorAddress)}`;

      addConsoleMessage('Deploying frame configuration...');
      await new Promise(resolve => setTimeout(resolve, 800));

      addConsoleMessage('Finalizing frame link...');
      await new Promise(resolve => setTimeout(resolve, 600));

      // In production, this would be your actual domain
      const baseUrl = 'https://unfold2024mlinks.vercel.app';
      
      setGeneratedLink({
        display: `${baseUrl}${redirectUrl}`,
        actual: redirectUrl
      });

      addConsoleMessage('✓ Frame generated successfully');
    } catch (error) {
      addConsoleMessage('× Error: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
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
                           hover:shadow-lg hover:shadow-yellow-500/20
                           transition-all duration-300"
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Generating Secure Frame...
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
                  <span className="text-sm text-gray-400">Your Secure Frame Link</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedLink.actual)}
                    className="px-4 py-2 text-sm rounded-lg bg-white/5 hover:bg-white/10
                             transition-colors duration-200"
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

          {/* Right Column - Security Console */}
          <div className="space-y-8">
            {(isGenerating || consoleMessages.length > 0) && (
              <div className="p-6 rounded-xl bg-black border border-white/10 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                  <Code2 className="w-4 h-4" />
                  <span>Security Console</span>
                </div>
                <div className="space-y-2">
                  {consoleMessages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`${
                        message.startsWith('✓') 
                          ? 'text-green-500' 
                          : message.startsWith('×') 
                          ? 'text-red-500' 
                          : 'text-blue-500'
                      }`}
                    >
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
```

# pages/dashboard.jsx

```jsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LogOut, Zap, Shield, ChevronRight, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [activeCard, setActiveCard] = useState(null);
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    // Initial sparkle animation
    setShowSparkle(true);
    const timer = setTimeout(() => setShowSparkle(false), 1000);

    // Get wallet address
    const getAddress = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts[0]) {
          setAddress(accounts[0].slice(0, 6) + '...' + accounts[0].slice(-4));
        }
      }
    };
    getAddress();

    // Floating background effect
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
    mainContent.style.zIndex = '0';
    mainContent.style.animation = 'float 8s ease-in-out infinite';
    document.body.appendChild(mainContent);

    // Add keyframe animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translate(-50%, -50%); }
        50% { transform: translate(-51%, -52%) scale(1.05); }
      }
      @keyframes sparkle {
        0% { transform: scale(0) rotate(0deg); opacity: 0; }
        50% { transform: scale(1) rotate(180deg); opacity: 1; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
      }
      @keyframes slide-up {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(mainContent);
      document.head.removeChild(style);
      clearTimeout(timer);
    };
  }, []);

  const platforms = [
    {
      id: 'muses',
      title: 'Zeus Muses',
      description: 'Create frames for Muses DEX on Zeus Network',
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'guardian',
      title: 'Zeus Guardian',
      description: 'Create frames for Zeus Guardian platform',
      icon: <Shield className="w-8 h-8" />,
      gradient: 'from-orange-500 to-amber-500'
    }
  ];

  const handleCardClick = (platform) => {
    setActiveCard(platform.id);
    setTimeout(() => {
      router.push(`/create/${platform.id}`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Head>
        <title>Dashboard - Zeus Frame Builder</title>
      </Head>

      {showSparkle && (
        <Sparkles 
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-yellow-500"
          style={{ animation: 'sparkle 1s ease-out forwards' }}
        />
      )}

      <div className="max-w-6xl mx-auto p-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-16 animate-[slide-up_0.5s_ease-out]">
          <div className="flex items-center space-x-2">
            <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg
                          hover:bg-white/10 transition-colors cursor-pointer
                          group">
              <span className="text-lg font-mono group-hover:text-yellow-500 transition-colors">v0.1</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <span className="text-yellow-500 animate-pulse">⚡</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg
                          hover:bg-white/10 transition-colors group">
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{address}</span>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                       bg-white/5 hover:bg-white/10 backdrop-blur-sm
                       transition-all duration-300 hover:scale-105"
            >
              <LogOut size={20} />
              <span>Disconnect</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="animate-[slide-up_0.7s_ease-out]">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-orange-400 bg-clip-text text-transparent
                       hover:from-orange-400 hover:to-yellow-200 transition-all duration-500">
            Create Zeus Frame
          </h1>
          <p className="text-gray-400 mb-12 hover:text-gray-300 transition-colors">
            Select a Zeus Network platform to create your frame
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platforms.map((platform) => (
              <div 
                key={platform.id}
                onClick={() => handleCardClick(platform)}
                className={`relative group cursor-pointer transform transition-all duration-300
                          hover:scale-[1.02] ${activeCard === platform.id ? 'scale-95' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl" />
                <div className="absolute inset-0 backdrop-blur-xl rounded-2xl" />
                
                <div className="relative p-8 rounded-2xl border border-white/10 
                             transition-all duration-300 group-hover:border-yellow-500/50
                             overflow-hidden">
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-orange-500/0 
                               group-hover:from-yellow-500/10 group-hover:to-orange-500/10 
                               transition-all duration-500" />

                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${platform.gradient} text-black
                                    transform group-hover:scale-110 transition-transform duration-300`}>
                          {platform.icon}
                        </div>
                        <h3 className="text-2xl font-bold group-hover:text-yellow-500 transition-colors">
                          {platform.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {platform.description}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center justify-center gap-2 w-full p-3 rounded-xl 
                                font-medium bg-gradient-to-r ${platform.gradient} text-black
                                opacity-0 group-hover:opacity-100 transition-all duration-300
                                transform translate-y-2 group-hover:translate-y-0`}>
                    Create Frame
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

# pages/index.jsx

```jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Wallet, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initial sparkle animation
    setShowSparkle(true);
    const timer = setTimeout(() => setShowSparkle(false), 1000);

    // Mouse move effect
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Add keyframe animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translate(-50%, -50%); }
        50% { transform: translate(-51%, -52%) scale(1.05); }
      }
      @keyframes sparkle {
        0% { transform: scale(0) rotate(0deg); opacity: 0; }
        50% { transform: scale(1) rotate(180deg); opacity: 1; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
      }
      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(255, 179, 0, 0.3); }
        50% { box-shadow: 0 0 40px rgba(255, 179, 0, 0.5); }
      }
    `;
    document.head.appendChild(style);

    // Floating background effect
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
      document.head.removeChild(style);
      clearTimeout(timer);
    };
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Add success sparkle before navigation
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

  const gradientPosition = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,179,0,0.15) 0%, rgba(0,0,0,0) 50%)`
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Head>
        <title>Zeus Frame Builder</title>
        <meta name="description" content="Create Zeus Network frames" />
      </Head>

      {/* Mouse gradient follower */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={gradientPosition}
      />

      {showSparkle && (
        <Sparkles 
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-yellow-500"
          style={{ animation: 'sparkle 1s ease-out forwards' }}
        />
      )}

      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-16 relative z-10 animate-[slideUp_0.5s_ease-out]">
          <div className="flex items-center space-x-2">
            <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg
                        hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <span className="text-lg font-mono group-hover:text-yellow-500 transition-colors">v0.1</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <span className="text-yellow-500 animate-pulse">⚡</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] relative z-10">
          {/* Glass card effect */}
          <div className="relative max-w-2xl w-full p-8 rounded-2xl overflow-hidden
                       animate-[slideUp_0.7s_ease-out] hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl" />
            <div className="absolute inset-0 backdrop-blur-xl rounded-2xl" />
            <div className="relative border border-white/10 rounded-2xl p-12
                        group hover:border-yellow-500/50 transition-colors duration-300">
              <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-200 to-orange-400 
                         bg-clip-text text-transparent text-center
                         group-hover:from-orange-400 group-hover:to-yellow-200 transition-all duration-500">
                Zeus Frame Builder
              </h1>
              
              <p className="text-xl text-gray-400 mb-12 text-center max-w-xl
                         group-hover:text-gray-300 transition-colors">
                Connect your wallet to start creating powerful Zeus Network frames
              </p>

              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="w-full p-4 rounded-xl font-medium text-xl relative group/btn
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300 overflow-hidden
                         hover:shadow-lg hover:shadow-yellow-500/20
                         animate-[pulse_2s_ease-in-out_infinite]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 
                             opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative text-black flex items-center justify-center gap-3">
                  {isConnecting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-6 h-6 group-hover/btn:rotate-12 transition-transform duration-300" />
                      Connect Wallet
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

# pages/options.jsx

```jsx
import { useState, useEffect } from 'react';

export default function RouteGenerator() {
  const [timestamp, setTimestamp] = useState(null);
  const [apps] = useState([
    {
      name: 'Navi Protocol',
      url: 'https://app.naviprotocol.io/market'
    },
    {
      name: 'Uniswap',
      url: 'https://app.uniswap.org/'
    },
    {
      name: 'Cellana Finance',
      url: 'https://app.cellana.finance/swap?inputCurrency=0x1::aptos_coin::AptosCoin&outputCurrency=0x2ebb2ccac5e027a87fa0e2e5f656a3a4238d6a48d93ec9b610d570fc0aa0df12'
    }
  ]);

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  const generateRoute = (url) => {
    if (!timestamp) return '';
    return `https://unfold2024mlinks.vercel.app/dapp/nav1?url=${url}&t=${timestamp}`;
  };

  if (!timestamp) return null;

  return (
    <div style={{ padding: '20px', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Generated Routes</h1>
      {apps.map((app, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #333', borderRadius: '8px' }}>
          <h3>{app.name}</h3>
          <code style={{ 
            display: 'block', 
            padding: '10px', 
            background: '#111', 
            borderRadius: '4px',
            wordBreak: 'break-all' 
          }}>
            {generateRoute(app.url)}
          </code>
        </div>
      ))}
    </div>
  );
}
```

# pages/zeus/index.jsx

```jsx
import ZeusLinkGenerator from '../../components/ZeusLinkGenerator';

export default function ZeusPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <ZeusLinkGenerator />
    </div>
  );
}
```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# public/agoric.png

This is a binary file of the type: Image

# public/aptos.png

This is a binary file of the type: Image

# public/avalanche.png

This is a binary file of the type: Image

# public/base.png

This is a binary file of the type: Image

# public/favicon.ico

This is a binary file of the type: Binary

# public/file.svg

This is a file of the type: SVG Image

# public/globe.svg

This is a file of the type: SVG Image

# public/manifest.json

```json
{
    "short_name": "MlinksApp",
    "name": "Mlinks Decentralized Actions",
    "icons": [
      {
        "src": "https://pbs.twimg.com/profile_images/1846897640677822470/8g6-quYE_400x400.jpg",
        "type": "image/png",
        "sizes": "192x192"
      }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
  }
```

# public/next.svg

This is a file of the type: SVG Image

# public/solana.png

This is a binary file of the type: Image

# public/sui.png

This is a binary file of the type: Image

# public/unichain.png

This is a binary file of the type: Image

# public/vercel.svg

This is a file of the type: SVG Image

# public/window.svg

This is a file of the type: SVG Image

# public/zeus.png

This is a binary file of the type: Image

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

```

# styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}

```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
```

# utils/tokenMetadata.js

```js
export async function fetchTokenMetadata(chainId, tokenAddress) {
  try {
    const response = await fetch(`https://api.1inch.io/v5.0/${chainId}/tokens`);
    const data = await response.json();
    
    // Handle native token cases
    if (tokenAddress.toLowerCase() === 'eth' || tokenAddress.toLowerCase() === 'avax') {
      return {
        symbol: tokenAddress.toUpperCase(),
        name: tokenAddress === 'eth' ? 'Ethereum' : 'Avalanche',
        decimals: 18
      };
    }

    const token = data.tokens[tokenAddress];
    return token || null;
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    return null;
  }
} 
```

