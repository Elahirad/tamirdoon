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
import AdminPanelUserRow from '../../../components/Admin/AdminPanelUserRow';

const AdminPanelUsersPage = () => {
	return (
		<VStack width="100%" align="flex-start">
			<Heading as="h2" mt={5} mr={3}>
				مدیریت کاربران
			</Heading>
			<TableContainer width="100%" p={10}>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>#</Th>
							<Th>نام</Th>
							<Th>نام خانوادگی</Th>
							<Th>ایمیل</Th>
							<Th>شماره تلفن</Th>
							<Th textAlign="center">
								<Icon as={BiEditAlt} />
							</Th>
							<Th textAlign="center">
								<Icon as={MdDelete} />
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{SAMPLE_USERS.map((u) => (
							<AdminPanelUserRow key={u.id} user={u} />
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</VStack>
	);
};

export default AdminPanelUsersPage;

const SAMPLE_USERS = [
	{
		id: 1,
		firstName: 'علی',
		lastName: 'الهی راد',
		email: 'ali@ali.com',
		phoneNumber: '09152620887',
		emailIsVerified: true,
		phoneNumberIsVerified: true,
	},
	{
		id: 2,
		firstName: 'امیر',
		lastName: 'فیروزی',
		email: 'amir@amir.com',
		phoneNumber: '',
		emailIsVerified: true,
		phoneNumberIsVerified: false,
	},
	{
		id: 3,
		firstName: 'حصین',
		lastName: 'رحمتی',
		email: 'ho3ein@ho3ein.com',
		phoneNumber: '09858558585',
		emailIsVerified: false,
		phoneNumberIsVerified: true,
	},
];
