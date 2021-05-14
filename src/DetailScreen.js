import React from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView, Text} from 'react-native';
import {Block, Button, TextView} from './components';
import {Colors} from './color';
import Feather from 'react-native-vector-icons/Feather';
const W = Dimensions.get('window').width;
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    img: {
      width: scale(350),
      height: scale(210),
      },
  doctor: {
    position: 'absolute',
        top: moderateScale(110),
        left: verticalScale(-20),
        height:scale(300),
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

  img_item: {
    width: scale((1.2 * W) / 3),
    height:scale((1.2 * W) / 3),
  },
  field_con: {
    position: 'absolute',
    width:scale((2 * W) / 3),
    left: scale(W / 3 + 10),
    top:verticalScale(10),
    paddingVertical: scale(5),
  },
  textDesc: {
    lineHeight: scale(20),
    marginTop: verticalScale(10),
    marginRight:moderateScale(20),
    maxWidth: scale((2 * W) / 3.4),
  },
  btn: {
    position: 'absolute',
    bottom: verticalScale(10),
    right: scale(10),
  },
});

const Item = ({icon, title}) => {
    return (
      <Block block centered>
        <Button middle shadow color="#fff" padding={scale(10)} borderRadius={scale(12)}>
          <Image source={icon} />
          <TextView bold center>
            {title}
          </TextView>
        </Button>
      </Block>
    );
  };
  const ItemField = ({icon, title, desc}) => {
    return (
      <Button>
        <Block
          direction="row"
          borderRadius={scale(10)}
          shadow
          color="#fff"
          padding={scale(6)}
          paddingHorizontal={verticalScale(10)}
          style={{marginTop:verticalScale(10)}}>
          <Image style={styles.img_item} resizeMode="contain" source={icon} />
          <Block padding={scale(10)} style={styles.field_con}>
            <TextView size={scale(16)} bold>
              {title}
            </TextView>
            <TextView style={styles.textDesc} size={scale(12)}>{desc}</TextView>
          </Block>
        </Block>
      </Button>
    );
  };
  
const DetailScreen = ({navigation}) => {
  return (
    <ScrollView>
      <Block block color="#fafafa">
        <Block height={scale(300)} color={Colors.blue} style={styles.bg}>
          <Block style={styles.wrapperimage}>
            <Image
              style={styles.doctor}
              source={require('./images/coronadr.png')}
            />
            <TextView style={{position: 'absolute', right:scale(30),marginTop:moderateScale(150),width: scale(150)}} color={Colors.white} h5>{`Get to know \nAbout Covid-19`} </TextView>
          </Block>
        </Block>
        <Block style={styles.containerHeader}>
        <Image style={styles.img} source={require('./images/virus.png')} />
        </Block>
        <Block padding={scale(10)}>
          <TextView h6>Symptomps</TextView>
          <Block direction="row" paddingVertical={scale(10)}>
            <Item icon={require('./images/headache.png')} title="Headache" />
            <Block width={scale(10)} />
            <Item icon={require('./images/caugh.png')} title="Caugh" />
            <Block width={scale(10)} />
            <Item icon={require('./images/fever.png')} title="Fever" />
          </Block>
        </Block>
        <Block padding={scale(10)}>
          <TextView h6>Prevention</TextView>
          <Block>
            <ItemField
              title="Wear face mask"
              desc="Since the start of the coronavirus outbreak some places have fully embraced wearing face masks, and anyone caught without one risks becoming a social pariah."
              icon={require('./images/wear_mask.png')}
            />
           
          </Block>
        </Block>
      </Block>
      </ScrollView>
  );
};

export default DetailScreen;