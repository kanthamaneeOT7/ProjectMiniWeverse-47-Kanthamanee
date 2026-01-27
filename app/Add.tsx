import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const AddScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSave = async () => {
    if (!name || !imageUrl) {
      Alert.alert("เตือน", "กรอกข้อมูลให้ครบนะลูกพี่!");
      return;
    }
    try {
      const savedData = await AsyncStorage.getItem('communities');
      const currentData = savedData ? JSON.parse(savedData) : [];
      const newData = [...currentData, { name, imageUrl }];
      
      await AsyncStorage.setItem('communities', JSON.stringify(newData));
      Alert.alert("สำเร็จ", "เพิ่มวงเรียบร้อย!");
      router.replace('/(tabs)'); // แก้บั๊ก GO_BACK Error
    } catch (e) {
      Alert.alert("Error", "เซฟไม่ได้อะพี่");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เพิ่ม Community ใหม่</Text>
      
      <Text style={styles.label}>ชื่อวง/ศิลปิน</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="เช่น BTS, NewJeans" />

      <Text style={styles.label}>Link รูปภาพ (URL)</Text>
      <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} placeholder="https://..." />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>บันทึกข้อมูล</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 5, color: '#666' },
  input: { borderWidth: 1, borderColor: '#eee', padding: 15, borderRadius: 10, marginBottom: 20, backgroundColor: '#f9f9f9' },
  button: { backgroundColor: '#17ead9', padding: 18, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});

export default AddScreen;