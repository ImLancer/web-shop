import React from 'react';
import Grid from '@material-ui/core/Grid';
import { slideitem } from './Styles.js';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		padding: '5px 10px 10px 30px',
	},
	Paper: (props) => ({
		...props,
	}),
	Paper1: (props) => ({
		...props,
		backgroundImage:
			'url(https://file.hstatic.net/1000282067/file/theo-chan-hot-tiktoker-viet-nam-custom-giay-nike-af1-cuc-thu-hut-1_5be0c64cb6a64011932886f5470043f9_grande.jpg)',
	}),
	Paper2: (props) => ({
		...props,
		backgroundImage:
			'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk0giciUHfBD4wyrdpzn4zcAzSnMaNGV1vHw&usqp=CAU)',
	}),
});

interface Props {}

const Slidebar: React.FC<Props> = () => {
	const classes = useStyles(slideitem);
	return (
		<Grid container xs={12} justify='center'>
			<Grid item container className={classes.root} xs={11} justify='center'>
				<Grid item xs={4}>
					<Link to={`/product/adidas`} style={{ textDecoration: 'none', color: 'black' }}>
						<Paper className={classes.Paper} square>
							<Typography variant='h6' component='p'>
								ADIDAS
							</Typography>
						</Paper>
					</Link>
				</Grid>
				<Grid item xs={4}>
					<Link to={`/product/nike`} style={{ textDecoration: 'none', color: 'black' }}>
						<Paper className={classes.Paper1} square>
							<Typography variant='h6' component='p'>
								NIKE
							</Typography>
						</Paper>
					</Link>
				</Grid>
				<Grid item xs={4}>
					<Link to={`/product/yeezy`} style={{ textDecoration: 'none', color: 'black' }}>
						<Paper className={classes.Paper2} square>
							<Typography variant='h6' component='p'>
								YEEZY
							</Typography>
						</Paper>
					</Link>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Slidebar;
