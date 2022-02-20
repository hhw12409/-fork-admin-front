import React, { useRef, useState } from "react";
import styled from "styled-components";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

export interface DropList {
  id: string | number;
  label?: string;
  value: string | number;
}
interface Props {
  label?: string;
  list: DropList[];
  value?: DropList | null;
  onChange: (value: string | number) => void;
}

const DropDown: React.FC<Props> = ({ list, value, label, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasValue = !!value;
  return (
    <DropdownContainer ref={containerRef} tabIndex={1} className={hasValue ? "written" : ""}>
      <label>{!value ? label || "" : value.label}</label>
      <ArrowDropDownOutlinedIcon className="drop-arrow" />
      <ul className="drop-box">
        {list.map((el) => (
          <li
            key={el.value}
            onClick={() => {
              console.log("test");
              onChange(el.id);
              (document.activeElement as HTMLElement)?.blur();
            }}
          >
            {el.label || el.value}
          </li>
        ))}
      </ul>
    </DropdownContainer>
  );
};

export default DropDown;

const DropdownContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  position: relative;
  label {
    width: 100%;
    padding: 12px 14px;
    display: block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
  .drop-arrow {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .drop-box {
    position: absolute;
    display: none;
    top: calc(100% + 5px);
    left: -1px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    width: calc(100% + 2px);
    z-index: 100;
    overflow: hidden;
    li {
      width: 100%;
      padding: 8px 12px;
      background: white;
      &:hover {
        background: #eee;
        cursor: pointer;
      }
    }
  }
  &:hover {
    border-color: #000;
  }
  &:focus {
    .drop-box {
      display: block;
    }
  }
  &.written {
    label {
      color: rgba(0, 0, 0);
      font-size: 16px;
    }
  }
`;
