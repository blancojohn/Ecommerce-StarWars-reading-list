import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import DetailsPeople from './pages/detailsPeople';
import DetailsPlanet from './pages/detailsPlanet';
import RegisterOrLogin from "./pages/registerOrlogin";
import { Profile } from "./pages/private";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/footer";
/* import CardPeople from "./component/CardPeople.jsx"; */

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<DetailsPeople />} path='/characters/:id' />
                        <Route element={<DetailsPlanet />} path='/planets/:id' />
                        <Route element={<RegisterOrLogin />} path="/registerorlogin" />
                        {/* <Route element={<CardPeople />} path="/people/:id" /> */}
                        <Route element={<Profile />} path="private" /> 
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <ToastContainer />
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
