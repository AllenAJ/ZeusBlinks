import SwapLinkGenerator from '../../components/SwapLinkGenerator';

export default function AvalanchePage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <SwapLinkGenerator
        chainId="43114"
        nativeToken="AVAX"
        title="Avalanche ParaSwap Blink Generator"
        description="Generate a Blink for ParaSwap on Avalanche. Enter the token address you want to swap to."
      />
    </div>
  );
} 