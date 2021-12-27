//import react necessary
import React, { useState } from 'react';

//import cho redux
import { useDispatch, useSelector } from 'react-redux';
import {
	selectTotalCard,
	selectPaymentCard,
	cardCustom,
} from 'features/productList/productListSlice';

//import interface
import productEntry from 'interfaces/product/productEntry';

//import giao dien material-ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

//import colors
import yellow from '@material-ui/core/colors/yellow';

//import icon
import { GiPayMoney } from 'react-icons/gi';

//import table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {},
		box: {
			height: '40px',
			padding: '5px',
		},
		button: {
			color: yellow[300],
			backgroundColor: '#383838',
			'&:hover': { color: yellow[600], backgroundColor: '#000000' },
		},
		table: {
			width: '100%',
		},
	})
);

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

interface Props {}

const CardPage: React.FC<Props> = ({}) => {
	//khai bao danh cho redux
	const dispatch = useDispatch();

	const sub: cardCustom[] = useSelector(selectPaymentCard);
	const sub2: productEntry[] = useSelector(selectTotalCard);

	let paymentCard: cardCustom[] = [...sub];
	let totalCard: productEntry[] = [...sub2];

	const classes = useStyles();

	let total = 0;

	if (paymentCard.length !== 0) {
		paymentCard.map((prod) => {
			total += prod.amount * prod.price;
		});
	}

	//khai bao format currency
	const formatter = new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'VND',
		minimumFractionDigits: 0,
	});

	return (
		<Grid xs={12}>
			{/*table */}
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Tên sản phẩm</TableCell>
							<TableCell align='right'>Size</TableCell>
							<TableCell align='right'>Số lượng</TableCell>
							<TableCell align='right'>Đơn giá</TableCell>
							<TableCell align='right'>Tổng tiền</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paymentCard.map((prod, index) => (
							<TableRow key={prod.id}>
								<TableCell component='th' scope='row'>
									{totalCard[index].prodName}
								</TableCell>
								<TableCell align='right'>{prod.size}</TableCell>
								<TableCell align='right'>{prod.amount}</TableCell>
								<TableCell align='right'>{formatter.format(totalCard[index].prodPrice)}</TableCell>
								<TableCell align='right'>
									{formatter.format(totalCard[index].prodPrice * prod.amount)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Grid xs={12} className={classes.box}>
				<Typography>Trong giỏ đồ của bạn đang có ({paymentCard.length}) sản phẩm.</Typography>
			</Grid>
			<Grid xs={12} className={classes.box}>
				<Typography>Tổng số tiền bản phải trả là: {formatter.format(total)}</Typography>
			</Grid>

			<Grid item xs={12} className={classes.box} container justify='flex-end'>
				<Button
					variant='contained'
					color='secondary'
					className={classes.button}
					startIcon={<GiPayMoney />}
				>
					Thanh Toán
				</Button>
			</Grid>
		</Grid>
	);
};

export default CardPage;
