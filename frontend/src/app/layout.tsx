'use client';
import theme from '../theme';
import {ColorModeScript} from '@chakra-ui/color-mode';
import './index.css';
import {Providers} from './providers';

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="fa" dir="rtl">
			<head>
				<meta charSet="UTF-8" />
				<link rel="icon" type="image/svg+xml" href="/vite.svg" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>تعمیردون</title>
			</head>
			<body>
				<Providers>
					<ColorModeScript
						initialColorMode={theme.themeConfig.initialColorMode}
					/>
					{children}
				</Providers>
			</body>
		</html>
	);
}
