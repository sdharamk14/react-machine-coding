import "./App.css";
import Sidepanel from "./component/Sidepanel";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./configs/routes";
import ThemeProvider from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <div className="content">
            <aside className="sidepanel">
              <Sidepanel />
            </aside>
            <main className="app-container">
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
