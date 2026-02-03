import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState ,useRef, useEffect} from 'react';
import { Modal,FlatList, Image, StyleSheet, Text, TouchableOpacity, View,ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FeedScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const router = useRouter();
  const [communities, setCommunities] = useState<any[]>([]);
  const banners = [
    {id:'1',Image:'https://pbs.twimg.com/media/G90-BvjbEAEwHJw?format=jpg&name=small'},
    {id:'2',Image:'https://images.fun.com/blog/614/bts-group.jpg'},
    {id:'3',Image:'https://i.redd.it/85vskxi66fif1.jpeg'},
    {id:'4',Image:'https://assets.teenvogue.com/photos/64b994a5d5b19e1b7270f417/16:9/w_2560%2Cc_limit/1_SY_4247_SY_NJ.jpg'}
  ]

  const allArtists = [
  { name: 'BTS', image:'https://i.pinimg.com/736x/00/6f/86/006f869b7a5f932a728971b7d7d35c9d.jpg' },
  { name: 'NewJeans', image: 'https://yt3.googleusercontent.com/LJXS4gAz-_rkoqcgixJplCAwOLQXRNTYnGhyZQoJMZ2Uyp_akqREktZnvxbmmbES_UDp9hTT9y8=s900-c-k-c0x00ffffff-no-rj' },
  { name: 'Cortis', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUTEhIVEhUWFRYWFREWFxgWGBcWFxcXFhYYHBkYHiggGBolGxUWITEhJSkrLi4uFx8zODMwNygtLisBCgoKDQ0NDw0NDi0ZFRk3KysrKy0rKysrLSstLS0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcEBQgBAwL/xAA8EAABAwICBwYEBAUEAwAAAAABAAIDBBEFIQYHEjFBUWETInGBkaEUMlJyI0JisUNTgpLBM6Ky0RUWY//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8AuBERYaEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEWBjuLR0cD55T3WDcN7nHJrR1JyVJY5rArqouAl7CM7oou7lyL/mcetx4Iq/Ci54wLTCto3XjmL2/milu9jvU3B6ghXFoVpfHiTHWZ2UrLbcV9oWO5zTldqCSoiIgiIgIiICIiAiIgIiICIiAiIgIiICIiDFxTEI6aJ80p2WMbtOPHoAOJJyAVJ4lrIr5ZC+OTsGX7sLQ0gDgHEjvHmVLNdda5sUEIvZ73Pd12RYD1N1Uiqrv1facfHgxTBrKhov3cmyN4uA4OHEeamy5iw6ufTysmjNnRuDh1tvHgRcea6Xoqls0bJG/K9jXt8HAOH7qUfZEWp0pxltFSyTu3tFmN+qQ5MHr7AoitdcOPiWVlIw3bCduQg5GQiwb/S0nzcq6X7mmc9znvO05xLnO5k5kr8KqLcaJYzJR1UUrDkXtZI3g6NzgHD3uOoWnW/0GwZ9XWQhrC5jJGSSu4NYwh2Z6kAAdUHQ5FjZeJdFEEREBERAREQEREBERAREQEREBfl7w0EkgAC5JyAA3kr9KD64MRdDQBjcu3lbE4/oDXSOHnsgeBKK+VfrWomOIjZNNY222hrGm3EFxuR5Zre6O6ZUdcdmKTZk/kyDZf5cHj7SVz0vWPLSHNJaQQWuBsQRmCDwKuC9tZejzq2lvGLywkyMbxcLd5o62zHUKhwV0VoVi7qyjhmebvILXkcXsNifPeoxpvq5bUF09JZkpuXRbmSHjb6XH0KCnCukNEnA0NKRu+Hh/wCDVzlJGWuLXAtc0lrmkWIINiCOBBCuzQzSqjiw2nMtRHGYoxG9jnDbDmEiwZ8xuLEWHFKJZiuIx00T5pXbLGC5P7ADiScgFQumOlUuIyhzrsiZfsob5Nvvcebzz8gs7T/TI4i9rIw5kDDdrTve763Dw3DhmokxhcQ1oLiTYNAJJJ3AAbyg8RTPDdWNfMA54jpweEjrv82sBt4Eqa6M6soKZwknf8S8ZtaW7MYPPZ3u80EB0Z0Cq63ZeW9hCf40m8j9DN7vE2HVXTgGBw0MQihbYb3OObnn6nHiVslX2sTTsUt6amcDPufIM+yvw5bf7KCSaQ6XUdDcTSjtLXELLukPLIfLfm6yr2p1t1BdeOniazg1xc51upFs/BV095cS5xLiTcuJuSeZJzJXiuC1aTW83LtaRw5mOQH2cP8AKl+j2mdHXHZik2ZP5Mg2H+XB/wDSSue0aSCCCQRmCMiDzB4FMHUqKq9XesA3bTVj73sIqhx48GPP7O9VaigIiIgiIgIiICIiAiIgKI60MGfV0JEbS58T2zNaMy4AOa8DmdlxNuilyIOWQvV0JjehVDWOL5IQ153yRnYcTzNsj5hQvSDVSGRvkpZnOLWl3ZSAd6wvYOHHLiqrJ1KYjeOenJ+RzZGjo7I+491Kcb02oaRzo5JtqRuTo4wXlp5G2QPS6oOgrpIXCSGR8TrEB7HFpsd4uOC8pKWSZ4ZGx0j3HJrQXOJ4n3zJQZukuJNqquedrdhskhcG8bWAueptc9StW4gb7BWJg2qmpksaiRkA4sb33+HIH1VjaPaJUlCPwogX8Zn2c8+Z+UdAgpXAdDq2sI7OFzGH+NICxluYvm7yCuDRLQqnw8BwHazWzmcMxzDB+Ue6k5RQERERrdI8XbRU0tQ7PYbdrfqecmN83Ee65ullc9znuN3OcXOPNzjcn1KmutLSQ1VQYGO/BhNrDc6UZOcedtw81CFYoizsGwmaslEMDNp5z5Bo4uceAVi0OqIbP41UdrlG0WHm7egqxFJdK9CqnD7ucBLDewmbuF9wcN7T7KNIPFdmqvSb4qAwSuvNCN53vi3Nd1INmny5qlFstG8WdR1MVQ38ju8PqYcnt8x+wQdJovjR1TJmNkjO0x7Q5ruYK+yiCIiAiIgIiICEooXrZxB8NARGS3tZGxuIyOyQ5zgPHZt5oPvjWsOhpiW9oZnj8sQ2s/u3LX0mtaieQHsmi6locB/aVSy9VxXT1FWRzMbJE8PY4Xa4G4K0OsDH/gaR7m/6kl44ujnA3cftGfjZVtqt0m+EqOwldaGbIEnJkv5XdA75T/StprtqD2lNHwDHut1JA/ZQVlawyBPADeTyHiuhtDNGIsPgaA0ds5rTNIfmLrXLb8Ggm1lV+qXDGT121I0OELDI0Hdt3AafLMjrbkrxVoIiKIIiIC0+luMCipJZzva3ZYOcj+6wepv4ArcKtNdtSRFTRg5Oe95HPZaGj/kUVUufE3PE8zxKIiot7UrRtEE0uW06QMvx2Wi9vUqx1SmrHS6KhMkU5LY5CHCS1w1wFs+hHFXDT4jDI0OZLG5pFwQ9u71UH5xeibUQSxP+V7HNPpvXM722JG+xIv4ZK6tPNOoaeJ8MDxJO5pb3c2xgixJO69twVKKwEREFx6mK8vpZYib9lL3ejXjat4XDlYSqTUjPaWqZzjjeP6XOaf8AkFbagIiIgiIgIiIC0GnGBGupHwtNn5Pj+9mYHnmPNb9EHLs0TmOLXAtc0kOaciCN4K/C6JxzRKjrTtTwAv8A5jSWP/ubv81o26rMPvf8cj6e1y9hf3V1VJLKr8Rmn2TNI6QsaGNLjezRuCuqTVlhpaQIntJ3PEr7jrmSPUKk8RpxFNJGHbYZI9gda1w1xbe3kgsfUjTd6pl6RsHu4/uFayg2p+l2KDbt/qSvPk2zR+ynKg+FdVshjfLIbMY0ucegVG47rCraiRxjmdTxX7kUdgQ3htO3udz4clb+mVC+ooqiKMXe6M7I5kZ287LnV7S0kEEEGxByIPIjgrBIqPTrEYvlqnuHKQNkH+4X91Z+r7Tb/wAgDFMGsqGC5DcmyN4uaCciOLeoKo1TTVJQSSV7ZGg7ELXF7uHeBa1viSd3RBeKqTXc78WmH/zef94Vtqmtc9YHVcUY3xxZn73X/wAKCv0RFQQIiDxeoiAiL6U1O+V7WRtL3uNmtaLklBY+pOhd2lRP+QMbEDzcXB59AB6q2lH9BcCNDSMifbtCS+S31O4dbCw8lIFARERBERAREQEREBFgYvjNPSN26iZkQO7aObujWjNx8AorJrVw8GwE7h9QisPRzgfZFTd97G2+2XjwXL0pJc4u+YucXfdc397q9o9ZOGFu18Q5v6DFLt+QDSD6ql9IauOepmliaWRvkLmtORz33A3XNzbqrBb2qCbaw+30yyD1sVN1VWpbFmgzUrjZziJWDnYbLwOoyPmrVUBRfSnQalxA7btqKX+bHa7h+oHJ3jvUoREV3QapaVhvLPLMPpAbGPMtufcKcYVhcNLGI4I2xsGdm8TzJ3k9SsxePcACSQAMyTkAOaK8lkDQXOIa0Akk5AAZkrnHSnFfi6uaYG7XPOx9gyb7C/mpbrI06bVN+GpXHsr/AIsu7tLbmjjsXzvxy4KvVYM7B8GnrH9nTxOkdxtkGjm5xyaPFSJ+rLEx/Cid0bM2/vZSTU3jUDWSUzi1krn7bb5doLAWB4uFt3LcrRQc7Vuh9fD89JL4tG2PVhKwo8FqnX2aeY23/hvy9l0sF7c8ypo5kjwudxsIJSeXZu/6W1o9CMRl+WkkA+p9mD1cQuhrnmvE0UpR6qa9xHaPgibxO26Q/wBrW2PqrK0V0PpsPF4wXykWdO+20eYHBo6BSFEBEREEREBERAREQFpNMMdFBSvmsC7JsbTxe75fLeT4Ldqs9d8pEVKz8plkcT1awBo9HOPkiqvxLEJamQyzPMjz+Y8ByA4DoFjIioLPocDqp43Sw08kkbL7T2tuBYXP3EDgLr54Phz6qeOCP5pHBo6De5x6BoJ8l0fheHspomQxizI2ho68yepOaDnLAsUNJURVDRtdm4O2fqbYhw82krpSnmbI1r2G7XNDmnm1wBB9CqD050Vkw+YkC8EjiYn8r57B5Ee4U01SaU7bfgpT3mAmFx4sG9nlvHTwQWYiIogqi1qaYdq40UDu40/jvB+dw/hg/SOPM+CnOsDHfgqN72m0j/w4vucDc+QBPkufieefVIrxZNdQywODZY3RuLQ4B3FrhdpHMFYxVt60MEM1FDVsHegjYJBzicGi/wDS4g+BKoqVTLR7WRV0tmyEVMYys898Do/j5qGoguym1p0Dm3eJozxbsbXu02W0otPMNlF/i44/0y3iP+7I+RXP6Jg6G/8AdcNvs/HU9+e3l/da3us+ix2knOzDUwSu+lkrHH0Buual4Wgpg6mRc+6JaX1FDK28j3w3AfE5xc3Z4lt/lI6LoCN4cA4G4IBB6HMKD9IiIgiIgIiICIiAsHGcIhrIjDOzbYc+RBG5zTwIWciCqK7VE/aPY1LdngJGnaHm02K+TdUM3Gqj69x3/atxE1Uc0S0Op8OBLLySuFnTO32+lo/K391InGwJOQAuSdwA3k8gsPGcTjpIJJ5TZkbbm28m9mtHMkkAeKo3SrTepr7sJ7KG+UDDkeW2fz+G7ogkutXSunqI200DxLZ+2+RvyiwIAB4nNV5hta+nljmZ80b2vHWxzHmLjzXwYwuIa3e4ho8XEAe5U11n6MQ0D4OwBa1zC11yTd7LXfnxN1RdFBWMnjZLGdpkjWvaejhcf9eS+6rfUzi+3DJTONzGdtg/Q/5h4bWfmp3jNT2VPNIDYsje4HkQ02UFM608e+Kq+zabxU92N5GQ/wCo72DR9vVQ1C4nM5k5k9TmUVHjl0fg7WVNDE1w2mS07WuHMOZslc4q89VGIdtQMbe7oXOjI5C92+xCUUvjGHOpZ5IH743lt+Y/KfMWKxFaeuLR4WbWsGd2xyjx+R3+PRVYgIiICIiDxdDaA1Xa4fTOO/sw0+LCW/4XPQBOQFycgOZO4Lo/RPDjS0cEJ+ZkY2vuObvcpRtkRFEEREBERAREQEREBERBAtc0jhQsA3OqGbXk17m+49lS66K0ywL4+kkgBDXHZfG47g9hu2/Q5g/cqqwvVlXSSbMrWwMB70pIdl+kD5j42CqsXVvo++rq432/Cge2R7uBc07TGeJIB8Arh0q0dixCExSd1wO1HIN7Hc+oPELKwTCIqOFsMLbMbxObnHi5x4krPUFfau9CZ6CeWWdzD3dhgYb3BNy48twyXz1y4w6KCKnYbdsXF9uMbLZeBcR6KxVSWuGu7SvEY3QxMafuf+IfZzUEHREVBWLqTqrVFRFfJ8TXgdWPsT6PVdKZ6onEYk0DjBMD4Waf3AQXTiVBHURSQyjaZI0scN2R4g8CN4PMBc86T6Py0E5ikzG+OS2T28D48xwK6PWr0hwGCuiMU7bje14yex31NPPpuKg5uRb3SrRSow99pBtxn5J2g7Lh1+k9CtCFR6i8uplojq+qK0iSW8EH1EWe4foaf3OSD86r8DNVWNe5t4oO+88Nr+G3xJztyCvZYWD4VDSRNhgYGMbw3kni5x3uceazVARERBERAREQEREBERAREQEREBERAK5+1kG+KVd/rYPLsY10CqS1vYW6Ku7a3cnY0g/rjaGPHoGnzSKg6IioKban4XHEdobmQSlx+7ZaPc+yhKtrUrhrmxT1DhYSOaxh5hly4+G063kgstERRH5kYHCzgCDvBFx6FaWp0PoJHbTqSEnns2/bet4iDWUWj1JCbxU0LDzDG39Vs0RAREQEREBERAREQEREBERAREQEREBERAWm0s0fZiFO6F/dPzRv+h43Hw4HoVuUQc3Y9o7VULtmoiLR+WQd6N3UOGXkbHotYxpcbAEngALn0C6iewOFiARyIBHoV84qWNpu2NjTzDWg+oCuqpHRLV9U1j9qZr6eAZl7hZ7/ANLGnP8AqOQ4XV2UFGyCNkUbdljAGtbyAWQigIiIgiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiD//Ztps://path-to-bp-logo.png' },
  ]

  const addArtist = async (artist: any) => {
  if (!communities.some(c => c.name === artist.name)) {
    const updated = [...communities, artist];
    setCommunities(updated);
    await AsyncStorage.setItem('communities', JSON.stringify(updated));
  }
  setIsModalVisible(false)
}

  const posts =[
     {id:'p1',
     target:'BTS',
     author:'슈가',
     content:'Its was fun',
     image:'https://i.pinimg.com/736x/2a/74/08/2a74085af9cb76119f514e2e5618eca0.jpg',
     avatar:'https://i.pinimg.com/1200x/39/32/1b/39321b9eefe05af9b9e315240541c128.jpg',
    },
    
     {id: 'p2', 
     target: 'BTS', 
     author: 'hobi', 
     content: 'Hobi found Love (?)',
     image:'https://i.pinimg.com/736x/2f/ef/09/2fef09b4a05290af7704a9856e12b4cf.jpg',
     avatar: 'https://i.pinimg.com/736x/75/27/b2/7527b24dcf521bbf64a1c4bfa5dc3c50.jpg',},

      {id: 'p3', 
     target: 'BTS', 
     author: '지민', 
     content: 'Namjoon ah secretly taking pictures isnt good! But its looks cool,so im posting it anyway ><',
     image:'https://i.pinimg.com/736x/98/81/a2/9881a2c9ce00c8d81af70abf4eea600e.jpg',
     avatar: 'https://i.pinimg.com/1200x/87/b4/76/87b476a25032e1df6d5577baa314c17b.jpg',},

      {id: 'p4', 
     target: 'BTS', 
     author: 'JK', 
     content: 'I want to meet Armys 7 days a week',
     image:'https://i.pinimg.com/1200x/e5/15/f6/e515f6d51daffc28382776d3357bfcf5.jpg',
     avatar: 'https://i.pinimg.com/736x/b6/52/d2/b652d2f36c830f33f88cee697d001c9b.jpg',},
    
     {id: 'p5', 
     target: 'BTS', 
     author: 'RM', 
     content: 'Jin',
     image:'https://i.pinimg.com/736x/6a/ae/99/6aae99c41d391330885c1f0364040689.jpg',
     avatar: 'https://i.pinimg.com/1200x/fd/f4/24/fdf4246e71a0d786b996091d9dd945ac.jpg',},

     
     {id: 'p6',
    target: 'BTS',
    author: '진',
    content: 'Taking a picture with my cat',
    image:'https://i.pinimg.com/1200x/fb/8e/fa/fb8efafdacdff40b0021aa5fa54149d8.jpg',
    avatar: 'https://i.pinimg.com/736x/8e/56/eb/8e56ebf343a6dc9d2c5d8c9bf7fb5260.jpg',},


    {id: 'p7',
    target: 'BTS',
    author: '김태형',
    content: 'Heart',
    image:'https://i.pinimg.com/1200x/88/b3/9b/88b39bf1890b9edf7b3a8a9392b6a381.jpg',
    avatar: 'https://i.pinimg.com/736x/cf/fc/ce/cffcceb1d68101b94593aa923021c098.jpg',},


    {id: 'c1',
    target: 'Cortis',
    author: '주훈',
    content: 'Holy shot',
    image:'https://i.pinimg.com/1200x/16/0f/00/160f00e208f5149fd1d1710675ee0cfd.jpg',
    avatar: 'https://i.pinimg.com/736x/23/f2/c2/23f2c2d41b576fda265c0d9053057040.jpg',},

    {id: 'c2',
    target: 'Cortis',
    author: 'teenboi',
    content: '? What did you say again Sir ?',
    image:'https://i.pinimg.com/1200x/d9/d9/60/d9d960e399ecdda6497c2db462565525.jpg',
    avatar: 'https://i.pinimg.com/736x/47/d4/de/47d4de29e3171258be7655842bae1774.jpg',},

    {id: 'c3',
    target: 'Cortis',
    author: '💫 푸딩보이🍮',
    content: 'Could this picture become legendary? ',
    image:'https://i.pinimg.com/736x/e6/84/6c/e6846cd3f90107c578e4f46b0bd5a61c.jpg',
    avatar: 'https://i.pinimg.com/736x/ec/b1/f7/ecb1f782415658008042b51205f83f0a.jpg',},

    
    {id: 'c4',
    target: 'Cortis',
    author: 'SEONGHYEON',
    content: 'GUYS',
    image:'https://i.pinimg.com/736x/b3/d2/54/b3d25470c336fd47559047cf8df05bbc.jpg',
    avatar: 'https://i.pinimg.com/736x/ee/b7/a7/eeb7a766cc6dffcf5152636b49039c4c.jpg',},

    
    {id: 'c5',
    target: 'Cortis',
    author: 'KEONHO',
    content: 'Found BIG BRO',
    image:'https://i.pinimg.com/736x/09/11/ca/0911cafda473dff2723b8f9a8b2ad8ab.jpg',
    avatar: 'https://i.pinimg.com/736x/a7/80/ac/a780acb571274fd035ce7fcf362e70ef.jpg',},

    {id: 'n1',
    target: 'NewJeans',
    author: 'MINJI',
    content: 'Elevator',
    image:'https://i.pinimg.com/736x/9b/41/95/9b41959e1be13d992ba4e71029034bce.jpg',
    avatar: 'https://i.pinimg.com/736x/71/db/ca/71dbca64e2ef794df559284b055d995c.jpg',},

    {id: 'n2',
    target: 'NewJeans',
    author: 'HANNI',
    content: 'Yo!',
    image:'https://i.pinimg.com/736x/c8/ea/4d/c8ea4d2444ec1ad6dfe296d169148778.jpg',
    avatar: 'https://i.pinimg.com/736x/2a/12/59/2a125988e9bfe906312e0a03df03691a.jpg'},

    {id: 'n3',
    target: 'NewJeans',
    author: 'HAERIN',
    content: 'car sun song(S)',
    image:'https://i.pinimg.com/736x/7d/4c/fa/7d4cfa5dd5c35fcc057357631c4ecd91.jpg',
    avatar: 'https://i.pinimg.com/736x/ea/4e/d2/ea4ed222812d5a178c49fc1cdc229016.jpg'},

    
  {id: 'n4',
  target: 'NewJeans',
  author: 'HYEIN',
  content: 'flash',
  image:'https://i.pinimg.com/736x/6c/78/d3/6c78d3103950ceaef4d0e8444f8817bb.jpg',
  avatar: 'https://i.pinimg.com/736x/92/54/95/9254957b99777fc8dde9445e92f69b67.jpg',},

  {id:'n5',
    target:'NewJeans',
    author:'DANIELLE',
    content:':0',
    image:'https://i.pinimg.com/736x/b8/4e/57/b84e5781b86c31d25395e1e0a057bc8c.jpg',
    avatar:'https://i.pinimg.com/736x/30/3e/65/303e65e1e292687c87e3517d66dd0fbb.jpg'
  }



  ]

  
  const loadCommunities = async () => {
    try {
      const savedData = await AsyncStorage.getItem('communities');
      if (savedData) setCommunities(JSON.parse(savedData));
    } catch (e) {
      console.error(e);
    }
  }

  

  const hasCommunity = (name: string) => communities.some(c => c.name === name)

  const flatListRef = useRef<FlatList>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const [isGoingForward, setIsGoingForward] = useState(true)
  

  //จบ const ทั้งหลาย 

  useFocusEffect(useCallback(() => { loadCommunities(); }, []))
 
 useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex;
      if (isGoingForward) {
        if (currentIndex < banners.length - 1) nextIndex = currentIndex + 1;
        else { setIsGoingForward(false); nextIndex = currentIndex - 1; }
      } else {
        if (currentIndex > 0) nextIndex = currentIndex - 1;
        else { setIsGoingForward(true); nextIndex = currentIndex + 1; }
      }
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, isGoingForward]);

 
  const filteredPosts = posts.filter(post => 
  communities.some(c => c.name.toLowerCase().trim() === post.target.toLowerCase().trim())
)

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
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
          <TouchableOpacity style={styles.addCard} onPress={() => setIsModalVisible(true)}>
            <MaterialCommunityIcons name="plus" size={30} color="#ccc" />
          </TouchableOpacity>
        }
           renderItem={({ item }) => (
          <View style={styles.communityCard}>
            <Image source={{ uri: item.image }} style={styles.communityImage} />
            <Text style={styles.communityName}>{item.name}</Text>
              </View>
             )} 
       /> 
      </View>

     
        <FlatList
        ref={flatListRef} 
        onScrollToIndexFailed={() => {}}
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

    {communities.length === 0 ? (
    <View style={styles.emptyContainer}>
    <MaterialCommunityIcons name="comment-plus-outline" size={50} color="#ccc" />
    <Text style={styles.emptyText}>เลือกศิลปินคนโปรดของคุณ</Text>
    <Text style={styles.emptySubText}>กดปุ่ม + ด้านบนเพื่อเพิ่มศิลปินของคุณ!</Text>
   </View>
   ) : 
   ( 
    <FlatList
  data={filteredPosts}
  scrollEnabled={false}
  renderItem={({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        
        <Image source={{ uri: (item as any).avatar }} style={styles.avatarMini} /> 

     
       
        
        <View>
          <Text style={styles.postAuthor}>{item.author}</Text>
          <Text style={styles.groupTag}>{item.target.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      <Image source={{ uri: (item as any).image }} style={styles.postImage} />

     <View style={styles.interactionBar}> 
        <TouchableOpacity style={styles.interactionButton}>
          <MaterialCommunityIcons name="heart-outline" size={24} color="#ccc" />
          <Text style={styles.interactionText}>10K+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.interactionButton}>
          <MaterialCommunityIcons name="comment-outline" size={24} color="#ccc" />
          <Text style={styles.interactionText}>10K+</Text>
        </TouchableOpacity>
      </View>

    </View>
    
  )}
/>
   )}
 
 


      

      
   
     

      </ScrollView>
      <Modal visible={isModalVisible} transparent animationType="slide">
       <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 15 }}>เลือกศิลปิน</Text>
      
      <FlatList
        data={allArtists}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.artistOption} onPress={() => addArtist(item)}>
            <Image source={{ uri: item.image }} style={styles.artistImage} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      
      <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeBtn}>
        <Text style={{ color: 'red' }}>ปิด</Text>
      </TouchableOpacity>
     </View>
    </View>
    </Modal>
       
    </SafeAreaView>
    


  );
  
  
};




