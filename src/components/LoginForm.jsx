import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <input
        type="text"
        placeholder="Введите имя..."
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 16 }}
        maxLength={20}
        required
      />
      <button type="submit" style={{ padding: '8px 16px', borderRadius: 4, background: '#4ECDC4', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: 16 }}>
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
