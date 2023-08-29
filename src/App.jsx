import React, {Suspense, lazy} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";
const Home = lazy(() => import("./components/Home.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const SignUp = lazy(() => import("./components/Signup.jsx"));
import { auth } from "./firebase";
const Game = lazy(() => import("./components/Game"));
const Logout = lazy(() => import("./components/Logout"));
import Protected from './components/Protected';
import {Provider} from 'react-redux';
import {store} from './store';

function App() {
  
  return (
    <Provider store={store}>
    <Router>
      <NavigationBar></NavigationBar>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/home" element={<Protected><Home /></Protected>}></Route>
        <Route path="/game" element={<Protected><Game /></Protected>}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
      </Suspense>
    </Router>
    </Provider>
  )
}

export default App
