import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div className="">
      <nav className="border-b p-6 bg-slate-900">
        <p className="text-6xl font-bold text-white bg-slate-900">
          Geo Blockchain
        </p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-white text-lg">Home</a>
          </Link>
          <Link href="/create-user">
            <a className="mr-4 text-white text-lg">Register</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
