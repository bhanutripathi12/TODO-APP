import './App.css';
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from './components/user/SignIn';
import SignUp from './components/user/SignUp';
import TodoPage from './components/todo/TodoPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <section>
            <Routes> 
              <Route path='/signup' element={<SignUp />} exact />
              <Route path='/signin' element={<SignIn />} exact />
              <Route path='/' element={<TodoPage />} exact />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
