import React, { ReactElement, useEffect } from 'react';
import 'pages/PaymentPolicy/PayPoliPages.css';
import { useLocation } from 'react-router-dom';

interface Props {}

export default function IntroducePage({}: Props): ReactElement {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
	return (
		<div className='main-div'>
			<h1>CHÍNH SÁCH THANH TOÁN</h1>
			<p>Sneakers Store chuyên bán các mẫu giày có thương hiệu và chính hãng tại TP Cần Thơ </p>
			<div className='Img-intro'>
				<img
					src='https://drake.vn/image/catalog/H%C3%ACnh%20content/grand-opening/IMG_2150.jpg'
					alt=''
				/>
				<img
					src='https://kingshoes.vn/data/upload/media/Cua-hang-king-shoes-khai-truong-hinh-anh-thuc-te-8(1).jpg'
					alt='Sneakers store'
				/>
			</div>

			<p>
				<b>SneakersStore CHUẨN GIÀY REAL - DEAL SIÊU KHỦNG</b>
			</p>
			<div className='img-p'>
				<img
					src='https://kingshoes.vn/data/upload/media/cua-hang-giay-sneaker-chinh-hang-tai-hcm-king-shoes-khach-hang-check-in-192-nguyen-thai-binh-p12-tan-binh-43.jpg'
					alt=''
				/>
				<img
					src='https://publish.one37pm.net/wp-content/uploads/2019/07/adidas-best-of-all-time-collectors-should-own-mobile.jpg'
					alt=''
				/>
				<img src='https://bestsneakers.vn/wp-content/uploads/2020/09/NIKE-2020.jpg' alt='' />
			</div>
			<div>
				<h3>
					SneakersStore ship hàng toàn quốc COD - Kiểm tra hàng trước và thanh toán trực tiếp tại
					nhà.
				</h3>
				<h3>1. Nhận hàng tại địa chỉ của bạn :</h3>
				<h4> a/Thanh toán khi nhận hàng :</h4>
				<p>
					{' '}
					Cửa hàng chúng tôi ship hàng toàn quốc COD - Kiểm tra hàng trước và thanh toán trực tiếp
					tại nhà.
				</p>
				<h4>b/ Chuyển khoản ATM - Internet banking</h4>
				<p>
					Áp dụng khách hàng xa khu vực Hồ Chí Minh. Khi lựa chọn hình thức thanh toán chuyển khoản
					khách hàng sẽ nhận được số tài khoản với ngân hàng tương ứng cùng mã giao dịch. Mã giao
					dịch được điền vào chú thích khi thanh toán để đơn hàng được xác minh chính xác.
				</p>
				<h3>2. Nhận hàng tại cửa hàng :</h3>
				<p>
					Với phương thức nhận hàng tại cửa hàng khách hàng sẽ được giữ hàng tối đa 6 tiếng tính từ
					thời gian đặt hàng .Món hàng sẽ được giữ chân. Vui lòng đến SneakersStore trước 18h để
					thanh toán và nhận hàng. Đơn hàng sẽ tự động hủy sau 6h đặt hàng đối với nhận hàng tại cửa
					hàng và thanh toán sau khi nhận hàng
				</p>
				<p>
					Mua hàng trực tuyến cũng được áp dụng tất cả các khuyễn mãi hiện hành của SneakersStore
				</p>
				<p>
					{' '}
					SneakersStore nhiệm vụ mang hàng chính hãng đến tay người tiêu dùng Việt Nam !!! Địa chỉ:
					251/6 đường Trần Ngọc Quế, khu vực 4, Xuân Khánh, Ninh Kiều, Cần Thơ.{' '}
				</p>
			</div>
		</div>
	);
}
