import './App.css';
import {LandingPage} from "./components/LandingPage/LadingPage";
import {Home}from "./components/Home/Home";
import{Details} from "./components/Details/Details"

import { BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><LandingPage/></Route>
        <Route exact path="/recipes/"><Home/></Route>       
        <Route exact path="/recipes/:id" ><Details /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
