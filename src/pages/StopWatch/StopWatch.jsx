import { useState } from 'react';
import style from './StopWatch.module.css';
import { FaPause } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';

<FaPause />;
const StopWatch = () => {
	const [visibility, setVisibility] = useState(true);
	const changeVisibility = () => {
		setVisibility(!visibility);
	};
	return (
		<>
			<div className={style.stopwatch}>
				StopWatch
				<div className="icon-container">
					{visibility ? (
						<FaPause onClick={changeVisibility} className={style.icon} />
					) : (
						<FaPlay onClick={changeVisibility} className={style.icon} />
					)}
				</div>
			</div>
		</>
	);
};

export default StopWatch;
