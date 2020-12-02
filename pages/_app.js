import { library } from "@fortawesome/fontawesome-svg-core";
import ThemeProvider from 'providers/ThemeProvider';

import {
  faSun,
  faMoon,
  faBorderAll,
  faList,
  faSortNumericUp,
  faSortNumericDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(faBorderAll, faList, faSortNumericUp, faSortNumericDown, faSun, faMoon);

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "highlight.js/styles/darcula.css";
import "react-toggle/style.css";
import "styles/index.scss";

function MyApp({ Component, pageProps }) {
  return <ThemeProvider>
  <Component {...pageProps} />
</ThemeProvider>
}

export default MyApp;
