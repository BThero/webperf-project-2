import './styles.css';
import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('./scenes/HomePage'));
const VideoGame = lazy(() => import('./scenes/VideoGame'));

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/game" element={<VideoGame />} />
		</Routes>
	);
}
