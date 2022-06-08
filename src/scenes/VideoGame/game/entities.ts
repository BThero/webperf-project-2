import classnames from 'classnames';
import s from '../ui/styles.module.css';
import { barrelLength, shotVelocity } from './constants';
import { getBarrelPosition } from './utils';
import { Enemy, EnemySpawn, Entity } from './types';

/**
 * Update position of an entity.
 */
export function updatePosition(el: HTMLElement, x: number, y: number) {
	el.style.transform = `translate(${x}px, ${y}px)`;
}

/**
 * Create an enemy element and metadata.
 */
export function createEnemy(enemySpawn: EnemySpawn, spawnTime: number): Entity {
	const {
		position: { x, y },
		style,
	} = enemySpawn;

	const el = document.createElement('div');
	el.className = classnames(s.entity, s.entityEnemy, s[`entityEnemy${style}`]);
	updatePosition(el, x, y);

	return {
		type: 'enemy',
		el,
		spawnTime,
		enemySpawn,
		x,
		y,
	};
}

/**
 * Create a shot element and metadata.
 */
export function createShot(barrelAngle: number): Entity {
	let { x, y } = getBarrelPosition();
	x += barrelLength * Math.cos(barrelAngle);
	y += barrelLength * Math.sin(barrelAngle);
	const velocity = {
		x: window.innerHeight * shotVelocity * Math.cos(barrelAngle),
		y: window.innerHeight * shotVelocity * Math.sin(barrelAngle),
	};
	const el = document.createElement('div');
	el.className = classnames(s.entity, s.entityShot);

	updatePosition(el, x, y);

	return {
		type: 'shot',
		velocity,
		el,
		x,
		y,
	};
}

/**
 * Calculate score from shooting an enemy.
 */
export function scoreFromEnemy(enemy: Enemy) {
	return 50;
}
