'use client';
import {GoogleOAuthProvider} from '@react-oauth/google';
import theme from '../theme';
import {ChakraProvider} from '@chakra-ui/provider';
import {ColorModeScript} from '@chakra-ui/color-mode';
import './index.css';

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
				<ChakraProvider theme={theme}>
					<GoogleOAuthProvider clientId="235966621376-febvbsti7cd4ho8kaqgce1a06qpbava6.apps.googleusercontent.com">
						<ColorModeScript
							initialColorMode={theme.themeConfig.initialColorMode}
						/>
						{children}
					</GoogleOAuthProvider>
				</ChakraProvider>
			</body>
		</html>
	);
}
