import { Colors } from '@/theme/colors';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ViewToken } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { OnboardingSlide } from '../components/OnboardingSlide';
import { ONBOARDING_DATA, OnboardingSlideData } from '../constants/OnboardingData';

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingSlideData>>(null);
  const scrollX = useSharedValue(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0] && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    // In a real app, save onboarding status to AsyncStorage here
    router.replace('/(tabs)/explore');
  };


  
  // Simplified Dot for now to avoid complex width passing without context
  const Dot = ({ index }: { index: number }) => {
      const isActive = index === currentIndex;
      return (
          <View 
            style={[
                styles.dot, 
                { 
                    width: isActive ? 20 : 8,
                    backgroundColor: isActive ? Colors.primary : Colors.lightGray
                }
            ]} 
          />
      );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Animated.FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={({ nativeEvent }) => {
            scrollX.value = nativeEvent.contentOffset.x;
        }}
        scrollEventThrottle={32}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {ONBOARDING_DATA.map((_, index) => (
            <Dot key={index} index={index} />
          ))}
        </View>

        <TouchableOpacity 
            style={styles.button} 
            onPress={handleNext}
            activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10, // Safe area adjustment
  },
  skipText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    height: 150,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
