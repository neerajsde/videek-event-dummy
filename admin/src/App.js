import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import NotFound from './pages/NotFound'
import Login from "./pages/Login";
import PrivateRoute from './components/common-com/PrivateRoute'
import SignUp from "./pages/SignUp";
import ImageView from "./components/ImageView";
import { AppContext } from "./context/AppContext";

function App() {
  const { imageViewActive } = useContext(AppContext);

  return (
    <div className="">

      {imageViewActive.isActive && (
        <div className="w-full h-full fixed top-0 bg-[#00000090] backdrop-blur-sm z-[1000000]">
          <ImageView/>
        </div>
      )}

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