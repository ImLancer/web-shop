import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import accountEntry from 'interfaces/account/accountEntry';

interface user {
	user: string | null;
	userDetail: accountEntry;
}

const initialState: user = {
	user: '',
	userDetail: {
		accountId: '',
		accountAddress: '',
		accountBirthday: '',
		accountMail: '',
		accountPhone: '',
		accountPoint: 0,
		accountSex: '',
		accountType: 'standard',
		accountUsername: '',
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<string | null>) => {
			if (action.payload !== null) {
				state.user = action.payload;
			}
		},
		logout: (state) => {
			state.user = '';
		},
		AddUserDetail: (state, action: PayloadAction<accountEntry | undefined>) => {
			if (action.payload !== undefined) {
				state.userDetail = action.payload;
			}
		},
		RemoveUserDetail: (state) => {
			state.userDetail = {
				accountId: '',
				accountAddress: '',
				accountBirthday: '',
				accountMail: '',
				accountPhone: '',
				accountPoint: 0,
				accountSex: '',
				accountType: 'standard',
				accountUsername: '',
			};
		},
	},
});

export const { login, logout, AddUserDetail, RemoveUserDetail } = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
// 	setTimeout(() => {
// 		dispatch(incrementByAmount(amount));
// 	}, 1000);
// };

export const selectUser = (state: RootState) => state.user.user;
export const selectUserDetail = (state: RootState) => state.user.userDetail;

export default userSlice.reducer;
