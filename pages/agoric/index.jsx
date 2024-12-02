import DexLinkGenerator from '../../components/DexLinkGenerator';

export default function AgoricPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <DexLinkGenerator
        title="Agoric DEX Mlink Generator"
        description="Generate a Mlink for Crescent Network on Agoric. Enter the token symbol you want to swap to."
        baseUrl="https://app.crescent.network/orderbook"
        inputParam="from"
        outputParam="to"
        nativeToken="bld"
        isSymbolBased={true} // Add this flag for symbol-based URLs
      />
    </div>
  );
}