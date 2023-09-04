import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomText } from '../components/CustomText'
import { TouchableOpacity, TextInput, View, Image, ScrollView, StyleSheet } from 'react-native'
import { useBoundStore } from '../store'
import { useRef, useState } from 'react'
import { LeftArrowSvgComponent } from '../components/TabSvg'
//@ts-ignore
import FlagWhite from '../assets/images/flag-white.png'
//@ts-ignore
import FlagYellow from '../assets/images/flag-yellow.png'
//@ts-ignore
import Garbage from '../assets/images/bin.png'

import { COLORS } from '../helpers/constants'
import { combineDateAndTime, formatDate, formatTime } from '../helpers/helperFunctions'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-root-toast'
import DeleteAuctionModal from '../modals/DeleteAuctionModal'
import DateTimePicker from '@react-native-community/datetimepicker'
import { IAuction } from '../helpers/interfaces'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuctionStackParamList } from '../navigators/RootStackParams'

type auctionScreenProp = StackNavigationProp<AuctionStackParamList, 'NewAuction'>

export const NewAuction = ({ route }: any) => {
  const navigation = useNavigation<auctionScreenProp>()
  const auction: IAuction = route.params?.auction
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const store = useBoundStore()
  const currentAccount = store.currentAccount
  // const auctions = store.auctions
  const [openKeyboardOnFocus, setOpenKeyboardOnFocus] = useState(false)
  const [dateChosen, setDateChosen] = useState<number>(auction?.dateSet)
  const [timeChosen, setTimeChosen] = useState<any>(auction?.dateSet)
  const [dateOpen, setDateOpen] = useState<boolean>(false)
  const [timeOpen, setTimeOpen] = useState<boolean>(false)
  const [bidToPlace, setBidToPlace] = useState<number>()
  const dateNow = new Date()
  const inputRef = useRef<any>()

  const bidText = auction ? 'Place your bid' : 'Initial bid price:'

  const editableAuction: boolean =
    auction?.owner?.id !== undefined ? store.currentAccount?.id === auction?.owner?.id : true
  const [description, setDescription] = useState<string | undefined>(auction?.description)
  const [auctionName, setAuctionName] = useState<string | undefined>(auction?.auctionName)

  // const canPlaceBid = () => {
  //   return bidToPlace && currentAccount && bidToPlace > auction.bid.bidAmount && bidToPlace < currentAccount.balance
  // }

  const [balanceError, setBalanceError] = useState('')
  const [requirementsError, setRequirementsError] = useState('')

  const changeFocus = () => {
    inputRef?.current?.blur()
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 0)

    setOpenKeyboardOnFocus(true)
  }

  const canOutbid = () => {
    return bidToPlace && bidToPlace > auction.bid.bidAmount
  }

  const hasEnoughBalance = () => {
    return currentAccount && bidToPlace && bidToPlace < currentAccount.balance
  }

  const fulfillsAuctionCriteria = () => {
    if (auctionName && auctionName?.length > 3 && description && description.length > 10) {
      return true
    }
    setRequirementsError(
      `Description must be at least 10 characters long${'\n'}Title must be at least 3 characters long`,
    )
    return false
  }

  const handleAuctionModification = () => {
    if (auction.owner.id === store.currentAccount?.id && fulfillsAuctionCriteria()) {
      modifyAuction()
    } else if (auction.owner.id !== store.currentAccount?.id) {
      handleBidding()
    }
  }

  const modifyAuction = () => {
    store.modifyAuction({
      id: auction.id,
      owner: store.currentAccount,
      auctionName: auctionName,
      description: description,
      dateSet: combineDateAndTime(dateChosen, timeChosen),
      bid: { bidPlacer: currentAccount, bidAmount: bidToPlace ? bidToPlace : auction.bid.bidAmount },
    })
    store.changeShowToast(true, 'Auction modified!')
  }

  const handleBidding = () => {
    if (canOutbid() && hasEnoughBalance()) {
      placeBid()
    } else if (!canOutbid()) {
      setBalanceError('You must exceed the current bid')
    } else if (!hasEnoughBalance()) {
      setBalanceError('You do not have enough balance to bid in this auction')
    }
  }

  const placeBid = () => {
    store.placeAuctionBid(auction.id, bidToPlace, currentAccount)
    store.changeShowToast(true, 'Bid placed!')
  }

  const addAuction = () => {
    store.addAuction({
      id: 0, //overwritten in the store
      owner: store.currentAccount,
      auctionName: auctionName,
      description: description,
      dateSet: combineDateAndTime(dateChosen, timeChosen),
      bid: { bidPlacer: currentAccount, bidAmount: bidToPlace ? bidToPlace : 100 },
    })
    store.changeShowToast(true, 'Auction added!')
  }

  return (
    <>
      <ScrollView>
        <SafeAreaView style={styles.safeAreaViewStyle}>
          <TouchableOpacity onPress={() => navigation.navigate('AllAuctions')} style={styles.backNavigation}>
            <LeftArrowSvgComponent />
            <CustomText weight='medium'>All auctions</CustomText>
          </TouchableOpacity>
          {requirementsError && <CustomText style={{ color: 'red' }}>{requirementsError}</CustomText>}
          <TextInput
            editable={editableAuction}
            value={auctionName}
            ref={inputRef}
            showSoftInputOnFocus={openKeyboardOnFocus}
            autoFocus={auction ? false : true}
            onPressIn={changeFocus}
            style={styles.auctionTitle}
            placeholder='New Auction...'
            onChangeText={(e) => setAuctionName(e)}
          />

          <View style={styles.viewContainerStyle}>
            <CustomText weight='semi' style={{ fontSize: 16 }}>
              Date
            </CustomText>
            <TouchableOpacity
              onPress={() => setDateOpen(true)}
              style={{
                backgroundColor: dateChosen === undefined ? 'black' : 'white',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 30,
              }}>
              {dateChosen === undefined ? (
                <CustomText style={{ color: 'white', fontSize: 14 }}>Set Date</CustomText>
              ) : (
                <CustomText style={{ color: 'rgba(0,0,0, 0.53)', fontSize: 14 }}>{formatDate(dateChosen)}</CustomText>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.viewContainerStyle}>
            <CustomText weight='semi' style={{ fontSize: 16 }}>
              Time
            </CustomText>
            <TouchableOpacity
              onPress={() => setTimeOpen(true)}
              style={{
                backgroundColor: timeChosen === undefined ? 'black' : 'white',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 30,
              }}>
              {timeChosen === undefined ? (
                <CustomText style={{ color: 'white', fontSize: 14 }}>Set Time</CustomText>
              ) : (
                <CustomText style={{ color: 'rgba(0,0,0, 0.53)', fontSize: 14 }}>{formatTime(timeChosen)}</CustomText>
              )}
            </TouchableOpacity>
          </View>

          <CustomText weight='semi' style={{ fontSize: 16, marginTop: 25 }}>
            Description
          </CustomText>
          <TextInput
            editable={editableAuction}
            style={{
              textAlignVertical: 'top',
              paddingTop: 15,
              marginTop: 20,
              backgroundColor: COLORS.backgroundShade,
              borderRadius: 25,
              paddingHorizontal: 20,
              fontSize: 16,
            }}
            placeholder={'Insert here...'}
            multiline={true}
            numberOfLines={8}
            onChangeText={(text) => {
              if (text.length <= 90) setDescription(text)
            }}
            value={description}
          />
          {balanceError !== '' && <CustomText style={{ marginTop: 15, color: 'red' }}>{balanceError}</CustomText>}
          {auction?.bid && (
            <CustomText style={{ marginTop: 15 }}>
              Current bid : ${auction.bid.bidAmount} by {auction.bid.bidPlacer.name} {auction.bid.bidPlacer.surname}
            </CustomText>
          )}
          {auction?.owner && (
            <CustomText>
              Created by {auction.owner?.name} {auction.owner?.surname}
            </CustomText>
          )}
          {auction?.owner?.id !== currentAccount?.id && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, gap: 10 }}>
              <CustomText>{bidText}</CustomText>
              <TextInput
                keyboardType='numeric'
                // editable={auction.bid.}
                style={{
                  backgroundColor: COLORS.backgroundShade,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 20,
                  fontSize: 16,
                }}
                placeholder={'Bid here...'}
                onChangeText={(bidNumber) => {
                  setBidToPlace(+bidNumber)
                }}
                value={bidToPlace ? '' + bidToPlace : undefined}
              />
            </View>
          )}

          <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
            {editableAuction && (
              <TouchableOpacity
                onPress={() => {
                  setIsDeleteModalVisible(true)
                }}
                style={{
                  marginTop: 35,
                  alignSelf: 'center',
                  alignItems: 'center',
                  gap: 7,
                  flexDirection: 'row',
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#EE5F5F',
                  paddingVertical: 7,
                  paddingHorizontal: 25,
                }}>
                <Image source={Garbage} />
                <CustomText style={{ color: '#EE5F5F', fontSize: 18 }} weight='medium'>
                  Delete
                </CustomText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                if (!fulfillsAuctionCriteria()) {
                  return
                }
                if (!dateChosen || !timeChosen) {
                  setRequirementsError(`You must set a date for your auction`)
                  return
                }
                if (auction) {
                  handleAuctionModification()
                } else {
                  addAuction()
                }
                navigation.goBack()
              }}
              style={{
                backgroundColor: COLORS.themeColor,
                marginTop: 35,
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 20,
                paddingVertical: 7,
                paddingHorizontal: 45,
              }}>
              <CustomText style={{ color: 'black', fontSize: 18 }} weight='semi'>
                Save
              </CustomText>
            </TouchableOpacity>
          </View>
          {dateOpen && (
            <DateTimePicker
              disabled={editableAuction}
              mode='date'
              display='spinner'
              minimumDate={dateNow}
              value={dateNow}
              onChange={(event) => {
                if (event.type == 'set') {
                  setDateChosen(event.nativeEvent.timestamp!)
                }
                setDateOpen(false)
              }}
            />
          )}
          {timeOpen && (
            <DateTimePicker
              disabled={editableAuction}
              mode='time'
              display='spinner'
              minimumDate={dateNow}
              value={dateNow}
              onChange={(event) => {
                if (event.type == 'set') {
                  setTimeChosen(event.nativeEvent.timestamp!)
                }
                setTimeOpen(false)
              }}
            />
          )}
        </SafeAreaView>
      </ScrollView>
      <DeleteAuctionModal
        modalVisible={isDeleteModalVisible}
        setModalVisible={setIsDeleteModalVisible}
        auctionName={auctionName}
        auctionId={auction?.id}
      />
    </>
  )
}

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    marginHorizontal: 35,
  },
  backNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  auctionTitle: {
    marginTop: 20,
    fontSize: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.37)',
    fontFamily: 'InterMedium',
  },
  viewContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '80%',
  },
})
