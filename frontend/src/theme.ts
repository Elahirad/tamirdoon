import {ThemeConfig} from '@chakra-ui/theme';
import {extendTheme} from '@chakra-ui/theme-utils';
import localFont from 'next/font/local';

const shabnam = localFont({
	src: [
		{
			path: '../public/fonts/Shabnam.ttf',
			weight: '400',
		},
		{
			path: '../public/fonts/Shabnam-Bold.ttf',
			weight: '700',
		},
		{
			path: '../public/fonts/Shabnam-Thin.ttf',
			weight: '100',
		},
		{
			path: '../public/fonts/Shabnam-Light.ttf',
			weight: '300',
		},
		{
			path: '../public/fonts/Shabnam-Medium.ttf',
			weight: '500',
		},
	],
});

const themeConfig: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

const theme = extendTheme({
	themeConfig,
	direction: 'rtl',
	fonts: {
		body: shabnam.style.fontFamily,
		heading: shabnam.style.fontFamily,
	},
});

export default theme;
