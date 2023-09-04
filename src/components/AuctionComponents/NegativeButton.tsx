import { TouchableOpacity } from 'react-native'
import { CustomText } from '../CustomText'
export const NegativeButton = ({ setVisible }: { setVisible: any }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
      onPress={() => {
        setVisible(false)
      }}>
      <CustomText weight="semi" style={{ color: 'white', fontSize: 16 }}>
        Cancel
      </CustomText>
    </TouchableOpacity>
  )
}
