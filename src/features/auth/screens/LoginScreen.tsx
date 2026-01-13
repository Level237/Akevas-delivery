import { Colors } from '@/theme/colors';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { CheckSquare, Eye, EyeOff, Lock, Phone, Square } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log('Login with:', phoneNumber, password);
    // Proceed to main app
    router.replace('/(tabs)/explore');
  };

  const handleRegister = async () => {
    const result = await WebBrowser.openBrowserAsync('https://delivery.akevas.com/delivery/register');
    console.log('Navigate to Register');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Header Background */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Connexion</Text>
        </View>

        {/* White Card Overlay */}
        <View style={styles.card}>
          <Text style={styles.welcomeTitle}>Bienvenue !</Text>
          <Text style={styles.subtitle}>
            To keep connected with us please login with your personal info
          </Text>

          {/* Form */}
          <View style={styles.form}>
            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Phone color={Colors.gray} size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Numéro de téléphone"
                placeholderTextColor={Colors.gray}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                autoComplete="tel"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Lock color={Colors.gray} size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={Colors.gray}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff color={Colors.gray} size={20} />
                ) : (
                  <Eye color={Colors.gray} size={20} />
                )}
              </TouchableOpacity>
            </View>

            {/* Remember Me & Recovery */}
            <View style={styles.rowBetween}>
              <TouchableOpacity 
                style={styles.rememberRow} 
                onPress={() => setRememberMe(!rememberMe)}
              >
                {rememberMe ? (
                  <CheckSquare color={Colors.primary} size={20} />
                ) : (
                  <Square color={Colors.gray} size={20} />
                )}
                <Text style={styles.rememberText}>Remember me?</Text>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <Text style={styles.recoveryText}>Recovery Password</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login */}
          

          

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Vous n'aviez pas de compte? </Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.registerLink}>Créer un compte</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: height * 0.25,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 30,
    lineHeight: 20,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 56,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#000',
    fontSize: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rememberText: {
    color: Colors.gray,
    fontSize: 14,
  },
  recoveryText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: Colors.gray,
    fontSize: 14,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 15,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    height: 56,
    borderRadius: 12,
    gap: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  facebookButton: {
    backgroundColor: '#f5f5f5', // Or specific FB color if desired, mockup shows light bg
  },
  facebookText: {
    color: '#000',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerText: {
    color: Colors.gray,
    fontSize: 14,
  },
  registerLink: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
