import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ColorList } from "Shared/globalStyle/theme/color";
import styled from "styled-components";
import { GiDelicatePerfume } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducer";
const Aside: React.FC = () => {
  const location = useLocation();
  console.log(location)
  const { isToggled } = useSelector((state: RootState) => state.layout)
  return <Container>
    <Header>
      <h1>
        <Link to={"/"}>Perfumery</Link>
      </h1>
    </Header>
    <MenuList>
      <MenuButton className="active">
        <Link to="/perfume">
          <GiDelicatePerfume /> 향수 리스트
        </Link>
      </MenuButton>
    </MenuList>
  </Container>
}

export default Aside

const Container = styled.aside`
  display:flex;
  flex-direction: column;
  width:200px;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  background: ${ColorList.perfumeryPink};
  overflow: hidden;
`;
const Header = styled.header`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#fff;
  h1{
    font-size: 1.5rem;
    a{
      color:#fff;
    }
  }
`;
const MenuList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:20px;
 
`;

const MenuButton = styled.li`
  width:100%;
  text-align: center;
  svg{
    height: 0.9em;
    margin-right: 8px;
    fill:#fff;
  }
  a{
    margin: 6px 0;
    display:flex;
    width:100%;
    justify-content: start;
    align-items: center;
    height:40px;
    color:black;
    padding-left: 30px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    color:#fff
  }
  &:hover, &.active {
    padding-left: 12px;
    svg{
      fill:#000;
    }
    a{
      color:#000;
      background: white;
      position: relative;
      padding-left: 18px;
      &::before{
        content: "";
        position: absolute;
        right: 0;
        bottom:100%;
        width:30px;
        height:30px;
        background: transparent;
        border-radius: 50%;
        box-shadow: 23px 23px 0  10px white;
      }
      &::after{
        content: "";
        position: absolute;
        right: 0;
        top:100%;
        width:30px;
        height:30px;
        background: transparent;
        border-radius: 50%;
        box-shadow: 23px -23px 0  10px white;

      }
    }
  }
`;