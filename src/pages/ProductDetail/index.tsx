//import react necessary
import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	useLocation,
	useParams,
	RouteComponentProps,
} from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';

//import firebase
//import { db, auth } from 'firebase.js';

//import cho matirial ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//import redux
import { useDispatch, useSelector } from 'react-redux';
import {
	selectProduct,
	AddTotalCard,
	AddPaymentCard,
	cardCustom,
} from 'features/productList/productListSlice';

//import interface
import productEntry from 'interfaces/product/productEntry';

const useStyles = makeStyles({
	root: { padding: '15px' },
	image: { padding: '15px' },
	info: {
		padding: '5vw 10px 0px 10px',
	},
	title: {
		fontWeight: 'bold',
		height: '4em',
		fontSize: '2.7em',
		borderBottom: '2px solid #dfdfdf',
	},
	price: {
		fontWeight: 'bold',
		height: '2.5em',
		color: '#ffb300',
		fontSize: '2.3em',
		borderBottom: '2px solid #dfdfdf',
	},
	rootSize: { height: '4em', display: 'flex' },
	sizeTitle: {
		fontSize: '1.5em',
	},
	size: {
		height: '3em',
		width: '3em',
		backgroundColor: '#000000',
		color: 'yellow',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '0.5em',
		marginRight: '0.5em',
	},
	rootButton: {
		height: '4em',
	},
	button: {
		height: '3em',
		width: '15em',
		backgroundColor: 'red',
		color: 'white',
		'&:hover': {
			backgroundColor: '#b71c1c',
		},
	},
	hotline: {
		height: '9em',
		color: 'black',
		fontSize: '1.5em',
		paddingTop: '15px',
		borderBottom: '2px solid #dfdfdf',
	},
});

interface Props {}

const ProductDetail: React.FC<Props> = () => {
	//import css
	const classes = useStyles();

	const { id } = useParams<{ id?: string }>();
	const location = useLocation();

	const products: productEntry[] = useSelector(selectProduct);
	let result: productEntry | undefined = products.find((item) => item.prodId === id);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const dispatch = useDispatch();

	//id from reat router dom

	//khai bao format currency
	const formatter = new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'VND',
		minimumFractionDigits: 0,
	});

	const handleAddToCard = async () => {
		if (result !== undefined) {
			let subResult: cardCustom = {
				id: result.prodId,
				size: '',
				amount: 1,
				price: result.prodPrice,
			};
			await dispatch(AddTotalCard(result));
			await dispatch(AddPaymentCard(subResult));
		}
	};

	return (
		<Grid className={classes.root} xs={12} container justify='center'>
			<Grid item className={classes.image} xs={7} container justify='center'>
				{result !== undefined
					? result.prodUrlList.map((url) => (
							<img
								src={url}
								alt=''
								height='800vw'
								width='800vw'
								style={{ marginTop: '10px', backgroundColor: '#797979' }}
							/>
					  ))
					: {}}
			</Grid>
			{result !== undefined ? (
				<Grid item className={classes.info} xs={5}>
					<Typography className={classes.title}>{result.prodName}</Typography>
					<Typography className={classes.price}>{formatter.format(result.prodPrice)}</Typography>
					<Typography className={classes.sizeTitle}>Size Giày:</Typography>
					<Grid className={classes.rootSize}>
						{result.prodSize.map((size) => (
							<Typography className={classes.size}>{size}</Typography>
						))}
					</Grid>
					<Grid className={classes.rootButton} container justify='center' alignItems='center'>
						<Button className={classes.button} onClick={() => handleAddToCard()}>
							Thêm Vào Giỏ Hàng
						</Button>
					</Grid>
					<Typography className={classes.hotline}>
						Gọi ngay vào số: {<h2 style={{ color: 'red', fontWeight: 'bold' }}>0342942424</h2>} Để
						đặt giày và được tư vấn miễn phí.
					</Typography>
				</Grid>
			) : (
				{}
			)}
		</Grid>
	);
};

export default ProductDetail;
