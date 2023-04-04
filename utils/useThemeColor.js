import { useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

export default function useThemeColor(props) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}