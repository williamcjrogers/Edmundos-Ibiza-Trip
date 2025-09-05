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
				<div className="cigar" />
				<div className="ember" />
				<div className="smoke" />
				<div className="smoke smoke2" />
				<div className="smoke smoke3" />
			</div>
		</div>
	);
}


