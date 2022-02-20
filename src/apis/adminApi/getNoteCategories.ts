import AdminApi from ".";
const getAllNoteCategories = async () => {
  return AdminApi.get<{ note_categories: DTOS.Output.NoteCategory[] }>("/note/category");
};

export default getAllNoteCategories;
