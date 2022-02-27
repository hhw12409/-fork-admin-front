import React, { useRef } from "react";
import styled from "styled-components";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export interface DropList {
  id: string | number;
  label?: string;
  value: string | number;
}
interface Props {
  label?: string;
  list: DropList[];
  value?: DropList | null;
  isAddBtn?: boolean;
  isTitle?: boolean;
  onChange: (value: string | number) => void;
  handleAddBtn?: () => void;
}

const DropDown: React.FC<Props> = ({
  list,
  value,
  label,
  onChange,
  isAddBtn = false,
  handleAddBtn,
  isTitle = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasValue = !!value;
  return (
    <>
      {isTitle && (
        <Title>
          <h3>{label}</h3>
          {isAddBtn && handleAddBtn && (
            <button onClick={handleAddBtn}>
              <AddOutlinedIcon />
            </button>
          )}
        </Title>
      )}
      <DropdownContainer ref={containerRef} tabIndex={1} className={hasValue ? "written" : ""}>
        <label>{!value ? label || "" : value.label}</label>
        <ArrowDropDownOutlinedIcon className="drop-arrow" />
        <ul className="drop-box">
          {list.length > 0 &&
            list.map((el) => (
              <li
                key={el.value}
                onClick={() => {
                  onChange(el.id);
                  (document.activeElement as HTMLElement)?.blur();
                }}
              >
                {el.label || el.value}
              </li>
            ))}
          {list.length < 1 && <li>리스트가 존재하지 않습니다.</li>}
        </ul>
      </DropdownContainer>
    </>
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
    max-height: 120px;
    overflow: scroll;
    top: calc(100% + 5px);
    left: -1px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    width: calc(100% + 2px);
    z-index: 100;
    li {
      width: 100%;
      padding: 8px 12px;
      background: white;
      font-size: 12px;
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

const Title = styled.div`
  margin-bottom: 12px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 3px;
  button {
    display: flex;
    align-items: center;
    background: transparent;
    svg {
      width: 18px;
      height: auto;
    }
  }
`;
