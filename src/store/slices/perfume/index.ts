import { createSlice } from "@reduxjs/toolkit";

interface PerfumeState {
  brands: DTOS.Output.Brand[];
  notes: DTOS.Output.Note[];
  noteCategories: DTOS.Output.NoteCategory[];
  densities: DTOS.Output.Density[];
  accords: DTOS.Output.Accord[];
  tags: DTOS.Output.Tag[];
  tagCategories: DTOS.Output.TagCategory[];
}

const initialState: PerfumeState = {
  brands: [],
  noteCategories: [],
  notes: [],
  densities: [],
  accords: [],
  tags: [],
  tagCategories: [],
};
const perfumeSlice = createSlice({
  name: "perfume",
  initialState,
  reducers: {
    setBrands(state, action) {
      state.brands = [...action.payload.brands];
    },
    setNoteCategory(state, action) {
      state.noteCategories = [...action.payload.noteCategories];
    },
    setNote(state, action) {
      state.notes = [...action.payload.notes];
    },
    setPerfumeDatas(state, action) {
      if (action.payload.brands) state.brands = [...action.payload.brands];
      if (action.payload.notes) state.notes = [...action.payload.notes];
      if (action.payload.noteCategories) state.noteCategories = [...action.payload.noteCategories];
      if (action.payload.densities) state.densities = [...action.payload.densities];
      if (action.payload.accords) state.accords = [...action.payload.accords];
      if (action.payload.tags) state.tags = [...action.payload.tags];
      if (action.payload.tagCategories) state.tagCategories = [...action.payload.tagCategories];
    },
  },
  extraReducers: (builder) => {},
});

export const { setBrands, setPerfumeDatas, setNote, setNoteCategory } = perfumeSlice.actions;
export default perfumeSlice;
