import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isToggled: false,
}

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setToggle(state) {
      state.isToggled = !state.isToggled
    }
  }
})

export default layoutSlice