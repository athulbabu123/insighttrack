import {Routes,Route, Navigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './pages/AdminLayout';
import AdminUsers from './pages/AdminUsers';
import AdminContacts from './pages/AdminContacts';
import Transactions from './pages/Transactions';
import About from './pages/About';
import Analytics from './pages/Analytics';
import AdminAnalytics from './pages/AdminAnalytics';

function App() {
  return (
    <>
      <Routes>
        <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
        <Route path='/analytics-data' element={<Analytics/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/admin/dashboard' element={<AdminLayout/>}/>
        <Route path='/admin/users' element={<AdminUsers/>}/>
        <Route path='/admin/contacts' element={<AdminContacts/>}/>
        <Route path='/admin/transactions' element = {<Transactions/>}/>
        <Route path='/admin/analytics-data' element = {<AdminAnalytics/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children

  }
  else{
    return <Navigate to='/'></Navigate>
  }


}

export default App;
