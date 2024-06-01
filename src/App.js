import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './common/Navbar';
import OpenRoute from './components/core/Auth/OpenRoute';
import Login from './pages/Login'
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import PrivateRoute from '../src/components/core/Auth/PrivateRoute'
import MyProfile from './components/Dashboard/setting/MyProfile';
import { useSelector } from 'react-redux';
import MyPosts from './components/Dashboard/setting/MyPosts';
import { ACCOUNT_TYPE } from './utils/constants';
import AddPost from './components/Dashboard/AddPost/index';
import EditPost from './components/Dashboard/EditPost';
import Settings from './components/Dashboard/setting';
import Category from './pages/Category';
import Post from './pages/Post';
import About from './pages/About';
import Contact from './pages/Contact';
import ViewPost from './pages/ViewPost';
import Footer from './pages/Footer';
import Error from './pages/Error';
import CreateCategory from './components/Dashboard/Add Catalog/CreateCategory';
import Users from './components/core/Auth/Users';
function App() {
 
  const {user} = useSelector((state)=> state.profile)
  return (
    <div className={`w-screen min-h-screen bg-richblack-900 flex flex-col font-inter`}>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='catalog/:catalogName' element={<Category/>}> </Route>
          <Route path='/allposts' element={<Post/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/post/:postId' element={<ViewPost />} />
          <Route  
          path="login"                
          element={
            <OpenRoute> 
              <Login />   
            </OpenRoute>
          }
        />
       <Route
          path="signup"
          element={         
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
         
      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      
      <Route path="dashboard/settings" element={<Settings />} />
      


{
        user?.accountType === ACCOUNT_TYPE.ADMIN && (
          <> 
           <Route path="dashboard/my-posts" element={<MyPosts />} />
           <Route path="dashboard/add-post" element={<AddPost />} />
          <Route path="dashboard/add-category" element={<CreateCategory/>} /> 
          <Route path="dashboard/all-user" element={<Users/>} /> 
           
         
          <Route path="dashboard/edit-post/:postId" element={<EditPost />} /> 
          
          </>
        )
      }
      </Route>
      <Route path="*" element={<Error />} />

      </Routes>
      <Footer/>
     
    </div>
  );
} 

export default App;  
