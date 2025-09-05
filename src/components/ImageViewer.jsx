import React, { useRef, useState } from 'react';

export default function ImageViewer({ src, alt }) {
	const containerRef = useRef(null);
	const imgRef = useRef(null);
	const [scale, setScale] = useState(1);
	const [translate, setTranslate] = useState({ x: 0, y: 0 });
	const [isPanning, setIsPanning] = useState(false);
	const panStart = useRef({ x: 0, y: 0 });
	const lastTranslate = useRef({ x: 0, y: 0 });
	const lastTouchDistance = useRef(null);
	const lastScale = useRef(1);
	const lastTap = useRef(0);

	function onWheel(e) {
		e.preventDefault();
		const delta = -e.deltaY;
		const factor = delta > 0 ? 1.1 : 0.9;
		const newScale = Math.min(5, Math.max(1, scale * factor));
		setScale(newScale);
	}

	function onMouseDown(e) {
		setIsPanning(true);
		panStart.current = { x: e.clientX, y: e.clientY };
		lastTranslate.current = { ...translate };
	}

	function onMouseMove(e) {
		if (!isPanning) return;
		const dx = e.clientX - panStart.current.x;
		const dy = e.clientY - panStart.current.y;
		setTranslate({ x: lastTranslate.current.x + dx, y: lastTranslate.current.y + dy });
	}

	function onMouseUp() {
		setIsPanning(false);
	}

	function getTouchDistance(touches) {
		if (touches.length < 2) return null;
		const [a, b] = [touches[0], touches[1]];
		const dx = b.clientX - a.clientX;
		const dy = b.clientY - a.clientY;
		return Math.hypot(dx, dy);
	}

	function onTouchStart(e) {
		if (e.touches.length === 1) {
			setIsPanning(true);
			panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
			lastTranslate.current = { ...translate };
			// double-tap
			const now = Date.now();
			if (now - lastTap.current < 300) {
				const toggled = scale > 1 ? 1 : 2.2;
				setScale(toggled);
			}
			lastTap.current = now;
		} else if (e.touches.length === 2) {
			lastTouchDistance.current = getTouchDistance(e.touches);
			lastScale.current = scale;
		}
	}

	function onTouchMove(e) {
		if (e.touches.length === 2) {
			e.preventDefault();
			const dist = getTouchDistance(e.touches);
			if (dist && lastTouchDistance.current) {
				const factor = dist / lastTouchDistance.current;
				const newScale = Math.min(5, Math.max(1, lastScale.current * factor));
				setScale(newScale);
			}
			return;
		}
		if (!isPanning || e.touches.length !== 1) return;
		const dx = e.touches[0].clientX - panStart.current.x;
		const dy = e.touches[0].clientY - panStart.current.y;
		setTranslate({ x: lastTranslate.current.x + dx, y: lastTranslate.current.y + dy });
	}

	function onTouchEnd() {
		setIsPanning(false);
		lastTouchDistance.current = null;
	}

	const containerStyle = {
		width: '100%',
		height: '100%',
		position: 'relative',
		overflow: 'hidden',
		background: 'transparent',
		touchAction: 'none'
	};

	const imgStyle = {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: `translate(-50%, -50%) translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
		maxWidth: '100%',
		maxHeight: '100%'
	};

	return (
		<div
			ref={containerRef}
			style={containerStyle}
			onWheel={onWheel}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseUp}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
		>
			<img ref={imgRef} src={src} alt={alt} style={imgStyle} />
		</div>
	);
}


