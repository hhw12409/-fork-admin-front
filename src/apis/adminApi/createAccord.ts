import AdminApi from ".";

const createAccord = async (body: FormData) => {
  try {
    const { data } = await AdminApi.post<{ accords: DTOS.Output.Accord[] }>("/accord", body);
    return data.accords;
  } catch (error) {
    throw error;
  }
};

export default createAccord;
