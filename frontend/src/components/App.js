import React, { Component } from 'react';
import '../assets/stylesheets/App.css';
import Navigation from './navigation'
import Category from './category'
import Post from './post'
import Main from './main'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
class App extends Component {
  

  state={
    categories:[]
  }
  render() {
    return (
      <div>
        <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route exact path='/:category' component={Category}/>
            <Route exact path='/:category/:post_id' render={(props) => <Post {...props}/>}  />
          </Switch>
        </div>
      </BrowserRouter>
     </div>
     )
  }
}

export default App
