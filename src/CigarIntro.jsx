import React, { useEffect, useState } from 'react';

export default function CigarIntro({ onFinish, durationMs = 5000 }) {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
			onFinish?.();
		}, durationMs);
		return () => clearTimeout(timer);
	}, [durationMs, onFinish]);

	if (!visible) return null;

	return (
		<div className="cigar-intro-overlay">
			<div className="smoke-haze">
				<div className="haze layer1" />
				<div className="haze layer2" />
			</div>
			<div className="cigar-path">
				<div className="cigar">
					<div className="cigar-wrapper-lines" />
					<div className="cigar-band havana" />
					<div className="cigar-name">EDMUNDOS</div>
					<div className="cigar-ash" />
				</div>
				<div className="ember" />
				<div className="smoke" />
				<div className="smoke smoke2" />
				<div className="smoke smoke3" />
				<div className="smoke-cloud cloud1" />
				<div className="smoke-cloud cloud2" />
				<div className="smoke-cloud cloud3" />
			</div>
		</div>
	);
}


