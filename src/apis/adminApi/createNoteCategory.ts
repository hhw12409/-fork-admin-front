import AdminApi from ".";

interface Body {
  name: string;
}

const createNoteCategory = async (body: Body) => {
  try {
    const { data } = await AdminApi.post<{ note_categories: DTOS.Output.NoteCategory[] }>("/note/category", body);
    return data.note_categories;
  } catch (error) {
    throw error;
  }
};

export default createNoteCategory;
