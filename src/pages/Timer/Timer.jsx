import { useState, useEffect } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import style from './Timer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setTime } from '../../redux/slices/timerSlice';

const Timer = () => {
	const dispatch = useDispatch();
	const time = useSelector((state) => state.timer.time);
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
				if (time.seconds > 0) {
					dispatch(
						setTime({
							...time,
							seconds: time.seconds - 1,
						})
					);
				} else if (time.minutes > 0) {
					dispatch(
						setTime({
							minutes: time.minutes - 1,
							seconds: 59,
						})
					);
				} else {
					setIsRunning(false);
					alert('Timer bitti!');
					setIsEditable(true);
				}
			}, 1000);
		}
		return () => clearInterval(timerId);
	}, [isRunning, time]);

	const incrementTime = (type) => {
		if (!isEditable) return;
		dispatch(
			setTime({
				...time,
				[type]: time[type] + 1,
			})
		);
	};

	const decrementTime = (type) => {
		if (!isEditable) return;
		dispatch(
			setTime({
				...time,
				[type]: time[type] > 0 ? time[type] - 1 : 0,
			})
		);
	};

	const formatTime = (value) => (value < 10 ? `0${value}` : value);

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
