import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import getInitialData from "./context";
import GlobalThemeProvider from "Shared/globalStyle";
import { Provider } from 'react-redux';
import store from "./store";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";


Sentry.init({
  dsn: "https://ea5d6705c9334bd0bae78f7991b17d9c@o1101286.ingest.sentry.io/6187778",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const boot = async () => {
  await getInitialData(store);
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <GlobalThemeProvider>
          <App />
        </GlobalThemeProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
  );
  reportWebVitals();
};

boot();