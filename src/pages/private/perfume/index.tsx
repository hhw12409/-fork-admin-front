import React from "react";
import styled from "styled-components";

const PerfumeList: React.FC = () => {
  return (
    <Content>
      <Header>
        <h2>향수 리스트</h2>
        <button className="add-perfume">향수 추가하기</button>
      </Header>
      <table>
        <colgroup></colgroup>
      </table>
    </Content>
  );
};

export default PerfumeList;

const Content = styled.main`
  padding: 40px;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .add-perfume {
    padding: 12px 8px;
    background: ${(p) => p.theme.color.perfumery_pink};
    color: white;
    border-radius: 3px;
  }
`;