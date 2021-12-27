import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

//import interface
import accountEntry from 'interfaces/account/accountEntry';

interface accountList {
	list: accountEntry[];
}

const initialState: accountList = {
	list: [],
};

export const accountListSlice = createSlice({
	name: 'accountList',
	initialState,
	reducers: {
		Add: (state, action: PayloadAction<accountEntry[]>) => {
			state.list = action.payload;
		},
	},
});

export const { Add } = accountListSlice.actions;

export const selectAccount = (state: RootState) => state.accountList.list;

export default accountListSlice.reducer;
