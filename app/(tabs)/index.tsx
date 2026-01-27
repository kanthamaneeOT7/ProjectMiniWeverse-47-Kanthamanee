import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FeedScreen = () => {
  const router = useRouter();
  const [communities, setCommunities] = useState<any[]>([]);

  // โหลดข้อมูลทุกครั้งที่หน้าจอนี้โชว์ (แก้บั๊กข้อมูลไม่ Update)
  const loadCommunities = async () => {
    try {
      const savedData = await AsyncStorage.getItem('communities');
      if (savedData) setCommunities(JSON.parse(savedData));
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(useCallback(() => { loadCommunities(); }, []));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>weverse</Text>
        <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
      </View>

      <FlatList
        data={communities}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addCard} onPress={() => router.push('/Add')}>
            <MaterialCommunityIcons name="plus" size={30} color="#ccc" />
          </TouchableOpacity>
        }
        renderItem={({ item }) => (
          <View style={styles.communityCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.communityImage} />
            <Text style={styles.communityName}>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

// แก้บั๊ก Cannot find name 'styles'
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', letterSpacing: -1 },
  addCard: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', margin: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc' },
  communityCard: { alignItems: 'center', margin: 10 },
  communityImage: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#eee' },
  communityName: { marginTop: 5, fontSize: 12, fontWeight: 'bold' }
});

export default FeedScreen; // แก้บั๊กชื่อไม่ตรง