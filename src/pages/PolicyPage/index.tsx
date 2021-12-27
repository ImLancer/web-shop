import React, { ReactElement, useEffect } from 'react';
import 'pages/PolicyPage/PoliPages.css';
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
					- Tất cả sản phẩm giày tại SneakersStore được đổi hàng trong vòng 15 ngày kể từ ngày nhận
					hàng khi chưa qua sử dụng còn full tag, hộp và kèm bill mua hàng.(do lỗi từ nhà sản xuất
					hoặc không vừa size). Chỉ áp dụng đổi hàng với SP không SALE ( MỨC ck 5% TRỞ XUỐNG ).
				</p>
				<p>
					- Tất cả sản phẩm tại SneakersStore được bảo hành hàng chính hãng trọn đời ( khách hàng
					phát hiện sản phẩm không chính hãng (hàng fake) từ SneakersStore là được đền bù gấp đôi
					giá trị sản phẩm đã mua).
				</p>
				<p>
					- SneakersStore CAM KẾT sản phẩm đưa đến khách hàng là CHÍNH HÃNG, thẻ có giá trị đảm bảo
					CHÍNH HÃNG TRỌN ĐỜI SẢN PHẨM. Và chỉ chấp nhận bảo hành là hàng CHÍNH HÃNG với Sản Phẩm
					còn nguyên tem và Tag bảo hành.
				</p>
				<p>
					<b>
						Sneakers Cam kết hàng chính hãng - chịu trách nhiệm đến cùng với sản phẩm bán ra!!!{' '}
					</b>
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
