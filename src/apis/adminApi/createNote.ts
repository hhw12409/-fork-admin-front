import AdminApi from ".";

const createNote = async (body: FormData) => {
  try {
    const { data } = await AdminApi.post<{ notes: DTOS.Output.NoteCategory[] }>("/note", body);
    return data.notes;
  } catch (error) {
    throw error;
  }
};

export default createNote;
