import { TouchableOpacity, ActivityIndicator } from 'react-native'
import { COLORS } from '../../helpers/constants'
import { CustomText } from '../CustomText'
export default function AuthButton({
  onPress,
  displayedText,
  loading,
}: {
  onPress: () => void
  displayedText: string
  loading: boolean
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '40%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: 40,
        alignSelf: 'center',
        backgroundColor: COLORS.themeColor,
        paddingVertical: 5,
        paddingHorizontal: 20,
      }}>
      {loading ? (
        <ActivityIndicator size={22} color={'white'} />
      ) : (
        <CustomText style={{ fontSize: 22 }} weight='semi'>
          {displayedText}
        </CustomText>
      )}
    </TouchableOpacity>
  )
}
