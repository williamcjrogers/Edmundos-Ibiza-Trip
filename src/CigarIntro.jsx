import React, { useEffect, useState } from 'react';

export default function CigarIntro({ onFinish, durationMs = 6500 }) {
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
			<div className="cigar-path">
				<div className="cigar">
					<div className="cigar-band">
						<div className="cigar-band-label">EDMUNDONS</div>
					</div>
					<div className="cigar-wrapper-lines" />
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


