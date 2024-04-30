
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Register from './pages/register';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react'
import Home from './pages/home';
import Todo from './pages/todo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  useEffect(() => {
    // Check the current sessionStorage to see if the user is logged in
    if (sessionStorage['name'] && sessionStorage['name'].length > 0) {
      // Update the auth slice status to true
      Login();
    }
  }, []);


  return (
    <div className='container-fluid'>
      {/* <NavigationBar /> */}
      <ToastContainer />

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/todo" element={<Todo />} />

      </Routes>
    </div>

  );
}

export default App;
