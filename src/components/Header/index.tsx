//import from local
import logo from './images/logo5.png';
import { style } from './style.js';

//import necessary for react
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

//import for firebase
import { auth } from 'firebase.js';

//import for form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

//import for redux
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUser,
	login,
	logout,
	AddUserDetail,
	RemoveUserDetail,
	selectUserDetail,
} from 'features/user/userSlice';
import { selectTotalCard, selectProduct } from 'features/productList/productListSlice';
import { Add, selectAccount } from 'features/accountList/accountListSlice';

//import for material-core
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Autocomplete from '@material-ui/lab/Autocomplete';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, InputAdornment } from '@material-ui/core';

//import icon
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { GiReturnArrow } from 'react-icons/gi';
import { GiScrollUnfurled, GiKing } from 'react-icons/gi';

//import interface
import accountEntry from 'interfaces/account/accountEntry';
import productEntry from 'interfaces/product/productEntry';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		...style,
	})
);

function Header(props: WithWidth) {
	const accounts: accountEntry[] = useSelector(selectAccount);

	//khai bao cho redux
	const dispatch = useDispatch();

	//useEffect checkout user
	useEffect(() => {
		const unsubcribe = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				//login
				console.log(accounts);
				let userDetail = accounts.find((acc) => acc.accountMail == userAuth.email);
				console.log(userDetail);
				dispatch(login(userAuth.email));
				dispatch(AddUserDetail(userDetail));
			} else {
				//logout
				dispatch(logout);
				dispatch(RemoveUserDetail());
			}
		});
	}, [dispatch]);

	//all selector cho component
	const user = useSelector(selectUser);
	const subDetail = useSelector(selectUserDetail);
	const products = useSelector(selectProduct);
	const TotalCardList = useSelector(selectTotalCard);

	let userDetail: accountEntry = { ...subDetail };

	//khai báo css
	const classes = useStyles();

	//all state cho component
	let history = useHistory();
	const { width } = props;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [showSearch, setShowSearch] = useState<boolean | undefined>(false);

	//let subProduct: productEntry[] = [...products];

	//khai bao cho reat-router-dom
	//let { url } = useRouteMatch();

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleMenuCloseLogout = () => {
		setAnchorEl(null);
		auth.signOut();
		dispatch(logout());
	};

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
				<MenuItem onClick={handleMenuClose}>Đăng nhập</MenuItem>
			</Link>
			<Link to='/signup' style={{ textDecoration: 'none', color: 'black' }}>
				<MenuItem onClick={handleMenuClose}>Đăng ký</MenuItem>
			</Link>
		</Menu>
	);

	const renderMenuUser = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Chào, {user}</MenuItem>
			{userDetail.accountType === 'admin' ? (
				<Link to='/management' style={{ textDecoration: 'none', color: 'black' }}>
					<MenuItem onClick={handleMenuClose}>Quản lí</MenuItem>
				</Link>
			) : (
				<div></div>
			)}
			<MenuItem onClick={handleMenuCloseLogout}>Thoát ra</MenuItem>
		</Menu>
	);

	const searchBar = (
		<Grid item container xs={10} justify='center'>
			<div style={{ width: '50vw' }}>
				<Autocomplete
					id='free-solo-demo'
					fullWidth
					freeSolo
					options={products}
					getOptionLabel={(prod) => `${prod.prodName}`}
					renderOption={(prod) => {
						return (
							<Link
								to={`/detail/${prod.prodId}`}
								style={{ textDecoration: 'none', color: 'black' }}
							>
								<Grid container>
									<img src={prod.prodUrlList[0]} width='80' height='80' alt='' />
									<Grid spacing={4} style={{ padding: '4px' }}>
										<Typography>{prod.prodName}</Typography>
									</Grid>
								</Grid>
							</Link>
						);
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							className={classes.searchField}
							fullWidth
							size='small'
							variant='outlined'
							placeholder='Nhập tên giày bạn muốn tìm kiếm...'
							InputProps={{
								...params.InputProps,
								className: classes.input,
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={() => {
												setShowSearch(false);
											}}
										>
											<GiReturnArrow style={{ color: 'white' }} />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					)}
				/>
			</div>
		</Grid>
	);

	return (
		<Grid className={classes.root} container justify='center' alignItems='center'>
			{showSearch ? (
				searchBar
			) : (
				<Grid item container xs={12} className={classes.largeScreen}>
					<Hidden lgUp>
						<Grid item xs={5}>
							<Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
								<img className={classes.logo} height={65} width={120} src={logo} alt='' />
							</Link>
						</Grid>
						<Grid item container xs={5} justify='flex-end' alignItems='center'>
							<Grid item container justify='flex-end' direction='row'>
								<IconButton
									onClick={() => {
										setShowSearch(true);
									}}
								>
									<SearchIcon className={classes.SearchIcon} />
								</IconButton>
								<IconButton>
									<Badge badgeContent={TotalCardList.length} color='error'>
										<Link to={`/card`}>
											<GiScrollUnfurled className={classes.CartIcon} />
										</Link>
									</Badge>
								</IconButton>

								<IconButton
									edge='end'
									aria-label='account of current user'
									aria-haspopup='true'
									onClick={handleProfileMenuOpen}
									color='inherit'
								>
									<GiKing className={classes.AccountIcon} />
								</IconButton>
							</Grid>
							{user === '' || user === null ? renderMenu : renderMenuUser}
						</Grid>
						<Grid
							item
							container
							className={classes.Navbar}
							style={{ borderTop: '1px solid white' }}
							xs={12}
							justify='center'
							alignItems='center'
						>
							<Grid item className={classes.box}>
								<Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
									<Typography className={classes.TypographyNav} style={{ width: '12.5vw' }}>
										Trang chủ
									</Typography>
								</Link>
							</Grid>
							<Grid item className={classes.box}>
								<Link to={`/product/products`} style={{ textDecoration: 'none', color: 'black' }}>
									<Typography className={classes.TypographyNav} style={{ width: '12.5vw' }}>
										Sản phẩm
									</Typography>
								</Link>
							</Grid>
							<Grid item className={classes.box}>
								<Link to={`/product/adidas`} style={{ textDecoration: 'none', color: 'black' }}>
									<Typography className={classes.TypographyNav} style={{ width: '12.5vw' }}>
										Adidas
									</Typography>
								</Link>
							</Grid>
							<Grid item className={classes.box}>
								<Link to={`/product/nike`} style={{ textDecoration: 'none', color: 'black' }}>
									<Typography className={classes.TypographyNav} style={{ width: '12.5vw' }}>
										Nike
									</Typography>
								</Link>
							</Grid>
							<Grid item className={classes.box}>
								<Link to={`/product/yeezy`} style={{ textDecoration: 'none', color: 'black' }}>
									<Typography className={classes.TypographyNav} style={{ width: '12.5vw' }}>
										Yeezy
									</Typography>
								</Link>
							</Grid>
							<Grid item className={classes.box}>
								<Link to={`/product/jordan`} style={{ textDecoration: 'none', color: 'black' }}>
									<Typography
										className={clsx(classes.TypographyNav, classes.TypographyLast)}
										style={{ width: '12.5vw' }}
									>
										Jordan
									</Typography>
								</Link>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden mdDown>
						<Grid item xs={2}>
							<Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
								<img className={classes.logo} height={65} width={120} src={logo} alt='' />
							</Link>
						</Grid>
						<Grid
							item
							container
							className={classes.Navbar}
							xs={8}
							justify='center'
							alignItems='center'
						>
							<Grid item className={classes.box}>
								<Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
									<Typography className={classes.TypographyNav}>Trang chủ</Typography>
								</Link>
							</Grid>
							<Grid item className={classes.box}>
								<Link to={`/product/products`} style={{ textDecoration: 'none', color: 'black' }}>
									<Typography className={classes.TypographyNav}>Sản phẩm</Typography>
								</Link>
							</Grid>
							<Grid item className={classes.box}>
								<Link to={`/product/adidas`} style={{ textDecoration: 'none', color: 'black' }}>
									<Typography className={classes.TypographyNav}>Adidas</Typography>
								</Link>
							</Grid>
							<Grid item className={classes.box}>
								<Link to={`/product/nike`} style={{ textDecoration: 'none', color: 'black' }}>
									<Typography className={classes.TypographyNav}>Nike</Typography>
								</Link>
							</Grid>
							<Grid item className={classes.box}>
								<Link to={`/product/yeezy`} style={{ textDecoration: 'none', color: 'black' }}>
									<Typography className={classes.TypographyNav}>Yeezy</Typography>
								</Link>
							</Grid>
							<Grid item className={classes.box}>
								<Link to={`/product/jordan`} style={{ textDecoration: 'none', color: 'black' }}>
									<Typography className={clsx(classes.TypographyNav, classes.TypographyLast)}>
										Jordan
									</Typography>
								</Link>
							</Grid>
						</Grid>

						<Grid item container xs={2} justify='flex-end' alignItems='center'>
							<Grid item container justify='flex-end' direction='row'>
								<IconButton
									onClick={() => {
										setShowSearch(true);
									}}
								>
									<SearchIcon className={classes.SearchIcon} />
								</IconButton>
								<IconButton>
									<Badge badgeContent={TotalCardList.length} color='error'>
										<Link to={`/card`}>
											<GiScrollUnfurled className={classes.CartIcon} />
										</Link>
									</Badge>
								</IconButton>
								<IconButton
									edge='end'
									aria-label='account of current user'
									aria-haspopup='true'
									onClick={handleProfileMenuOpen}
									color='inherit'
								>
									<GiKing className={classes.AccountIcon} />
								</IconButton>
							</Grid>
							{user === '' || user === null ? renderMenu : renderMenuUser}
						</Grid>
					</Hidden>
				</Grid>
			)}
		</Grid>
	);
}

export default withWidth()(Header);
