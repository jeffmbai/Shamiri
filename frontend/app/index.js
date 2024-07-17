import { Link } from 'expo-router';
import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Page() {
  const router = useRouter();

  return (
    <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff', marginBottom: 20, fontSize: 30 }}>
        Welcome to Our App!
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#9C00E4',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginBottom: 20,
        }}
        onPress={() => {
          router.push('/login');
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
