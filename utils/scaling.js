import { Dimensions, PixelRatio } from 'react-native';
import Breakpoints from '../constants/Breakpoints';

const { width, height } = Dimensions.get('window');

export function scaleFont(fontSize) {
  const scaleWidth = width / 375;
  const scaleHeight = height / 667;
  const scale = Math.min(scaleWidth, scaleHeight);
  const adjustedFontSize = Math.round(fontSize * scale);
  
  return PixelRatio.roundToNearestPixel(adjustedFontSize);
}

export function scaleProp(base, type) {
  const device = (width < 375) ? 'tiny'
    : (width < 400) ? 'small'
    : (width < 480) ? 'big'
    : (width < 1040) ? 'tablet'
    : 'desktop';
  const scaleFactor = Breakpoints[device][type];
  const result = Math.round(base * scaleFactor);
  
  return result;
}