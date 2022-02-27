import FaultDirection from "Pages/common/404";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Mainpage from "./main";
import PerfumeList from "./perfume";
import AddPerfume from "./perfume/addPerfume";

const PrivateRouter: React.FC = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/"  element={<Layout />} >
                <Route index element={<Mainpage />} />
                <Route path="perfume/">
                    <Route index element={<PerfumeList />} />
                    <Route path="add" element={<AddPerfume />} />
                    <Route path=":id" element={<>perfume detail page</>} />
                </Route>
                <Route path="note/">
                    <Route index element={<>note list page</>} />
                    <Route path=":id" element={<>note detail page</>} />
                </Route>
                <Route path="accord/">
                    <Route index element={<>accord list page</>} />
                    <Route path=":id" element={<>accord detail page</>} />
                </Route>
            </Route>
            <Route path="*" element={<FaultDirection />} />
        </Routes>
    </BrowserRouter>
}

export default PrivateRouter