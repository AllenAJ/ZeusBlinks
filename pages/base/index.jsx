import OneinchLinkGenerator from '../../components/OneinchLinkGenerator';

export default function BasePage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <OneinchLinkGenerator
        chainId="8453"
        nativeToken="ETH"
        title="Base 1inch Mlink Generator"
        description="Generate a Mlink for 1inch on Base. Enter the token address you want to swap to."
      />
    </div>
  );
}
