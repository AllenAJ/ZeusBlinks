import OneinchLinkGenerator from '../../components/OneinchLinkGenerator';

export default function AvalanchePage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <OneinchLinkGenerator
        chainId="43114"
        nativeToken="AVAX"
        title="Avalanche 1inch Blink Generator"
        description="Generate a Blink for 1inch on Avalanche. Enter the token address you want to swap to."
      />
    </div>
  );
} 