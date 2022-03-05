import AdminApi from ".";

const getAllPerfumesData = async () => {
  try {
    const { data } = await AdminApi.get<{ perfumes: DTOS.Output.Perfume[] }>("/perfume");

    return data.perfumes;
  } catch (error) {
    throw error;
  }
};

export default getAllPerfumesData;
