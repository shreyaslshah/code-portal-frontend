import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/Signup';
import './app.css'
import Home from './pages/home/Home';
import Dashboard from './pages/user-dashboard/Dashboard';
import Signin from './pages/signin/Signin';
import Editor from './pages/editor/Editor';
import Navbar from './pages/navbar/Navbar';
import SelectLang from './pages/editor/SelectLang';
import Leaderboard from './pages/editor/Leaderboard';
import { AuthProvider } from './context/auth';
import AuthRoute from './AuthRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/login' element={<Signin />}></Route>
          <Route exact path='/' element={<AuthRoute />}>
            <Route exact path='/code/:contestId/:questionNo' element={<Editor />} />
          </Route>
          <Route exact path='/' element={<AuthRoute />}>
            <Route exact path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
