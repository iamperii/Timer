import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/Header';
import Clock from './pages/Clock/Clock';
import StopWatch from './pages/StopWatch/StopWatch';
import Timer from './pages/Timer/Timer';

function App() {
	return (
		<>
				<Header />
				<Routes>
					<Route path="/clock" element={<Clock />} />
					<Route path="/stopwatch" element={<StopWatch />} />
					<Route path="/timer" element={<Timer />} />
				</Routes>
		</>
	);
}

export default App;
