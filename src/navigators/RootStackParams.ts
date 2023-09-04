import { IAuction } from '../helpers/interfaces'

export type AuthStackParamList = {
  Login: undefined
  Register: undefined
  LoggedInNavigator: undefined
}

export type AuctionStackParamList = {
  AllAuctions: undefined
  NewAuction: { auction: IAuction } | undefined
}
