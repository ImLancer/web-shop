//import react necessary
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import CardCustom from 'pages/CardPage/components/CardCustom';
import PaymentCustom from 'pages/CardPage/components/PaymentCustom';

//import react router dom
//import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';

//import cho form
// import * as yup from 'yup';
// import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

//import cho redux
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalCard } from 'features/productList/productListSlice';

//import interface
import productEntry from 'interfaces/product/productEntry';

//import giao dien material-ui
import Grid from '@material-ui/core/Grid';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

//import colors
import yellow from '@material-ui/core/colors/yellow';

//import icon

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

		//size Button
		sizeButton: {
			marginLeft: '8px',
			color: yellow[300],
			backgroundColor: '#383838',
			'&:hover': { color: yellow[600], backgroundColor: '#000000' },
		},
		active: {
			border: ` 2px groove ${yellow[600]}`,
			backgroundColor: '#000000',
		},
	})
);

interface Props {}

const CardPage: React.FC<Props> = () => {
	//khai bao danh cho redux
	const dispatch = useDispatch();

	const classes = useStyles();

	const products: productEntry[] = useSelector(selectTotalCard);

	//khai bao format currency
	const formatter = new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'VND',
		minimumFractionDigits: 0,
	});

	return (
		<Grid xs={12} container justify='space-between'>
			<Grid item xs={7} className={classes.boxCard}>
				{products ? products.map((prod, index) => <CardCustom prod={prod} index={index} />) : {}}
			</Grid>
			<Grid item xs={4} className={classes.boxPayment}>
				<PaymentCustom />
			</Grid>
		</Grid>
	);
};

export default CardPage;
