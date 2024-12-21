import { useState, useEffect } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import style from './Timer.module.css';

const Timer = () => {
	const [time, setTime] = useState({ minutes: 0, seconds: 0 });
	const [isRunning, setIsRunning] = useState(false);
	const [isEditable, setIsEditable] = useState(true);

	const toggleTimer = () => {
		setIsRunning(!isRunning);
		if (!isRunning) setIsEditable(false);
	};

	useEffect(() => {
		let timerId;
		if (isRunning) {
			timerId = setInterval(() => {
				setTime((prevTime) => {
					const totalSeconds = prevTime.minutes * 60 + prevTime.seconds;
					if (totalSeconds <= 0) {
						clearInterval(timerId);
						setIsRunning(false);
						setIsEditable(true);
						alert('Timer bitdi!');
						return { minutes: 0, seconds: 0 };
					}

					const newSeconds = (totalSeconds - 1) % 60;
					const newMinutes = Math.floor((totalSeconds - 1) / 60);
					return { minutes: newMinutes, seconds: newSeconds };
				});
			}, 1000);
		}
		return () => clearInterval(timerId);
	}, [isRunning]);

	const incrementTime = (time) => {
		if (!isEditable) return;
		setTime((prevTime) => ({
			...prevTime,
			[time]: prevTime[time] + 1,
		}));
	};

	const decrementTime = (time) => {
		if (!isEditable) return;
		setTime((prevTime) => ({
			...prevTime,
			[time]: Math.max(0, prevTime[time] - 1),
		}));
	};

	const formatTime = (time) => (time < 10 ? `0${time}` : time);

	return (
		<div className={style.timer}>
			<div className={style.time}>
				<span onClick={() => incrementTime('minutes')}>
					{formatTime(time.minutes)}
				</span>
				:
				<span onClick={() => incrementTime('seconds')}>
					{formatTime(time.seconds)}
				</span>
			</div>

			{isEditable && (
				<div className={style.editButtons}>
					<button
						onClick={() => incrementTime('minutes')}
						className={style.editButton}
					>
						+ Min
					</button>
					<button
						onClick={() => incrementTime('seconds')}
						className={style.editButton}
					>
						+ Sec
					</button>
					<button
						onClick={() => decrementTime('minutes')}
						className={style.editButton}
					>
						- Min
					</button>
					<button
						onClick={() => decrementTime('seconds')}
						className={style.editButton}
					>
						- Sec
					</button>
				</div>
			)}

			<div className={style.control}>
				{isRunning ? (
					<FaPause onClick={toggleTimer} className={style.icon} />
				) : (
					<FaPlay onClick={toggleTimer} className={style.icon} />
				)}
			</div>
		</div>
	);
};

export default Timer;
