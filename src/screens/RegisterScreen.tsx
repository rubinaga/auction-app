import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomText } from '../components/CustomText'
import { TextInput, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useRef, useState } from 'react'
import { COLORS } from '../helpers/constants'
import { useNavigation } from '@react-navigation/native'
import { useBoundStore } from '../store'
import { AuthenticationScreenHeader } from '../components/LoginComponents/AuthenticationScreenHeader'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParamList } from '../navigators/RootStackParams'
import { useForm, Controller } from 'react-hook-form'
import AuthButton from '../components/LoginComponents/AuthButton'
import { validateForm } from '../helpers/helperFunctions'
import { PasswordEye } from '../components/LoginComponents/PasswordEye'

type authScreenProp = StackNavigationProp<AuthStackParamList, 'Register'>

export const RegisterScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const store = useBoundStore()
  const surnameRef = useRef<TextInput | null>(null)
  const emailRef = useRef<TextInput | null>(null)
  const passwordRef = useRef<TextInput | null>(null)
  const confirmPasswordRef = useRef<TextInput | null>(null)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<any>({
    name: undefined,
    surname: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  })
  const [securePassword, setSecurePassword] = useState(true)
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true)

  const handleRegister = (data: {
    name: string
    surname: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    const possibleFormErrors = validateForm(data)
    setFormError(possibleFormErrors)
    const formHasErrors = Object.keys(possibleFormErrors).length !== 0
    if (formHasErrors) {
      return
    }
    setLoading(true)
    store.addAccount({
      id: 0,
      name: data.name,
      surname: data.surname,
      password: data.password,
      email: data.email,
      balance: 1000,
    })
    navigation.navigate('Login')
  }

  const navigation = useNavigation<authScreenProp>()
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
          Register Page
        </CustomText>

        <View
          style={{
            marginTop: 25,
            width: '80%',
            alignSelf: 'center',
          }}>
          {(formError?.name || formError.surname) && (
            <CustomText style={{ width: '100%', color: 'red', marginTop: -20 }}>
              You must fill in your name and surname
            </CustomText>
          )}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder='Name'
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 15,
                  }}
                  blurOnSubmit={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={() => surnameRef.current?.focus()}
                  returnKeyType='next'
                />
              )}
              name='name'
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder='Surname'
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 15,
                  }}
                  blurOnSubmit={false}
                  ref={surnameRef}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={() => emailRef.current?.focus()}
                  returnKeyType='next'
                />
              )}
              name='surname'
            />
          </View>
          {formError?.email && <CustomText style={{ width: '100%', color: 'red' }}>{formError.email}</CustomText>}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder='Email'
                style={[
                  styles.registerFormElement,
                  {
                    marginTop: formError.email ? 0 : 20,
                  },
                ]}
                keyboardType='email-address'
                blurOnSubmit={false}
                ref={emailRef}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={() => passwordRef.current?.focus()}
                returnKeyType='next'
              />
            )}
            name='email'
          />
          {formError?.password && <CustomText style={{ width: '100%', color: 'red' }}>{formError.password}</CustomText>}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TextInput
                  placeholder='Password'
                  style={[
                    styles.registerFormElement,
                    {
                      marginTop: formError.password ? 0 : 20,
                      flex: 1,
                    },
                  ]}
                  blurOnSubmit={false}
                  ref={passwordRef}
                  secureTextEntry={securePassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  returnKeyType='next'
                />
                <PasswordEye
                  secure={securePassword}
                  setSecure={setSecurePassword}
                  styles={{
                    position: 'absolute',
                    right: 20,
                    bottom: 10,
                  }}
                />
              </View>
            )}
            name='password'
          />
          {formError?.confirmPassword && (
            <CustomText style={{ width: '100%', color: 'red' }}>{formError.confirmPassword}</CustomText>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TextInput
                  placeholder='Confirm Password'
                  style={[
                    styles.registerFormElement,
                    {
                      marginTop: formError.confirmPassword ? 0 : 20,
                      flex: 1,
                    },
                  ]}
                  ref={confirmPasswordRef}
                  secureTextEntry={secureConfirmPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleRegister)}
                  returnKeyType='done'
                />
                <PasswordEye
                  secure={secureConfirmPassword}
                  setSecure={setSecureConfirmPassword}
                  styles={{
                    position: 'absolute',
                    right: 20,
                    bottom: 10,
                  }}
                />
              </View>
            )}
            name='confirmPassword'
          />
        </View>
        <AuthButton
          onPress={handleSubmit(handleRegister)}
          displayedText='Register'
          loading={loading}
          key={'registerButton'}
        />
        <CustomText
          style={{
            alignSelf: 'center',
            marginTop: 25,
          }}>
          Already have an account? Login{' '}
          <CustomText weight='semi' onPress={() => navigation.navigate('Login')}>
            here.
          </CustomText>
        </CustomText>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  registerFormElement: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
})
