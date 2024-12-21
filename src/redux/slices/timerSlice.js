import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	time: {
		minutes: 0,
		seconds: 0,
	},
};

const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		increment: (state) => {
			state.time += 1;
		},
		decrement: (state) => {
			state.time -= 1;
		},
		setTime: (state, action) => {
			state.time = action.payload;
		},
	},
});

export const { increment, decrement, setTime } = timerSlice.actions;
export default timerSlice.reducer;
