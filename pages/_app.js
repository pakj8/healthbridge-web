import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../services/graphql";
import Navbar from "../components/navbar/Navbar";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <main className={`${lato.className}`}>
        <Navbar />
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
