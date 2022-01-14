import "./reset.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from './contexts/UserContext';
import { useState } from 'react';
import Login from "./components/Login"
import Register from "./components/Register";
import TransactionList from "./components/TransactionList"
import NewTransaction from "./components/NewTransaction";

function App() {
  const [transactionType, setTransactionType] = useState(false)
  const userData = JSON.parse(localStorage.getItem('@user'));
  const [user, setUser] = useState(userData);

  return (
    <BrowserRouter>
      <Switch>

      <UserContext.Provider value={{user, setUser, transactionType, setTransactionType}}>

        <Route path="/" exact>
          <Login />
        </ Route>

        <Route path="/register" exact>
          <Register />
        </ Route>

        <Route path="/transactions" exact>
          <TransactionList />
        </ Route>

        <Route path="/newTransaction" exact>
          <NewTransaction />
        </ Route>

      </UserContext.Provider>

      </ Switch>
    </ BrowserRouter>
  );
}

export default App;