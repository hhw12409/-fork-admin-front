import AdminApi from ".";
const createBrand = async (body: FormData) => {
  try {
    const { data } = await AdminApi.post<{ brands: DTOS.Output.Brand[] }>("/brand", body);
    return data.brands;
  } catch (error) {
    throw error;
  }
};

export default createBrand;
