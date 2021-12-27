// import React, { useState } from 'react';
// import * as yup from 'yup';
// import { auth } from 'firebase.js';
// import { Link, useHistory } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import { Controller, useForm } from 'react-hook-form';
// import TextField from '@material-ui/core/TextField';
// import { yupResolver } from '@hookform/resolvers/yup';
// import accountEntry from 'interfaces/account/accountEntry';
// import { InputAdornment, Typography } from '@material-ui/core';
// import { purple } from '@material-ui/core/colors';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import { FcHome } from 'react-icons/fc';

//import from local
import Background from './images/login-pic-1.jpg';

//import react necessary
import React, { useState } from 'react';
import firebase, { db, app, auth } from 'firebase.js';
import { Link, useHistory } from 'react-router-dom';

//import cho form
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//import cho redux
import { useDispatch } from 'react-redux';
import { logout } from 'features/user/userSlice';

//import interface
import accountEntry from 'interfaces/account/accountEntry';

//import giao dien material-ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment, Typography } from '@material-ui/core';

//import color material-ui
import { purple } from '@material-ui/core/colors';

//import icon
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FcHome } from 'react-icons/fc';

import HashLoader from 'react-spinners/HashLoader';

interface Props {}

const useStyles = makeStyles({
	mainBox: {
		backgroundImage: `url(${Background})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		minHeight: '100vh',
	},
	loginBox: {
		minHeight: '330px',
		minWidth: '400px',
		paddingRight: '1.5vw',
		paddingLeft: '1.5vw',
		backgroundColor: 'rgba(240, 248, 255,0.90)',
		color: purple[500],
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: '8px',
		'& .MuiButton-root': {
			color: 'white',
			backgroundColor: purple[500],
			'&:hover': {
				backgroundColor: purple[700],
				color: 'white',
			},
		},
	},
	loginBoxItem: {
		marginTop: '18px',
		'& label.Mui-focused': {
			color: purple[500],
		},
		'& .MuiInput-underline:before': {
			borderBottomColor: purple[500],
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: purple[500],
		},
	},
	loginBoxButton: {
		marginTop: '18px',
		color: 'white',
		backgroundColor: purple[500],
	},
	loginLink: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
});

interface handleAccountLogin {
	accountMail: string;
	accountPassword: string;
}

const Login: React.FC<Props> = () => {
	//tất cả các khai báo useState sử dụng trong hàm
	const [showPassword, setShowPassword] = useState<boolean | undefined>(false);
	const [loading, setLoading] = useState<boolean>(false);

	//chuyển trang trong react-router-dom
	const history = useHistory();

	//khai báo ccs
	const classes = useStyles();

	//định nghĩa cho yup để validation
	const loginSchema = yup.object().shape({
		accountMail: yup.string().email().required(),
		accountPassword: yup.string().required(),
	});

	//khai báo cho phần react-hook-form
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<handleAccountLogin>({
		defaultValues: {
			accountMail: '',
			accountPassword: '',
		},
		resolver: yupResolver(loginSchema),
	});

	//Thao tác đóng tắt menu
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	//Function submit của form
	const onSubmit = async (data: handleAccountLogin) => {
		setLoading(true);
		const { accountMail, accountPassword } = data;
		await auth
			.signInWithEmailAndPassword(accountMail, accountPassword)
			.then((authUser) => {
				alert('Đăng nhập thành công');
				history.push('/');
			})
			.catch((error) => {
				alert(error.message);
			})
			.finally(() => setLoading(false));
	};

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
				<Grid container className={classes.mainBox} alignItems='center' justify='center' xs={12}>
					<div>
						<form className={classes.loginBox} onSubmit={handleSubmit(onSubmit)}>
							<Typography variant='h4' className={classes.loginBoxItem}>
								Đăng nhập
							</Typography>
							<Controller
								render={({ field }) => (
									<TextField
										{...field}
										className={classes.loginBoxItem}
										fullWidth
										label='Tên đăng nhập'
										id='accountMail'
										size='small'
										error={errors?.accountMail ? true : false}
										helperText={errors.accountMail?.message}
									/>
								)}
								name='accountMail'
								control={control}
							/>
							<Controller
								render={({ field }) => (
									<TextField
										{...field}
										className={classes.loginBoxItem}
										fullWidth
										type={showPassword ? 'text' : 'password'}
										label='Mật khẩu'
										id='accountPassword'
										size='small'
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}
													>
														{showPassword ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											),
										}}
										error={errors?.accountPassword ? true : false}
										helperText={errors.accountPassword?.message}
									/>
								)}
								name='accountPassword'
								control={control}
							/>
							<Button
								className={classes.loginBoxButton}
								fullWidth
								variant='contained'
								type='submit'
								onClick={handleSubmit(onSubmit)}
							>
								Đăng Nhập
							</Button>
							<Grid
								container
								className={classes.loginBoxItem}
								xs={12}
								justify='flex-end'
								alignItems='center'
							>
								<Typography style={{ color: 'black' }}>
									Bạn chưa có tài khoản ?{' '}
									<Link to='/signup' style={{ textDecoration: 'none', color: 'blue' }}>
										{' '}
										Đăng ký
									</Link>{' '}
								</Typography>{' '}
								<p> </p>
								<Link to='/'>
									<IconButton aria-label='delete'>
										<FcHome fontSize='medium' />
									</IconButton>
								</Link>
							</Grid>
						</form>
					</div>
				</Grid>
			)}
		</div>
	);
};

export default Login;
