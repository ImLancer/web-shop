import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FcHome, FcAssistant, FcShipped, FcClock, FcSportsMode } from 'react-icons/fc';
import { GiBull, GiMailbox } from 'react-icons/gi';
import { AiOutlineCopyright } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	root: {},
	boxFooter: {
		minHeight: '25vh',
		backgroundColor: '#262626',
		color: '#E6E6FA',
	},
	contact: {
		padding: '15px',
	},
	boxGuarantee: {
		padding: '20px',
	},
	supportInfo: {
		'&:hover': {
			backgroundColor: '#000000',
			color: 'yellow',
		},
	},
});

interface Props {}

const Footer: React.FC<Props> = () => {
	const classes = useStyles();
	return (
		<Grid container className={classes.boxFooter} xs={12} justify='center'>
			<Grid item xs={4} className={classes.contact} spacing={3}>
				<Typography variant='h4'>Thông tin liên hệ</Typography>
				<Typography variant='subtitle1'>
					<GiBull />
					SNEAKERS.VN
				</Typography>
				<Typography variant='subtitle1'>
					<FcHome />
					Địa chỉ: 251/6 đường Trần Ngọc Quế, khu vực 4, Xuân Khánh, Ninh Kiều, Cần Thơ
				</Typography>
				<Typography variant='subtitle1'>
					<GiMailbox />
					Thư điện tử: dev.imlancer@gmail.com
				</Typography>
				<Typography variant='subtitle1'>
					<FcAssistant />
					Hotline: 0396988709
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Grid
					className={classes.boxGuarantee}
					container
					justify='center'
					direction='column'
					xs={12}
				>
					<Typography variant='h5'>
						<FcShipped />
						SHIP HÀNG COD TOÀN QUỐC
					</Typography>
					<Typography>Chỉ với 30k</Typography>
				</Grid>
				<Grid
					className={classes.boxGuarantee}
					container
					justify='center'
					direction='column'
					xs={12}
				>
					<Typography variant='h5'>
						<FcClock />
						ĐỔI HÀNG MIỄN PHÍ
					</Typography>
					<Typography>Trong vòng 7 ngày</Typography>
				</Grid>
				<Grid
					className={classes.boxGuarantee}
					container
					justify='center'
					direction='column'
					xs={12}
				>
					<Typography variant='h5'>
						<FcSportsMode />
						ĐI KHÔNG ÊM
					</Typography>
					<Typography>Hoàn tiền</Typography>
				</Grid>
			</Grid>
			<Grid item xs={4} style={{ padding: '10px' }}>
				<Typography variant='h4'>Thông tin hỗ trợ</Typography>
				<MenuList>
					<Link to='/intro' style={{textDecoration: 'none', color: '#E6E6FA' }}>
						<MenuItem className={classes.supportInfo}>Giới thiệu</MenuItem>
					</Link>
					<Link to='/policy' style={{textDecoration: 'none', color: '#E6E6FA' }}>
						<MenuItem className={classes.supportInfo}>Chính sách</MenuItem>
					</Link>
					<Link to='/pripolicy' style={{textDecoration: 'none', color: '#E6E6FA' }}>
						<MenuItem className={classes.supportInfo}>Quy định chung</MenuItem>
					</Link>
					<MenuItem className={classes.supportInfo}>Chính sách bảo mật thông tin</MenuItem>
					<Link to='/shippolicy' style={{textDecoration: 'none', color: '#E6E6FA' }}>
						<MenuItem className={classes.supportInfo}>
							Chính sách về vận chuyển và giao nhận
						</MenuItem>
					</Link>
					<Link to='/paypolicy' style={{textDecoration: 'none', color: '#E6E6FA' }}>
						<MenuItem className={classes.supportInfo}>
							Chính sách về thanh toán và hình thức thanh toán
						</MenuItem>
					</Link>
					<Link to='/signup' style={{textDecoration: 'none', color: '#E6E6FA' }}>
						<MenuItem className={classes.supportInfo}>
							Đăng ký thành viên để nhận thêm thông tin
						</MenuItem>
					</Link>
				</MenuList>
			</Grid>
			<Grid item container justify='center' xs={12}>
				<AiOutlineCopyright />
				Bản quyền thuộc về Sneakers.vn thiết kế chuẩn web SEO
			</Grid>
		</Grid>
	);
};

export default Footer;
