import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./connectors";

function App() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    console.log(1111);
    try {
      activate(injected);
      localStorage.setItem("isWalletConnected", "true");
    } catch (err) {
      console.log(err);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", "false");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const connectWalletOnload = async () => {
      if (localStorage.getItem("isWalletConnected")) {
        try {
          await activate(injected);
        } catch (error) {
          console.log(error);
        }
      }
    };
    connectWalletOnload();
  }, []);
  console.log(account);

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
        onClick={connect}>
        Connect Wallet
      </button>
      {active ? (
        <span>
          Connected with<b>{account}</b>
        </span>
      ) : (
        <span>Not connected</span>
      )}
      <button
        className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-gray-600 hover:bg-blue-800"
        onClick={disconnect}>
        Disconnect
      </button>
    </div>
  );
}

export default App;
