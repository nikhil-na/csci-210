import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from '../src/components/user/login';
import Signup from '../src/components/user/signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/login' element={<Login />} />
        <Route path = '/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
)}

export default App;