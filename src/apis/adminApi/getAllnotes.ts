import AdminApi from ".";
const getAllNotes = async () => {
  return AdminApi.get<{ note: DTOS.Output.Note[] }>("/note");
};

export default getAllNotes;
