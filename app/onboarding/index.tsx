import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const DATA = [
  {
    id: '1',
    title: 'Discover our handpicked selection of top dishes',
    description: 'Choose your food from the menu there are multiple options available.',
    icon: 'fork.knife.circle.fill', // SF Symbol name
  },
  {
    id: '2',
    title: 'Secure and convenient online payments',
    description: 'Hassle-free and online payments with all major card options available.',
    icon: 'creditcard.fill',
  },
  {
    id: '3',
    title: 'Enjoy fast, reliable delivery straight to your doorstep',
    description: 'Online reservation and home delivery system for restaurants and cafes.',
    icon: 'box.truck.fill',
  },
];

const OnboardingItem = ({ item, width, index, x }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.8, 1, 0.8],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });

  return (
    <View style={[styles.itemContainer, { width }]}>
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        {/* Placeholder for illustration using SF Symbols or simple View */}
        <View className="w-64 h-64 bg-gray-100 rounded-full items-center justify-center mb-10">
            <SymbolView name={item.icon} size={100} tintColor="#ed7e0f" fallback={<View className="w-20 h-20 bg-primary" />} />
        </View>
      </Animated.View>
      <View className="px-8 items-center">
        <Text className="text-2xl font-bold text-center mb-4 text-gray-900">{item.title}</Text>
        <Text className="text-base text-center text-gray-500 leading-6">{item.description}</Text>
      </View>
    </View>
  );
};

const Paginator = ({ data, x, width }) => {
  return (
    <View className="flex-row h-16 justify-center items-center">
      {data.map((_, i) => {
        const animatedDotStyle = useAnimatedStyle(() => {
          const widthAnim = interpolate(
            x.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [10, 20, 10],
            Extrapolation.CLAMP
          );
          const opacity = interpolate(
            x.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [0.3, 1, 0.3],
            Extrapolation.CLAMP
          );
          return {
            width: widthAnim,
            opacity,
          };
        });

        return (
          <Animated.View
            key={i.toString()}
            style={[styles.dot, animatedDotStyle]}
          />
        );
      })}
    </View>
  );
};

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const x = useSharedValue(0);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const handleNext = () => {
    if (currentIndex < DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-6 py-4">
        <Text className="text-lg font-bold text-gray-900">
            {/* Time placeholder if needed, usually handled by status bar */}
        </Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-base font-medium text-primary">Skip</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <Animated.FlatList
          ref={flatListRef}
          data={DATA}
          renderItem={({ item, index }) => <OnboardingItem item={item} width={width} index={index} x={x} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />
      </View>

      <Paginator data={DATA} x={x} width={width} />

      <View className="px-6 pb-10 pt-4">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-primary py-4 rounded-full items-center shadow-md"
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-bold">
            {currentIndex === DATA.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ed7e0f',
    marginHorizontal: 8,
  },
});
