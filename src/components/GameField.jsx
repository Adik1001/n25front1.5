// src/components/GameField.jsx
import React from 'react';
import { useRealtimePlayers } from '../hooks/useRealtimePlayers';
import { usePlayerMovement } from '../hooks/usePlayerMovement';

const GameField = ({ userName }) => {
  const players = useRealtimePlayers();
  const { playerId, fieldWidth, fieldHeight, playerSize } = usePlayerMovement(userName);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', marginBottom: '10px' }}>
        Multiplayer Game
      </h1>
      
      <div style={{ 
        marginBottom: '10px', 
        color: '#666',
        fontSize: '14px'
      }}>
        Используйте клавиши W/A/S/D для движения
      </div>
      
      <div style={{ 
        marginBottom: '20px', 
        color: '#666',
        fontSize: '12px'
      }}>
        Игроков онлайн: {Object.keys(players).length}
      </div>

      {/* Игровое поле */}
      <div 
        style={{
          position: 'relative',
          width: fieldWidth,
          height: fieldHeight,
          backgroundColor: '#2c3e50',
          border: '2px solid #34495e',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        {/* Отрисовка всех игроков */}
        {Object.values(players).map((player) => (
          <div
            key={player.id}
            style={{
              position: 'absolute',
              left: player.x,
              top: player.y,
              width: playerSize,
              height: playerSize,
              backgroundColor: player.color,
              borderRadius: '1px',
              transition: 'all 0.1s ease', // Плавная анимация движения
              boxShadow: player.id === playerId ? '0 0 8px rgba(255,255,255,0.8)' : 'none', // Подсветка своего игрока
              zIndex: player.id === playerId ? 10 : 1
            }}
            title={player.name} // Показываем имя при наведении
          />
        ))}
        
        {/* Сетка для лучшей ориентации (опционально) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Список игроков */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        minWidth: '200px'
      }}>
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
                marginBottom: '5px',
                padding: '5px',
                backgroundColor: player.id === playerId ? '#e3f2fd' : 'transparent',
                borderRadius: '4px'
              }}
            >
              <div 
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: player.color,
                  borderRadius: '2px',
                  marginRight: '8px'
                }}
              />
              <span style={{ 
                fontSize: '14px',
                fontWeight: player.id === playerId ? 'bold' : 'normal'
              }}>
                {player.name} {player.id === playerId && '(Вы)'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameField;