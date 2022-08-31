import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import OneMovie from './components/OneMovie';

import Home from './pages/Home';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Search from './pages/Search';
import SingUp from './pages/SignUp';
import UserAccount from './pages/UserAccount';
import {useGloablData} from "./context/GlobalData";

function App() {

  const [{current_token}, ] = useGloablData();
  // some routes are protected
  return (
    <Router>
     <Routes>
       
      <Route path='/' element={<Home />} />
      
      <Route path="/watch" 
        element={
        current_token === undefined || current_token === null 
          ? <Login /> 
          : <Movies />
        } 
      />
      
      <Route path="/search" element={ 
        current_token === undefined || current_token === null 
          ? <Login /> 
          : <Search />
        } 
      />
      
      <Route path="/one" element={
        current_token === undefined || current_token === null 
        ? <Login /> 
        : <OneMovie />} 
      />

      <Route path="/login" element={<Login />} />
      
      <Route path="/signup" element={<SingUp />} />
      
      <Route path="/account" element={
      current_token === undefined || current_token === null 
      ? <Login /> 
      : <UserAccount />} 
      />
    </Routes>
  </Router> 
  );
}

export default App;
