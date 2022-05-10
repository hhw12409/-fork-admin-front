import React from "react";
import styled from "styled-components";
import DropDown, { DropList } from "../dropdown";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
interface Props {
  label?: string;
  list: DropList[];
  values: DropList[];
  onDropChange: (value: string | number) => void;
  removeValue: (id: number | string) => void;
  isAddBtn?: boolean;
  handleAddBtn?: () => void;
}

const TagsComponent: React.FC<Props> = ({ label, list, onDropChange, values, removeValue, isAddBtn, handleAddBtn }) => {
  return (
    <>
      <DropDown
        label={label}
        onChange={onDropChange}
        list={list}
        isAddBtn={isAddBtn}
        handleAddBtn={handleAddBtn}
        isSearch
      />
      <TagList>
        {values.map((el) => {
          return (
            <li key={el.value}>
              {el.label || el.value}
              <button onClick={() => removeValue(el.id)}>
                <CloseOutlinedIcon />
              </button>
            </li>
          );
        })}
      </TagList>
    </>
  );
};

export default TagsComponent;

const TagList = styled.ul`
  display: flex;
  grid-gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 12px;
  li {
    padding: 5px 18px 5px 8px;
    font-size: 12px;
    border-radius: 10px;
    background: #ddd;
    position: relative;
    button {
      width: 12px;
      background: transparent;
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      svg {
        width: 100%;
        height: auto;
      }
    }
  }
`;
