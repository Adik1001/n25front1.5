// src/hooks/usePlayerMovement.js
import { useState, useEffect, useCallback } from 'react';
import { database, ref, set, onDisconnect, remove } from '../services/firebase';
import { v4 as uuidv4 } from 'uuid';

// Размеры игрового поля
const FIELD_WIDTH = 800;
const FIELD_HEIGHT = 600;
const PLAYER_SIZE = 4;
const MOVE_SPEED = 4; // Пикселей за одно нажатие

export const usePlayerMovement = (userName) => {
  const [playerId] = useState(() => uuidv4());
  const [position, setPosition] = useState({
    x: FIELD_WIDTH / 2,
    y: FIELD_HEIGHT / 2
  });
  const [color] = useState(() => {
    // Генерируем случайный яркий цвет
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    return colors[Math.floor(Math.random() * colors.length)];
  });

  // Функция для обновления позиции в Firebase
  const updatePlayerPosition = useCallback((newX, newY) => {
    const playerRef = ref(database, `players/${playerId}`);
    set(playerRef, {
      id: playerId,
      x: newX,
      y: newY,
      color: color,
      name: userName || `Player ${playerId.slice(0, 6)}` // Имя из логина или короткое имя
    });
  }, [playerId, color, userName]);

  // Функция движения с проверкой границ
  const movePlayer = useCallback((dx, dy) => {
    setPosition(prev => {
      const newX = Math.max(0, Math.min(FIELD_WIDTH - PLAYER_SIZE, prev.x + dx));
      const newY = Math.max(0, Math.min(FIELD_HEIGHT - PLAYER_SIZE, prev.y + dy));
      
      // Обновляем позицию в Firebase только если она изменилась
      if (newX !== prev.x || newY !== prev.y) {
        updatePlayerPosition(newX, newY);
      }
      
      return { x: newX, y: newY };
    });
  }, [updatePlayerPosition]);

  // Обработка нажатий клавиш
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key.toLowerCase()) {
        case 'w':
          movePlayer(0, -MOVE_SPEED);
          break;
        case 's':
          movePlayer(0, MOVE_SPEED);
          break;
        case 'a':
          movePlayer(-MOVE_SPEED, 0);
          break;
        case 'd':
          movePlayer(MOVE_SPEED, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer]);

  // Инициализация игрока при монтировании компонента
  useEffect(() => {
    const playerRef = ref(database, `players/${playerId}`);
    
    // Добавляем игрока в базу данных
    updatePlayerPosition(position.x, position.y);
    
    // Настраиваем автоматическое удаление при отключении
    onDisconnect(playerRef).remove();
    
    // Очистка при размонтировании компонента
    return () => {
      remove(playerRef);
    };
  }, [playerId, position.x, position.y, updatePlayerPosition]);

  return {
    playerId,
    position,
    color,
    fieldWidth: FIELD_WIDTH,
    fieldHeight: FIELD_HEIGHT,
    playerSize: PLAYER_SIZE
  };
};