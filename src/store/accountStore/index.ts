import { MOCK_DATA } from '../../helpers/constants'
import { AccountSlice, IAccount } from '../../helpers/interfaces'
import { StateCreator } from 'zustand'

export const createAccountSlice: StateCreator<AccountSlice> = (set, get, api) => ({
  id: 1,
  accounts: MOCK_DATA.MOCK_USERS,
  currentAccount: null,
  setAccountBalance: (accountUpdates: { id: number; balance: number }[]) =>
    set((state) => {
      const updatedAccounts = state.accounts.map((account) => {
        const updatedAccount = accountUpdates.find((update) => update.id === account.id)
        if (updatedAccount) {
          // Update the balance
          return { ...account, balance: account.balance + updatedAccount.balance }
        }
        return account
      })
      const updatedCurrentAccount =
        state.currentAccount && updatedAccounts.find((account) => account.id === state.currentAccount?.id)

      return { accounts: updatedAccounts, currentAccount: updatedCurrentAccount }
    }),
  setAccount: (account: IAccount) =>
    set((state) => ({
      currentAccount: account,
    })),
  addAccount: (acc: IAccount) =>
    set((state) => {
      if (state.accounts.find((account) => account.email === acc.email)) {
        return state // Account already exists, return the current state
      } else {
        state.id += 1
        return { accounts: [...state.accounts, { ...acc, id: state.id }] } // Account doesn't exist, append it
      }
    }),

  modifyAccount: (acc: IAccount) =>
    set((state) => ({
      accounts: state.accounts.map((stateAccount) => (acc.email === stateAccount.email ? acc : stateAccount)),
    })),
  deleteAccount: (account: IAccount) =>
    set((state) => ({
      accounts: state.accounts.filter((stateAccount) => stateAccount.email !== account.email),
    })),
})
