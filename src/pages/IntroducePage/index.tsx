import React, { ReactElement, useEffect } from 'react';
import 'pages/IntroducePage/IroPage.css';
import { useLocation } from 'react-router-dom';

interface Props {}

export default function IntroducePage({}: Props): ReactElement {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
	return (
		<div className='main-div'>
			<h1>Sneakers Store</h1>
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
			<p>
				<p>
					SneakersStore là một trong những nơi sưu tầm có khối lượng giày hiếm siêu khủng. Có những
					mẫu giày cực kì hype được giới sưu tầm săn lùng, thậm chí bạn sẽ bắt gặp nhiều mẫu lạ mới
					mà hiếm shop nào có. Có những mẫu chỉ có độc nhất 1 đôi. Ngoài ra những mẫu đang rất HOT
					trên thị trường sneaker về liên tục nên các bạn cứ yên tâm không sợ hết hàng.
				</p>
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
					Cửa Hàng Bán Giày Sneaker Adidas, Nike Chính Hãng tại TP Cần Thơ 100% Authentic nhập trực
					tiếp từ US, UK, JAPAN @SneakersStore nhiệm vụ mang hàng chính hãng đến tay người tiêu dùng
					Việt Nam .
				</p>
				<p>Chúng tôi phục với bạn với phương châm " You Are My Everything "</p>
				<p>
					{' '}
					Với mẫu giày và nhiều size cho bạn lựa chọn và được quy định theo bảng size giày quốc tế
				</p>
			</div>
			<div className='img-p'>
				<img
					src='data:image/jpeg;base64,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'
					alt=''
				/>
				<img
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1G62QpqTW5hEXOoRr9LMDy3ygEyXFvDbG_Q&usqp=CAU'
					alt=''
				/>
				<img
					src='data:image/png;base64,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'
					alt=''
				/>
			</div>
		</div>
	);
}
