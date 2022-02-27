import React, { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import resizeImage, { dataURItoBlob } from "Shared/resizeImage";
import { setPerfumeDatas } from "@/store/slices/perfume";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import createAccord from "Apis/adminApi/createAccord";

interface Props {
  closeModal: () => void;
}

const AddAccord: React.FC<Props> = ({ closeModal }) => {
  const imagesRef = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const dataRef = useRef<Blob | null>(null);
  const [englishName, setEnglishName] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const preViewImage = (e: ChangeEvent<HTMLInputElement>) => {
    const callback = (blob: Blob, dataUri: string) => {
      dataRef.current = blob;
      setImageSrc(dataUri);
    };
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target) return;
        if ((e.target.result?.toString().length || 0) / 1024 / 1024 < 1) {
          dataRef.current = dataURItoBlob(e.target.result as string);
          setImageSrc(e.target.result?.toString() || "");
          return;
        }
        resizeImage(e.target?.result as string, callback);
      };
      setImageName(e.target.files[0].name);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("eng", englishName);
    formData.append("kor", name);
    if (dataRef.current) formData.append("image", dataRef.current, imageName);
    try {
      const accords = await createAccord(formData);
      Swal.fire("성공", "어코드 생성에 성공하였습니다. ", "success");
      dispatch(setPerfumeDatas({ accords }));
      closeModal();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "어코드 생성에 실패하였습니다.",
      });
    }
  };
  return (
    <>
      <Title>어코드 추가</Title>

      <ModalContent>
        <input
          type="file"
          id="images"
          accept="image/*"
          ref={imagesRef}
          onChange={preViewImage}
          style={{ display: "none" }}
        />
        <ImageSection>{imageSrc !== "" && <img src={imageSrc} alt="업로드 이미지" />}</ImageSection>
        <UploadImage htmlFor="images">
          <span>{imageName === "" ? "이미지 이름" : imageName}</span>
          <section>{imageName === "" ? "이미지 업로드" : "이미지 변경"}</section>
        </UploadImage>
        <InputSection>
          <TextField
            fullWidth
            label={<InputLabel>이름(영어)</InputLabel>}
            value={englishName}
            onChange={(e) => setEnglishName(e.target.value)}
            size="small"
            variant="outlined"
          />
        </InputSection>
        <InputSection>
          <TextField
            fullWidth
            label={<InputLabel>이름(한글)</InputLabel>}
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            variant="outlined"
          />
        </InputSection>
        <Submit onClick={handleSubmit}>생성하기</Submit>
      </ModalContent>
    </>
  );
};

export default AddAccord;
const Title = styled.h2`
  margin-bottom: 20px;
`;
const UploadImage = styled.label`
  width: 100%;
  cursor: pointer;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 12px;
  span {
    padding: 12px;
  }
  section {
    padding: 12px;
    border-left: 1px solid rgba(0, 0, 0, 0.3);
  }
`;
const ModalContent = styled.section`
  width: 500px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const ImageSection = styled.section`
  width: 100%;
  height: 300px;
  background: #eee;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const InputSection = styled.div<{ isFull?: boolean }>`
  width: ${(p) => (p.isFull ? "100%" : "calc(50% - 5px)")};
  margin-bottom: 10px;
`;

const InputLabel = styled.span`
  font-size: 12px;
`;

const Submit = styled.button`
  width: 100%;
  background: ${(p) => p.theme.color.perfumery_pink};
  color: white;
  padding: 12px 0;
  border-radius: 4px;
`;
