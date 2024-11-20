import './App.css';
import React, { useState,useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import AddReview from './components/add-review';
import Movie from './components/movie';
import MoviesList from './components/movies-list';
import Login from './components/login.js';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); 
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movies Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              { user ? (
                <Link onClick={logout}>Logout User</Link>
              ) : (<Link to={"/login"}>Login</Link>)
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path= {['/','/movies']} component={MoviesList} >
        </Route>
        <Route path = "/movies/:id/review" render = {(props)=> 
          <AddReview{...props} user = {user}/>
        }></Route>
        <Route path = "/movies/:id" render = {(props)=> 
          <Movie{...props} user = {user}/>
        }></Route>
        <Route path = "/login" render = {(props)=> 
          <Login{...props} login = {login}/>
        }></Route>
      </Switch>
    </div>
    
  );
}

export default App;