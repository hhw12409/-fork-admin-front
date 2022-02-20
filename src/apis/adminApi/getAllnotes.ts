import AdminApi from ".";

interface Note {
  id: number;
  note_category_id: number;
  eng: string;
  kor: string;
  image: string;
  illustration: string;
}
const getAllNotes = async () => {
  return AdminApi.get<{ note: Note[] }>("/note");
};

export default getAllNotes;
