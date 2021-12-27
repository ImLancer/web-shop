//import from local
import Background from './images/login-pic-1.jpg';

//import react necessary
import React, { useState } from 'react';
import firebase, { db, app, auth } from 'firebase.js';
import { Link, useHistory } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';

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
import { LaptopWindowsOutlined } from '@material-ui/icons';

interface Props {}

const useStyles = makeStyles({
	mainBox: {
		backgroundImage: `url(${Background})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		minHeight: '100vh',
	},
	loginBox: {
		minHeight: '500px',
		minWidth: '400px',
		paddingRight: '1.5vw',
		paddingLeft: '1.5vw',
		backgroundColor: 'rgba(240, 248, 255,0.90)',
		color: 'white',
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
	},
	loginLink: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
});

interface handleAccount {
	accountId: string;
	accountMail: string;
	accountPassword: string;
	accountConfirmPassword: string;
	accountUsername: string;
	accountSex: string;
	accountBirthday: string;
	accountPhone: string;
	accountAddress: string;
	accountType: string;
	accountPoint: number;
}

const Signup: React.FC<Props> = () => {
	//khai báo all useState cho component
	const [showPassword, setShowPassword] = useState<boolean | undefined>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();

	//khai báo chuyển trang trong react-router-dom
	const history = useHistory();

	//khai báo css
	const classes = useStyles();

	//phần khai báo cho yup làm validation
	const signupSchema = yup.object().shape({
		accountMail: yup.string().email().required(),
		accountPassword: yup.string().min(6, 'Mật khẩu có ít nhất 5 ký tự').required(),
		accountConfirmPassword: yup
			.string()
			.oneOf([yup.ref('accountPassword')], 'Mật khẩu không trùng nhau')
			.required(),
	});

	//phần khai báo cho react-hook-dom
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<handleAccount>({
		defaultValues: {
			accountMail: '',
			accountPassword: '',
			accountConfirmPassword: '',
			//Chi tiet tai khoan
			accountUsername: '',
			accountSex: '',
			accountBirthday: '',
			accountPhone: '',
			accountAddress: '',
			accountType: 'standard',
			accountPoint: 0,
		},
		resolver: yupResolver(signupSchema),
	});

	//hiển thị mật khẩu
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	//ket noi csdl
	const ref = db.collection('accounts');

	//fucntion add tai khoan
	function addAccount(
		accountUsername: string,
		accountSex: string,
		accountBirthday: string,
		accountPhone: string,
		accountAddress: string,
		accountType: string,
		accountPoint: number,
		accountMail: string
	) {
		ref
			.doc()
			.set({
				accountUsername: accountUsername,
				accountSex: accountSex,
				accountBirthday: accountBirthday,
				accountPhone: accountPhone,
				accountAddress: accountAddress,
				accountType: accountType,
				accountPoint: accountPoint,
				accountMail: accountMail,
			})
			.then(async () => {
				alert('Đăng ký tài khoản thành công');
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
				history.push('/login');
			});
	}

	//fucntion submit của form
	const onSubmit = async (data: handleAccount) => {
		setLoading(true);
		const {
			accountMail,
			accountPassword,
			accountUsername,
			accountSex,
			accountBirthday,
			accountPhone,
			accountAddress,
			accountType,
			accountPoint,
		} = data;

		let birthday = accountBirthday.toString();

		await auth
			.createUserWithEmailAndPassword(accountMail, accountPassword)
			.then((authUser) => {})
			.catch((error) => {
				alert(error.message);
			});

		await auth.signOut();
		await dispatch(logout());

		await addAccount(
			accountUsername,
			accountSex,
			birthday,
			accountPhone,
			accountAddress,
			accountType,
			accountPoint,
			accountMail
		);
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
							<Typography
								variant='h4'
								className={classes.loginBoxItem}
								style={{ color: purple[500] }}
							>
								Đăng ký
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
										placeholder='abcdef@gmail.com'
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
							<Controller
								render={({ field }) => (
									<TextField
										{...field}
										className={classes.loginBoxItem}
										fullWidth
										type={showPassword ? 'text' : 'password'}
										label='Nhập lại mật khẩu'
										id='accountConfirmPassword'
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
										error={errors?.accountConfirmPassword ? true : false}
										helperText={errors.accountConfirmPassword?.message}
									/>
								)}
								name='accountConfirmPassword'
								control={control}
							/>
							<Button
								className={classes.loginBoxButton}
								fullWidth
								variant='contained'
								onClick={handleSubmit(onSubmit)}
							>
								Đăng Ký
							</Button>
							<Grid
								container
								className={classes.loginBoxItem}
								xs={12}
								justify='flex-end'
								alignItems='center'
							>
								<Typography style={{ color: 'black' }}>
									Bạn đã có tài khoản ?{' '}
									<Link to='/login' style={{ textDecoration: 'none', color: 'blue' }}>
										{' '}
										Đăng nhập
									</Link>
								</Typography>
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

export default Signup;
