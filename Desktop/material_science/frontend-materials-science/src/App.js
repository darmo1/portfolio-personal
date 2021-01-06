import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Blog from "./containers/Blog";
import AboutUs from "./containers/AboutUs";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Tienda from "./containers/Tienda.jsx";
import Information from "./containers/Information";
import Payment from "./containers/Payment";
import Success from "./containers/Success";
import Layout from "./components/Layout";
import AppContext from "./context/AppContext";

// Agregando la lógica de negocio [agregar, eliminar, cambiar etc]
import useInitialState from "./hooks/useInitialState";
import SingleBlog from "./containers/SingleBlog";

const App = () => {

  const initialState = useInitialState();

  return (
    <AppContext.Provider value={initialState}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path={"/blog"} component={Blog} />
          <Route exact path={"/blog/:id"} component={SingleBlog} />
          <Route exact path={"/about-us"} component={AboutUs} />
        
            <Route exact path={"/tienda"} component={Tienda} />
            <Route exact path={"/tienda/information"} component={Information} />
            <Route exact path={"/tienda/payment"} component={Payment} />
            <Route exact path={"/tienda/success"} component={Success} />
         
          
          <Route exact path={"/"} component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
