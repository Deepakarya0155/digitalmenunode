import Head from "next/head";
import Script from "next/script";

const Payment = () => {
  return (
    <div>
      <Head>
        <Script
          src="https://sdk.cashfree.com/js/v3/cashfree-2023.03.07.js"
          strategy="lazyOnload"
          onLoad={() =>
            console.log(`script loaded correctly, window.FB has been populated`)
          }
        >
          const cash=Cashfree(); alert("hii")
        </Script>
      </Head>
    </div>
  );
};
export default Payment;
