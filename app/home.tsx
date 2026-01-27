import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface Community{
    id :string
    name : string
    imageUrl : string
}

const FeedSrceen = ({ navigation}:any) =>{
    const [communities,setCommunities] = useState<Community[]>([]);
    
    const loadCommunities = async () => {
    try{
        const savedData = await AsyncStorage.getItem('@Communities')
        if (savedData){
            setCommunities(JSON.parse(savedData))
        }
    } catch (e){
        console.log ("Cannot load Data",e);
    }
}
    useEffect(() => { 
    const unsub=
    navigation.addListener('focus',() =>{
        loadCommunities()
    })
    return unsub
    },[navigation])
}

