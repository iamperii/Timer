import { configureStore } from '@reduxjs/toolkit';
import timerReducer from '../slices/timerSlice';
import stopWatchReducer from '../slices/stopWatchSlice';
export const store = configureStore({
	reducer: {
		timer: timerReducer,
		stopWatch: stopWatchReducer,
	},
});
