import { useState, useEffect } from 'react';
import style from './Clock.module.css';
const Clock = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const hours = time.getHours();
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();

	return (
		<>
			<div className={style.clock}>
				<div className={style.box}>{hours < 10 ? `0${hours}` : hours}</div>
				<div className={style.box}>:</div>
				<div className={style.box}>
					{minutes < 10 ? `0${minutes}` : minutes}
				</div>
				<div className={style.box}>:</div>
				<div className={style.box}>
					{seconds < 10 ? `0${seconds}` : seconds}
				</div>
			</div>
		</>
	);
};

export default Clock;
