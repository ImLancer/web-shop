export const style = {
	root: {
		minHeight: '65px',
		backgroundColor: '#262626',
	},
	logo: {
		cursor: 'pointer',
	},
	SearchBox: {
		border: '1px solid #404040',
		borderRadius: '6vh',
	},
	InputBase: {
		padding: '5px',
		width: '75%',
		outline: 'none',
	},
	SearchIcon: {
		fontSize: '38px',
		cursor: 'pointer',
		color: 'white',
		transition: 'tranform 0.2s each-in-out',
		'&:hover': {
			transform: 'scale(1.09)',
		},
	},
	CartIcon: {
		fontSize: '32px',
		cursor: 'pointer',
		color: 'white',
		transition: 'tranform 0.2s each-in-out',
		'&:hover': {
			transform: 'scale(1.09)',
		},
	},
	AccountIcon: {
		fontSize: '32px',
		cursor: 'pointer',
		color: 'white',
		paddingRight: '10px',
		transition: 'tranform 0.2s each-in-out',
		'&:hover': {
			transform: 'scale(1.09)',
		},
	},
	Typography: {
		padding: '2px',
		borderLeft: '1px solid black',
		cursor: 'pointer',
	},
	//css phan navbar o giua
	Navbar: {
		maxHeight: '65px',
		backgroundColor: '#262626',
	},
	box: {
		'&:hover': {
			backgroundColor: '#000000',
		},
	},
	TypographyNav: {
		display: 'flex',
		justifyContent: 'center',
		color: 'white',
		padding: '10px',
		width: '9vw',
		borderRight: '2px solid white',
		transition: 'all 1.5ms ease-in-out',
		'&:hover': {
			color: 'yellow',
			pointer: 'cursor',
			fontSize: '18px',
		},
	},
	TypographyLast: {
		borderRight: 'none',
	},
	//css textfield
	input: { color: 'white' },
	searchField: {
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'white',
			},
			'&:hover fieldset': {
				borderColor: 'white',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'white',
			},
		},
	},
	//responsive
	largeScreen: {
		display: 'flex',
		justifyContent: 'center',
	},
};
