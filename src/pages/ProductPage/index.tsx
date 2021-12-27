//import from local
import { sizes, prices, sorts } from './constants.js';

//import react necessary
import React, { useState, useEffect } from 'react';

//import react router dom
import { BrowserRouter as Router, Switch, useLocation } from 'react-router-dom';

//import cho form
import { Controller, useForm } from 'react-hook-form';

//import cho redux
import { useDispatch } from 'react-redux';
import { AddTotalCard, AddPaymentCard, cardCustom } from 'features/productList/productListSlice';

//import interface
import productEntry from 'interfaces/product/productEntry';

//import giao dien material-ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

//import colors
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';

//import icon
import SearchIcon from '@material-ui/icons/Search';
import { GrArchlinux } from 'react-icons/gr';
import { GiWalkingBoot, GiScrollQuill } from 'react-icons/gi';

const useStyles = makeStyles({
	root: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},

	//css cho phan filter
	box: {
		maxHeight: '30vh',
		width: '100%',
		padding: '5px 0px 5px 0px',
		display: 'flex',
		justifyContent: 'center',
	},
	boxForm: { padding: '8px' },
	button: {
		height: '58px',
		width: '20vw',
		backgroundColor: yellow[500],
		color: 'black',
		fontSize: '22px',
		textTransform: 'none',
		'&:hover': {
			backgroundColor: yellow[700],
		},
	},
	boxButton: {
		padding: '8px 8px 8px 40px',
		height: '',
	},
	formTitle: {
		display: 'flex',
		alignItems: 'center',
		margin: '5px',
		minHeight: '30px',
	},
	itemTitle: {
		display: 'flex',
		alignItems: 'center',
	},

	//css cho card product
	cardRoot: { maxWidht: '120px' },
	cardContent: { minHeight: '120px' },
	cardMedia: {
		minHeight: '250px',
		width: '100%',
	},
	productBox: {},
});

interface Props {
	products: productEntry[];
}

interface filter {
	prodPrice: string;
	prodSort: string;
}

