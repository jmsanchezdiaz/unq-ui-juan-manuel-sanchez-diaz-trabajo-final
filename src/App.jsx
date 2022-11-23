import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Game from "./views/game";
import Home from "./views/home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/game"
            element={
              <Layout>
                <Game />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
