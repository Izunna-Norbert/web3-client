import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import IndexPage from "./pages";
import WalletPage from "./pages/wallet";

const activeChainId = ChainId.Mainnet;

const App = () => {
  return (
    <>
    <ThirdwebProvider
    activeChain={activeChainId}
    authConfig={{
      domain: "http://localhost:3000",
      authUrl: "http://localhost:4200/api/v1/auth",
    }}
    >
      <div className="App">
        <h1>Thirdweb React SDK</h1>
      </div>
      <IndexPage />
    </ThirdwebProvider>
    </>
  );
};

export default App;