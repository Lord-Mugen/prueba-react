import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Login from "./components/login/Login";
import Posts from "./components/post/Post";
import NotFound from "./components/notFound/NotFound";

const App = () => {
  // Configurar Axios para realizar solicitudes HTTP a la API JSONPlaceholder
  axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
