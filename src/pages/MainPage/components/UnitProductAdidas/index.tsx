import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Row from 'pages/MainPage/components/Row';

//import for redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAdidas } from 'features/productList/productListSlice';

//import interface
import productEntry from 'interfaces/product/productEntry';

interface Props {}

const useStyles = makeStyles((them: Theme) =>
	createStyles({
		boxUnit: {
			marginTop: '5px',
		},
		imageTitle: {
			padding: '10px 15px 10px 0',
			maxHeight: '1062px',
		},
		boxRow: {
			paddingBottom: '10px',
		},
	})
);

function UnitProduct(props: WithWidth) {
	const product: productEntry[] = useSelector(selectAdidas);

	const classes = useStyles();

	const { width } = props;

	return (
		<Grid container xs={12} justify='center' className={classes.boxUnit}>
			<Grid
				item
				xs={10}
				container
				justify='flex-start'
				style={{
					borderBottom: '5px groove #ffb300',
					backgroundImage: `url('https://wallpaperaccess.com/full/30100.jpg')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
				}}
			>
				<h1 style={{ padding: '20px', color: '#ff5252' }}>Giày Adidas</h1>
			</Grid>
			<Hidden lgUp>
				<Grid item container xs={10} direction='row'>
					<Grid className={classes.imageTitle} item xs={12}>
						<img
							src='https://i.pinimg.com/originals/58/51/be/5851be54a7c02d9550593aba2fb3473a.jpg'
							style={{ width: '100%', height: '100%' }}
							alt=''
						/>
					</Grid>
					<Grid item xs={12} className={classes.boxRow}>
						<Row amount={9} listProduct={product ? product : []} />
					</Grid>
				</Grid>
				<Grid xs={10}></Grid>
			</Hidden>
			<Hidden mdDown>
				<Grid item container xs={10} direction='row'>
					<Grid className={classes.imageTitle} item xs={6}>
						<img
							src='https://i.pinimg.com/originals/58/51/be/5851be54a7c02d9550593aba2fb3473a.jpg'
							style={{ width: '100%', height: '100%' }}
							alt=''
						/>
					</Grid>
					<Grid item xs={6} className={classes.boxRow}>
						<Row amount={9} listProduct={product ? product : []} />
					</Grid>
				</Grid>
				<Grid xs={10}></Grid>
			</Hidden>
		</Grid>
	);
}

export default withWidth()(UnitProduct);
