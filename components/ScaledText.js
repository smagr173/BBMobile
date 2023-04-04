import { Text as ScaledText } from 'react-native';
import { scaleFont } from '../utils/scaling';

export default function Text(props) {
  const { style, ...otherProps } = props;
  const fontSize = scaleFont(style.fontSize);

  return <ScaledText style={[{ fontSize }, style]} {...otherProps} />;
};