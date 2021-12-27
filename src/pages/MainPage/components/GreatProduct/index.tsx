import React from 'react';
import Grid from '@material-ui/core/Grid';
import Row from 'pages/MainPage/components/Row';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from 'features/productList/productListSlice';
import productEntry from 'interfaces/product/productEntry';

interface Props {}

const GreatProduct: React.FC<Props> = () => {
	const product: productEntry[] = useSelector(selectProduct);

	return (
		<Grid container xs={12} justify='center'>
			<Grid
				item
				xs={11}
				container
				justify='flex-start'
				style={{
					borderBottom: '5px groove #ffb300',
					backgroundImage: `url('https://wallpaperaccess.com/full/30100.jpg')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
				}}
			>
				<h1 style={{ padding: '20px', color: '#ff5252' }}>Sản Phẩm Nổi Bật</h1>
			</Grid>
			<Grid item xs={11} style={{ padding: '5px 10px 0px 30px' }}>
				<Row amount={6} listProduct={product ? product : []} />
			</Grid>
		</Grid>
	);
};

export default GreatProduct;
