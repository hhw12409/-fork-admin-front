import AdminApi from ".";

const createPerfume = async (body: FormData) => {
  try {
    const { data } = await AdminApi.post<{ perfumes: DTOS.Output.NoteCategory[] }>("/perfume", body);
    return data.perfumes;
  } catch (error) {
    throw error;
  }
};

export default createPerfume;
