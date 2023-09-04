import { SafeAreaView } from 'react-native-safe-area-context'
import { ImageBackground, View } from 'react-native'
//@ts-ignore
import background from '../assets/images/profile-background.png'
import { CustomText } from '../components/CustomText'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useBoundStore } from '../store'
import AuthButton from '../components/LoginComponents/AuthButton'

const ProfileScreen = () => {
  const store = useBoundStore()
  const account = useBoundStore((state) => state.currentAccount)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1, justifyContent: 'flex-end' }} source={background}>
        <View
          style={{
            backgroundColor: 'white',
            height: '70%',
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
          }}>
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: '#D9D9D9',
              justifyContent: 'center',
              alignItems: 'center',
              height: 150,
              width: 150,
              borderRadius: 100,
              zIndex: 100,
              marginTop: -80,
            }}>
            <MaterialCommunityIcons name='account-outline' size={72} color={'black'} />
          </View>
          <View style={{ marginHorizontal: 50, marginTop: 20 }}>
            <CustomText
              weight='medium'
              style={{
                fontSize: 18,
                color: 'rgba(0,0,0, 0.72)',
              }}>
              First Name
            </CustomText>
            <CustomText weight='semi' style={{ fontSize: 16, marginTop: 5 }}>
              {account?.name}
            </CustomText>
            <CustomText
              weight='medium'
              style={{
                marginTop: 10,
                fontSize: 18,
                color: 'rgba(0,0,0, 0.72)',
              }}>
              Last Name
            </CustomText>
            <CustomText weight='semi' style={{ fontSize: 16, marginTop: 5 }}>
              {account?.surname}
            </CustomText>
            <CustomText
              weight='medium'
              style={{
                marginTop: 10,
                fontSize: 18,
                color: 'rgba(0,0,0, 0.72)',
              }}>
              Email
            </CustomText>
            <CustomText weight='semi' style={{ fontSize: 16, marginTop: 5 }}>
              {account?.email}
            </CustomText>
            <CustomText
              weight='medium'
              style={{
                marginTop: 10,
                fontSize: 18,
                color: 'rgba(0,0,0, 0.72)',
              }}>
              Balance
            </CustomText>
            <CustomText weight='semi' style={{ fontSize: 16, marginTop: 5 }}>
              ${account?.balance}
            </CustomText>
          </View>
          <AuthButton displayedText='Log out' loading={false} onPress={() => store.setAccount(null)} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default ProfileScreen
