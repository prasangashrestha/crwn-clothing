import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import './App.css';

import HomePage from './pages/homepage/homepage'
import ShopPage from './pages/shop/shop';
import SignInAndSignUp from './pages/singin-signup/signin-signup';
import Header from './components/header/header';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'


class App extends React.Component {

  constructor(){
    super()
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await  createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          
          this.props.setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()

          })
        })
        
      }else{
        this.props.setCurrentUser(userAuth)
      }
     
    })
    
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path= '/crwn-clothing' component = {HomePage} /> 
          <Route  path= '/crwn-clothing/shop' component = {ShopPage} /> 
          <Route exact path="/crwn-clothing/signin" render= {() => this.props.currentUser? (<Redirect to = './'/>) : (<SignInAndSignUp />)} />
        </Switch>
  
      </div>
    );
  }
  }

  const mapStateToProps = ({user}) => {
    return({currentUser: user.currentUser})
  }

  const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  })

export default connect(mapStateToProps, mapDispatchToProps)(App);