const ProductPage: React.FC<Props> = ({ products }) => {
	//khai bao danh cho redux
	const dispatch = useDispatch();

	const location = useLocation();

	//khai bao usestate
	const [prodNum, setProdNum] = useState<number>(12);

	useEffect(() => {
		setProdNum(12);
	}, [location.pathname]);

	//khai bao bien binh thuong
	let productPage: productEntry[] = [];
	productPage = products.slice(0, prodNum);

	const [filterProduct, setFilterProduct] = useState<productEntry[]>([]);
	let subProduct: productEntry[] = [];

	//khai bao format currency
	const formatter = new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'VND',
		minimumFractionDigits: 0,
	});

	//import css
	const classes = useStyles();

	//khai báo cho phan useForm
	const { handleSubmit, control } = useForm<filter>({
		defaultValues: {
			prodPrice: '',
			prodSort: '',
		},
	});

	const handleChange = () => {
		setProdNum(prodNum + 12);
		productPage = products.slice(0, prodNum);
	};

	const handleAddToCard = async (prodId: string) => {
		let result: productEntry | undefined = products.find((product) => product.prodId === prodId);
		if (result !== undefined) {
			let subResult: cardCustom = {
				id: result.prodId,
				size: '',
				amount: 1,
				price: result.prodPrice,
			};
			dispatch(AddTotalCard(result));
			dispatch(AddPaymentCard(subResult));
		}
	};

	const onSubmit = async (data: filter) => {
		if (data.prodPrice !== '' && data.prodSort === '') {
			switch (data.prodPrice) {
				case '<3':
					setFilterProduct(products.filter((prod) => prod.prodPrice < 3000000));
					break;
				case '3-5':
					setFilterProduct(
						products.filter((prod) => prod.prodPrice > 3000000 && prod.prodPrice < 5000000)
					);
					break;
				case '5-8':
					setFilterProduct(
						products.filter((prod) => prod.prodPrice > 5000000 && prod.prodPrice < 8000000)
					);
					break;
				case '8-12':
					setFilterProduct(
						products.filter((prod) => prod.prodPrice > 8000000 && prod.prodPrice < 12000000)
					);
					break;
				case '12-15':
					setFilterProduct(
						products.filter((prod) => prod.prodPrice > 12000000 && prod.prodPrice < 15000000)
					);
					break;
				case '>15':
					setFilterProduct(products.filter((prod) => prod.prodPrice > 15000000));
					break;
			}
		}
		if (data.prodPrice === '' && data.prodSort !== '') {
			switch (data.prodSort) {
				case 'mi-ma':
					subProduct = [...products];
					setFilterProduct(
						subProduct.sort((a, b) => {
							return a.prodPrice - b.prodPrice;
						})
					);
					break;
				case 'ma-mi':
					subProduct = [...products];
					setFilterProduct(
						subProduct.sort((a, b) => {
							return b.prodPrice - a.prodPrice;
						})
					);
					break;
				case 'a-z':
					subProduct = [...products];
					setFilterProduct(
						subProduct.sort((a, b) => {
							if (a.prodName < b.prodName) {
								return -1;
							}
							if (a.prodName > b.prodName) {
								return 1;
							}
							return 0;
						})
					);
					break;
				case 'z-a':
					subProduct = [...products];
					setFilterProduct(
						subProduct.sort((a, b) => {
							if (a.prodName > b.prodName) {
								return -1;
							}
							if (a.prodName < b.prodName) {
								return 1;
							}
							return 0;
						})
					);
					break;
			}
		}
		if (data.prodPrice !== '' && data.prodSort !== '') {
			// < 3.000.000
			if (data.prodPrice === '<3' && data.prodSort === 'mi-ma') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					return a.prodPrice - b.prodPrice;
				});
				setFilterProduct(subProduct.filter((prod) => prod.prodPrice < 3000000));
			}
			if (data.prodPrice === '<3' && data.prodSort === 'ma-mi') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					return b.prodPrice - a.prodPrice;
				});
				setFilterProduct(subProduct.filter((prod) => prod.prodPrice < 3000000));
			}
			if (data.prodPrice === '<3' && data.prodSort === 'a-z') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					if (a.prodName < b.prodName) {
						return -1;
					}
					if (a.prodName > b.prodName) {
						return 1;
					}
					return 0;
				});
				setFilterProduct(subProduct.filter((prod) => prod.prodPrice < 3000000));
			}
			if (data.prodPrice === '<3' && data.prodSort === 'mi-ma') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					if (a.prodName > b.prodName) {
						return -1;
					}
					if (a.prodName < b.prodName) {
						return 1;
					}
					return 0;
				});
				setFilterProduct(subProduct.filter((prod) => prod.prodPrice < 3000000));
			}

			//3.000.000 - 5.000.000
			if (data.prodPrice === '3-5' && data.prodSort === 'mi-ma') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					return a.prodPrice - b.prodPrice;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 3000000 && prod.prodPrice < 5000000)
				);
			}
			if (data.prodPrice === '3-5' && data.prodSort === 'ma-mi') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					return b.prodPrice - a.prodPrice;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 3000000 && prod.prodPrice < 5000000)
				);
			}
			if (data.prodPrice === '3-5' && data.prodSort === 'a-z') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					if (a.prodName < b.prodName) {
						return -1;
					}
					if (a.prodName > b.prodName) {
						return 1;
					}
					return 0;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 3000000 && prod.prodPrice < 5000000)
				);
			}
			if (data.prodPrice === '3-5' && data.prodSort === 'mi-ma') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					if (a.prodName > b.prodName) {
						return -1;
					}
					if (a.prodName < b.prodName) {
						return 1;
					}
					return 0;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 3000000 && prod.prodPrice < 5000000)
				);
			}

			//5.000.000 - 8.000.000
			if (data.prodPrice === '5-8' && data.prodSort === 'mi-ma') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					return a.prodPrice - b.prodPrice;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 5000000 && prod.prodPrice < 8000000)
				);
			}
			if (data.prodPrice === '5-8' && data.prodSort === 'ma-mi') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					return b.prodPrice - a.prodPrice;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 5000000 && prod.prodPrice < 8000000)
				);
			}
			if (data.prodPrice === '5-8' && data.prodSort === 'a-z') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					if (a.prodName < b.prodName) {
						return -1;
					}
					if (a.prodName > b.prodName) {
						return 1;
					}
					return 0;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 5000000 && prod.prodPrice < 8000000)
				);
			}
			if (data.prodPrice === '5-8' && data.prodSort === 'mi-ma') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					if (a.prodName > b.prodName) {
						return -1;
					}
					if (a.prodName < b.prodName) {
						return 1;
					}
					return 0;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 5000000 && prod.prodPrice < 8000000)
				);
			}

			//8.000.000 - 12.000.000
			if (data.prodPrice === '8-12' && data.prodSort === 'mi-ma') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					return a.prodPrice - b.prodPrice;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 8000000 && prod.prodPrice < 12000000)
				);
			}
			if (data.prodPrice === '8-12' && data.prodSort === 'ma-mi') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					return b.prodPrice - a.prodPrice;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 8000000 && prod.prodPrice < 12000000)
				);
			}
			if (data.prodPrice === '8-12' && data.prodSort === 'a-z') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					if (a.prodName < b.prodName) {
						return -1;
					}
					if (a.prodName > b.prodName) {
						return 1;
					}
					return 0;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 8000000 && prod.prodPrice < 12000000)
				);
			}
			if (data.prodPrice === '8-12' && data.prodSort === 'mi-ma') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					if (a.prodName > b.prodName) {
						return -1;
					}
					if (a.prodName < b.prodName) {
						return 1;
					}
					return 0;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 8000000 && prod.prodPrice < 12000000)
				);
			}

			//12.000.000 - 15.000.000
			if (data.prodPrice === '12-15' && data.prodSort === 'mi-ma') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					return a.prodPrice - b.prodPrice;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 12000000 && prod.prodPrice < 15000000)
				);
			}
			if (data.prodPrice === '12-15' && data.prodSort === 'ma-mi') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					return b.prodPrice - a.prodPrice;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 12000000 && prod.prodPrice < 15000000)
				);
			}
			if (data.prodPrice === '12-15' && data.prodSort === 'a-z') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					if (a.prodName < b.prodName) {
						return -1;
					}
					if (a.prodName > b.prodName) {
						return 1;
					}
					return 0;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 12000000 && prod.prodPrice < 15000000)
				);
			}
			if (data.prodPrice === '12-15' && data.prodSort === 'mi-ma') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					if (a.prodName > b.prodName) {
						return -1;
					}
					if (a.prodName < b.prodName) {
						return 1;
					}
					return 0;
				});
				setFilterProduct(
					subProduct.filter((prod) => prod.prodPrice > 12000000 && prod.prodPrice < 15000000)
				);
			}

			//>15.000.000
			if (data.prodPrice === '>15' && data.prodSort === 'mi-ma') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					return a.prodPrice - b.prodPrice;
				});
				setFilterProduct(subProduct.filter((prod) => prod.prodPrice > 15000000));
			}
			if (data.prodPrice === '>15' && data.prodSort === 'ma-mi') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					return b.prodPrice - a.prodPrice;
				});
				setFilterProduct(subProduct.filter((prod) => prod.prodPrice > 15000000));
			}
			if (data.prodPrice === '>15' && data.prodSort === 'a-z') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					if (a.prodName < b.prodName) {
						return -1;
					}
					if (a.prodName > b.prodName) {
						return 1;
					}
					return 0;
				});
				setFilterProduct(subProduct.filter((prod) => prod.prodPrice > 15000000));
			}
			if (data.prodPrice === '>15' && data.prodSort === 'mi-ma') {
				subProduct = [...products];
				subProduct.sort((a, b) => {
					if (a.prodName > b.prodName) {
						return -1;
					}
					if (a.prodName < b.prodName) {
						return 1;
					}
					return 0;
				});
				setFilterProduct(subProduct.filter((prod) => prod.prodPrice > 15000000));
			}
		}
	};

	//thiết kế phần filter form
	const FilterForm = (
		<form onSubmit={handleSubmit(onSubmit)} className={classes.box}>
			<Grid container xs={12} style={{ backgroundColor: grey[300] }}>
				<Grid container className={classes.boxForm} xs={4} justify='flex-end'>
					<Grid className={classes.itemTitle} xs={12}>
						<Typography variant='h6'>Chọn khoảng giá tiền:</Typography>
					</Grid>
					<Grid xs={12}>
						<Controller
							render={({ field }) => (
								<FormControl fullWidth variant='outlined'>
									<Select {...field} labelId='prodPrice' id='prodPrice' color='primary'>
										<MenuItem value=''>
											<em>None</em>
										</MenuItem>
										{prices.map((price) => (
											<MenuItem value={price.value}>{price.title}</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
							name='prodPrice'
							control={control}
						/>
					</Grid>
				</Grid>

				<Grid container className={classes.boxForm} xs={4} justify='flex-end'>
					<Grid className={classes.itemTitle} xs={12}>
						<Typography variant='h6'>Sắp xếp theo:</Typography>
					</Grid>
					<Grid xs={12}>
						<Controller
							render={({ field }) => (
								<FormControl fullWidth variant='outlined'>
									<Select {...field} labelId='prodSort' id='prodSort' color='primary'>
										<MenuItem value=''>
											<em>None</em>
										</MenuItem>
										{sorts.map((sort) => (
											<MenuItem value={sort.value}>{sort.title}</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
							name='prodSort'
							control={control}
						/>
					</Grid>
				</Grid>

				<Grid container className={classes.boxButton} xs={4} alignItems='flex-end'>
					<Button
						type='submit'
						variant='contained'
						size='large'
						className={classes.button}
						startIcon={<SearchIcon />}
					>
						Tìm Giày
					</Button>
				</Grid>
			</Grid>
		</form>
	);

	//thiết kế phần sản phẩm
	const CardProduct = (product: productEntry) => {
		return (
			<Grid item xl={4} xs={3}>
				<Card className={classes.cardRoot}>
					<CardActionArea>
						<CardMedia className={classes.cardMedia} image={product.prodUrlList[0]} />
						<CardContent className={classes.cardContent}>
							<Typography gutterBottom style={{ height: '10vh', fontSize: '19px' }}>
								{product.prodName}
							</Typography>
							<Typography
								variant='body1'
								color='textSecondary'
								component='p'
								style={{ paddingTop: '4vh' }}
							>
								{formatter.format(product.prodPrice)}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions style={{ display: 'flex', justifyContent: 'center' }}>
						{/* <IconButton
							style={{
								backgroundColor: '#262626',
								color: 'yellow',
								fontSize: '1.5vw',
							}}
							onClick={() => handleAddToCard(product.prodId)}
						>
							<GiScrollQuill />
						</IconButton> */}
						<Button
							size='small'
							fullWidth
							startIcon={<GiScrollQuill />}
							style={{ color: 'yellow', backgroundColor: '#262626' }}
							onClick={() => handleAddToCard(product.prodId)}
						>
							Thêm vào giỏ hàng
						</Button>
					</CardActions>
				</Card>
			</Grid>
		);
	};

	return (
		<Grid>
			{filterProduct.length !== 0 ? (
				<Grid>
					{FilterForm}
					<Grid className={classes.productBox} container justify='center'>
						<Grid spacing={4} xs={12} container>
							{filterProduct.map((product) => CardProduct(product))}
						</Grid>
						<Grid
							container
							style={{
								height: '10%',
								padding: '8px',
							}}
							justify='center'
							alignItems='center'
						>
							{filterProduct.length > prodNum ? (
								<IconButton
									style={{
										backgroundColor: '#262626',
										color: 'yellow',
									}}
									onClick={() => handleChange()}
								>
									<GiWalkingBoot />
								</IconButton>
							) : (
								<IconButton
									style={{
										backgroundColor: '#262626',
										color: 'yellow',
									}}
									onClick={async () => {
										window.scrollTo({ top: 0, behavior: 'smooth' });
										setTimeout(() => setProdNum(12), 700);
									}}
								>
									<GrArchlinux />
								</IconButton>
							)}
						</Grid>
					</Grid>
				</Grid>
			) : (
				<Grid>
					{FilterForm}
					<Grid className={classes.productBox} container justify='center'>
						<Grid spacing={4} xs={12} container>
							{products ? productPage.map((product) => CardProduct(product)) : {}}
						</Grid>
						<Grid
							container
							style={{
								height: '10%',
								padding: '8px',
							}}
							justify='center'
							alignItems='center'
						>
							{products.length > prodNum ? (
								<IconButton
									style={{
										backgroundColor: '#262626',
										color: 'yellow',
									}}
									onClick={() => handleChange()}
								>
									<GiWalkingBoot />
								</IconButton>
							) : (
								<IconButton
									style={{
										backgroundColor: '#262626',
										color: 'yellow',
									}}
									onClick={async () => {
										window.scrollTo({ top: 0, behavior: 'smooth' });
										setTimeout(() => setProdNum(12), 700);
									}}
								>
									<GrArchlinux />
								</IconButton>
							)}
						</Grid>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
};

export default ProductPage;
