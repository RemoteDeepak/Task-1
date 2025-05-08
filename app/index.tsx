import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [reaction, setReaction] = useState('');
  const [score, setScore] = useState(0);

  const getTodayKey = () => {
    const today = new Date().toISOString().split('T')[0]; // e.g., "2025-05-08"
    return `joke_${today}`;
  };

  const fetchJokeOfTheDay = async () => {
    setLoading(true);
    const todayKey = getTodayKey();

    const storedJoke = await AsyncStorage.getItem(todayKey);
    if (storedJoke) {
      setJoke(storedJoke);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      const data = await response.json();
      setJoke(data.joke);
      await AsyncStorage.setItem(todayKey, data.joke);
    } catch (error) {
      setJoke('Oops! No jokes for you 😅');
    }

    setLoading(false);
  };

  const resetJokeOfTheDay = async () => {
    const todayKey = getTodayKey();
    await AsyncStorage.removeItem(todayKey);
    setJoke('');
    setReaction('');
    fetchJokeOfTheDay(); // fetch a new one immediately
  };

  const handleReaction = (emoji: string) => {
    let points = 0;
    if (emoji === '😂') points = 2;
    else if (emoji === '😐') points = 0;
    else if (emoji === '😴') points = -1;

    setScore(score + points);
    setReaction(`You reacted with: ${emoji} (${points >= 0 ? '+' : ''}${points} pts)`);
  };

  useEffect(() => {
    fetchJokeOfTheDay();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.title}>🌞 Joke of the Day</Text>
      <Button title="🔄 Reset Joke of the Day" onPress={resetJokeOfTheDay} color="#e91e63" />
      {loading ? (
        <ActivityIndicator size="large" color="#ff6600" style={{ marginTop: 20 }} />
      ) : (
        <>
          <Text style={styles.joke}>{joke}</Text>

          {joke !== '' && (
            <View style={styles.reactionContainer}>
              <Text style={styles.reactLabel}>React:</Text>
              <TouchableOpacity onPress={() => handleReaction('😂')}>
                <Text style={styles.emoji}>😂</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleReaction('😐')}>
                <Text style={styles.emoji}>😐</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleReaction('😴')}>
                <Text style={styles.emoji}>😴</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.reactionText}>{reaction}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffde7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  joke: {
    marginTop: 30,
    fontSize: 20,
    textAlign: 'center',
    color: '#333',
  },
  reactionContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  emoji: {
    fontSize: 32,
    marginHorizontal: 10,
  },
  reactionText: {
    marginTop: 15,
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',
  },
});
