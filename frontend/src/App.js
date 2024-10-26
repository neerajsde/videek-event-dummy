import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import PhotosTab from './components/tabs/PhotosTab';
import BlogTab from './components/tabs/BlogTab';
import EInvitesTab from "./components/tabs/EInvitesTab";
import DJEventTab from "./components/tabs/DJEventTab";
import DecorationTab from "./components/tabs/DecorationTab";
import EventsTab from "./components/tabs/EventsTab";
import AudioVisiualTab from "./components/tabs/AudioVisiualTab";
import Login from "./pages/Login";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import MenuBar from "./components/pop-up/MenuBar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import VendorCategories from "./pages/VendorCategories";
import Gallery from "./pages/Gallery";
import RealWeddings from "./pages/RealWeddings";
import AllWeddings from "./pages/AllWeddings";
import AddTestimonal from "./components/common/AddTestimonal";
import Vendor from "./pages/Vendor";

function App() {
  const {tab, setTab,isOpenRate, setIsOpenRate, isActiveLoginPage, setIsActiveLoginPage, isMenuBarActive, setIsMenuBarActive} = useContext(AppContext);

  return (
    <div className={`w-full min-h-full`}>
      {
        tab.isActive && (
          <div className="absolute w-full h-full bg-[#00000045] top-0 left-0 flex items-start justify-end z-50">
            <div
              onMouseEnter={() => setTab({isActive: true, name:tab.name})}
              onMouseLeave={() => setTab({isActive: false, name:''})}
              className="w-[80vw] max-sm:w-full min-h-[300px] pt-[110px] mr-4 max-sm:mr-0 bg-white shadow-lg"
            >
              {
                isMenuBarActive && (
                  <div className="w-full flex justify-between items-center py-3 px-4 border-b border-gray-400">
                    <div onClick={() => setTab({isActive: false, name:''})}><FaArrowLeft/></div>
                    <div className="text-base font-bold uppercase text-[#411530]">{tab.name}</div>
                    <div onClick={() => {setTab({isActive: false, name:''}); setIsMenuBarActive(false)}}><IoClose className="text-2xl"/></div>
                  </div>
                )
              }
              {tab.name === 'dj-event' && (<DJEventTab/>)}
              {tab.name === 'decoration' && (<DecorationTab/>)}
              {tab.name === 'photos' && (<PhotosTab/>)}
              {tab.name === 'events' && (<EventsTab/>)}
              {tab.name === 'audio-visiual' && (<AudioVisiualTab/>)}
              {tab.name === 'blog' && (<BlogTab/>)}
              {tab.name === 'e-vites' && (<EInvitesTab/>)}
            </div>
          </div>
        )
      }

      {
        isActiveLoginPage && (
          <div className="w-full min-h-screen fixed top-0 left-0 backdrop-blur-sm bg-[#00000057] z-[60] flex flex-col">
            <div className="w-full flex items-center justify-end">
              <button onClick={() => setIsActiveLoginPage(false)} className="text-white py-1 px-2 transition duration-300 ease-in-out hover:rotate-180">
                <IoClose className="text-5xl"/>
              </button>
            </div>
            <div className="w-full h-full flex items-center justify-center"><Login/></div>
          </div>
        )
      }

      {
        isOpenRate && (
          <div className="w-full min-h-[2000px] absolute top-0 left-0 backdrop-blur-sm bg-[#00000057] z-[60] flex justify-center items-start py-8">
            <div className="absolute top-0 right-0 z-[70]">
              <button onClick={() => setIsOpenRate(false)} className="text-white py-1 px-2 transition duration-300 ease-in-out hover:rotate-180">
                <IoClose className="text-5xl"/>
              </button>
            </div>
            <AddTestimonal/>
          </div>
        )
      }

      {
        isMenuBarActive && (
          <div className="w-full min-h-screen absolute top-0 backdrop-blur-sm bg-[#00000057] z-40">
            <MenuBar/>
          </div>
        )
      }
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about-us" element={<About/>}/>
        <Route path="/contact-us" element={<Contact/>}/>        
        <Route path="/blog/:uId" element={<Blogs/>}/>        
        <Route path="/gallery/:category" element={<Gallery/>}/>        
        <Route path="/real_weddings" element={<AllWeddings/>}/>        
        <Route path="/real_weddings/:couple_name" element={<RealWeddings/>}/>        
        <Route path="/vendor-category/:name" element={<VendorCategories/>}/>        
        <Route path="/vendor/:category/:name" element={<Vendor/>}/>        
        <Route path="/s/:services" element={<Services/>}/>
        <Route path="/s/:services/:anything" element={<Services/>}/>
        <Route path="/s/:services/:anything/:anything" element={<Services/>}/>

        <Route path='*' element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
