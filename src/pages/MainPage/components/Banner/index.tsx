import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
	root: { paddingTop: '1px' },
	banner: {
		width: '100%',
		minHeight: '400px',
	},
});

interface Props {}

const Banner: React.FC<Props> = () => {
	const classes = useStyles();
	return (
		<Grid container xs={12} justify='center'>
			<Grid item className={classes.root} xs={12}>
				<img
					className={classes.banner}
					src='https://x9shop.vn/wp-content/uploads/2020/08/banner111-1400x474.jpg'
					alt=''
				/>
			</Grid>
		</Grid>
	);
};

export default Banner;
