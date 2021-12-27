import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from 'features/user/userSlice';
import productListReducer from 'features/productList/productListSlice';
import accountListReducer from 'features/accountList/accountListSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		productList: productListReducer,
		accountList: accountListReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
