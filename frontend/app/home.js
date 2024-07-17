import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Card from '../components/card'; 
import { useNavigation } from 'expo-router';
import useJournals from '../Hooks/useJournals';

const Home = () => {
  const navigation = useNavigation();
  const { data: journals, error, isLoading, invalidateJournals } = useJournals();

  console.log('Journals:', journals);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      invalidateJournals();
    });

    return unsubscribe;
  }, [navigation, invalidateJournals]);

  const goToDetails = (journalId) => {
    navigation.navigate('JournalDetails', { id: journalId });
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#9C00E4" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Latest Entries</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {journals.map((journal) => (
          <TouchableOpacity key={journal.id} onPress={() => goToDetails(journal.id)}>
            <Card
              title={journal.title}
              content={journal.content}
              category={journal.category}
              date={journal.date}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {navigation.navigate('AddJournal')}}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#9C00E4',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    elevation: 3,
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Home;
