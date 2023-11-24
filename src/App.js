import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Invest from './pages/Invest'
import Rent from './pages/Rent'
import PostLand from './pages/PostLand'
import LandDetails from './pages/LandDetails'
import AddImages from './pages/AddImages'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/invest' element={<Invest />} />
            <Route path='/rent' element={<Rent />} />
            <Route path='/post-land' element={<PostLand />} />
            <Route path='/land-details/:id' element={<LandDetails />} />
            <Route path='/add-images/:id' element={<AddImages />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
