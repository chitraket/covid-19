import React, { useEffect, useState } from 'react'
import { StyleSheet, Dimensions, Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Colors } from './color'
import Feather from 'react-native-vector-icons/Feather';
import { Block, Button, TextView} from './components'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const W = Dimensions.get("window").width
const styles = StyleSheet.create({
    img: {
        width: scale(350),
        height: scale(210),
      },
      doctor: {
        position: 'absolute',
        top: moderateScale(100),
        left: verticalScale(40),
        height:scale(240),
        width:scale(160)
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
          <TextView padding={scale(15)} color={color2} style={{fontSize:scale(12)}}>
            {num}
          </TextView>
          <TextView color="gray" h6>
            {title}
          </TextView>
        </Block>
      </Block>
    );
  };
  const ItemField = ({title,title2,color}) => {
    return (
        <Block
          direction="row"
          borderRadius={scale(10)}
          shadow
          color="#fff"
          padding={scale(6)}
          paddingHorizontal={scale(10)}
          style={{marginTop:moderateScale(10)}}
          >
              <TextView size={scale(16)} padding={scale(5)} bold>
              {title}
              </TextView>
          <Block style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TextView size={scale(16)} padding={scale(5)} color={color}>
              {title2}
            </TextView>
            </Block>
        </Block>
    );
  };
const WorldScreen = ({navigation}) => {
    const [info,setInfo] = useState({
        confirmed:null,
        deaths:null,
        recovered:null,
        lastUpdate:null,
        newConfirmed:null,
        newDeaths:null,
        newRecoved:null,
    })
    useEffect(()=>{
        getWorld()
    },[])
    const getWorld = async () => {
         fetch(`https://api.covid19api.com/summary`)
        .then(data=>data.json())
        .then(results => {
            setInfo({
                confirmed:results.Global.TotalConfirmed,
                deaths:results.Global.TotalDeaths,
                recovered:results.Global.TotalRecovered,
                lastUpdate:results.Global.Date,
                newConfirmed:results.Global.NewConfirmed,
                newDeaths:results.Global.NewDeaths,
                newRecoved:results.Global.NewRecovered,
            })
        })
    }
    return (
      <ScrollView style={{flex: 1}}>
        <Block block > 
        <Block height={scale(300)} color={Colors.blue} style={styles.bg}>
            <Block style={styles.wrapperimage}>
                <Image
                style={styles.doctor}
                source={require('./images/coronams.png')} />
                <TextView style={{position: 'absolute', right:scale(30),marginTop:moderateScale(150),width: scale(100)}} color={Colors.white} h5> World</TextView>
            </Block>
            </Block>
            <Block style={styles.containerHeader}>

                <Image style={styles.img} source={require('./images/virus.png')} />
            </Block>
            
            <Block padding={scale(10)}>
            <Block justifyContent="space-between" direction="row">
                <Block>
                    <TextView h6>Case Update</TextView>
                    <Text style={{fontSize:scale(12)}}>Newest update {info.lastUpdate}</Text>
                </Block>
                <Button textColor={Colors.blue1}  onPress={()=> navigation.navigate('WorldInfo')}>See details</Button>
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
          </Block>
          <Block padding={scale(10)}>
            <ItemField
              title="New Confimed"
              title2={info.newConfirmed}
              color={Colors.carot}
            />
            <ItemField
              title="New Recovered"
              title2={info.newRecoved}
              color={Colors.green}
            />
            <ItemField
              title="New Deaths"
              title2={info.newDeaths}
              color={Colors.red}
            />
        </Block>
            </Block>
            </ScrollView>
           
    )
}

export default WorldScreen
