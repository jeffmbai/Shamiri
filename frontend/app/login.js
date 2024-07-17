import React, { useState } from "react";
import { Text, View, TextInput, Pressable, StyleSheet, ActivityIndicator, StatusBar, ToastAndroid } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Link, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';

const API_URL = "https://shamiri.onrender.com/login";

export default function App() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // state management
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });


  // construct the form submit and post to endpoint
  const onSubmit = async (reqdata) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqdata),
      });

      const data = await response.json();

      if (data.access_token) {
        await AsyncStorage.setItem('access_token', data.access_token);
        router.replace('/bottomTab');
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.SHORT);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.label}>Username</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter your username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#888888"
                style={styles.field}
              />
            )}
            name="username"
          />
          {errors.username && <Text style={styles.errorText}>* Username is required.</Text>}

          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                style={styles.field}
                placeholderTextColor="#888888"
              />
            )}
            name="password"
          />
          {errors.password && <Text style={styles.errorText}>* Password should be at least 6 characters.</Text>}

          <Pressable onPress={handleSubmit(onSubmit)}>
            <LinearGradient colors={['#DF00BC', '#9C00E4']} start={[0, 0]} end={[1, 0]} style={styles.button}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Log in</Text>
              )}
            </LinearGradient>
          </Pressable>

          <Link href="/register" asChild>
            <Pressable style={styles.registerLink}>
              <Text style={styles.registerText}>
                Don't have an account? <Text style={styles.registerTextHighlight}>Register</Text>
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 17,
    marginBottom: 10,
    marginLeft: 7,
  },
  field: {
    backgroundColor: '#171717',
    borderRadius: 15,
    borderColor: '#1F1F1F',
    borderWidth: 1,
    color: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  errorText: {
    color: '#9C00E4',
    marginLeft: 7,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  registerLink: {
    alignItems: 'center',
    marginTop: 15,
  },
  registerText: {
    color: '#A2A2A2',
  },
  registerTextHighlight: {
    color: '#fff',
  },
});
