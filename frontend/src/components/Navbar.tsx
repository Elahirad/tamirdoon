'use client';
import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	Show,
	Heading,
	useColorMode,
	Menu,
	Avatar,
	Center,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	MoonIcon,
	SunIcon,
} from '@chakra-ui/icons';
import Link from 'next/link';
import {useEffect} from 'react';
import apiClient from '../services/apiClient';
import useUserStore from '../hooks/store/useUserStore';
import useInfoToast from '../hooks/useInfoToast';
import useErrorToast from '../hooks/useErrorToast';

const SAMPLE_USER = {
	username: 'نام کاربری',
	picture: 'https://avatars.dicebear.com/api/male/username.svg',
};

export default function Navbar() {
	const {isOpen, onToggle} = useDisclosure();
	const {colorMode, toggleColorMode} = useColorMode();
	const {user, updateLogin} = useUserStore();

	const infoToast = useInfoToast();
	const errorToast = useErrorToast();

	useEffect(() => {
		updateLogin();
	}, []);

	const logoutHandler = () => {
		apiClient
			.get('users/sign-out')
			.then(() => {
				updateLogin();
				infoToast('خروج موفق !', 'با موفقیت از حساب کاربری خود خارج شدید.');
			})
			.catch(() => errorToast('خطای نامشخصی رخ داد.'));
	};

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH="60px"
				py={{base: 2}}
				px={{base: 4}}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align="center"
			>
				<Flex
					flex={{base: 1, md: 'auto'}}
					ml={{base: -2}}
					display={{base: 'flex', md: 'none'}}
				>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
						}
						variant="ghost"
						aria-label="Toggle Navigation"
					/>
					<Button onClick={() => toggleColorMode()}>
						{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
					</Button>
				</Flex>
				<Flex
					flex={{base: 1}}
					justify={{base: 'center', md: 'start'}}
					align="center"
				>
					<Link href="/">
						<Heading
							margin={2}
							as="h1"
							fontSize={useBreakpointValue({
								base: '3xl',
								md: '4xl',
								lg: '5xl',
							})}
							bgGradient="linear(to-r, red.400, pink.400)"
							bgClip="text"
						>
							تعمیردون
						</Heading>
					</Link>

					<Flex display={{base: 'none', md: 'flex'}} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>
				{user && (
					<Stack justify="flex-end" direction="row" spacing={6}>
						<Button onClick={() => toggleColorMode()}>
							{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						</Button>
						<Menu>
							<MenuButton
								as={Button}
								rounded="full"
								variant="link"
								cursor="pointer"
								minW={0}
							>
								<Avatar size="sm" src={SAMPLE_USER.picture} />
							</MenuButton>
							<MenuList alignItems="center">
								<br />
								<Center>
									<Avatar size="2xl" src={SAMPLE_USER.picture} />
								</Center>
								<br />
								<Center>
									<Text>{`${user?.firstName} ${user?.lastName || ''}`}</Text>
								</Center>
								<br />
								<MenuDivider />
								<MenuItem>پروفایل شما</MenuItem>
								<MenuItem>تنظیمات</MenuItem>
								<MenuItem onClick={logoutHandler}>خروج</MenuItem>
							</MenuList>
						</Menu>
					</Stack>
				)}
				{!user && (
					<Stack
						flex={{base: 1, md: 0}}
						justify="flex-end"
						direction="row"
						spacing={6}
					>
						<Show above="md">
							<Button onClick={() => toggleColorMode()}>
								{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
							</Button>
							<Link href="/register">
								<Button
									bgGradient="linear(to-r, red.400, pink.400)"
									color="white"
									_hover={{
										bgGradient: 'linear(to-r, red.400, pink.400)',
										boxShadow: 'xl',
									}}
								>
									ثبت نام
								</Button>
							</Link>
						</Show>
						<Link href="/login">
							<Button
								bgGradient="linear(to-r, pink.400, blue.300)"
								color="white"
								_hover={{
									bgGradient: 'linear(to-r, pink.400, blue.300)',
									boxShadow: 'xl',
								}}
							>
								ورود
							</Button>
						</Link>
					</Stack>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
}

const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<Link href={navItem.href || '#'}>
								<Box
									p={2}
									fontSize={'sm'}
									fontWeight={500}
									color={linkColor}
									_hover={{
										textDecoration: 'none',
										color: linkHoverColor,
									}}
								>
									{navItem.label}
								</Box>
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow="xl"
								bg={popoverContentBgColor}
								p={4}
								rounded="xl"
								minW="sm"
							>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({label, href, subLabel}: NavItem) => {
	return (
		<Link href={href ?? '#'}>
			<Box
				role="group"
				display="block"
				p={2}
				rounded="md"
				_hover={{bg: useColorModeValue('pink.50', 'gray.900')}}
			>
				<Stack direction="row" align="center">
					<Box>
						<Text
							transition={'all .3s ease'}
							_groupHover={{color: 'pink.400'}}
							fontWeight={500}
						>
							{label}
						</Text>
						<Text fontSize="sm">{subLabel}</Text>
					</Box>
					<Flex
						transition="all .3s ease"
						transform="translateX(-10px)"
						opacity={0}
						_groupHover={{opacity: '100%', transform: 'translateX(0)'}}
						justify="flex-end"
						align="center"
						flex={1}
					>
						<Icon color="pink.400" w={5} h={5} as={ChevronRightIcon} />
					</Flex>
				</Stack>
			</Box>
		</Link>
	);
};

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{md: 'none'}}
		>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({label, children, href}: NavItem) => {
	const {isOpen, onToggle} = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Link href={href ?? '#'}>
				<Box
					py={2}
					justifyContent="space-between"
					alignItems="center"
					_hover={{
						textDecoration: 'none',
					}}
				>
					<Text
						fontWeight={600}
						color={useColorModeValue('gray.600', 'gray.200')}
					>
						{label}
					</Text>
					{children && (
						<Icon
							as={ChevronDownIcon}
							transition="all .25s ease-in-out"
							transform={isOpen ? 'rotate(180deg)' : ''}
							w={6}
							h={6}
						/>
					)}
				</Box>
			</Link>

			<Collapse in={isOpen} animateOpacity style={{marginTop: '0!important'}}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle="solid"
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align="start"
				>
					{children &&
						children.map((child) => (
							<Link href={child.href ?? '#'} key={child.label}>
								<Box key={child.label} py={2}>
									{child.label}
								</Box>
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: 'سرویس دهندگان',
		children: [
			{
				label: 'صفحه سرویس دهندگان',
				subLabel: 'پنل کاربری سرویس دهندگان',
				href: '/servicemen',
			},
			{
				label: 'ورود سرویس دهندگان',
				subLabel: 'ورود به حساب کاربری به عنوان سرویس دهنده',
				href: '/servicemen/login',
			},
			{
				label: 'ثبت نام سرویس دهندگان',
				subLabel: 'ثبت نام به عنوان سرویس دهنده',
				href: '/servicemen/register',
			},
		],
	},
	{
		label: 'جستجو',
		children: [
			{
				label: 'جستجوی سرویس دهندگان',
				subLabel: 'سرویس دهنده مورد نظر را به راحتی پیدا کنید',
				href: '#',
			},
			{
				label: 'جستجوی توانایی ها',
				subLabel: 'سرویس دهنده مد نظر را بر اساس توانایی ها پیدا کنید',
				href: '#',
			},
			{
				label: 'جستجوی آگهی ها',
				subLabel: 'به راحتی آگهی مورد نظر خود را پیدا کنید',
				href: '#',
			},
		],
	},
	{
		label: 'درباره ما',
		href: '#',
	},
	{
		label: 'پنل همکاران',
		href: '/admin/panel',
	},
];
