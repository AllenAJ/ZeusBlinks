import SwapLinkGenerator from '../../components/SwapLinkGenerator';

export default function BasePage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <SwapLinkGenerator
        chainId="8453"
        nativeToken="ETH"
        title="Base Matcha Blink Generator"
        description="Generate a Blink for Matcha on Base. Enter the token address you want to swap to."
      />
    </div>
  );
}
