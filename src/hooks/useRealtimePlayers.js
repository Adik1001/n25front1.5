// src/hooks/useRealtimePlayers.js
import { useState, useEffect } from 'react';
import { database, ref, onValue, off } from '../services/firebase';

export const useRealtimePlayers = () => {
  const [players, setPlayers] = useState({});

  useEffect(() => {
    const playersRef = ref(database, 'players');
    
    const unsubscribe = onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      setPlayers(data || {});
    });

    return () => {
      off(playersRef, 'value', unsubscribe);
    };
  }, []);

  return players;
};
