import "./reset.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register";
import TransactionList from "./components/TransactionList"
import NewTransaction from "./components/NewTransaction";

function App() {  

  return (
    <BrowserRouter> 
      <Switch>

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

      </ Switch>       
    </ BrowserRouter>   
  );
}

export default App;