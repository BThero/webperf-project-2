import s from './Hero.module.css';
import { Link } from 'react-router-dom';

export const Hero = () => {
	return (
		<section className={s.container}>
			<img className={s.image} src="bg.jpg" alt="" width="5238" height="3622" />
			<div className={s.center}>
				<h1 className={s.title}>Star fighter</h1>
				<Link className={s.button} to="/game">
					Start
				</Link>
			</div>
		</section>
	);
};

export default Hero;
