import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfViewer({ src }) {
	const canvasRef = useRef(null);
	const [pdf, setPdf] = useState(null);
	const [pageNum, setPageNum] = useState(1);
	const [numPages, setNumPages] = useState(1);
	const [scale, setScale] = useState(1.2);

	useEffect(() => {
		let destroyed = false;
		(async () => {
			const loadingTask = pdfjsLib.getDocument(src);
			const doc = await loadingTask.promise;
			if (destroyed) return;
			setPdf(doc);
			setNumPages(doc.numPages);
		})();
		return () => { destroyed = true; };
	}, [src]);

	useEffect(() => {
		if (!pdf) return;
		(async () => {
			const page = await pdf.getPage(pageNum);
			const viewport = page.getViewport({ scale });
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');
			canvas.width = viewport.width;
			canvas.height = viewport.height;
			await page.render({ canvasContext: ctx, viewport }).promise;
		})();
	}, [pdf, pageNum, scale]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
			<div style={{ display: 'flex', gap: 8, padding: '6px 8px', alignItems: 'center', borderBottom: '1px solid rgba(201,148,58,0.3)', color: '#F4E6D3' }}>
				<button onClick={() => setPageNum(Math.max(1, pageNum - 1))} disabled={pageNum === 1} style={btnStyle}>Prev</button>
				<div style={{ fontSize: 12 }}>Page {pageNum} / {numPages}</div>
				<button onClick={() => setPageNum(Math.min(numPages, pageNum + 1))} disabled={pageNum === numPages} style={btnStyle}>Next</button>
				<div style={{ flex: 1 }} />
				<button onClick={() => setScale(prev => Math.max(0.6, prev - 0.2))} style={btnStyle}>-</button>
				<button onClick={() => setScale(prev => Math.min(3, prev + 0.2))} style={btnStyle}>+</button>
			</div>
			<div style={{ flex: 1, overflow: 'auto', background: 'rgba(0,0,0,0.25)' }}>
				<canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto' }} />
			</div>
		</div>
	);
}

const btnStyle = {
	background: 'transparent',
	border: '1px solid rgba(201,148,58,0.5)',
	color: '#C9943A',
	padding: '4px 8px',
	borderRadius: 6,
	cursor: 'pointer'
};


