// Handles dark & light theme detection
import { Text as DefaultText, View as DefaultView, Pressable as Press } from 'react-native';
import useThemeColor from '../utils/useThemeColor';
import { scaleFont } from '../utils/scaling';

export function Text(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const fontSize = scaleFont(style.fontSize);

  return <DefaultText style={[{ color, fontSize }, style]} {...otherProps} />;
}

export function View(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Button(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const disabled = props.disabled ?? false;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'btnBackground');

  const getOpacity = (pressed) => {
    if (disabled) return 0.75;
    if (pressed) return 0.85;
    return 1;
  };

  return <Press unstable_pressDelay={160} style={({pressed}) => [{backgroundColor, opacity: getOpacity(pressed)}, style]} {...otherProps} />;
}
