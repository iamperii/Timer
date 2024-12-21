import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	time: {
		hours: 0,
		minutes: 0,
		seconds: 0,
		milliseconds: 0,
	},
};

const stopWatchSlice = createSlice({
	name: 'stopWatch',
	initialState,
	reducers: {
		setTime: (state, action) => {
			state.time = action.payload;
		},
	},
});

export const { setTime } = stopWatchSlice.actions;
export default stopWatchSlice.reducer;
