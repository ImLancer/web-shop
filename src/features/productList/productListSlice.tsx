import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import firebase, { db, app, auth } from 'firebase.js';

//import interface
import productEntry from 'interfaces/product/productEntry';

interface deleteProduct {
	id: string;
}

export interface cardCustom {
	id: string;
	size: string;
	amount: number;
	price: number;
}

interface productList {
	list: productEntry[];
	sortList: productEntry[];
	listNike: productEntry[];
	listAdidas: productEntry[];
	listYeezy: productEntry[];
	listJordan: productEntry[];
	listTotalCard: productEntry[];
	handlePayment: cardCustom[];
}

const initialState: productList = {
	list: [
		{
			prodId: '',
			prodName: '',
			prodBrand: '',
			prodSize: [],
			prodPrice: 0,
			prodUrlList: [],
			prodBought: 0,
			prodDate: '',
			prodState: true,
			prodIsSale: false,
			prodNameSale: '',
			prodSale: 0,
			prodSalePrice: 0,
		},
	],
	sortList: [],
	listNike: [],
	listAdidas: [],
	listYeezy: [],
	listJordan: [],
	listTotalCard: [],
	handlePayment: [],
};

export const productListSlice = createSlice({
	name: 'productList',
	initialState,
	reducers: {
		//reducer cho thêm sản phẩm vào trong các danh sách sản phẩm
		AddProduct: (state, action: PayloadAction<productEntry[]>) => {
			state.list = action.payload;
		},
		AddSortProduct: (state, action: PayloadAction<productEntry[]>) => {
			state.sortList = action.payload;
		},
		AddNikeProduct: (state, action: PayloadAction<productEntry[]>) => {
			state.listNike = action.payload;
		},
		AddAdidasProduct: (state, action: PayloadAction<productEntry[]>) => {
			state.listAdidas = action.payload;
		},
		AddYeezyProduct: (state, action: PayloadAction<productEntry[]>) => {
			state.listYeezy = action.payload;
		},
		AddJordanProduct: (state, action: PayloadAction<productEntry[]>) => {
			state.listJordan = action.payload;
		},
		//them 1 phan tu vao list
		AddUnitProduct: (state, action: PayloadAction<productEntry>) => {
			state.list.push(action.payload);
		},
		//chuc nang cho totalcard
		AddTotalCard: (state, action: PayloadAction<productEntry>) => {
			state.listTotalCard.push(action.payload);
		},
		DeleteTotalCard: (state, action: PayloadAction<string>) => {
			state.listTotalCard = state.listTotalCard.filter((prod) => prod.prodId !== action.payload);
		},
		//chuc nang cho payment card
		AddPaymentCard: (state, action: PayloadAction<cardCustom>) => {
			state.handlePayment.push(action.payload);
		},
		DeletePaymentCard: (state, action: PayloadAction<string>) => {
			state.handlePayment = state.handlePayment.filter((prod) => prod.id !== action.payload);
		},
		UpdateSizePC: (state, action: PayloadAction<[string, string]>) => {
			let index: number = state.handlePayment
				.map((item) => {
					return item.id;
				})
				.indexOf(action.payload[0]);
			state.handlePayment[index].size = action.payload[1];
		},
		UpdateAmountPC: (state, action: PayloadAction<[string, number]>) => {
			let index: number = state.handlePayment
				.map((item) => {
					return item.id;
				})
				.indexOf(action.payload[0]);
			state.handlePayment[index].amount = action.payload[1];
		},
	},
});

export const {
	// them danh sach vao list
	AddProduct,
	AddSortProduct,
	AddNikeProduct,
	AddAdidasProduct,
	AddYeezyProduct,
	AddJordanProduct,
	AddUnitProduct,
	// chuc nang cho total card
	AddTotalCard,
	DeleteTotalCard,
	//chuc nang cho payment card
	AddPaymentCard,
	UpdateSizePC,
	UpdateAmountPC,
	DeletePaymentCard,
} = productListSlice.actions;

export const selectProduct = (state: RootState) => state.productList.list;
export const selectSortProduct = (state: RootState) => state.productList.sortList;
export const selectNike = (state: RootState) => state.productList.listNike;
export const selectAdidas = (state: RootState) => state.productList.listAdidas;
export const selectYeezy = (state: RootState) => state.productList.listYeezy;
export const selectJordan = (state: RootState) => state.productList.listJordan;
export const selectTotalCard = (state: RootState) => state.productList.listTotalCard;
export const selectPaymentCard = (state: RootState) => state.productList.handlePayment;

export default productListSlice.reducer;
