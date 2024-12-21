import { Link } from 'react-router';
import style from './Header.module.css';

const Header = () => {
	return (
		<>
			<div className={style.header}>
				<Link to="/clock" className={style.item}>
					Clock
				</Link>
				<Link to="/stopwatch" className={style.item}>
					StopWatch
				</Link>
				<Link to="/timer" className={style.item}>
					Timer
				</Link>
			</div>
		</>
	);
};

export default Header;
