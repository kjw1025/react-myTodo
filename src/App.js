import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navi from "./components/Navi";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { isAuthReady, user } = useAuthContext();
  return (
    <div className="App">
      {isAuthReady}
      {isAuthReady ? (
        <BrowserRouter>
          <Navi />
          <Routes>
            <Route
              path="/"
              element={
                user ? <Home /> : <Navigate replace={true} to="/login" />
              }
            ></Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate replace={true} to="/" />}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate replace={true} to="/" />}
            ></Route>
          </Routes>
        </BrowserRouter>
      ) : (
        "데이터로딩중..."
      )}
    </div>
  );
}

export default App;
