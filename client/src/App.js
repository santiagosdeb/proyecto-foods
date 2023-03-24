import './App.css';
import { Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar';
import Post from './components/Post/Post'
import RecipeDetail from './components/RecipeDetail/RecipeDetail';

function App() {
  return (
    <div className='app'>
    <Route exact path='/' component={Landing}/>
    <Route path='/home' component={NavBar}/>
    <Route path='/home' component={Home}/>
    <Route path='/post' component={Post} />
    <Route path='/recipe/:id' component={RecipeDetail} />
    </div>
  );
}

export default App;
