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
      domain: "https://web3-auth-client.onrender.com",
      authUrl: "https://web3-auth-wo5n.onrender.com/api/v1/auth",
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