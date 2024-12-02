import DexLinkGenerator from '../../components/DexLinkGenerator';

export default function AptosPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <DexLinkGenerator
        title="Aptos DEX Blink Generator"
        description="Generate a Blink for Cellana Finance on Aptos. Enter the token address you want to swap to."
        baseUrl="https://app.cellana.finance/swap"
        inputParam="inputCurrency"
        outputParam="outputCurrency"
        nativeToken="0x1::aptos_coin::AptosCoin"
      />
    </div>
  );
}