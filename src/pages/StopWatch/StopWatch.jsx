import { useDispatch, useSelector } from 'react-redux';
import style from './StopWatch.module.css';
import { useState, useEffect } from 'react';
import { setTime } from '../../redux/slices/timerSlice';

const StopWatch = () => {
	const time = useSelector((state) => state.stopWatch.time);
	const [intervalId, setIntervalId] = useState(null);
	const [records, setRecords] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [intervalId]);

	const startTimer = () => {
		if (intervalId) return;

		let { hours, minutes, seconds, milliseconds } = time;
		const id = setInterval(() => {
			milliseconds += 10;

			if (milliseconds >= 1000) {
				milliseconds = 0;
				seconds += 1;
			}
			if (seconds >= 60) {
				seconds = 0;
				minutes += 1;
			}
			if (minutes >= 60) {
				minutes = 0;
				hours += 1;
			}

			dispatch(
				setTime({
					hours,
					minutes,
					seconds,
					milliseconds,
				})
			);
		}, 10);

		setIntervalId(id);
	};

	const stopTimer = () => {
		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(null);

			setRecords((prev) => [
				...prev,
				formatTime(time.hours, time.minutes, time.seconds, time.milliseconds),
			]);
		}
	};

	const resetTimer = () => {
		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(null);
		}
		dispatch(setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }));
		setRecords([]);
	};

	const formatTime = (hours, minutes, seconds, milliseconds) => {
		const pad = (unit) => (unit < 10 ? `0${unit}` : unit);
		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(
			Math.floor(milliseconds / 10)
		)}`;
	};

	return (
		<div className={style.stopwatch}>
			<div className={style.time}>
				{formatTime(time.hours, time.minutes, time.seconds, time.milliseconds)}
			</div>
			<div className={style.buttons}>
				<button className={style.button} onClick={startTimer}>
					Start
				</button>
				<button className={style.button} onClick={stopTimer}>
					Stop
				</button>
				<button className={style.button} onClick={resetTimer}>
					Reset
				</button>
			</div>
			<div className={style.records}>
				<ul>
					{records.map((record, index) => (
						<li key={index}>{record}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default StopWatch;
