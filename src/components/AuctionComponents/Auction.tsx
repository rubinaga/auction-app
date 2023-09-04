import { View, TouchableOpacity } from 'react-native'
import { memo } from 'react'
import { CustomText } from '../CustomText'
import { IAuction } from '../../helpers/interfaces'
import { daysLeftFromThisMoment, formatDate } from '../../helpers/helperFunctions'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuctionStackParamList } from '../../navigators/RootStackParams'
type auctionScreenProp = StackNavigationProp<AuctionStackParamList, 'AllAuctions'>

const Auction = ({ auctionName, dateSet, bid, description, id, owner, ended }: IAuction) => {
  const navigation = useNavigation<auctionScreenProp>()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('NewAuction', {
          auction: {
            owner: owner,
            auctionName: auctionName,
            dateSet: dateSet,
            bid: bid,
            description: description,
            id: id,
            ended: ended,
          },
        })
      }}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.37)',
      }}>
      <View style={{ flexDirection: 'column', paddingBottom: 10, marginTop: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 5,
            alignItems: 'center',
          }}>
          <CustomText weight='medium' style={{ fontSize: 16 }}>
            {auctionName}
          </CustomText>
        </View>
        <CustomText weight='medium' style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.53)' }}>
          {daysLeftFromThisMoment(dateSet)}
        </CustomText>
      </View>
      <View style={{ flexDirection: 'column', paddingBottom: 10, marginTop: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 5,
            alignItems: 'center',
          }}>
          <CustomText weight='medium' style={{ fontSize: 16 }}>
            Owner
          </CustomText>
        </View>
        <CustomText weight='medium' style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.53)' }}>
          {owner?.name + ' ' + owner?.surname}
        </CustomText>
      </View>
      <View style={{ flexDirection: 'column', paddingBottom: 10, marginTop: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 5,
            alignItems: 'center',
          }}>
          <CustomText weight='medium' style={{ fontSize: 16 }}>
            Top Bid
          </CustomText>
        </View>
        <CustomText weight='medium' style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.53)' }}>
          ${bid.bidAmount}
        </CustomText>
      </View>
    </TouchableOpacity>
  )
}

export default memo(Auction)
