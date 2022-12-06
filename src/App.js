import logo from './logo.svg';
import ButtonComponent from "./components/Button";
import GuestLayout from "./layouts/Guest";
import AuthLayout from "./layouts/Auth";
import AdminLayout from "./layouts/Admin";
import Register from "./pages/Register"
import './App.css';

function App() {
  return (<div className="App">
  
  <AuthLayout>
      <Register/>
  </AuthLayout>
 
</div>);
}

export default App;
