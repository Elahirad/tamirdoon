'use client';

import {CacheProvider} from '@chakra-ui/next-js';
import {ChakraProvider} from '@chakra-ui/react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import theme from '../theme';

export function Providers({children}: {children: React.ReactNode}) {
	return (
		<CacheProvider>
			<ChakraProvider theme={theme}>
				<GoogleOAuthProvider clientId="235966621376-febvbsti7cd4ho8kaqgce1a06qpbava6.apps.googleusercontent.com">
					{children}
				</GoogleOAuthProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}
