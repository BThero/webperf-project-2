import classnames from 'classnames';
import s from '../ui/styles.module.css';
import {
	barrelLength,
	enemyHeight,
	enemyWidth,
	shotHeight,
	shotVelocity,
	shotWidth,
} from './constants';
import { getBarrelPosition } from './utils';
import { Enemy, EnemySpawn, Entity, GameState } from './types';

/**
 * Update position of an entity.
 */
export function updatePosition(el: HTMLElement, x: number, y: number) {
	el.style.transform = `translate(${x}px, ${y}px)`;
}

export function getBoundingRect(entity: Entity) {
	if (entity.type === 'enemy') {
		return {
			left: entity.x,
			right: entity.x + enemyWidth,
			top: entity.y,
			bottom: entity.y + enemyHeight,
		};
	} else {
		return {
			left: entity.x,
			right: entity.x + shotWidth,
			top: entity.y,
			bottom: entity.y + shotHeight,
		};
	}
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
 * Revive a "dead" entity as a new 'Enemy'
 */
export function reviveAsEnemy(
	item: Entity,
	enemySpawn: EnemySpawn,
	spawnTime: number
): Entity {
	const {
		position: { x, y },
		style,
	} = enemySpawn;

	const el = item.el;

	el.className = classnames(s.entity, s.entityEnemy, s[`entityEnemy${style}`]);
	el.style.opacity = '1';
	updatePosition(el, x, y);

	return {
		type: 'enemy',
		spawnTime,
		enemySpawn,
		x,
		y,
		el,
		dead: false,
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
 * Revive a "dead" entity as a new 'Shot'
 */
export function reviveAsShot(item: Entity, barrelAngle: number): Entity {
	let { x, y } = getBarrelPosition();
	x += barrelLength * Math.cos(barrelAngle);
	y += barrelLength * Math.sin(barrelAngle);
	const velocity = {
		x: window.innerHeight * shotVelocity * Math.cos(barrelAngle),
		y: window.innerHeight * shotVelocity * Math.sin(barrelAngle),
	};

	const el = item.el;
	el.className = classnames(s.entity, s.entityShot);
	el.style.opacity = '1';
	updatePosition(el, x, y);

	return {
		type: 'shot',
		velocity,
		el,
		x,
		y,
		dead: false,
	};
}

/**
 * Calculate score from shooting an enemy.
 */
export function scoreFromEnemy(enemy: Enemy) {
	return 50;
}
