export interface IAuction {
  id: number
  auctionName: string
  description: string
  dateSet: number
  bid: { bidPlacer: IAccount; bidAmount: number }
  owner: IAccount
  ended: boolean
}

export interface AuctionSlice {
  id: number
  showToast: boolean
  auctions: IAuction[]
  addAuction: any
  modifyAuction: any
  getAuctionById?: any
  deleteAuction: any
  placeAuctionBid: any
  changeShowToast: any
  toastMessage: string
  getFilteredAuctions: any
  clearAuctions: any
}

export interface IAccount {
  id: number
  email: string
  password: string
  name: string
  surname: string
  balance: number
}

export interface AccountSlice {
  id: number
  accounts: IAccount[]
  currentAccount: IAccount | null
  addAccount: any
  modifyAccount: any
  deleteAccount: any
  setAccount: any
  setAccountBalance: any
}
