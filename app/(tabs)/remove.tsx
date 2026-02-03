import React, { useState, useEffect ,useCallback,useRef} from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router'



const RemoveScreen = () => {
  const router = useRouter()
  const [communities, setCommunities] = useState<any[]>([])
 


const loadCommunities = async () => {
  try {
    const savedData = await AsyncStorage.getItem('communities');
    if (savedData) {
      setCommunities(JSON.parse(savedData));
    }
  } catch (e) {
    console.error(e);
  }
};


  useFocusEffect(
  useCallback(() => {
    loadCommunities();
  }, [])
);
const removeCommunity = async (name: string) => {
  const updated = communities.filter(c => c.name !== name);
  setCommunities(updated);
  await AsyncStorage.setItem('communities', JSON.stringify(updated));
};


  const loadData = async () => {
    const savedData = await AsyncStorage.getItem('communities')
    if (savedData) setCommunities(JSON.parse(savedData))
  };

  
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Remove artist</Text>
      </View>

      <FlatList
  data={communities}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.removeList}>
      <Text style={styles.artistName}>{item.name}</Text>
      <TouchableOpacity 
        onPress={() => removeCommunity(item.name)} 
        style={styles.deleteBtn}
      >
        <MaterialCommunityIcons name="delete-outline" size={24} color="red" />
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
  itemName: { fontSize: 16 },
  removeList: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
artistName: { fontSize: 16, fontWeight: 'bold' },
deleteBtn: { padding: 5 },
});

export default RemoveScreen;