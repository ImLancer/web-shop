import React, { ReactElement, useEffect } from 'react';
import 'pages/ShippingPolicy/ShipingPoliPages.css';
import { useLocation } from 'react-router-dom';

interface Props {}

export default function IntroducePage({}: Props): ReactElement {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<div className='main-div'>
			<h1>CHẾ ĐỘ VẬN CHUYỂN VÀ GAIO NHẬN</h1>
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
				<h3>Thời Gian Giao Hàng</h3>
				<p>Khu vực TP. Hồ Chí Minh: Giao hàng từ 1 - 2 ngày.</p>
				<p>Khu vực Tỉnh : Giao hàng từ 2 - 6 ngày.</p>
				<p>
					Để cải thiện chất lượng hàng ship đến tay Quý Khách NGUYÊN VẸN - ĐẸP - CHUẨN HÀNG và
					CHUYÊN NGHIỆP, SneakersStore sử dụng #Doublebox với lớp thùng carton thương hiệu
					SneakersStore để bảo vệ hộp giày chính hãng.
				</p>
				<h3>Bảng Giá Vận Chuyển</h3>
				<p>Khu vực TP. Hồ Chí Minh: Miễn phí chi phí vận chuyển (Free ship).</p>
				<p>
					Khu vực Tỉnh : Cửa hàng sẽ hỗ trợ khách hàng 50k chi phí vận chuyển phát sinh từ các đơn
					vị vận chuyển như: Giao Hàng Nhanh, VN Post, Viettel.
				</p>
				<p>
					SneakersStore ship hàng toàn quốc COD- Kiểm tra hàng trước và thanh toán trực tiếp tại
					nhà.
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
