import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import BreedPage from './components/BreedPage/BreedPage';
import TopBreeds from './components/TopBreeds/TopBreeds';
import CatArticle from './components/CatArticle/CatArticle';
import { ReactComponent as Logo } from './images/CatwikiLogo.svg';

function App() {

  const goHome = () => {
    window.location.assign(window.location.origin + '/');
  }

  return (
    <div className="App">
      <header>
        <Logo className="logo" fill="black" onClick={goHome}/>
      </header>
      <main>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/breed/:id" component={BreedPage} />
            <Route path="/most_searched" component={TopBreeds} />
            <Route path="/related_article" component={CatArticle} />
          </Switch>
        </Router>
      </main>
      <footer>
        <Logo className="logo" fill="white"/>
        <p className="created-by">created by <a className="username" href="https://devchallenges.io/portfolio/SantiagoJavierRubio" target="_blank" rel="noreferer">
            Santiago Javier Rubio
          </a> - devChallenges.io 2021</p>
      </footer>
    </div>
  );
}

export default App;
