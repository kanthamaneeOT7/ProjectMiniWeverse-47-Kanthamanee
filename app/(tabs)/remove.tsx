import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RemoveScreen = () => {
  const router = useRouter()
  const [communities, setCommunities] = useState<any[]>([])


  const loadData = async () => {
    const savedData = await AsyncStorage.getItem('communities')
    if (savedData) setCommunities(JSON.parse(savedData))
  };

  useEffect(() => { loadData(); }, [])

  
  const deleteCommunity = async (index: number) => {
    Alert.alert("ยืนยัน", "จะลบวงนี้จริงๆ เหรอพี่?", [
      { text: "ยกเลิก" },
      { text: "ลบเลย", onPress: async () => {
          const newData = [...communities]
          newData.splice(index, 1)
          await AsyncStorage.setItem('communities', JSON.stringify(newData))
          setCommunities(newData)
        } 
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>จัดการ Community</Text>
      </View>

      <FlatList
        data={communities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteCommunity(index)}>
              <MaterialCommunityIcons name="trash-can-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 40 },
  title: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  itemName: { fontSize: 16 }
});

export default RemoveScreen;