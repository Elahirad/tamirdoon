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
	useColorModeValue,
} from '@chakra-ui/react';
import {BiEditAlt} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md';
import AdminPanelRoleRow from '@/components/Admin/AdminPanelRoleRow';
import {useEffect, useRef, useState} from 'react';
import apiClient from '@/services/apiClient';
import useErrorToast from '@/hooks/useErrorToast';
import useSuccessToast from '@/hooks/useSuccessToast';

interface Permission {
	id: number;
	code: string;
	name: string;
}

interface Role {
	id: number;
	name: string;
	Permissions: Permission[];
}

export default function Page() {
	const errorToast = useErrorToast();
	const [roles, setRoles] = useState<Role[]>([]);
	const [inputIsOpen, setInputIsOpen] = useState(false);
	const nameRef = useRef<HTMLInputElement>(null);
	const successToast = useSuccessToast();

	const [refresh, setRefresh] = useState(false);

	const handleCreation = () => {
		apiClient
			.post('/roles/create', {
				name: nameRef.current?.value,
				addPermissionIds: [],
			})
			.then(() => {
				successToast('موفق !', 'نقش مورد نظر با موفقیت ایجاد شد.');
				setRefresh(!refresh);
				setInputIsOpen(false);
			})
			.catch(() => {
				errorToast('خطایی رخ داد.');
			});
	};

	useEffect(() => {
		apiClient
			.get<Role[]>('/roles')
			.then((res) => setRoles(res.data))
			.catch(() => errorToast('خطایی رخ داد'));
	}, [refresh]);
	return (
		<VStack width="100%" align="flex-start">
			<Heading as="h2" mt={5} mr={3}>
				مدیریت نقش ها
			</Heading>
			{!inputIsOpen && (
				<Button
					mt={4}
					color={useColorModeValue('black', 'white')}
					bgColor={useColorModeValue('gray.300', 'gray.600')}
					onClick={() => setInputIsOpen(true)}
				>
					افزودن نقش
				</Button>
			)}

			{inputIsOpen && (
				<HStack>
					<Input
						variant="filled"
						placeholder="نام"
						ref={nameRef}
						value={nameRef.current?.value}
					/>
					<Button colorScheme="green" onClick={handleCreation}>
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
							<AdminPanelRoleRow
								key={r.id}
								role={r}
								handleRefresh={() => setRefresh(!refresh)}
							/>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</VStack>
	);
}
