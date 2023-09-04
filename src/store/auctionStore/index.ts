import { IAuction, AuctionSlice, IAccount } from '../../helpers/interfaces'
import { StateCreator } from 'zustand'

export const createAuctionSlice: StateCreator<AuctionSlice> = (set, get, api) => ({
  id: 0,
  showToast: false,
  toastMessage: '',
  auctions: [],
  getFilteredAuctions: () => {
    const currentDate = new Date().getTime()
    return get().auctions.filter((auction) => new Date(auction.dateSet).getTime() > currentDate)
  },

  clearAuctions: () =>
    set((state) => {
      const currentDate = new Date().getTime()
      return {
        auctions: state.auctions.map((auction) => ({
          ...auction,
          ended: new Date(auction.dateSet).getTime() < currentDate,
        })),
      }
    }),

  placeAuctionBid: (auctionId: number, auctionBid: number, auctionBidder: IAccount) =>
    set((state) => ({
      auctions: state.auctions.map((stateAuction) =>
        auctionId === stateAuction.id
          ? { ...stateAuction, bid: { ...stateAuction.bid, bidAmount: auctionBid, bidPlacer: auctionBidder } }
          : stateAuction,
      ),
    })),
  addAuction: (auction: IAuction) =>
    set((state) => {
      state.id += 1
      return { auctions: [...state.auctions, { ...auction, id: state.id }] }
    }),
  modifyAuction: (auction: IAuction) =>
    set((state) => ({
      auctions: state.auctions.map((stateAuction) => (auction.id === stateAuction.id ? auction : stateAuction)),
    })),
  deleteAuction: (auctionId: number) =>
    set((state) => ({
      auctions: state.auctions.filter((stateAuction: IAuction) => stateAuction.id !== auctionId),
    })),
  changeShowToast: (boolValue: boolean, toastMessage: string) =>
    set((state) => ({
      showToast: boolValue,
      toastMessage: toastMessage,
    })),
})
