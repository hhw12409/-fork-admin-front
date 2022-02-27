import AdminApi from ".";

interface Body {
  name: string;
  tag_category_id: number | string;
}

const createTag = async (body: Body) => {
  try {
    const { data } = await AdminApi.post<{ notes: DTOS.Output.NoteCategory[] }>("/tag", body);
    return data.notes;
  } catch (error) {
    throw error;
  }
};

export default createTag;
