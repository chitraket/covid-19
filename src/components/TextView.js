import React from 'react';
import {View, Text} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

/**
 * define props
 * margin
 * padding
 * bgColor => background color for text
 * color => color of text
 * size => fontSize
 * bold => if text is bold
 * define heading size
 * vv.....
 */

const TextView = ({
  margin,
  padding,
  bgColor,
  color,
  size,
  bold,
  center,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  style,
  children,
  ...props
}) => {
  const styleComponet = [
    {fontSize: 14}, // default h6
    margin && {margin},
    padding && {padding},
    bgColor && {backgroundColor: bgColor},
    color && {color},
    size && {fontSize: size},
    bold && {fontWeight: 'bold'},
    h1 && {fontSize: scale(44), fontWeight: 'bold'},
    h2 && {fontSize: scale(38), fontWeight: 'bold'},
    h3 && {fontSize: scale(32), fontWeight: 'bold'},
    h4 && {fontSize: scale(28), fontWeight: 'bold'},
    h5 && {fontSize: scale(22), fontWeight: 'bold'},
    h6 && {fontSize: scale(18), fontWeight: 'bold'},
    center && {textAlign: 'center'},
    style,
  ];
  return (
    <Text style={styleComponet} {...props}>
      {children}
    </Text>
  );
};

export default TextView;
