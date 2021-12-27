//import necessary for react
import React from 'react';

//import for material-ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

//import page
import Product from 'pages/MainPage/components/Product';
import productEntry from 'interfaces/product/productEntry';

const useStyles = makeStyles({
	rowItem: {
		padding: '5px',
	},
	item: {
		marginTop: '10px',
	},
});

interface Props {
	amount: number;
	listProduct: productEntry[];
}

const Row: React.FC<Props> = ({ amount, listProduct }) => {
	const classes = useStyles();

	let rows: Array<object> = [];
	if (amount === 9) {
		for (let i = 0; i < 3; i++) {
			// note: we add a key prop here to allow react to uniquely identify each
			// element in this array. see: https://reactjs.org/docs/lists-and-keys.html
			rows.push(
				<Grid container xs={12} justify='center' className={classes.item}>
					<Grid item xs={4} container justify='flex-start'>
						<Product product={listProduct[i]} />
					</Grid>
					<Grid item xs={4} container justify='center'>
						<Product product={listProduct[i + 3]} />
					</Grid>
					<Grid item xs={4} container justify='flex-end'>
						<Product product={listProduct[i + 6]} />
					</Grid>
				</Grid>
			);
		}
	} else {
		for (let i = 0; i < amount-1; i++) {
			// note: we add a key prop here to allow react to uniquely identify each
			// element in this array. see: https://reactjs.org/docs/lists-and-keys.html
			rows.push(
				<Grid item>
					<Product product={listProduct[i]} />
				</Grid>
			);
		}
	}

	return (
		<div>
			<Grid
				className={classes.rowItem}
				container
				xs={12}
				justify='center'
				direction='row'
				spacing={amount === 9 ? 1 : 4}
			>
				{rows}
			</Grid>
		</div>
	);
};

export default Row;
