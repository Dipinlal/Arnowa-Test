import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
       <HelmetProvider>
       <ToastContainer theme='dark'/>
      <Routes>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/home' element={<Home/>}/>

      </Routes>
      </HelmetProvider>
    </div>
  );
}

export default App;
