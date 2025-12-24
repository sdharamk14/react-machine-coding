import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom";

export const render = () =>
  renderToString(
    <StaticRouter location="/">
      <App />
    </StaticRouter>
  );
