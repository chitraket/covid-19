import React ,{useState,useEffect}from 'react'
import { View, Text, StyleSheet, Dimensions, Image, FlatList, ActivityIndicator } from 'react-native'
import { Colors } from './color'
import Feather from 'react-native-vector-icons/Feather';
import { Block, Button, TextView} from './components'
const W = Dimensions.get("window").width
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({  
  img: {
    width: scale(350),
    height: scale(205),
    },
    doctor: {
      position: 'absolute',
      top: moderateScale(110),
      left: verticalScale(20),
      height:scale(200),
      width:scale(190)
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
const ItemDot = ({ color2, num, title}) => {
    return (
      <Block block>
        <Block middle>
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
const StateScreen = (props) => {
    const { navigation ,route } = props;
    const {detail,country} = route.params;
    const [info,setInfo] = useState([])
    useEffect(()=>{
            getState()
    },[])
    const getState = async () => {
         fetch(`${detail}`)
        .then(data=>data.json())
        .then(results => { 
            setInfo(results)
        })
    }
    if(info === null ){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator color="red" size="large" />
            </View>
        )
    }
    return (
        <Block block> 
        <Block height={scale(300)} color={Colors.blue} style={styles.bg}>
            <Block style={styles.wrapperimage}>
                <Image
                style={styles.doctor}
                source={require('./images/Vaccine.png')} />
                <TextView style={{position: 'absolute', right:scale(20),marginTop:moderateScale(150),width: scale(110)}} color={Colors.white} h5>{country} </TextView>
            </Block>
            </Block>
            <Block style={styles.containerHeader}>
                <Image style={styles.img} source={require('./images/virus.png')} />
            </Block>
            <FlatList
            data={info}
            style={{paddingLeft:moderateScale(10),paddingRight:moderateScale(10)}}
            renderItem={({item})=>{
      return (  
         <Block
            color="#fff"
            borderRadius={scale(10)}
            padding={scale(10)}
            shadow
            style={{marginTop: verticalScale(10)}}
            >
                 <TextView h6 style={{alignSelf:'center',marginBottom:verticalScale(5)}}>{item.provinceState}</TextView>
        <Block direction="row">
            <ItemDot
              color1={Colors.carot_op}
              color2={Colors.carot}
              num={item.confirmed}
              title={'Confirmed'}
            />
            <ItemDot
              color1={Colors.green_op}
              color2={Colors.green}
              num={item.recovered}
              title={'Recovered'}
            />
            <ItemDot
              color1={Colors.red_op}
              color2={Colors.red}
              num={item.deaths}
              title={'Deaths'}
            />
            </Block>
          </Block> 
      )
  }}
  keyExtractor={item=>item.provinceState}/>
        </Block>
    )
}

export default StateScreen
