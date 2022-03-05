import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import DropDown, { DropList } from "Components/dropdown";
import TagsComponent from "Components/tags";
import useModal from "Shared/hooks/useModal";
import AddNoteModal from "Components/modal/inner/addNote";
import AddBrand from "Components/modal/inner/addBrand";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducer";
import { setPerfumeDatas } from "@/store/slices/perfume";
import getPerfumeDatas from "Apis/adminApi/getPerfumeDatas";
import AddTagModal from "Components/modal/inner/addTag";
import resizeImage, { dataURItoBlob } from "Shared/resizeImage";
import Swal from "sweetalert2";
import AddAccord from "Components/modal/inner/addAccord";
import createPerfume from "Apis/adminApi/createPerfume";
import { useNavigate } from "react-router-dom";

const AddPerfume: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [brand, setBrand] = useState<DropList | null>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const dataRef = useRef<Blob | null>(null);
  const [perfume, setPerfume] = useState({
    name: "",
    englishName: "",
    volume: "",
    price: "",
  });
  const [imageName, setImageName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [selectedDensity, setSelectedDensity] = useState<DropList | null>(null);
  const [selectedTags, setSelectedTags] = useState<DropList[]>([]);
  const [selectedAccords, setSelectedAccords] = useState<DropList[]>([]);
  const [isSingleNote, setIsSingleNote] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<{
    top: DropList[];
    middle: DropList[];
    base: DropList[];
    single: DropList[];
  }>({
    top: [],
    middle: [],
    base: [],
    single: [],
  });
  const { isOpen, controlOpenModal, Modal } = useModal();
  const [modalType, setModalType] = useState({
    brand: false,
    note: false,
    tag: false,
    accord: false,
  });
  const { brands, notes, densities, tags, accords } = useSelector((state: RootState) => state.perfume);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getPerfumeDatas();
        dispatch(setPerfumeDatas({ ...data }));
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [dispatch]);

  const handleNoteChange = (value: string | number, type: keyof typeof selectedNotes) => {
    if (selectedNotes[type].findIndex((el) => el.id === value) > -1) {
      alert("중복입니다.");
      return;
    }
    const seletedNote = notes.find((el) => el.id === value);
    if (!seletedNote) {
      alert("잘못된 노트입니다.");
      return;
    }
    setSelectedNotes((prev) => {
      const newNote = [
        ...prev[type],
        {
          id: seletedNote.id,
          value: seletedNote.eng,
          label: seletedNote.kor,
        },
      ];

      return { ...prev, [type]: newNote };
    });
  };
  const removeNote = (id: number | string, type: keyof typeof selectedNotes) => {
    setSelectedNotes((prev) => {
      const newNote = prev[type].filter((el) => el.id !== id);
      return { ...prev, [type]: newNote };
    });
  };
  const handleTagChange = (id: string | number) => {
    if (selectedTags.findIndex((el) => el.id === id) > -1) {
      alert("중복입니다.");
      return;
    }
    const selectedTag = tags.find((el) => el.id === id);
    if (!selectedTag) {
      alert("잘못된 노트입니다.");
      return;
    }
    setSelectedTags([
      ...selectedTags,
      {
        id: selectedTag.id,
        label: selectedTag.name,
        value: selectedTag.name,
      },
    ]);
  };
  const removeTags = (id: number | string) => {
    setSelectedTags(selectedTags.filter((el) => el.id !== id));
  };
  const handleAccordChange = (id: string | number) => {
    if (selectedAccords.findIndex((el) => el.id === id) > -1) {
      alert("중복입니다.");
      return;
    }
    const selectedAccord = accords.find((el) => el.id === id);
    if (!selectedAccord) {
      alert("잘못된 노트입니다.");
      return;
    }
    setSelectedAccords([
      ...selectedAccords,
      {
        id: selectedAccord.id,
        label: selectedAccord.kor,
        value: selectedAccord.eng,
      },
    ]);
  };
  const removeAccord = (id: number | string) => {
    setSelectedAccords(selectedAccords.filter((el) => el.id !== id));
  };
  const openNoteModal = () => {
    controlOpenModal(true);
    setModalType({
      brand: false,
      accord: false,
      note: true,
      tag: false,
    });
  };
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
        resizeImage(e.target.result as string, callback);
      };
      setImageName(e.target.files[0].name);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const addPerfume = async () => {
    if (!brand) {
      Swal.fire("에러", "브랜드는 필수항목입니다.", "error");
      return;
    }
    if (!selectedDensity) {
      Swal.fire("에러", "농도는 필수항목입니다.", "error");
      return;
    }
    if (isSingleNote && selectedNotes.single.length === 0) {
      Swal.fire("에러", "싱글노트 체크시 싱글 노트는 필수항목입니다.", "error");
      return;
    }
    if (
      !isSingleNote &&
      (selectedNotes.top.length === 0 || selectedNotes.middle.length === 0 || selectedNotes.base.length === 0)
    ) {
      Swal.fire("에러", "노트는 필수항목입니다.", "error");
      return;
    }
    const formData = new FormData();
    formData.append("kor", perfume.name);
    formData.append("eng", perfume.englishName);
    formData.append("capacity", perfume.volume);
    formData.append("price", perfume.price);
    formData.append("brand_id", String(brand?.id));
    formData.append("density_id", String(selectedDensity?.id));
    formData.append("accord_list", selectedAccords.map((el) => el.id).join());
    formData.append("is_single", isSingleNote ? "true" : "false");
    if (dataRef.current) formData.append("image", dataRef.current);
    if (isSingleNote) {
      formData.append("single_note_list", selectedNotes.single.map((el) => el.id).join());
    } else {
      formData.append("top_note_list", selectedNotes.top.map((el) => el.id).join());
      formData.append("middle_note_list", selectedNotes.middle.map((el) => el.id).join());
      formData.append("base_note_list", selectedNotes.base.map((el) => el.id).join());
    }
    formData.append("tag_list", selectedTags.map((el) => el.id).join());
    try {
      await createPerfume(formData);
      Swal.fire("성공!", "향수를 성공적으로 추가하였습니다.", "success");
      navigate("/perfume");
    } catch (error) {
      console.log(error);
      Swal.fire("에러", "향수를 추가를 실패하였습니다.", "error");
    }
  };
  const closeModal = () => {
    controlOpenModal(false);
    setModalType({
      brand: false,
      accord: false,
      note: false,
      tag: false,
    });
  };
  console.log(tags);
  return (
    <Content>
      <Header>
        <h2>향수 추가</h2>
      </Header>
      <FormSection>
        <input
          type="file"
          id="perfume_image"
          accept="image/*"
          ref={imagesRef}
          onChange={preViewImage}
          style={{ display: "none" }}
        />
        <ImageSection>{imageSrc !== "" && <img src={imageSrc} alt="업로드 이미지" />}</ImageSection>
        <UploadImage htmlFor="perfume_image">
          <span>{imageName === "" ? "이미지 이름" : imageName}</span>
          <section>{imageName === "" ? "이미지 업로드" : "이미지 변경"}</section>
        </UploadImage>
        <InputSection>
          <TextField
            fullWidth
            label={<InputLabel>이름(한글)</InputLabel>}
            value={perfume.name}
            onChange={(e) => setPerfume((prev) => ({ ...prev, name: e.target.value }))}
            size="small"
            variant="outlined"
          />
        </InputSection>
        <InputSection>
          <TextField
            fullWidth
            label={<InputLabel>이름(영어)</InputLabel>}
            value={perfume.englishName}
            onChange={(e) => setPerfume((prev) => ({ ...prev, englishName: e.target.value }))}
            size="small"
            variant="outlined"
          />
        </InputSection>
        <InputSection>
          <TextField
            fullWidth
            label={<InputLabel>용량(ml) 숫자만</InputLabel>}
            value={perfume.volume}
            onChange={(e) => setPerfume((prev) => ({ ...prev, volume: e.target.value }))}
            size="small"
            variant="outlined"
          />
        </InputSection>
        <InputSection>
          <TextField
            fullWidth
            label={<InputLabel>가격(₩) 숫자만</InputLabel>}
            value={perfume.price}
            onChange={(e) => setPerfume((prev) => ({ ...prev, price: e.target.value }))}
            size="small"
            variant="outlined"
          />
        </InputSection>
        <InputSection isFull style={{ marginTop: "12px" }}>
          <TextField
            fullWidth
            label={<InputLabel>설명 타이틀</InputLabel>}
            value={"not Yet!"}
            // onChange={(e) => setPerfume((prev) => ({ ...prev, price: e.target.value }))}
            size="small"
            variant="outlined"
          />
        </InputSection>
        <InputSection isFull>
          <TextField
            fullWidth
            label={<InputLabel>설명</InputLabel>}
            value={"not Yet!"}
            multiline
            rows={4}
            // onChange={(e) => setPerfume((prev) => ({ ...prev, price: e.target.value }))}
            size="small"
            variant="outlined"
          />
        </InputSection>
        <InputSection>
          <DropDown
            label="브랜드"
            onChange={(value) =>
              setBrand(() => {
                const brand = brands.find((el) => el.id === value);
                if (brand)
                  return {
                    id: brand.id,
                    label: brand.kor,
                    value: brand.eng,
                  };
                return null;
              })
            }
            list={brands.map((el) => ({ id: el.id, label: el.kor, value: el.eng }))}
            value={brand}
            handleAddBtn={() => {
              controlOpenModal(true);
              setModalType({
                brand: true,
                accord: false,
                note: false,
                tag: false,
              });
            }}
            isAddBtn
          />
        </InputSection>
        <InputSection>
          <DropDown
            label="농도"
            onChange={(value) =>
              setSelectedDensity(() => {
                const density = densities.find((el) => el.id === value);
                console.log(density);
                if (!density) return null;
                return {
                  id: density.id,
                  label: density.name,
                  value: density.name,
                };
              })
            }
            list={densities.map((el) => ({ id: el.id, value: el.name, label: el.name }))}
            value={selectedDensity}
          />
        </InputSection>
        <InputSection isFull>
          <TagsComponent
            label="태그"
            list={tags.map((el) => ({
              id: el.id,
              label: el.name,
              value: el.name,
            }))}
            onDropChange={handleTagChange}
            removeValue={removeTags}
            values={selectedTags}
            handleAddBtn={() => {
              controlOpenModal(true);
              setModalType({
                brand: false,
                accord: false,
                note: false,
                tag: true,
              });
            }}
            isAddBtn
          />
        </InputSection>
        <InputSection isFull>
          <TagsComponent
            label="어코드"
            list={accords.map((el) => ({
              id: el.id,
              label: el.kor,
              value: el.eng,
            }))}
            onDropChange={handleAccordChange}
            removeValue={removeAccord}
            values={selectedAccords}
            handleAddBtn={() => {
              controlOpenModal(true);
              setModalType({
                brand: false,
                accord: true,
                note: false,
                tag: false,
              });
            }}
            isAddBtn
          />
        </InputSection>
      </FormSection>
      <FormSection>
        <Title>
          <h3>노트</h3>
          <div>
            <label>싱글노트</label>
            <input type="checkbox" checked={isSingleNote} onChange={() => setIsSingleNote((prev) => !prev)} />
          </div>
        </Title>
        {!isSingleNote && (
          <>
            <InputSection isFull>
              <TagsComponent
                label="탑노트"
                list={notes.map((el) => ({
                  id: el.id,
                  label: el.kor,
                  value: el.eng,
                }))}
                onDropChange={(value) => handleNoteChange(value, "top")}
                removeValue={(value) => removeNote(value, "top")}
                values={selectedNotes.top}
                handleAddBtn={openNoteModal}
                isAddBtn
              />
            </InputSection>
            <InputSection isFull>
              <TagsComponent
                label="미들노트"
                list={notes.map((el) => ({
                  id: el.id,
                  label: el.kor,
                  value: el.eng,
                }))}
                onDropChange={(value) => handleNoteChange(value, "middle")}
                removeValue={(value) => removeNote(value, "middle")}
                values={selectedNotes.middle}
                handleAddBtn={openNoteModal}
                isAddBtn
              />
            </InputSection>
            <InputSection isFull>
              <TagsComponent
                label="베이스노트"
                list={notes.map((el) => ({
                  id: el.id,
                  label: el.kor,
                  value: el.eng,
                }))}
                onDropChange={(value) => handleNoteChange(value, "base")}
                removeValue={(value) => removeNote(value, "base")}
                values={selectedNotes.base}
                handleAddBtn={openNoteModal}
                isAddBtn
              />
            </InputSection>
          </>
        )}
        {isSingleNote && (
          <InputSection isFull>
            <TagsComponent
              label="싱글노트"
              list={notes.map((el) => ({
                id: el.id,
                label: el.kor,
                value: el.eng,
              }))}
              onDropChange={(value) => handleNoteChange(value, "single")}
              removeValue={(value) => removeNote(value, "single")}
              values={selectedNotes.single}
              handleAddBtn={openNoteModal}
              isAddBtn
            />
          </InputSection>
        )}
        <Submit onClick={addPerfume}>향수 생성하기</Submit>
      </FormSection>
      {isOpen && (
        <Modal>
          {modalType.note && <AddNoteModal closeModal={closeModal} />}
          {modalType.brand && <AddBrand closeModal={closeModal} />}
          {modalType.tag && <AddTagModal closeModal={closeModal} />}
          {modalType.accord && <AddAccord closeModal={closeModal} />}
        </Modal>
      )}
    </Content>
  );
};

export default AddPerfume;

const Content = styled.main`
  padding: 40px;
  height: calc(100vh - 70px);
  overflow: scroll;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .add-perfume {
    padding: 12px 8px;
    background: ${(p) => p.theme.color.perfumery_pink};
    color: white;
    border-radius: 3px;
  }
`;

const FormSection = styled.section`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const InputLabel = styled.span`
  font-size: 12px;
`;
const InputSection = styled.div<{ isFull?: boolean }>`
  width: ${(p) => (p.isFull ? "100%" : "calc(50% - 5px)")};
  margin-bottom: 10px;
`;
const Title = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px 0;
  h3 {
    font-size: 1.2em;
  }
  input[type="checkbox"] {
    margin-left: 8px;
  }
`;

const Submit = styled.button`
  width: 100%;
  background: ${(p) => p.theme.color.perfumery_pink};
  color: white;
  padding: 12px 0;
  border-radius: 4px;
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

const UploadImage = styled.label`
  width: 100%;
  cursor: pointer;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 20px;
  span {
    padding: 12px;
  }
  section {
    padding: 12px;
    border-left: 1px solid rgba(0, 0, 0, 0.3);
  }
`;
