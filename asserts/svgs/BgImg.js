import { Svg, Rect, LinearGradient, Stop, Defs } from 'react-native-svg';

const BackgroundSvg = () => {
  return (
    <Svg width={360} height={107} viewBox="0 0 360 107" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect width={360} height={107} fill="url(#paint0_linear_493_318)" />
      <Defs>
        <LinearGradient id="paint0_linear_493_318" x1={174.5} y1={-60} x2={175.5} y2={130} gradientUnits="userSpaceOnUse">
          <Stop offset="0.429101" stopColor="#C6FFEC" />
          <Stop offset="1" stopColor="#E3FFF6" stopOpacity="0" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default BackgroundSvg;
