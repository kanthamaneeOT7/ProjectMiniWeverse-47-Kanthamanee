import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native'
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color,focused }) => (
            <Image
            source={{uri: 'data:image/png;base64,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' }}
            style={{
              width:28,
              height:28,
              borderRadius:9,
              opacity: focused ? 1 : 0.5
            }}
            />
          )
        }}
      />

      <Tabs.Screen
        name="remove"
        options={{
          title: 'remove',
          tabBarIcon: ({color,focused }) => (
            <Image
            source={{uri: 'data:image/png;base64,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' }}
            style={{
              width:28,
              height:28,
              borderRadius:9,
              opacity: focused ? 1 : 0.5
            }}
            />
          )
        }}
      />


    
    </Tabs>
  );
}
