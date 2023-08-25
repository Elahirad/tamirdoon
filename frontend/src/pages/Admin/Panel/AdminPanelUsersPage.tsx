import {
	Heading,
	Icon,
	IconButton,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	VStack,
} from '@chakra-ui/react';
import {MdOutlineVerified} from 'react-icons/md';
import {BiEditAlt} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md';

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
							<Th>
								<Icon as={BiEditAlt} />
							</Th>
							<Th>
								<Icon as={MdDelete} />
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>1</Td>
							<Td>علی</Td>
							<Td>الهی راد</Td>
							<Td>
								alielahirad8087@gmail.com{' '}
								<Icon as={MdOutlineVerified} color="green.400" />
							</Td>
							<Td>
								09152620887 <Icon as={MdOutlineVerified} color="green.400" />
							</Td>
							<Td>
								<IconButton
									aria-label="edit-user"
									icon={<BiEditAlt />}
									colorScheme="blue"
								/>
							</Td>
							<Td>
								<IconButton
									aria-label="delete-user"
									icon={<MdDelete />}
									colorScheme="red"
								/>
							</Td>
						</Tr>
						<Tr>
							<Td>2</Td>
							<Td>امیرحسین</Td>
							<Td>فیروزی</Td>
							<Td>amirfrz@gmail.com</Td>
							<Td></Td>
							<Td>
								<IconButton
									aria-label="edit-user"
									icon={<BiEditAlt />}
									colorScheme="blue"
								/>
							</Td>
							<Td>
								<IconButton
									aria-label="delete-user"
									icon={<MdDelete />}
									colorScheme="red"
								/>
							</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</VStack>
	);
};

export default AdminPanelUsersPage;
