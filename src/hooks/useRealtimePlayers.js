// src/hooks/useRealtimePlayers.js
import { useState, useEffect } from 'react';
import { database, ref, onValue, off } from '../services/firebase';

export const useRealtimePlayers = () => {
  const [players, setPlayers] = useState({});

  useEffect(() => {
    // Создаем ссылку на узел players в базе данных
    const playersRef = ref(database, 'players');
    
    // Подписываемся на изменения в реальном времени
    const unsubscribe = onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      // Если данных нет, устанавливаем пустой объект
      setPlayers(data || {});
    });

    // Очистка подписки при размонтировании компонента
    return () => {
      off(playersRef, 'value', unsubscribe);
    };
  }, []);

  return players;
};