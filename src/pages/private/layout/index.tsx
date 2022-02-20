import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Aside from "./aside";
import Header from "./header";

const Layout: React.FC = () => {
  return (
    <Container>
      <Aside />
      <Body>
        <Header />
        <Outlet />
      </Body>
    </Container>)
}

export default Layout;

const Container = styled.section`
  width: 100%;
  height:100vh;
`;
const Body = styled.section`
  width:calc(100% - 200px);
  margin-left: 200px;
  position: relative;
  padding-top:70px;
`;
const Content = styled.section``;