import { StyleSheet, View, Pressable as DefaultBtn} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useThemeColor from '../utils/useThemeColor';
import { scaleProp, scaleFont } from '../utils/scaling';

import ScaledText from './ScaledText';

export default function StyledBtn(props) {
  const { title, isDisabled, lightColor, darkColor, icon, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'btnBackground');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const styles = useStyle(color, backgroundColor);

  const getOpacity = (pressed) => {
    if (isDisabled) return 0.75;
    if (pressed) return 0.85;
    return 1;
  };

  const ButtonIcon = (props) => {
    return <View style={styles.iconWrapper}><FontAwesome size={scaleFont(14)} {...props} /></View>
  };

  return (
    <DefaultBtn
      disabled={isDisabled ?? false}
      unstable_pressDelay={160}
      style={({pressed}) => [styles.btnContainer, { opacity: getOpacity(pressed) }]} {...otherProps}>
      <View style={styles.titleContainer}>
        <ScaledText style={styles.btnTitle}>{title}</ScaledText>
        {(icon) && <ButtonIcon name={icon} color={color} style={{ marginLeft: scaleFont(4) }}/>}
      </View>
    </DefaultBtn>
  );
}

const useStyle = (color, backgroundColor) => StyleSheet.create({
  btnContainer: {
    paddingVertical: scaleProp(10, 'any'),
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    backgroundColor
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  iconWrapper: {
    justifyContent: 'center',
  },
  btnTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color
  },
});