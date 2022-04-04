import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import NewArticle from './pages/NewArticle';
import EditArticle from './pages/EditArticle';
import MyArticle from './pages/MyArticle';
import SingleArticlePage from './pages/SingleArticlePage';
import NotFound from './pages/NotFound';

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        {user && (
          <>
          <Route path="/new-article" element={<NewArticle />}/>
          <Route path="/articles/:id/edit" element={<EditArticle/>}/>
          <Route path="/articles/me" element={<MyArticle/>}/>
          </>
        )}
        <Route path='/articles/:id' element={<SingleArticlePage/>}/>
        <Route path='*' element={<NotFound/>}/>
        
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
