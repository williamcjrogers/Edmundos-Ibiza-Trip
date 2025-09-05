import Dexie from 'dexie';

// Local IndexedDB database for storing booking confirmation documents
export const db = new Dexie('edmundosItineraryDB');

db.version(1).stores({
	documents: '++id, name, type, size, createdAt'
});

// Helper to add a document
export async function addDocument(file) {
	const arrayBuffer = await file.arrayBuffer();
	const blob = new Blob([arrayBuffer], { type: file.type || 'application/octet-stream' });
	return db.documents.add({
		name: file.name,
		type: file.type || 'application/octet-stream',
		size: file.size,
		createdAt: new Date().toISOString(),
		blob
	});
}

export async function listDocuments() {
	return db.documents.orderBy('createdAt').reverse().toArray();
}

export async function getDocument(id) {
	return db.documents.get(id);
}

export async function deleteDocument(id) {
	return db.documents.delete(id);
}


