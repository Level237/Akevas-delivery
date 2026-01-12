import { Colors } from '@/theme/colors';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { OnboardingSlideData } from '../constants/OnboardingData';

const { width } = Dimensions.get('window');

interface OnboardingSlideProps {
  item: OnboardingSlideData;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
            source={item.image} 
            style={styles.image} 
            resizeMode="contain" 
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  contentContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
});
