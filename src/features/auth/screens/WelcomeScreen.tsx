import { Colors } from '@/theme/colors';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleLogin = () => {
    // Navigate to Login (to be implemented)
    console.log('Navigate to Login');
  };

  const handleCreateAccount = () => {
    // Navigate to Create Account (to be implemented)
    console.log('Navigate to Create Account');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
             {/* Placeholder for the delivery person illustration */}
            <Image 
                source={{ uri: 'https://img.freepik.com/free-vector/delivery-service-with-mask-concept_23-2148509521.jpg' }} 
                style={styles.image} 
                resizeMode="contain" 
            />
        </View>

        <View style={styles.textContainer}>
            <Text style={styles.title}>Food Service</Text>
            <Text style={styles.description}>
                Discover the best from over 1,000 restaurants and fast delivery to your doorstep
            </Text>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
                <Text style={styles.createAccountButtonText}>Create an Account</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Light green background in mockup, but user asked for orange theme. Keeping white/clean for now or light orange? Mockup has light green bg. Let's stick to white for clean look or very light orange if needed. White is safer.
  },
  header: {
    paddingTop: 60, // Safe area
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0', // Light gray for button bg
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  imageContainer: {
    flex: 0.5,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: '80%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary, // Orange
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 30,
    gap: 16,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  createAccountButton: {
    backgroundColor: '#fff',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  createAccountButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
});
