import { useNavigation } from '@react-navigation/native'
import { CustomText } from '../CustomText'
import { TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuctionStackParamList } from '../../navigators/RootStackParams'

type auctionScreenProp = StackNavigationProp<AuctionStackParamList, 'AllAuctions'>

export const AddNewAuctionButton = ({ type }: { type: string }) => {
  const navigation = useNavigation<auctionScreenProp>()

  return (
    <TouchableOpacity
      style={{
        marginTop: 15,
        backgroundColor: 'black',
        height: 30,
        paddingHorizontal: 20,
        borderRadius: 45,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        if (type === 'auction') navigation.navigate('NewAuction')
      }}>
      <CustomText style={{ fontSize: 20, color: 'white', marginBottom: 5 }} weight='semi'>
        +
      </CustomText>
    </TouchableOpacity>
  )
}
