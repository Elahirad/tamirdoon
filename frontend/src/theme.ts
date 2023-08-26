import {ThemeConfig} from '@chakra-ui/theme';
import {extendTheme} from '@chakra-ui/theme-utils';

const themeConfig: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

const theme = extendTheme({themeConfig, direction: 'rtl'});

export default theme;
