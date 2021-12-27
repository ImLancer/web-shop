import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

interface Props {}

const Navbar: React.FC<Props> = () => {
	const [productMenu, setProductMenu] = useState<boolean | undefined>(false);
	const [accountMenu, setAccountMenu] = useState<boolean | undefined>(false);

	let { path, url } = useRouteMatch();

	const classes = useStyles();
	return (
		<Grid className={classes.root} xs={12}>
			<Grid className={classes.PriMenu} xs={12}>
				<Link to='/'>
					<Grid
						className={classes.PriItem}
						xs={12}
						onClick={() => {
							setProductMenu(!productMenu);
							setAccountMenu(false);
						}}
					>
						Trang chủ
					</Grid>
				</Link>
			</Grid>
			<Grid className={classes.PriMenu} xs={12}>
				<Link to={`/management`}>
					<Grid className={classes.PriItem} xs={12}>
						Thêm sản phẩm
					</Grid>
				</Link>
			</Grid>
			<Grid className={classes.PriMenu} xs={12}>
				<Link to={`/management/listproduct`}>
					<Grid className={classes.PriItem} xs={12}>
						Danh sách sản phẩm
					</Grid>
				</Link>
			</Grid>
			<Grid container className={classes.PriMenu} xs={12}>
				{/* <Grid
					className={clsx(classes.PriItem, accountMenu ? classes.PriActive : '')}
					xs={12}
					onClick={() => {
						setAccountMenu(!accountMenu);
						setProductMenu(false);
					}}
				>
					Quản lý người dùng
				</Grid> */}
				{accountMenu && (
					<Grid className={classes.SubMenu} xs={12}>
						<Grid className={classes.SubItem} xs={12}>
							Cấp quyền tài khoản
						</Grid>
						<Grid className={classes.SubItem} xs={12}>
							Danh sách tài khoản
						</Grid>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
};

export default Navbar;
