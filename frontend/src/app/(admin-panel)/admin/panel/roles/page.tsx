'use client';
import {
	Heading,
	Icon,
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

export default function Page() {
	return (
		<VStack width="100%" align="flex-start">
			<Heading as="h2" mt={5} mr={3}>
				مدیریت نقش ها
			</Heading>
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
						{SAMPLE_ROLES.map((r) => (
							<AdminPanelRoleRow key={r.id} role={r} />
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</VStack>
	);
}

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

const SAMPLE_ROLES: Role[] = [
	{
		id: 1,
		name: 'ادمین پشتیبانی',
		permissions: [
			{
				id: 1,
				code: 'USER_READ',
				name: 'خواندن کاربران',
			},
			{
				id: 2,
				code: 'USER_UPDATE',
				name: 'ویرایش کاربران',
			},
			{
				id: 3,
				code: 'USER_DELETE',
				name: 'حذف کاربران',
			},
			{
				id: 4,
				code: 'CHAT_READ',
				name: 'خواندن چت ها',
			},
			{
				id: 5,
				code: 'CHAT_UPDATE',
				name: 'ویرایش چت ها',
			},
		],
	},
	{
		id: 2,
		name: 'ادمین چت ها',
		permissions: [
			{
				id: 4,
				code: 'CHAT_READ',
				name: 'خواندن چت ها',
			},
			{
				id: 5,
				code: 'CHAT_UPDATE',
				name: 'ویرایش چت ها',
			},
			{
				id: 6,
				code: 'CHAT_DELETE',
				name: 'حذف چت ها',
			},
		],
	},
];
