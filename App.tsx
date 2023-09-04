import { NavigationContainer } from '@react-navigation/native'
import Navigator from './src/navigators/Navigator'
import { RootSiblingParent } from 'react-native-root-siblings'
import { SafeAreaProvider } from 'react-native-safe-area-context'
export default function App() {
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </RootSiblingParent>
  )
}
