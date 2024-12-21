import style from './StopWatch.module.css';
import { useState } from 'react';

const StopWatch = () => {
	const [time, setTime] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
		milliseconds: 0,
	});
	const [intervalId, setIntervalId] = useState(null);
	const [records, setRecords] = useState([]);

	const startTimer = () => {
		if (intervalId) return;
		const id = setInterval(() => {
			setTime((prevTime) => {
				let { hours, minutes, seconds, milliseconds } = prevTime;
				milliseconds += 10;
				if (milliseconds === 1000) {
					seconds++;
					milliseconds = 0;
				}
				if (seconds === 60) {
					minutes++;
					seconds = 0;
				}
				if (minutes === 60) {
					hours++;
					minutes = 0;
				}
				return { hours, minutes, seconds, milliseconds };
			});
		}, 10);
		setIntervalId(id);
	};

	const stopTimer = () => {
		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(null);

			setRecords((prev) => [
				...prev,
				`${formatTime(time.hours)}:${formatTime(time.minutes)}:${formatTime(
					time.seconds
				)}.${formatTime(Math.floor(time.milliseconds / 10))}`,
			]);
		}
	};

	const resetTimer = () => {
		stopTimer();
		setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
		setRecords([]);
	};

	const formatTime = (timeUnit) => (timeUnit < 10 ? `0${timeUnit}` : timeUnit);

	return (
		<div className={style.stopwatch}>
			<div className={style.time}>
				{formatTime(time.hours)}:{formatTime(time.minutes)}:
				{formatTime(time.seconds)}.
				{formatTime(Math.floor(time.milliseconds / 10))}
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
