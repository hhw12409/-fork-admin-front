import getAllPerfumesData from "Apis/adminApi/getAllPerfumes";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PerfumeList: React.FC = () => {
  const navigate = useNavigate();
  const [perfumes, setPerfumes] = useState<DTOS.Output.Perfume[]>([]);
  const handleAddBtn = () => {
    navigate("/perfume/add");
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllPerfumesData();
        console.log(data);
        setPerfumes(data);
      } catch (error) {
        console.log(error);
      }
    };
    false && getData();
  }, []);
  return (
    <Content>
      <Header>
        <h2>향수 리스트</h2>
        <button className="add-perfume" onClick={handleAddBtn}>
          향수 추가하기
        </button>
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
