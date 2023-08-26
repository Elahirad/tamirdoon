'use client';
import {HStack, useDisclosure} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import AdminNavbar from '../../../../components/Admin/AdminNavbar';
import AdminSidebar from '../../../../components/Admin/AdminSidebar';
import {ReactNode, useEffect} from 'react';

interface Props {
	children: ReactNode;
}

export default function Layout({children}: Props) {
	const router = useRouter();
	useEffect(() => {
		// TODO: Should call API for checking user is logged in or note
		document.title = 'پنل همکاران';
		const isLoggedIn = true;
		if (!isLoggedIn) return router.replace('/admin/signin?redirected=true');
	}, []);

	const {isOpen, onOpen, onClose} = useDisclosure();
	return (
		<>
			<AdminNavbar onOpen={onOpen} />
			<HStack align="flex-start">
				<AdminSidebar isOpen={isOpen} onClose={onClose} />
				{children}
			</HStack>
		</>
	);
}
