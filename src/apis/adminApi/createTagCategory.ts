import AdminApi from ".";

interface Body {
  name: string;
}

const createTagCategory = async (body: Body) => {
  try {
    const { data } = await AdminApi.post<{ tag_categories: DTOS.Output.TagCategory[] }>("/tag/category", body);
    return data.tag_categories;
  } catch (error) {
    throw error;
  }
};

export default createTagCategory;
