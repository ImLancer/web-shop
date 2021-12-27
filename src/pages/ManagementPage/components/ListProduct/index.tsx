import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import HashLoader from 'react-spinners/HashLoader';
import CardCustom from 'pages/ManagementPage/components/CardCustom';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from 'features/productList/productListSlice';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import { GiReturnArrow } from 'react-icons/gi';
import { Typography, InputAdornment } from '@material-ui/core';

//import interface
import productEntry from 'interfaces/product/productEntry';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: { padding: '10px' },
		gridList: {
			width: '100%',
			height: '93vh',
			overflowX: 'hidden',
		},
		input: { color: 'white' },
		searchField: {
			'& .MuiOutlinedInput-root': {
				'& fieldset': {
					borderColor: 'white',
				},
				'&:hover fieldset': {
					borderColor: 'white',
				},
				'&.Mui-focused fieldset': {
					borderColor: 'white',
				},
			},
		},
	})
);

interface Props {}

const ListProduct: React.FC<Props> = () => {
	const [loading, setLoading] = useState<boolean | undefined>(false);
	const [filter, setFilter] = useState<string>('');

	const dispatch = useDispatch();

	const classes = useStyles();

	const products: productEntry[] = useSelector(selectProduct);

	let filterProduct: productEntry[] = [];

	if (filter !== '') {
		filterProduct = products.filter((prod) => {
			if (prod.prodName.toLowerCase().includes(filter.toLowerCase())) {
				return prod;
			}
		});
	}

	const handleLoading = (stateLoad: boolean) => {
		setLoading(stateLoad);
	};

	return (
		<div>
			<Grid container xs={12} className={classes.root} justify='center'>
				<Grid item xs={11} container justify='center'>
					<TextField
						fullWidth
						size='small'
						variant='outlined'
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						placeholder='Nhập tên giày bạn muốn tìm kiếm...'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<GiReturnArrow style={{ color: 'white' }} />
								</InputAdornment>
							),
						}}
					/>
					<GridList className={classes.gridList}>
						{filter === ''
							? products.map((prod, index) => <CardCustom product={prod} index={index} />)
							: filterProduct.map((prod, index) => <CardCustom product={prod} index={index} />)}
					</GridList>
				</Grid>
			</Grid>
		</div>
	);
};

export default ListProduct;
