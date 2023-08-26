import {
	Box,
	Text,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Show,
	Hide,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerBody,
} from '@chakra-ui/react';
import {IconType} from 'react-icons';
import {BiUser} from 'react-icons/bi';
import {LiaBullhornSolid} from 'react-icons/lia';
import {BsBriefcase} from 'react-icons/bs';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const AdminSidebar = ({isOpen, onClose}: Props) => {
	const path = usePathname();
	return (
		<>
			<Show above="md">
				<DesktopSideBar path={path} />
			</Show>
			<Hide above="md">
				<MobileSideBar isOpen={isOpen} onClose={onClose} path={path} />
			</Hide>
		</>
	);
};

interface DesktopSideBarProps {
	path: string;
}

const DesktopSideBar = ({path}: DesktopSideBarProps) => {
	return (
		<VStack m={3} minW="250px" maxW="300px">
			{SIDEBAR_ITEMS.map((item) => (
				<Box key={item.id} width="full">
					<Link href={item.href ?? '#'}>
						<HStack
							width="100%"
							p={3}
							rounded={20}
							bg={
								path === item.href
									? useColorModeValue('orange.300', 'orange.500')
									: useColorModeValue('white', 'gray.800')
							}
							color={
								path === item.href
									? 'white'
									: useColorModeValue('black', 'white')
							}
							_hover={useColorModeValue(
								{bg: 'orange.300', color: 'white'},
								{bg: 'orange.500'}
							)}
							textAlign="right"
						>
							{item.icon && <Icon as={item.icon} fontSize={23} />}
							<Text>{item.name}</Text>
						</HStack>
					</Link>
				</Box>
			))}
		</VStack>
	);
};

interface MobileSideBarProps {
	isOpen: boolean;
	onClose: () => void;
	path: string;
}

const MobileSideBar = ({isOpen, onClose, path}: MobileSideBarProps) => {
	return (
		<Drawer isOpen={isOpen} onClose={onClose} size="sm">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerBody mt={5}>
					<VStack m={3} minW="250px">
						{SIDEBAR_ITEMS.map((item) => (
							<Box key={item.id} width="full" onClick={() => onClose()}>
								<Link href={item.href ?? '#'}>
									<HStack
										width="100%"
										p={3}
										rounded={20}
										bg={
											path === item.href
												? useColorModeValue('orange.300', 'orange.500')
												: useColorModeValue('white', 'gray.700')
										}
										color={
											path === item.href
												? 'white'
												: useColorModeValue('black', 'white')
										}
										_hover={useColorModeValue(
											{bg: 'orange.300', color: 'white'},
											{bg: 'orange.500'}
										)}
										textAlign="right"
									>
										{item.icon && <Icon as={item.icon} fontSize={23} />}
										<Text>{item.name}</Text>
									</HStack>
								</Link>
							</Box>
						))}
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

interface SideBarItem {
	id: number;
	name: string;
	href: string;
	icon: IconType;
}

const SIDEBAR_ITEMS: SideBarItem[] = [
	{
		id: 1,
		name: 'کاربران',
		href: '/admin/panel/users',
		icon: BiUser,
	},
	{
		id: 2,
		name: 'آگهی ها',
		href: '/admin/panel/ads',
		icon: LiaBullhornSolid,
	},
	{
		id: 3,
		name: 'سرویس دهندگان',
		href: '/admin/panel/servicemen',
		icon: BsBriefcase,
	},
];

export default AdminSidebar;
