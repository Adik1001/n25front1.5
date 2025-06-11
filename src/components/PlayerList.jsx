import React from 'react';

const PlayerList = ({ players, currentPlayerId }) => {
  return (
    <div style={{ marginTop: 20, padding: 15, backgroundColor: '#f8f9fa', borderRadius: 8, minWidth: 200 }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Активные игроки:</h3>
      {Object.values(players).length === 0 ? (
        <div style={{ color: '#666', fontStyle: 'italic' }}>
          Подключение к серверу...
        </div>
      ) : (
        Object.values(players).map((player) => (
          <div
            key={player.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 5,
              padding: 5,
              backgroundColor: player.id === currentPlayerId ? '#e3f2fd' : 'transparent',
              borderRadius: 4
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: player.color,
                borderRadius: 2,
                marginRight: 8
              }}
            />
            <span style={{ fontSize: 14, fontWeight: player.id === currentPlayerId ? 'bold' : 'normal' }}>
              {player.name} {player.id === currentPlayerId && '(Вы)'}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default PlayerList;
