//import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";

//include your index.scss file into the bundle
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import '../styles/heartIcon.css'

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.createRoot(document.querySelector("#app")).render(
    <Layout />
);
