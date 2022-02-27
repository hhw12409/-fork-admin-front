import AdminApi from ".";

interface PerfumeData {
  brands: DTOS.Output.Brand[];
  densities: DTOS.Output.Density[];
  accords: DTOS.Output.Accord[];
  notes: DTOS.Output.Note[];
  tags: DTOS.Output.Tag[];
}

const getPerfumeDatas = async () => {
  try {
    const { data: perfumeData } = await AdminApi.get<PerfumeData>("/perfume/information");
    const { data: noteCategoryData } = await AdminApi.get<{ note_categories: DTOS.Output.NoteCategory[] }>(
      "/note/category",
    );
    const { data: tagCategoryData } = await AdminApi.get<{ tag_categories: DTOS.Output.NoteCategory[] }>(
      "/tag/category",
    );
    return {
      ...perfumeData,
      noteCategories: noteCategoryData.note_categories,
      tagcategories: tagCategoryData.tag_categories,
    };
  } catch (error) {
    throw error;
  }
};

export default getPerfumeDatas;
