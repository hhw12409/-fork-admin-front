import AdminApi from ".";
const getAllBrands = async () => {
  const { data } = await AdminApi.get<{ brands: DTOS.Output.Brand[] }>("/brand");
  return data;
};

export default getAllBrands;
