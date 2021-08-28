import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./screens/Login";
import { AuthProvider } from "./context/AuthContext";
import Chats from "./screens/Chats";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route component={Login} path="/" exact />
          <Route component={Chats} path="/chats" exact />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
