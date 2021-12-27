import React, { ReactElement, useEffect } from 'react';
import 'pages/PrivacyPolicy/PrivatePoliPages.css';
import { useLocation } from 'react-router-dom';

interface Props {}

export default function IntroducePage({}: Props): ReactElement {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
	return (
		<div className='main-div'>
			<h1>CHẾ ĐỘ BẢO HÀNH</h1>
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
				<p>
					Bảo mật thông tin khách hàng là một trong những ưu tiên hàng đầu nhằm tạo điều kiện mua
					hàng trực tuyến tốt nhất cho bạn tại SneakersStore. Vì thế, chúng tôi cam kết việc sử dụng
					thông tin trên sẽ chỉ nhằm nâng cao chất lượng dịch vụ khách hàng và tạo môi trường mua
					sắm trực tuyến an tòan, tiện lợi tại cửa hàng chúng tôi
				</p>
				<p>
					Chúng tôi hiểu rằng hiểu rằng trách nhiệm của chúng tôi trong bất kỳ trường hợp nào cũng
					phải bảo mật thông tin khách hàng. Nếu có thắc mắc, góp ý nào liên quan đến chính sách bảo
					mật của SneakersStore, vui lòng liên hệ qua số điện thoại: 0396988709 hoặc
					email:dev.imlancer@gmail.com
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
