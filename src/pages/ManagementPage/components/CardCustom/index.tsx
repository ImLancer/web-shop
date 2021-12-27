//import react necessary
import React, { useState, useEffect } from 'react';

//import cho redux
import { useDispatch, useSelector } from 'react-redux';
import {
	selectProduct,
	DeleteTotalCard,
	DeletePaymentCard,
} from 'features/productList/productListSlice';

//import firebase
import { db, auth } from 'firebase.js';

//import interface
import productEntry from 'interfaces/product/productEntry';

//import giao dien material-ui
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

//import colors
import yellow from '@material-ui/core/colors/yellow';

//import icon
import { GrArchlinux } from 'react-icons/gr';
import { FiSettings } from 'react-icons/fi';
import { GiTrashCan } from 'react-icons/gi';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		boxCard: {
			minHeight: '340px',
			margin: '12px',
		},
		boxPayment: {
			minHeight: '340px',
			margin: '12px',
		},

		//card
		root: {
			paddingTop: '10px',
			'& .MuiCard-root': {
				width: '100vw',
			},
		},
		rootCard: {
			display: 'flex',
		},
		details: {
			maxWidth: '550px',
			display: 'flex',
			flexDirection: 'column',
		},
		functionButton: {
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'center',
			width: '200px',
		},
		content: { flex: '1 0 auto', minWidth: '550px' },
		number: {
			marginTop: '90%',
		},
		cover: {
			width: '160px',
			height: '160px',
		},
		controls: {
			display: 'flex',
			alignItems: 'center',
			paddingLeft: theme.spacing(1),
			paddingBottom: theme.spacing(1),
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
		//size
		rootSize: {
			display: 'flex',
		},
	})
);

interface Props {
	product: productEntry;
	index: number;
}
const CardCustom: React.FC<Props> = ({ product, index }) => {
	//khai bao danh cho redux
	const dispatch = useDispatch();

	//import css
	const classes = useStyles();
	const theme = useTheme();

	const products: productEntry[] = useSelector(selectProduct);

	const ref = db.collection('products');

	const handleDelete = (prod: productEntry) => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Bạn thật sự muốn xóa sản phẩm ?')) {
			ref
				.doc(prod.prodId)
				.delete()
				.catch((error) => {
					console.error(error);
				})
				.finally(() => window.location.reload());
		}
	};

	const handleEdit = (prod: productEntry) => {
		console.log(prod);
	};

	//khai bao format currency
	const formatter = new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'VND',
		minimumFractionDigits: 0,
	});

	if (!Array.isArray(product.prodUrlList)) {
		return <p>There was an error loading your data!</p>;
	}

	return (
		<Grid className={classes.root} xs={12}>
			<Card className={classes.rootCard}>
				<div>
					<CardContent className={classes.number}>
						<Typography component='h5' variant='h5'>
							{index + 1}
						</Typography>
					</CardContent>
				</div>

				<CardMedia
					className={classes.cover}
					image={product.prodUrlList[0]}
					title='Live from space album cover'
				/>
				<div className={classes.details}>
					<CardContent>
						<Typography variant='h5' className={classes.content}>
							{product.prodName}
						</Typography>
						<Typography variant='subtitle1' color='textSecondary'>
							{product.prodBrand}
						</Typography>
						<Typography className={classes.rootSize}>
							{product.prodSize.map((size) => (
								<Grid>
									<Typography className={classes.size}>{size}</Typography>
								</Grid>
							))}
						</Typography>

						{/* {prod !== undefined ? (
							
						) : (
							<Typography></Typography>
						)} */}

						<Typography variant='subtitle1' color='textSecondary'>
							{formatter.format(product.prodPrice)}
						</Typography>
					</CardContent>
				</div>
				<div className={classes.functionButton}>
					<IconButton
						style={{ backgroundColor: '#9575cd', color: 'white', marginRight: '10px' }}
						onClick={() => handleEdit(product)}
					>
						<FiSettings />
					</IconButton>
					<IconButton
						style={{ backgroundColor: 'red', color: 'white' }}
						onClick={() => handleDelete(product)}
					>
						<GiTrashCan />
					</IconButton>
				</div>
			</Card>

			{/*Dialog */}
		</Grid>
	);
};

export default CardCustom;
