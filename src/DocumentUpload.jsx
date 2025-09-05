import React, { useEffect, useRef, useState } from 'react';
import { FileText, Trash2, Download, Plus, Loader2 } from 'lucide-react';
import { addDocument, listDocuments, getDocument, deleteDocument } from './db';

export default function DocumentUpload() {
	const [documents, setDocuments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef(null);

	useEffect(() => {
		let mounted = true;
		(async () => {
			const docs = await listDocuments();
			if (mounted) {
				setDocuments(docs);
				setIsLoading(false);
			}
		})();
		return () => { mounted = false; };
	}, []);

	async function handleFilesSelected(event) {
		const files = Array.from(event.target.files || []);
		if (files.length === 0) return;
		setIsUploading(true);
		for (const file of files) {
			await addDocument(file);
		}
		const docs = await listDocuments();
		setDocuments(docs);
		setIsUploading(false);
		if (fileInputRef.current) fileInputRef.current.value = '';
	}

	async function handleDownload(id) {
		const doc = await getDocument(id);
		if (!doc) return;
		const url = URL.createObjectURL(doc.blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = doc.name;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	async function handleDelete(id) {
		await deleteDocument(id);
		const docs = await listDocuments();
		setDocuments(docs);
	}

	const styles = {
		container: {
			marginTop: '2rem',
			background: 'rgba(43, 24, 16, 0.35)',
			border: '1px solid rgba(201, 148, 58, 0.25)',
			borderRadius: '12px',
			padding: '1.25rem'
		},
		header: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: '1rem'
		},
		title: {
			display: 'flex',
			alignItems: 'center',
			gap: '0.5rem',
			fontSize: '1.25rem',
			fontWeight: 600,
			color: '#C9943A'
		},
		uploadBtn: {
			background: 'rgba(201, 148, 58, 0.2)',
			border: '1px solid #C9943A',
			color: '#C9943A',
			padding: '0.5rem 1rem',
			borderRadius: '6px',
			cursor: 'pointer',
			fontSize: '0.9rem',
			fontWeight: 500
		},
		grid: {
			display: 'grid',
			gap: '0.75rem'
		},
		item: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: '1rem',
			padding: '0.75rem 0.9rem',
			background: 'rgba(43, 24, 16, 0.3)',
			border: '1px solid rgba(201, 148, 58, 0.2)',
			borderRadius: '8px'
		},
		left: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
		name: { color: '#F4E6D3', fontWeight: 600 },
		meta: { color: '#D4B896', fontSize: '0.8rem' },
		actions: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
		actionBtn: {
			background: 'transparent',
			border: '1px solid rgba(201, 148, 58, 0.35)',
			color: '#C9943A',
			padding: '0.35rem 0.6rem',
			borderRadius: '6px',
			cursor: 'pointer'
		},
		loader: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#C9943A' }
	};

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<div style={styles.title}><FileText size={18} /> Booking Confirmations</div>
				<div>
					<input
						ref={fileInputRef}
						type="file"
						multiple
						accept=".pdf,.jpg,.jpeg,.png,.heic,.webp,.doc,.docx,.txt"
						style={{ display: 'none' }}
						onChange={handleFilesSelected}
					/>
					<button style={styles.uploadBtn} onClick={() => fileInputRef.current?.click()}>
						{isUploading ? (
							<span style={styles.loader}><Loader2 size={16} className="spin" /> Uploading...</span>
						) : (
							<span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
								<Plus size={16} /> Upload
							</span>
						)}
					</button>
				</div>
			</div>

			{isLoading ? (
				<div style={styles.loader}><Loader2 size={16} className="spin" /> Loading documents...</div>
			) : (
				<div style={styles.grid}>
					{documents.length === 0 && (
						<div style={{ color: '#D4B896' }}>No documents uploaded yet.</div>
					)}
					{documents.map(doc => (
						<div key={doc.id} style={styles.item}>
							<div style={styles.left}>
								<FileText size={18} />
								<div>
									<div style={styles.name}>{doc.name}</div>
									<div style={styles.meta}>
										{(doc.size / 1024).toFixed(1)} KB · {new Date(doc.createdAt).toLocaleString()}
									</div>
								</div>
							</div>
							<div style={styles.actions}>
								<button style={styles.actionBtn} onClick={() => handleDownload(doc.id)}>
									<Download size={16} />
								</button>
								<button style={styles.actionBtn} onClick={() => handleDelete(doc.id)}>
									<Trash2 size={16} />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}


