import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomText } from '../components/CustomText'
import { AuthenticationScreenHeader } from '../components/LoginComponents/AuthenticationScreenHeader'
import { TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import { useState, useRef } from 'react'
import { COLORS } from '../helpers/constants'
import { useNavigation } from '@react-navigation/native'
import { useBoundStore } from '../store'
import { IAccount } from '../helpers/interfaces'
import { useForm, Controller } from 'react-hook-form'
import AuthButton from '../components/LoginComponents/AuthButton'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParamList } from '../navigators/RootStackParams'

type authScreenProp = StackNavigationProp<AuthStackParamList, 'Login'>

export const LoginScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigation = useNavigation<authScreenProp>()
  const store = useBoundStore()
  const accounts = store.accounts
  const [errorText, setErrorText] = useState('')
  const passwordRef = useRef<any>()
  const [loading, setLoading] = useState(false)

  function isLogginSuccessful(email: string, password: string): IAccount | undefined {
    return accounts.find((account) => account.email === email && account.password === password)
  }

  const handleLogin = (data: { email: string; password: string }) => {
    setErrorText('')
    if (data.email === '' || data.password === '') {
      setErrorText('Please fill in the fields')
      return
    }
    setLoading(true)
    const accountToFind = isLogginSuccessful(data.email, data.password)
    if (accountToFind === undefined) {
      setErrorText('Incorrect email or password')
      setLoading(false)
      return
    }
    setLoading(false)
    store.setAccount(accountToFind)
    navigation.replace('LoggedInNavigator')
  }

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <AuthenticationScreenHeader />
        <CustomText
          style={{
            fontSize: 20,
            color: 'black',
            alignSelf: 'center',
            marginTop: 60,
          }}
          weight='semi'>
          Login Page
        </CustomText>

        <View
          style={{
            marginTop: 55,
            width: '70%',
            alignSelf: 'center',
          }}>
          {errorText !== '' && (
            <CustomText style={{ width: '100%', color: 'red', marginTop: -20 }}>{errorText}</CustomText>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 15,
                }}
                blurOnSubmit={false}
                keyboardType='email-address'
                placeholder='Email'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={() => passwordRef.current.focus()}
                returnKeyType='next'
              />
            )}
            name='email'
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={passwordRef}
                style={{
                  marginTop: 20,
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 15,
                }}
                placeholder='Password'
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleLogin)}
                returnKeyType='done'
              />
            )}
            name='password'
          />
        </View>
        <AuthButton onPress={handleSubmit(handleLogin)} displayedText='Login' loading={loading} key={'loginButton'} />
        <CustomText style={{ alignSelf: 'center', marginTop: 25 }}>
          Don't have an account? Register{' '}
          <CustomText
            weight='semi'
            onPress={() => {
              navigation.navigate('Register')
            }}>
            here.
          </CustomText>
        </CustomText>
      </ScrollView>
    </SafeAreaView>
  )
}
