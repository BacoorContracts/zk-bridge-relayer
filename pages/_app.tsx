import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import type { AppProps } from "next/app";
// Styles
// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
