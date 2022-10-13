import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ShoppingCartProvider>
        <div className="container mx-auto">
          <Navbar />
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
             </Auth>
          ) : (
            <Component {...pageProps} />
          )}
          <Footer />
        </div>
      </ShoppingCartProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();

  const { status, data:session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthenticated?message=login required");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children
}
  
export default MyApp;
