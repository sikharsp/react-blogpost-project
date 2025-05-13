import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registrationform from './pages/Registrationform';
import Loginform from './pages/Loginform';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import Dasgboarad from './pages/Dasgboarad';
import Footer from './components/Footer';
import SingleBlogPage from './pages/SingleBlogPage'
import MyBlog from './pages/MyBlog'
import EditBlog from './pages/EditBlog' 
import MyProfile from './pages/MyProfile'
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <Router>
      <Routes>
      <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Dasgboarad />
            </ProtectedRoute>
          }
        />
         <Route path="create-blog" element={
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
         } />
              <Route path='/singleblogs/:id' element={
          <ProtectedRoute>
           <SingleBlogPage />
          </ProtectedRoute> 
        } />
        <Route path='/myblog' element={
          <ProtectedRoute>
           <MyBlog />
          </ProtectedRoute> 
        } />
          <Route path='/editBlogs/:id' element={
          <ProtectedRoute>
           <EditBlog />
          </ProtectedRoute> 
        } />

          <Route path="/profile" element={
  <ProtectedRoute>
    <MyProfile />
  </ProtectedRoute>
} />

          <Route path="/" element={
  <ProtectedRoute>
    <EditProfile/>
  </ProtectedRoute>
} />


        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Loginform />} />
        <Route path="/register" element={<Registrationform />} />
      </Routes>
    </Router>
  );
}

export default App;