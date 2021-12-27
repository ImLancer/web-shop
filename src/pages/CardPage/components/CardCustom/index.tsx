//import react necessary
import React, { useState, useEffect } from 'react';

//import cho redux
import { useDispatch, useSelector } from 'react-redux';
import {
	selectTotalCard,
	UpdateSizePC,
	UpdateAmountPC,
	DeleteTotalCard,
	DeletePaymentCard,
} from 'features/productList/productListSlice';

//import interface
import productEntry from 'interfaces/product/productEntry';

//import giao dien material-ui
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

//import colors
import yellow from '@material-ui/core/colors/yellow';

//import icon
import { GrArchlinux } from 'react-icons/gr';
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
			display: 'flex',
		},
		details: {
			width: '550px',
			display: 'flex',
			flexDirection: 'column',
		},
		functionButton: {
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'center',
		},
		content: {
			flex: '1 0 auto',
		},
		number: {
			marginTop: '90%',
		},
		cover: {
			width: '180px',
		},
		controls: {
			display: 'flex',
			alignItems: 'center',
			paddingLeft: theme.spacing(1),
			paddingBottom: theme.spacing(1),
		},
	})
);

interface Props {
	prod: productEntry;
	index: number;
}

const CardCustom: React.FC<Props> = ({ prod, index }) => {
	//khai bao danh cho redux
	const dispatch = useDispatch();

	//khai bao usestates
	const [checkSize, setCheckSize] = useState<string>(prod.prodSize[0]);
	const [amount, setAmount] = useState<number>(1);

	//import css
	const classes = useStyles();
	const theme = useTheme();

	if (prod.prodSize) {
		dispatch(UpdateSizePC([prod.prodId, checkSize]));
	}

	const handleDelete = (prodId: string) => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Bạn thật sự muốn xóa sản phẩm ?')) {
			dispatch(DeleteTotalCard(prodId));
			dispatch(DeletePaymentCard(prodId));
		}
	};

	const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
		setCheckSize(event.target.value);
		dispatch(UpdateSizePC([prod.prodId, event.target.value]));
	};

	const handleMinusAmount = () => {
		if (amount > 1) {
			setAmount(amount - 1);
			dispatch(UpdateAmountPC([prod.prodId, amount - 1]));
		}
	};

	const handlePlusAmount = () => {
		setAmount(amount + 1);
		dispatch(UpdateAmountPC([prod.prodId, amount + 1]));
	};

	//khai bao format currency
	const formatter = new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'VND',
		minimumFractionDigits: 0,
	});

	return (
		<Grid style={{ paddingTop: '10px' }}>
			<Card className={classes.root}>
				<div>
					<CardContent className={classes.number}>
						<Typography component='h5' variant='h5'>
							{index + 1}
						</Typography>
					</CardContent>
				</div>
				<CardMedia
					className={classes.cover}
					image={prod.prodUrlList[0]}
					title='Live from space album cover'
				/>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography component='h5' variant='h5'>
							{prod.prodName}
						</Typography>
						<Typography variant='subtitle1' color='textSecondary'>
							{prod.prodBrand}
						</Typography>
						<Typography variant='subtitle1' color='textSecondary'>
							<NativeSelect
								value={checkSize}
								onChange={handleChange}
								name='checkSize'
								inputProps={{ 'aria-label': 'age' }}
							>
								{prod.prodSize.map((size) => (
									<option value={size}>{size}</option>
								))}
							</NativeSelect>
						</Typography>
						<Typography style={{ display: 'flex' }}>
							<IconButton
								style={{ backgroundColor: '#fefefe', color: '#262626' }}
								onClick={() => handleMinusAmount()}
							>
								<BsDashSquare />
							</IconButton>
							<Typography
								style={{
									height: '50px',
									width: '20px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{amount}
							</Typography>
							<IconButton
								style={{ backgroundColor: '#fefefe', color: '#262626' }}
								onClick={() => handlePlusAmount()}
							>
								<BsPlusSquare />
							</IconButton>
						</Typography>
						<Typography variant='subtitle1' color='textSecondary'>
							{formatter.format(prod.prodPrice * amount)}
						</Typography>
					</CardContent>
				</div>
				<div className={classes.functionButton}>
					<IconButton
						style={{ backgroundColor: 'red', color: 'white' }}
						onClick={() => handleDelete(prod.prodId)}
					>
						<GiTrashCan />
					</IconButton>
				</div>
			</Card>
		</Grid>
	);
};

export default CardCustom;
