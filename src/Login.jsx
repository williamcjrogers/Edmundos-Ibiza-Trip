import React, { useState } from 'react';

export default function Login({ onSuccess }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	function normalizeInput(value) {
		if (!value) return '';
		// Replace smart quotes/apostrophes/backticks with straight apostrophe
		const unified = value
			.replace(/[\u2018\u2019\u02BC\u2032\u201B\u00B4\u0060]/g, "'")
			.replace(/\s+/g, ' ')
			.trim();
		return unified;
	}

	function handleSubmit(e) {
		e.preventDefault();
		const validUser = "IBIZAVIP'S";
		const validPass = 'LEGENDS';
		const normalizedUser = normalizeInput(username).toUpperCase();
		const normalizedPass = normalizeInput(password);
		if (normalizedUser === validUser.toUpperCase() && normalizedPass === validPass) {
			localStorage.setItem('isAuthenticated', 'true');
			onSuccess?.();
		} else {
			setError('Invalid credentials');
		}
	}

	const styles = {
		container: {
			minHeight: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: 'linear-gradient(180deg, #0D0806 0%, #2B1810 50%, #4A2C1A 100%)',
			fontFamily: '"Playfair Display", Georgia, serif',
			color: '#F4E6D3'
		},
		card: {
			width: '100%',
			maxWidth: '420px',
			background: 'rgba(43, 24, 16, 0.5)',
			border: '1px solid rgba(201, 148, 58, 0.3)',
			borderRadius: '12px',
			padding: '2rem',
			boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
		},
		title: {
			fontSize: '1.5rem',
			fontWeight: 700,
			color: '#C9943A',
			marginBottom: '1rem'
		},
		label: { display: 'block', marginBottom: '0.35rem', color: '#D4B896' },
		input: {
			width: '100%',
			padding: '0.8rem 0.9rem',
			borderRadius: '8px',
			border: '1px solid rgba(201, 148, 58, 0.35)',
			background: 'rgba(43, 24, 16, 0.35)',
			color: '#F4E6D3',
			marginBottom: '1rem'
		},
		button: {
			width: '100%',
			padding: '0.9rem 1rem',
			borderRadius: '8px',
			border: '1px solid #C9943A',
			background: 'rgba(201, 148, 58, 0.2)',
			color: '#C9943A',
			fontWeight: 600,
			cursor: 'pointer',
			marginTop: '0.6rem'
		},
		error: { color: '#E7B77A', marginTop: '0.5rem', fontSize: '0.9rem' }
	};

	return (
		<div style={styles.container}>
			<form style={styles.card} onSubmit={handleSubmit}>
				<div style={styles.title}>Edmundos - Ibiza Escape</div>
				<label style={styles.label} htmlFor="username">Username</label>
				<input
					id="username"
					style={styles.input}
					value={username}
					onChange={e => setUsername(e.target.value)}
					autoCapitalize="none"
					autoCorrect="off"
					spellCheck={false}
					inputMode="text"
					autoComplete="username"
				/>
				<label style={styles.label} htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					style={styles.input}
					value={password}
					onChange={e => setPassword(e.target.value)}
					autoCapitalize="none"
					autoCorrect="off"
					spellCheck={false}
					autoComplete="current-password"
				/>
				<button type="submit" style={styles.button}>Log in</button>
				{error && <div style={styles.error}>{error}</div>}
			</form>
		</div>
	);
}


