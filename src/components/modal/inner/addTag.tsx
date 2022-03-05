import React from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { useState } from "react";
import DropDown, { DropList } from "Components/dropdown";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setPerfumeDatas } from "@/store/slices/perfume";
import { RootState } from "@/store/reducer";
import createTagCategory from "Apis/adminApi/createTagCategory";
import createTag from "Apis/adminApi/createTag";

interface Props {
  closeModal: () => void;
}

const AddTagModal: React.FC<Props> = ({ closeModal }) => {
  const [name, setName] = useState("");
  const { tagCategories } = useSelector((state: RootState) => state.perfume);
  const [category, setCategory] = useState<DropList | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [isOpenInner, setIsOpenInner] = useState(false);
  const dispatch = useDispatch();
  const addCategory = async () => {
    try {
      const tagCategories = await createTagCategory({ name: categoryName });
      Swal.fire("성공", "카테고리 생성에 성공하였습니다. ", "success");
      setIsOpenInner(false);
      dispatch(setPerfumeDatas({ tagCategories }));
    } catch (e) {
      console.log(e);
      Swal.fire("에러", "카테고리 생성에 실패하였습니다. 지속되면 개발자에게 문의해주세요.", "error");
    }
  };
  const addTag = async () => {
    try {
      if (!category?.id) {
        Swal.fire("에러", "카테고리는 꼭 입력하셔야합니다.", "error");
        return;
      }
      const tags = await createTag({
        tag_category_id: category?.id,
        name,
      });
      Swal.fire("성공", "태그 생성에 성공하였습니다. ", "success");
      closeModal();
      console.log(tags);
      dispatch(setPerfumeDatas({ tags }));
    } catch (e) {
      console.log(e);
      Swal.fire("에러", "노트 생성에 실패하였습니다. 지속되면 개발자에게 문의해주세요.", "error");
    }
  };
  return (
    <>
      <Title>태그 추가</Title>
      <ModalContent>
        <InputSection isFull>
          <TextField
            fullWidth
            label={<InputLabel>이름(한글)</InputLabel>}
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            variant="outlined"
          />
        </InputSection>
        <InputSection isFull>
          <InputTitle>
            <h3>카테고리</h3>
            <button onClick={() => setIsOpenInner(true)}>
              <AddOutlinedIcon />
            </button>
          </InputTitle>
          <DropDown
            label="카테고리"
            onChange={(value) => {
              const seleted = tagCategories.find((el) => el.id === value);
              if (!seleted) {
                alert("비정상적인 카테고리입니다.");
                return;
              }
              setCategory({
                id: seleted.id,
                value: seleted.name,
                label: seleted.name,
              });
            }}
            list={tagCategories.map((el) => ({ id: el.id, value: el.name }))}
            isTitle={false}
            value={category}
          />
        </InputSection>
        <Submit onClick={addTag}>생성하기</Submit>
        {isOpenInner && (
          <InnerModal>
            <button onClick={() => setIsOpenInner(false)} className="close">
              <CloseOutlinedIcon />
            </button>
            <InnerContent>
              <h3>카테고리 추가하기</h3>
              <TextField
                fullWidth
                label={<InputLabel>이름</InputLabel>}
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                size="small"
                variant="outlined"
              />

              <Submit onClick={addCategory}>추가하기</Submit>
            </InnerContent>
          </InnerModal>
        )}
      </ModalContent>
    </>
  );
};

export default AddTagModal;
const Title = styled.h2`
  margin-bottom: 20px;
`;
const InputSection = styled.div<{ isFull?: boolean }>`
  width: ${(p) => (p.isFull ? "100%" : "calc(50% - 5px)")};
  margin-bottom: 10px;
`;

const InputLabel = styled.span`
  font-size: 12px;
`;
const ModalContent = styled.section`
  width: 300px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Submit = styled.button`
  width: 100%;
  background: ${(p) => p.theme.color.perfumery_pink};
  color: white;
  padding: 12px 0;
  border-radius: 4px;
`;
const InputTitle = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  button {
    background: none;
  }
`;

const InnerModal = styled.section`
  width: 100%;
  height: 100%;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 201;
  .close {
    width: 20px;
    height: auto;
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const InnerContent = styled.article`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  h3 {
    margin-bottom: 12px;
  }
  .MuiFormControl-root {
    margin-bottom: 12px;
  }
`;
