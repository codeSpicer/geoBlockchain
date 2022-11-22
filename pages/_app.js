import "../styles/globals.css";
import Link from "next/link";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.polygon, chain.hardhat, chain.localhost],
  [infuraProvider({ apiKey: process.env.INFURA_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="">
          <p className="text-6xl font-bold text-white bg-slate-900 p-6">
            Geo Blockchain
          </p>
          <nav className="border-b p-6 pt-0 bg-slate-900 flex space-x-96">
            <div className="flex space-x-24 ">
              <div className="flex mt-4">
                <Link href="/">
                  <a className="mr-4 text-white text-lg">Home</a>
                </Link>
                <Link href="/create_user">
                  <a className="mr-4 text-white text-lg">Register</a>
                </Link>
                <Link href="/profile">
                  <a className="mr-4 text-white text-lg">Profile</a>
                </Link>
                <Link href="/create_product">
                  <a className="mr-4 text-white text-lg">Add Product</a>
                </Link>
                <Link href="/find">
                  <a className="mr-4 text-white text-lg">Find</a>
                </Link>
              </div>
            </div>
            <div>
              <ConnectButton className="relative ml-96" />
            </div>
          </nav>
          <Component {...pageProps} />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
