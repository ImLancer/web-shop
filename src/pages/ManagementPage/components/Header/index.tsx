import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { selectUser } from 'features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
	root: {
		minHeight: '60px',
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#0D324D',
	},
	boxAvatar: {
		minHeight: '60px',
		display: 'flex',
		alignItems: 'center',
	},
	avatar: {
		paddingLeft: '10px',
	},
	logout: {
		minHeight: '60px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#f5f5f5',
		borderLeft: '2px solid #67697C',
		'&:hover': {
			backgroundColor: '#253D5B',
			cursor: 'pointer',
			borderLeft: '4px solid #67697C',
		},
	},
});

interface Props {}

const Header: React.FC<Props> = () => {
	const classes = useStyles();

	const user = useSelector(selectUser);

	return (
		<Grid container className={classes.root} xs={12} justify='space-between'>
			<Grid className={classes.boxAvatar} xs={8}>
				<h4 style={{ color: 'white' }}>Chào, {user}</h4>
			</Grid>
		</Grid>
	);
};

export default Header;
