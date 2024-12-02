import DexLinkGenerator from '../../components/DexLinkGenerator';

export default function SuiPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <DexLinkGenerator
        title="Sui DEX Blink Generator"
        description="Generate a Blink for Cetus on Sui. Enter the token addresses below."
        baseUrl="https://app.cetus.zone/swap"
        inputParam="from"
        outputParam="to"
      />
    </div>
  );
}