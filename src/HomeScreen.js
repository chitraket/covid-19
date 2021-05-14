import React ,{useState,useEffect} from 'react'
import {  Image, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native'
import { Block, Button, TextView} from './components'
import { Colors } from './color'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const W = Dimensions.get("window").width
import AsyncStorage from '@react-native-community/async-storage'
import Feather from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
    img: {
      width: scale(350),
      height: scale(210),
      },
      doctor: {
        position: 'absolute',
        top: moderateScale(100),
        left: verticalScale(30),
        height:scale(400),
        width:scale(200)
      },
      wrapperimage: {
        position: 'absolute',
        bottom:moderateScale(0),
        alignSelf: 'center',
        width: W,
        height: scale(300),
      },
      bg: {
        position: 'absolute',
        width: moderateScale(1000),
        height: moderateScale(950),
        top: moderateScale(-(930 - W / 2)),
        alignSelf: 'center', 
        borderRadius: scale(1000),
        overflow: 'hidden',
      },
      containerHeader: {
        position: 'relative',
      }, 
})
const ItemDot = ({color1, color2, num, title}) => {
    return (
      <Block block>
        <Block middle>
          <Block
            width={scale(30)}
            height={scale(30)}
            middle
            centered
            borderRadius={scale(30)}
            color={color1}>
            <Block
              width={scale(20)}
              height={scale(20)}
              borderWidth={scale(4)}
              borderRadius={scale(20)}
              borderColor={color2}
            />
          </Block>
          <TextView padding={scale(15)} color={color2} >
            {num}
          </TextView>
          <TextView color="gray" h6>
            {title}
          </TextView>
        </Block>
      </Block>
    );
  };
const HomeScreen =  ({ navigation, route }) => {
  var city_var= route.params.city
    const [info,setInfo] = useState({
        confirmed:null,
        deaths:null,
        recovered:null,
        lastUpdate:null,
        detail:null,
        city:null,
        error:null,
    })
    useEffect(()=>{
      if(city_var !== ""){
        getInfo()
    }
    },[city_var])
    const getInfo = async () => {
        var MyCity = await AsyncStorage.getItem("newcity")
        if(!MyCity){
          const {city} = route.params
          MyCity = city 
        }
         fetch(`https://covid19.mathdro.id/api/countries/${MyCity}`)
        .then(data=>data.json())
        .then(results=>{
            if(results.error){
                setInfo({
                    confirmed:null,
                    deaths:null,
                    recovered:null,
                    lastUpdate:null,
                    detail:null,
                    city:MyCity,
                    error:results.error.message
                })
            }
            return results;
        })
        .then(results => {
            setInfo({
                confirmed:results.confirmed.value,
                deaths:results.deaths.value,
                recovered:results.recovered.value,
                lastUpdate:results.lastUpdate,
                detail:results.confirmed.detail,
                city:MyCity,
                error:null
            })
        })
        .catch(error => {
          Alert.alert(
            "Sorry,something went wrong. Please try again",
            error.message,
            [
              {
                text:"Try Again",
                onPress: getInfo()
              }
            ]
          )
        })
    }
    return (
      <ScrollView style={{flex: 1}}>
        <Block block> 
            <Block height={scale(300)} color={Colors.blue} style={styles.bg}>
                <Block style={styles.wrapperimage}>
                    <Image
                    style={styles.doctor}
                    source={require('./images/Drcorona.png')} />
                    <TextView style={{position: 'absolute', right:scale(30),marginTop:moderateScale(150),width: scale(150)}} color={Colors.white} h5>{`All you need is stay at home`} </TextView>
                </Block>
                </Block>
                <Block style={styles.containerHeader}>
                    <Image style={styles.img} source={require('./images/virus.png')} />
                </Block>
                <Block>
          <Button
            color="#fff"
            borderWidth={scale(1)}
            borderColor="#f0f0f0"
            margin={scale(10)}
            borderRadius={scale(30)}>
            <Block direction="row" paddingHorizontal={scale(15)} middle>
              <Feather name="map-pin" size={scale(16)} color={Colors.blue1} />
              <Block block padding={scale(10)}>
                <TextView h6>{info.city}</TextView> 
              </Block>
            </Block>
          </Button>
        </Block> 
        {info.error === null ?  
        <Block padding={scale(10)}>
            <Block justifyContent="space-between" direction="row">
                <Block>
                    <TextView h6>Case Update</TextView>
                    <TextView style={{fontSize:scale(12)}}>Newest update {info.lastUpdate}</TextView>
                </Block>
                <Button textColor={Colors.blue1} onPress={()=> navigation.push('State',{detail:info.detail,country:info.city})}>See details</Button>
            </Block>
        <Block
            color="#fff"
            borderRadius={scale(8)}
            padding={scale(10)}
            shadow
            style={{marginTop: moderateScale(10)}}
            direction="row">
            <ItemDot
              color1={Colors.carot_op}
              color2={Colors.carot}
              num={info.confirmed}
              title={'Confirmed'}
            />
            <ItemDot
              color1={Colors.green_op}
              color2={Colors.green}
              num={info.recovered}
              title={'Recovered'}
            />
            <ItemDot
              color1={Colors.red_op}
              color2={Colors.red}
              num={info.deaths}
              title={'Deaths'}
            />
          </Block> 
          </Block> : <TextView margin={scale(20)}>{info.error}</TextView> }
          
          </Block>
          </ScrollView>
    )
}

export default HomeScreen
