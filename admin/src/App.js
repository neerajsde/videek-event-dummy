import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import NotFound from './pages/NotFound'
import Login from "./pages/Login";
import PrivateRoute from './components/common-com/PrivateRoute'
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path='*' element={<NotFound />} />

        <Route path='/dashboard' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;