import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FeedScreen = () => {
  const router = useRouter();
  const [communities, setCommunities] = useState<any[]>([]);
  const banners = [
    {id:'1',Image:'https://pbs.twimg.com/media/G-wAVy2bQAUZ8ZV?format=jpg&name=small'},
    {id:'2',Image:'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3d/2f/94/3d2f9427-9702-6365-960b-66920e0d41c0/198704942365_Cover.jpg/1200x630wp-60.jpg'},
    {id:'3',Image:'https://pbs.twimg.com/media/G90-BvjbEAEwHJw?format=jpg&name=small'}
  ]

  const posts =[
    {id:'p1',author:'BTS',content:'Fliming'},
    {id:'p2',author:'BTS',content:'Fliming'}
  ]

  
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

      <View  style={styles.whiteSection}>
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
      </View>

     
        <FlatList
         data={banners}
         horizontal
         pagingEnabled
         showsHorizontalScrollIndicator={false}
         keyExtractor={(item)=> item.id} 
         renderItem={({ item }) => (
         <TouchableOpacity style={styles.ImageSlideContainer}>
         <Image source={{ uri:item.Image}}
         style={styles.bannerImage}
          />
         </TouchableOpacity>
          
         )}


      />

      <FlatList
       data={posts}
       scrollEnabled={false}
       keyExtractor={Item => Item.id}
       renderItem={({ item }) => (
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.avatarMini} />
            <Text style={styles.postAuthor}>{item.author}</Text>
          </View>
          <Text style={styles.postContent}>{item.content}</Text>
          <Image source={{ uri: item.image }} style={styles.postImage} />
        </View>
       )}
      />



      

      
   
     

      
       
    </SafeAreaView>


  );
  
};



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' ,padding:10},
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center'},
  headerTitle: { fontSize: 24, fontWeight: 'bold', letterSpacing: -1 },
  addCard: { width: 60, height: 60, borderRadius: 40, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', margin: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc' },
  communityCard: { alignItems: 'center', margin: 10 },
  communityImage: { width: 60, height: 60, borderRadius: 40, backgroundColor: '#eee' },
  communityName: { marginTop: 5, fontSize: 12, fontWeight: 'bold' },

  whiteSection:{
    backgroundColor:'white',
    borderRadius:25,
    margin:15,
    marginBottom:10,
    padding:5,
    marginTop:10,

    elevation:5
  },

  ImageSlideContainer:{
    width:350,
    padding:3,
    backgroundColor:'white',
    borderRadius:10,
    elevation:5
  },

  bannerImage:{

    width:'100%',
    height:200,
    borderRadius:15,
    backgroundColor:'white',

   elevation:5
  },

  postCard:{
    backgroundColor:'white',
    margin:15,
    borderRadius:15,
    padding:15,
    elevation:3
  },
  postImage:{
    width:'100%',
    height:250,
    borderRadius:10,
    marginTop:10
  },
  postAuthor:{
    fontWeight:'bold',
    fontSize:16
  }


});


export default FeedScreen