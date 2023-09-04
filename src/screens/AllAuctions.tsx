import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomText } from '../components/CustomText'
import { View, ScrollView } from 'react-native'
import { AddNewAuctionButton } from '../components/AuctionComponents/AddNewAuctionButton'
import { useBoundStore } from '../store'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import Toast from 'react-native-root-toast'
import { AuctionStackParamList } from '../navigators/RootStackParams'
import { StackNavigationProp } from '@react-navigation/stack'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import Auction from '../components/AuctionComponents/Auction'
import { IAuction } from '../helpers/interfaces'
import { EmptyAuctionSvg } from '../assets/svgContainer'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type auctionScreenProp = StackNavigationProp<AuctionStackParamList, 'AllAuctions'>

const renderItemFunction: ListRenderItem<IAuction> = ({ item }) => (
  <Auction
    owner={item.owner}
    auctionName={item.auctionName}
    description={item.description}
    bid={item.bid}
    dateSet={item.dateSet}
    id={item.id}
    ended={false}
    key={item.id}
  />
)

const emptyListComponent = () => {
  return (
    <View style={styles.emptyListComponent}>
      <EmptyAuctionSvg />
      <CustomText style={styles.emptyListComponentText}>No auctions available</CustomText>
    </View>
  )
}

export const AllAuctions = () => {
  const insets = useSafeAreaInsets()
  const store = useBoundStore()
  const navigation = useNavigation<auctionScreenProp>()
  const [auctions, setAuctions] = useState<IAuction[] | null>(null)
  const showToast = store.showToast
  const toastMessage = store.toastMessage
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = useState(false)

  const checkForFinishedAuctions = () => {
    const currentDate = new Date().getTime()
    const endedAuctions = store.auctions.filter((auction) => new Date(auction.dateSet).getTime() < currentDate)
    const accounts = store.accounts

    endedAuctions.forEach((auction) => {
      const winner = auction.bid.bidPlacer
      const bidAmount = auction.bid.bidAmount
      const owner = auction.owner

      const updatedAccounts = accounts
        .filter((account) => account.id === winner.id && auction.ended === false && winner.id !== owner.id)
        .map((account) => {
          return { id: account.id, balance: -bidAmount }
        })

      const ownerUpdatedAccounts = accounts
        .filter((account) => account.id === owner.id && auction.ended === false && winner.id !== owner.id)
        .map((account) => {
          return { id: account.id, balance: bidAmount }
        })

      store.setAccountBalance(updatedAccounts.concat(ownerUpdatedAccounts))
    })
    store.clearAuctions()
  }

  useEffect(() => {
    if (isFocused) {
      checkForFinishedAuctions()
      setAuctions(store.getFilteredAuctions().sort((a: IAuction, b: IAuction) => a.dateSet - b.dateSet))
      if (showToast) {
        setTimeout(() => {
          store.changeShowToast(false)
        }, 2500)
      }
    }
  }, [isFocused, showToast])

  // would mock getting info from API and updating the state of auctions by getting the latest updated auctions
  // could be tracked with a "lastUpdated" variable in each auction object that shows when it was last updated
  useEffect(() => {
    if (refreshing) {
      setRefreshing(false)
      setAuctions(store.getFilteredAuctions().sort((a: IAuction, b: IAuction) => a.dateSet - b.dateSet))
    }
  }, [refreshing])

  return (
    <SafeAreaView style={[styles.pageGeneralStyle, { paddingTop: insets.top }]}>
      <Toast
        duration={2500}
        visible={showToast}
        position={-120}
        shadow={true}
        animation={true}
        hideOnPress={true}
        backgroundColor='#C1FFBC'
        textColor='black'
        containerStyle={styles.toastStyle}>
        <View>
          <CustomText weight='semi' style={{ fontSize: 22 }}>
            Success!
          </CustomText>
          <View style={styles.toastSeparator} />
          <CustomText>{toastMessage}</CustomText>
        </View>
      </Toast>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <CustomText style={styles.pageTitle} weight='semi'>
          Auctions
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomText style={{ marginTop: 15, fontSize: 18 }} weight='medium'>
            All auctions
          </CustomText>
          <AddNewAuctionButton type={'auction'} />
        </View>
        <FlashList
          data={auctions}
          renderItem={renderItemFunction}
          estimatedItemSize={120}
          ListEmptyComponent={emptyListComponent}
          onRefresh={() => {
            setRefreshing(true)
          }}
          refreshing={refreshing}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pageGeneralStyle: {
    marginHorizontal: 25,
    flex: 1,
  },
  pageTitle: {
    marginTop: 10,
    fontSize: 28,
  },
  emptyListComponent: {
    flex: 1,
    marginTop: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListComponentText: {
    marginTop: 10,
    fontSize: 20,
    opacity: 0.7,
  },
  toastStyle: {
    width: 180,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastSeparator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 5,
  },
})
