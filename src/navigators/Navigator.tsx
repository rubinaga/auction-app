import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '../helpers/constants'
import { HomeTabSvg, ProfileSvgComponent } from '../components/TabSvg'
import { CustomText } from '../components/CustomText'
import { createStackNavigator } from '@react-navigation/stack'
import { AllAuctions } from '../screens/AllAuctions'
import { NewAuction } from '../screens/NewAuction'
import { LoginScreen } from '../screens/LoginScreen'
import { RegisterScreen } from '../screens/RegisterScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { AuctionStackParamList, AuthStackParamList } from './RootStackParams'
import { useBoundStore } from '../store'

const Tab = createBottomTabNavigator()

const AuctionStack = createStackNavigator<AuctionStackParamList>()

const AuctionStackScreen = () => {
  return (
    <AuctionStack.Navigator initialRouteName='AllAuctions'>
      <AuctionStack.Screen
        name='NewAuction'
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' },
        }}
        component={NewAuction}
      />
      <AuctionStack.Screen
        name='AllAuctions'
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' },
        }}
        component={AllAuctions}
      />
    </AuctionStack.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      initialRouteName='Auctions'
      screenOptions={{
        tabBarStyle: {
          height: 73,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: COLORS.themeColor,
      }}>
      <Tab.Screen
        name='Auctions'
        component={AuctionStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <CustomText style={{ color: color, fontSize: 14, marginTop: -15 }} weight='semi'>
              Auctions
            </CustomText>
          ),
          tabBarIcon: ({ color }) => <HomeTabSvg color={color} />,
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <CustomText style={{ color: color, fontSize: 14, marginTop: -15 }} weight='semi'>
              Profile
            </CustomText>
          ),
          tabBarIcon: ({ color }) => <ProfileSvgComponent color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
const ParentStack = createStackNavigator<AuthStackParamList>()

const Navigator = () => {
  const store = useBoundStore()
  const loggedIn = store.currentAccount

  return (
    <ParentStack.Navigator initialRouteName='Login'>
      <ParentStack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' },
        }}
      />
      <ParentStack.Screen
        name='Register'
        component={RegisterScreen}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' },
        }}
      />
      {loggedIn && (
        <ParentStack.Screen
          name='LoggedInNavigator'
          component={TabNavigator}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'white' },
          }}
        />
      )}
    </ParentStack.Navigator>
  )
}

export default Navigator
