import FaultDirection from "Pages/common/404";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SITEMAP } from "Shared/sitemap";
import Signin from "./Signin";
import Signup from "./Signup";

const PublicRouter: React.FC = () => {
    return <BrowserRouter>
        <Routes>
            <Route path={SITEMAP.PUBLIC.SIGNIN}>
                <Route index element={<Signin />} />
                <Route path={SITEMAP.PUBLIC.SIGNUP} element={<Signup />} />
            </Route>
            <Route path="*" element={<FaultDirection />} />
        </Routes>
    </BrowserRouter>
}

export default PublicRouter