const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' ,padding:10},
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center'},
  headerTitle: { fontSize: 24, fontWeight: 'bold', letterSpacing: -1 },
  addCard: { width: 60, height: 60, borderRadius: 15, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', margin: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc' },
  communityCard: { alignItems: 'center', margin: 10 },
  communityImage: { width: 60, height: 60, borderRadius: 15, backgroundColor: '#eee' },
  communityName: { marginTop: 5, fontSize: 12, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 250 },
  artistOption: { alignItems: 'center', marginHorizontal: 15 },
  artistImage: { width: 60, height: 60, borderRadius: 15, marginBottom: 5 },
  closeBtn: { marginTop: 20, alignItems: 'center' },
  groupTag: { fontSize: 10, color: '#1db954', fontWeight: 'bold' }, 
  
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
    elevation:3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postImage:{
    width:'100%',
    height:400,
    borderRadius:10,
    marginTop:10
  },
  postAuthor:{
    fontWeight:'bold',
    fontSize:16
  },
  avatarMini: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#eee', 
    marginRight: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postContent: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  interactionBar: {
    flexDirection: 'row',
    paddingTop: 12,
    marginTop: 5, 
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  interactionText: {
    marginLeft: 6,      
    color: '#666',      
    fontSize: 14,       
    fontWeight: '500',  
  },

});


export default FeedScreen