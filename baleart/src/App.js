import './App.css';
import Login from './components/Login';
import Menu from './components/Menu';
import Exposicions from './components/Exposicions';
import Autors from './components/Autors';
import Espais from './components/Espais';
import Registre from './components/Registre';
import Modalitats from './components/Modalitats';
import Autor from './components/Autor';
import Espai from './components/Espai';
// npm install react-router-dom
// npm install react-bootstrap bootstrap
// npm install axios
// npm install --save ag-grid-community ag-grid-react
// npm i react-carousel-minimal
function App() {
  console.log(sessionStorage.getItem("token"));
  if (sessionStorage.getItem("token") != "" && sessionStorage.getItem("token") != null) {
    return <Menu />
  } else {
    return <Login />
  }
}

export default App;
