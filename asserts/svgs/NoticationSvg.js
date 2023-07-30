import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend, G } from 'react-native-svg';

const NotificationSvg = () => {
  return (
    <View style={styles.container}>
      <Svg width="26" height="32" viewBox="0 0 26 32" fill="none">
        <G filter="url(#filter0_d_525_132)">
          <Path d="M13.02 3.41C9.71 3.41 7.02 6.1 7.02 9.41V12.3C7.02 12.91 6.76 13.84 6.45 14.36L5.3 16.27C4.59 17.45 5.08 18.76 6.38 19.2C10.69 20.64 15.34 20.64 19.65 19.2C20.86 18.8 21.39 17.37 20.73 16.27L19.58 14.36C19.28 13.84 19.02 12.91 19.02 12.3V9.41C19.02 6.11 16.32 3.41 13.02 3.41Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
          <Path d="M14.87 3.7C14.56 3.61 14.24 3.54 13.91 3.5C12.95 3.38 12.03 3.45 11.17 3.7C11.46 2.96 12.18 2.44 13.02 2.44C13.86 2.44 14.58 2.96 14.87 3.7Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M16.02 19.56C16.02 21.21 14.67 22.56 13.02 22.56C12.2 22.56 11.44 22.22 10.9 21.68C10.36 21.14 10.02 20.38 10.02 19.56" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" />
        </G>
        <Defs>
          <Filter id="filter0_d_525_132" x="0.223915" y="1.69" width="25.5428" height="29.62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <FeFlood floodOpacity="0" result="BackgroundImageFix" />
            <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <FeOffset dy="4" />
            <FeGaussianBlur stdDeviation="2" />
            <FeComposite in2="hardAlpha" operator="out" />
            <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_525_132" />
            <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_525_132" result="shape" />
          </Filter>
        </Defs>
      </Svg>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 32,
  },
});

export default NotificationSvg;
