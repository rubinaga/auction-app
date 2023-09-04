import { Text } from 'react-native'
import { useFonts } from 'expo-font'

export const CustomText = ({
  children,
  style,
  weight = 'default',
  onPress,
}: any) => {
  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
    InterSemi: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
  })

  if (!fontsLoaded) {
    return null
  }
  let fontWeight = 'Inter'

  switch (weight) {
    case 'semi':
      fontWeight = 'InterSemi'
      break
    case 'medium':
      fontWeight = 'InterMedium'
      break
    default:
      fontWeight = 'Inter'
  }
  //   const fontWeight = weight === 'semi' ? 'InterSemi' : 'Inter'

  return (
    <Text style={[{ fontFamily: fontWeight }, style]} onPress={onPress}>
      {children}
    </Text>
  )
}
