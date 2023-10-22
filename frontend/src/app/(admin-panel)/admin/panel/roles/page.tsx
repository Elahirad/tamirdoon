'use client';
import {
	Button,
	HStack,
	Heading,
	Icon,
	Input,
	Table,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tr,
	VStack,
} from '@chakra-ui/react';
import {BiEditAlt} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md';
import AdminPanelRoleRow from '@/components/Admin/AdminPanelRoleRow';
import {useEffect, useState} from 'react';
import apiClient from '@/services/apiClient';
import useErrorToast from '@/hooks/useErrorToast';

interface Permission {
	id: number;
	code: string;
	name: string;
}

interface Role {
	id: number;
	name: string;
	permissions: Permission[];
}

export default function Page() {
	const errorToast = useErrorToast();
	const [roles, setRoles] = useState<Role[]>([]);
	const [inputIsOpen, setInputIsOpen] = useState(false);
	useEffect(() => {
		apiClient
			.get<Role[]>('/roles')
			.then((res) => {
				const data = res.data.map((r) =>
					!r.permissions ? {...r, permissions: []} : r
				);
				setRoles(data);
			})
			.catch(() => errorToast('خطایی رخ داد'));
	}, []);
	return (
		<VStack width="100%" align="flex-start">
			<Heading as="h2" mt={5} mr={3}>
				مدیریت نقش ها
			</Heading>
			{!inputIsOpen && (
				<Button colorScheme="blackAlpha" onClick={() => setInputIsOpen(true)}>
					افزودن نقش
				</Button>
			)}

			{inputIsOpen && (
				<HStack>
					<Input variant="filled" placeholder="نام" />
					<Button colorScheme="green" onClick={() => setInputIsOpen(true)}>
						ثبت
					</Button>
					<Button colorScheme="red" onClick={() => setInputIsOpen(false)}>
						بازگشت
					</Button>
				</HStack>
			)}
			<TableContainer width="100%" p={10}>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>#</Th>
							<Th>نام</Th>
							<Th textAlign="center">دسترسی ها</Th>
							<Th textAlign="center">
								<Icon as={BiEditAlt} />
							</Th>
							<Th textAlign="center">
								<Icon as={MdDelete} />
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{roles.map((r) => (
							<AdminPanelRoleRow key={r.id} role={r} />
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</VStack>
	);
}
