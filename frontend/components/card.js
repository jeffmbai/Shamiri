import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, content, category, date }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.details}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9C00E4',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    color: '#DF00BC',
  },
  date: {
    color: '#000',
  },
});

export default Card;
