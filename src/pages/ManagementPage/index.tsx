import Navbar from 'pages/ManagementPage/components/Navbar';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import AddProduct from './components/AddProduct';
import ListProduct from './components/ListProduct';
import HashLoader from 'react-spinners/HashLoader';
import { makeStyles } from '@material-ui/core/styles';

import { BrowserRouter as Router, Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import clsx from 'clsx';

import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from 'features/productList/productListSlice';

//import interface
import productEntry from 'interfaces/product/productEntry';

interface Props {}

const useStyles = makeStyles({
	root: {
		minHeight: '100%',
		backgroundColor: '#0D324D',
	},
	PriMenu: {},
	PriItem: {
		display: 'flex',
		alignItems: 'center',
		minHeight: '70px',
		fontSize: '22px',
		color: '#f5f5f5',
		paddingLeft: '25px',
		backgroundColor: 'black',
		'&:hover': {
			backgroundColor: '#252831',
			borderLeft: '4px solid #632ce4',
			cursor: 'pointer',
		},
	},
	PriActive: {
		backgroundColor: '#252831',
		borderLeft: '4px solid #632ce4',
	},
	SubMenu: {},
	SubItem: {
		display: 'flex',
		alignItems: 'center',
		minHeight: '55px',
		fontSize: '20px',
		color: '#f5f5f5',
		backgroundColor: '#414757',
		paddingLeft: '50px',
		'&:hover': {
			backgroundColor: '#632ce4',
			cursor: 'pointer',
		},
	},
	SubActive: {
		backgroundColor: '#252831',
	},
});

const ManagementPage: React.FC<Props> = () => {
	const [loading, setLoading] = useState<boolean | undefined>(false);
	const [productMenu, setProductMenu] = useState<boolean | undefined>(false);
	const [accountMenu, setAccountMenu] = useState<boolean | undefined>(false);

	const classes = useStyles();

	let { path, url } = useRouteMatch();

	const handleLoading = (stateLoad: boolean) => {
		setLoading(stateLoad);
	};

	const products: productEntry[] = useSelector(selectProduct);
	console.log(path);

	return (
		<div>
			{loading ? (
				<Grid
					xs={12}
					container
					justify='center'
					alignItems='center'
					style={{
						height: '100vh',
						backgroundImage: `url('https://wallpaperaccess.com/full/30100.jpg')`,
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
					}}
				>
					<HashLoader size={80} loading={loading} color='#ffb300' />
				</Grid>
			) : (
				<Grid container xs={12} style={{ minHeight: '100vh', overflowY: 'hidden' }}>
					<Grid item xs={3}>
						<Header />
						<Navbar />
					</Grid>
					<Grid item xs={9}>
						<Switch>
							<Route exact path={`${path}`}>
								<AddProduct handleLoading={handleLoading} />
							</Route>
							<Route path={`${path}/listproduct`}>
								<ListProduct />
							</Route>
						</Switch>
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default ManagementPage;
