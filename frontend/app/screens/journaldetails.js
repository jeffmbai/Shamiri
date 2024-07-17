import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const JournalDetails = ({ route }) => {
  const { id } = route.params;
  console.log('Journal ID:', id);

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleEdit = () => {
    // Implement edit functionality for journal with `id`
    console.log('Edit pressed for id:', id);
    setMenuVisible(false);
  };

  const handleDelete = () => {
    // Implement delete functionality for journal with `id`
    console.log('Delete pressed for id:', id);
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journal Details</Text>
      <View style={styles.detailsContainer}>
        {/* Replace with actual data fetching using `id` */}
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.content}>Sample Journal Title</Text>

        <Text style={styles.label}>Content:</Text>
        <Text style={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
          odio vel arcu consectetur laoreet. Donec tincidunt malesuada justo
          nec luctus. Morbi euismod nisi non fringilla lacinia.
        </Text>

        <Text style={styles.label}>Category:</Text>
        <Text style={styles.content}>Sample Category</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.content}>July 8, 2024</Text>
      </View>

      {/* Floating Action Menu */}
      {menuVisible && (
        <View style={styles.actionMenu}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
            <Text style={[styles.actionText, { color: '#FF6347' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={toggleMenu}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9C00E4',
    marginBottom: 16,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DF00BC',
    marginTop: 12,
  },
  content: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    backgroundColor: '#9C00E4',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    borderRadius: 28,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
  actionMenu: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 18,
    color: '#000',
  },
});

export default JournalDetails;
