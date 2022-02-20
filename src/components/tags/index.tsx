import React, { useState } from "react";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DropDown, { DropList } from "../dropdown";

interface Props {
  label?: string;
  list: DropList[];
  values: DropList[];
  onDropChange: (value: string | number) => void;
  removeValue: (idx: number) => void;
}

const TagsComponent: React.FC<Props> = ({ label, list, onDropChange, values, removeValue }) => {
  return (
    <>
      <DropDown label={label} onChange={onDropChange} list={list} />
      <TagList>
        {values.map((el, idx) => {
          return (
            <li key={el.value}>
              {el.label || el.value}
              <button onClick={() => removeValue(idx)}>
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
  margin: 12px 0;
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
