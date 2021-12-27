//import necessary for react
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import page
import Banner from 'pages/MainPage/components/Banner';
import GreatProduct from 'pages/MainPage/components/GreatProduct';
import Slidebar from 'pages/MainPage/components/Slidebar';
import UnitProduct from 'pages/MainPage/components/UnitProductAdidas';
import ReverseUnitProduct from 'pages/MainPage/components/UnitProductNike';

interface Props {}

export default function HomePage({}: Props): ReactElement {
	return (
		<div>
			{/*Banner*/}
			<Banner />

			{/*Slidebar*/}
			<Slidebar />

			{/*San pham noi bat*/}
			<GreatProduct />

			{/*Adidas product */}

			<UnitProduct />

			{/*Nike product */}
			<ReverseUnitProduct />
		</div>
	);
}
