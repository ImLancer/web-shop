import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Row from 'pages/MainPage/components/Row';

//import for redux
import { useDispatch, useSelector } from 'react-redux';
import { selectNike } from 'features/productList/productListSlice';

//import interface
import productEntry from 'interfaces/product/productEntry';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		boxReverseUnit: {
			marginTop: '10px',
		},
		imageTitle: {
			padding: '10px',
			height: '1062px',
		},
		boxRow: { paddingBottom: '10px' },
	})
);

function ReverseUnitProduct(props: WithWidth) {
	const product: productEntry[] = useSelector(selectNike);

	const classes = useStyles();

	const { width } = props;

	return (
		<Grid container xs={12} justify='center' className={classes.boxReverseUnit}>
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
				<h1 style={{ padding: '20px', color: '#ff5252' }}>Giày Nike</h1>
			</Grid>
			<Hidden lgUp>
				<Grid item container xs={10} direction='row'>
					<Grid className={classes.imageTitle} item xs={12}>
						<img
							src='https://i.pinimg.com/originals/10/0a/45/100a45ce4edba95c6b722fc237dcb4bd.jpg'
							style={{ width: '100%', height: '100%' }}
							alt=''
						/>
					</Grid>
					<Grid item xs={12} className={classes.boxRow}>
						<Row amount={9} listProduct={product ? product : []} />
					</Grid>
				</Grid>
				<Grid xs={12}></Grid>
			</Hidden>
			<Hidden mdDown>
				<Grid item container xs={10} direction='row'>
					<Grid item xs={6} className={classes.boxRow}>
						<Row amount={9} listProduct={product ? product : []} />
					</Grid>
					<Grid className={classes.imageTitle} item xs={6}>
						<img
							src='https://i.pinimg.com/originals/10/0a/45/100a45ce4edba95c6b722fc237dcb4bd.jpg'
							style={{ width: '100%', height: '100%' }}
							alt=''
						/>
					</Grid>
				</Grid>
				<Grid xs={10}></Grid>
			</Hidden>
		</Grid>
	);
}

export default withWidth()(ReverseUnitProduct);
