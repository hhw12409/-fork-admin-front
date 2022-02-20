import React from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi"
import { FaUser } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { ColorList } from "Shared/globalStyle/theme/color";
const Header: React.FC = () => {
  return <Container>
    <ToggleButton>
      <GiHamburgerMenu />
    </ToggleButton>
    <UserSection tabIndex={1}>
      <UserImage>
        <FaUser />
      </UserImage>
      <span>
        SSul(설영환)
        <AiFillCaretDown />
      </span>
      <DropMenu className="dropdown">
        <li>로그아웃</li>
      </DropMenu>
    </UserSection>
  </Container>
}

export default Header;

const Container = styled.header`
  width:100%;
  padding:20px;
  height:70px;
  background: #fff;
  position:absolute;
  top:0;
  right:0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
`;

const ToggleButton = styled.button`
  background: none;
  svg{
    width:22px;
    height:auto;
  }
`;
const UserSection = styled.section`
  display: flex;
  align-items: center;
  background: none;
  padding: 8px 0;
  position: relative;
  cursor: pointer;
  span{
    font-size: 14px;
    svg{
      width: 12px;
      height: auto;
      margin-left: 8px;
    }
  }
  .dropdown{
    display:none;
  }
  &:focus .dropdown{
    display: block;
  }
`
const UserImage = styled.div`
  border-radius: 50%;
  background: #dcdcdc;
  width:24px;
  height:24px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  margin-right:8px;
  svg{
    fill:white;
    width:20px;
    height:20px;
  }
`;

const DropMenu = styled.ul`
  position: absolute;
  top:100%;
  left:0;
  width:100%;
  border:1px solid #bbb;
  background: #fff;
  li{
    width:100%;
    padding:12px 8px;
    display: flex;
    align-items: center;
    &:hover{
      background: ${ColorList.v2romaine300};
    }
  }
`;