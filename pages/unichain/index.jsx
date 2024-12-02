import DexLinkGenerator from '../../components/DexLinkGenerator';

export default function UniswapPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <DexLinkGenerator
        title="Uniswap Blink Generator"
        description="Generate a Blink for Uniswap on Ethereum. Enter the token address you want to swap to."
        baseUrl="https://app.uniswap.org/#/swap"
        inputParam="inputCurrency"
        outputParam="outputCurrency"
        nativeToken="ETH"
        isSymbolBased={false}
        additionalParams="&exactField=input&exactAmount=10&use=v1"
      />
    </div>
  );
}