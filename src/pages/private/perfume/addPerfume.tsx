import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import DropDown, { DropList } from "@/components/dropdown";
import TagsComponent from "@/components/tags";
import getAllNotes from "Apis/adminApi/getAllnotes";

const density: DropList[] = [
  {
    id: 0,
    label: "edp",
    value: "edp",
  },
  {
    id: 1,
    label: "edt",
    value: "edt",
  },
  {
    id: 2,
    label: "cologne",
    value: "cologne",
  },
];
const AddPerfume: React.FC = () => {
  const [perfumeDensity, setDensity] = useState<DropList | null>(null);
  const [notes, setNotes] = useState<DropList[]>([]);
  const [noteList, setNoteList] = useState<
    {
      id: number;
      note_category_id: number;
      eng: string;
      kor: string;
      image: string;
      illustration: string;
    }[]
  >([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const noteResponse = await getAllNotes();

        setNoteList(noteResponse.data.note);
        console.log();
      } catch (e) {}
    };
    // getData();
  }, []);

  const handleNoteChange = (value: string | number) => {
    if (notes.findIndex((el) => el.id === value)) {
      alert("중복입니다.");
      return;
    }
    const seletedNote = noteList.find((el) => el.id === value);
    if (!seletedNote) {
      alert("잘못된 노트입니다.");
      return;
    }
    setNotes((prev) => {
      return [
        ...prev,
        {
          id: seletedNote.id,
          label: seletedNote.kor,
          value: seletedNote.eng,
        },
      ];
    });
  };
  const removeNote = (idx: number) => {
    setNotes((prev) => prev.filter((el) => el.id !== idx));
  };
  return (
    <Content>
      <Header>
        <h2>향수 추가</h2>
      </Header>
      <FormSection>
        <InputSection>
          <TextField fullWidth label={<InputLabel>이름(한글)</InputLabel>} size="small" variant="outlined" />
        </InputSection>
        <InputSection>
          <TextField fullWidth label={<InputLabel>이름(영어)</InputLabel>} size="small" variant="outlined" />
        </InputSection>
        <InputSection>
          <TextField fullWidth label={<InputLabel>용량(ml) 숫자만</InputLabel>} size="small" variant="outlined" />
        </InputSection>
        <InputSection>
          <TextField fullWidth label={<InputLabel>가격(₩) 숫자만</InputLabel>} size="small" variant="outlined" />
        </InputSection>
        <InputSection>
          <TextField fullWidth label={<InputLabel>브랜드</InputLabel>} size="small" variant="outlined" />
        </InputSection>
      </FormSection>
      <FormSection>
        <InputSection>
          <DropDown
            label="농도"
            onChange={(value) => setDensity(density.find((el) => el.id === value) || null)}
            list={density}
            value={perfumeDensity}
          />
        </InputSection>
        <InputSection>
          <TagsComponent
            label="노트"
            list={noteList.map((el) => ({
              id: el.id,
              label: el.kor,
              value: el.eng,
            }))}
            onDropChange={handleNoteChange}
            removeValue={removeNote}
            values={notes}
          />
        </InputSection>
      </FormSection>
    </Content>
  );
};

export default AddPerfume;

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
