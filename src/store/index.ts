import { AccountSlice, AuctionSlice } from '../helpers/interfaces'
import { create } from 'zustand'
import { createAuctionSlice } from './auctionStore'
import { createAccountSlice } from './accountStore'

export const useBoundStore = create<AuctionSlice & AccountSlice>()((...a) => ({
  ...createAuctionSlice(...a),
  ...createAccountSlice(...a),
}))
