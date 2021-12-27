export const slideitem = {
	width: '95%',
	height: '250px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	transition: 'all 0.5ms ease-in-out',
	backgroundImage: `url(http://file.hstatic.net/1000282067/file/-doi-giay-adidas-nam-sang-trong-lich-lam-va-ben-bi-theo-tung-nam-thang_b80ba8a0ac274ff98b2a18046b1c1061_grande.jpg)`,
	backgroundSize: '100% 100%',
	backgroundPosition: 'center center',
	'& p': {
		width: '100px',
		height: '35px',
		backgroundColor: 'black',
		color: 'white',
		opacity: 0.7,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
	},
	'&:hover': {
		backgroundSize: '110% 120%',
		'& p': {
			color: 'yellow',
			opacity: '0.8',
		},
	},
};

export const typography = {
	width: '100px',
	height: '35px',
	backgroundColor: 'black',
	color: 'white',
	opacity: 0.7,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
};
