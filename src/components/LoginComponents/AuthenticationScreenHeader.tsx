import { View, Image } from 'react-native'
import { CustomText } from '../CustomText'

export const AuthenticationScreenHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 70,
        justifyContent: 'center',
      }}>
      <CustomText style={{ fontSize: 26 }} weight='semi'>
        Auction
      </CustomText>
    </View>
  )
}
