import React ,{ useState } from 'react'
import { View, Text, Dimensions, SafeAreaView, FlatList } from 'react-native'
import { Card, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
const W = Dimensions.get("window").width
const SearchScreen = ({navigation}) => {
    const [currency,setCurrency] = useState('')
    const [currencys,setCurrencys] = useState([])
    const fetchCurrency = (text) => {
        setCurrency(text)
        fetch(`https://restcountries.eu/rest/v2/name/${text}`)
        .then(res=>res.json())
        .then(data=>{setCurrencys(data.slice(0,10))})
    }
    const listClick = async (cityname) => {
        await AsyncStorage.setItem("newcity",cityname) 
        navigation.navigate('root', {
            screen: 'Home',
            params: { city: cityname },
          });
    }
    return (
        <SafeAreaView>
        <View style={{margin:10}}>
            <Searchbar
      placeholder="Search"
      onChangeText={(text)=>fetchCurrency(text)}
      value={currency}
      style={{marginBottom:20}}
    />
  <FlatList 
  data={currencys}
  renderItem={({item})=>{
      return (
         <Card 
         style={{margin:2,padding:12}}
         onPress={()=>listClick(item.name)}
         ><Text>{item.name}</Text></Card> 
      )
  }}
  keyExtractor={item=>item.name}/>
        </View>
        </SafeAreaView>
    )            
}

export default SearchScreen
