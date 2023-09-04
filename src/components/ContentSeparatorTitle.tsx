import { COLORS } from '../helpers/constants'
import { CustomText } from './CustomText'

const ContentSeparatorTitle = ({ title }: { title: string }) => {
  return (
    <CustomText
      style={{ color: COLORS.themeColor, fontSize: 20 }}
      weight="semi">
      {title}
    </CustomText>
  )
}

export default ContentSeparatorTitle
