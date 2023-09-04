import { TouchableOpacity } from 'react-native'
import { EyeClosedSvg, EyeOpenSvg } from '../../assets/svgContainer'

export const PasswordEye = (props: { secure: boolean; setSecure: any; styles: any }) => {
  return (
    <TouchableOpacity
      style={props.styles}
      onPress={() => {
        props.setSecure((current: boolean) => !current)
      }}>
      {props.secure ? <EyeOpenSvg /> : <EyeClosedSvg />}
    </TouchableOpacity>
  )
}
