/* eslint-disable @typescript-eslint/no-unused-vars */
//import from local
import { sizes, brands } from './constants.js';

//import react necessary
import React, { useState } from 'react';
import firebase, { db, app, auth } from 'firebase.js';

//import cho form
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//import cho redux
//import { useDispatch } from 'react-redux';
//import { AddUnitProduct } from 'features/productList/productListSlice';

//import interface
import productEntry from 'interfaces/product/productEntry';

//import giao dien material-ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText, InputAdornment, OutlinedInput, Typography } from '@material-ui/core';

//import color material-ui

//import icon
import QueueIcon from '@material-ui/icons/Queue';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles({
	root: {
		height: '80%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	box: {},
	boxContainer: {},
	boxForm: {
		margin: '20px',
	},
	boxTextField: {},
	boxButton: {
		justifyContent: 'flex-end',
	},
	boxCheckboxSize: {},
	formTitle: {
		display: 'flex',
		alignItems: 'center',
		margin: '5px',
		minHeight: '30px',
	},
	itemTitle: {
		display: 'flex',
		alignItems: 'center',
	},
});

const AddProductSchema = yup.object().shape({
	prodName: yup.string().required().min(3).max(100),
	prodBrand: yup.string(),
	prodPrice: yup.number().required().min(50000),
	prodDescription: yup.string(),
});

interface Props {
	handleLoading: Function;
}

interface handleForm {
	prodId: string;
	prodName: string;
	prodBrand: string;
	prodSize: string[];
	prodPrice: number;
	prodImageUrl: FileList;
	prodBought: number;
	prodDate: Date;
	prodState: boolean;
	prodIsSale: boolean;
	prodNameSale: string;
	prodSale: number;
	prodSalePrice: number;
	prodUrlList: string[];
}

const AddProduct: React.FC<Props> = ({ handleLoading }) => {
	//khai bao bien

	//all useState sử dụng cho component
	let urlList: string[] = [];

	//khai bao cho redux
	//const dispatch = useDispatch();

	//khai báo css
	const classes = useStyles();

	//khai báo cho react-hook-dom
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<handleForm>({
		defaultValues: {
			prodName: '',
			prodSize: [],
			prodBrand: '',
			prodBought: 0,
			prodState: true,
			prodIsSale: false,
			prodNameSale: '',
			prodSale: 0,
			prodSalePrice: 0,
			prodUrlList: [],
		},
		resolver: yupResolver(AddProductSchema),
	});

	//kết nối cơ sở dữ liệu
	const ref = db.collection('products');

	//function thêm sản phầm lên cơ sở dữ liệu
	function addProduct(
		prodName: string,
		prodBrand: string,
		prodSize: string[],
		prodPrice: number,
		prodUrlList: string[],
		prodBought: number,
		prodDate: string,
		prodState: boolean,
		prodIsSale: boolean,
		prodNameSale: string,
		prodSale: number,
		prodSalePrice: number
	) {
		ref
			.doc()
			.set({
				prodName: prodName,
				prodBrand: prodBrand,
				prodSize: prodSize,
				prodPrice: prodPrice,
				prodUrlList: prodUrlList,
				prodBought: prodBought,
				prodDate: prodDate,
				prodState: prodState,
				prodIsSale: prodIsSale,
				prodNameSale: prodNameSale,
				prodSale: prodSale,
				prodSalePrice: prodSalePrice,
			})
			.then(async () => {
				await alert('Thêm sản phẩm thành công !');
				await window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	//submit xử lí của form
	const onSubmit = async (data: handleForm) => {
		handleLoading(true);
		const {
			prodName,
			prodBrand,
			prodSize,
			prodPrice,
			prodImageUrl,
			prodBought,
			prodState,
			prodIsSale,
			prodSale,
			prodNameSale,
			prodSalePrice,
		} = data;

		let prodDate: Date = new Date();

		let subDate: string = prodDate.toDateString().toString();

		const storageRef = await app.storage().ref();

		for (let i = 0; i < prodImageUrl.length; i++) {
			let fileRef = await storageRef.child(prodImageUrl[i].name);
			await fileRef.put(prodImageUrl[i]);
			await fileRef.getDownloadURL().then((url) => {
				urlList.push(url);
			});
		}

		console.log(data);

		//let handle: Date;

		// await console.log(prodDate.toLocaleString());

		// await console.log(subDate);

		// handle = new Date(subDate);

		// await console.log(handle);

		await addProduct(
			prodName,
			prodBrand,
			prodSize,
			prodPrice,
			urlList,
			prodBought,
			subDate,
			prodState,
			prodIsSale,
			prodNameSale,
			prodSale,
			prodSalePrice
		);
		await handleLoading(false);
	};

	return (
		<Grid className={classes.root} xs={12}>
			<Grid container xs={12} justify='center'>
				<Typography className={classes.formTitle} variant='h3' component='p'>
					Thêm sản phẩm mới
				</Typography>
			</Grid>
			<Container maxWidth='md' className={classes.boxContainer}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Grid className={classes.itemTitle} xs={4}>
							<Typography variant='h6'>Tên sản phẩm:</Typography>
						</Grid>
						<Grid xs={8}>
							<Controller
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										id='prodName'
										label='Bắt buộc'
										variant='outlined'
										size='small'
										color='primary'
										placeholder='adidas Superstar White Core Black,...'
										error={errors?.prodName ? true : false}
										helperText={errors.prodName?.message}
									/>
								)}
								name='prodName'
								control={control}
							/>
						</Grid>
					</Grid>

					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Grid className={classes.itemTitle} xs={4}>
							<Typography variant='h6'>Kích cỡ sản phẩm:</Typography>
						</Grid>
						<Grid xs={8}>
							<Controller
								render={({ field }) => (
									<FormControl fullWidth variant='outlined'>
										<InputLabel id='prodsize-label'>Bắt buộc</InputLabel>
										<Select
											{...field}
											labelId='prodsize-label'
											label='Bắt buộc'
											id='prodSize'
											color='primary'
											multiple
										>
											{sizes.map((size) => (
												<MenuItem value={size.value}>{size.title}</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
								name='prodSize'
								control={control}
							/>
						</Grid>
					</Grid>

					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Grid className={classes.itemTitle} xs={4}>
							<Typography variant='h6'>Thương hiệu sản phẩm:</Typography>
						</Grid>
						<Grid xs={8}>
							<Controller
								render={({ field }) => (
									<FormControl fullWidth variant='outlined'>
										<InputLabel id='demo-simple-select-outlined-label'>Bắt buộc</InputLabel>
										<Select
											{...field}
											labelId='prodBrand'
											id='prodBrand'
											label='Bắt buộc'
											color='primary'
										>
											<MenuItem value=''>
												<em>None</em>
											</MenuItem>
											{brands.map((brand) => (
												<MenuItem value={brand.value}>{brand.title}</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
								name='prodBrand'
								control={control}
							/>
						</Grid>
					</Grid>

					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Grid className={classes.itemTitle} xs={4}>
							<Typography variant='h6'>Giá sản phẩm:</Typography>
						</Grid>
						<Grid xs={8}>
							<Controller
								render={({ field }) => (
									<FormControl variant='outlined'>
										<InputLabel htmlFor='prodPrice'>Bắt buộc</InputLabel>
										<OutlinedInput
											{...field}
											id='prodPrice'
											placeholder='0'
											color='primary'
											startAdornment={<InputAdornment position='start'>$</InputAdornment>}
											labelWidth={65}
											error={errors?.prodPrice ? true : false}
										/>
										<FormHelperText id='prodPrice'>{errors.prodPrice?.message}</FormHelperText>
									</FormControl>
								)}
								name='prodPrice'
								control={control}
							/>
						</Grid>
					</Grid>

					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Grid className={classes.itemTitle} xs={4}>
							<Typography variant='h6'>Hình ảnh sản phẩm:</Typography>
						</Grid>
						<Grid xs={8}>
							<input
								{...register('prodImageUrl')}
								id='prodImageUrl'
								multiple
								type='file'
								style={{ display: 'none' }}
							/>
							<label htmlFor='prodImageUrl'>
								<Button variant='contained' component='span' startIcon={<AddPhotoAlternateIcon />}>
									Upload
								</Button>
							</label>
						</Grid>
					</Grid>

					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							size='small'
							startIcon={<QueueIcon />}
						>
							Thêm sản phẩm
						</Button>
					</Grid>
				</form>
			</Container>
		</Grid>
	);
};

export default AddProduct;
