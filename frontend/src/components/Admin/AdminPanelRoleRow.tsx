import {
	Tr,
	Td,
	IconButton,
	Editable,
	EditablePreview,
	EditableInput,
	Box,
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useDisclosure,
	Text,
	SimpleGrid,
	Badge,
	VStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	HStack,
	Heading,
} from '@chakra-ui/react';
import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {MdDone, MdDelete} from 'react-icons/md';
import {BsWrenchAdjustable} from 'react-icons/bs';

interface Props {
	role: Role;
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

const AdminPanelUserRow = ({role}: Props) => {
	const [resetFlag, setResetFlag] = useState(false);
	const [grantedPermissions, setGrantedPermissions] = useState<Permission[]>(
		[]
	);
	const [availablePermissions, setAvailablePermissions] = useState<
		Permission[]
	>([]);

	useEffect(() => {
		setAvailablePermissions(
			SAMPLE_PERMISSIONS.filter(
				(p) => !role.permissions.map((gP) => gP.id).includes(p.id)
			)
		);
		setGrantedPermissions(role.permissions);
	}, [resetFlag]);

	const handleGrantedPermissionClick = (permission: Permission) => {
		setGrantedPermissions(
			grantedPermissions.filter((p) => p.id !== permission.id)
		);
		setAvailablePermissions([...availablePermissions, permission]);
	};

	const handleAvailablePermissionClick = (permission: Permission) => {
		setAvailablePermissions(
			availablePermissions.filter((p) => p.id !== permission.id)
		);
		setGrantedPermissions([...grantedPermissions, permission]);
	};

	const [isTouched, setTouched] = useState(false);
	const [editedRole, setEditedRole] = useState<Role>(role);

	const {
		isOpen: alertDialogIsOpen,
		onOpen: alertDialogOnOpen,
		onClose: alertDialogOnClose,
	} = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement>(null);

	const {
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useDisclosure();
	const finalRef = useRef<HTMLButtonElement>(null);

	const {id, name} = editedRole;

	const handleEdit = () => {
		const userToSend = _.pick(editedRole, ['name', 'permissions']);
		console.log(userToSend);
	};

	const handleDelete = () => {
		const id = editedRole.id;
		console.log(id);
	};

	return (
		<>
			<Tr>
				<Td>{id}</Td>
				<Td width="150px" maxW="150px" overflow="auto">
					<Editable defaultValue={name}>
						<EditablePreview />
						<EditableInput
							onChange={(e) => {
								setTouched(true);
								setEditedRole({
									...editedRole,
									name: e.currentTarget.value,
								});
							}}
							value={name}
							width="100%"
						/>
					</Editable>
				</Td>
				<Td minW="400px">
					<VStack>
						{!grantedPermissions.length && <Text>فاقد دسترسی</Text>}
						{grantedPermissions.length && (
							<SimpleGrid columns={3} spacing={3}>
								{grantedPermissions.map((p) => (
									<Box key={p.id}>
										<Badge variant="solid" p={2} rounded="2xl">
											<Text fontSize={15}>{p.name}</Text>
										</Badge>
									</Box>
								))}
							</SimpleGrid>
						)}

						<IconButton
							mt={3}
							aria-label="change-permissions"
							icon={<BsWrenchAdjustable />}
							colorScheme="green"
							rounded="full"
							onClick={() => modalOnOpen()}
						/>
					</VStack>
				</Td>
				<Td>
					<IconButton
						isDisabled={!isTouched}
						width="full"
						aria-label="edit-user"
						icon={<MdDone />}
						colorScheme="blue"
						onClick={handleEdit}
					/>
				</Td>
				<Td>
					<IconButton
						onClick={() => alertDialogOnOpen()}
						width="full"
						aria-label="delete-user"
						icon={<MdDelete />}
						colorScheme="red"
					/>
				</Td>
			</Tr>
			<AlertDialog
				isOpen={alertDialogIsOpen}
				leastDestructiveRef={cancelRef}
				onClose={alertDialogOnClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							حذف نقش
						</AlertDialogHeader>

						<AlertDialogBody>
							آیا از حذف این نقش مطمئن هستید؟ این کار غیر قابل بازگشت است!
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={alertDialogOnClose}>
								لغو
							</Button>
							<Button
								colorScheme="red"
								onClick={() => {
									handleDelete();
									alertDialogOnClose();
								}}
								mr={3}
							>
								حذف
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
			<Modal
				finalFocusRef={finalRef}
				isOpen={modalIsOpen}
				onClose={modalOnClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>ویرایش دسترسی ها</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack textAlign="center">
							<Text fontSize="smaller">
								با کلیک بر روی دسترسی ها می توانید آن ها را به چپ یا راست منتقل
								کنید
							</Text>
							<HStack mt={5}>
								<VStack>
									<Heading as="h3" fontSize="sm">
										دسترسی های اعطا شده
									</Heading>
									<Box
										height="280px"
										w="200px"
										maxW="200px"
										borderStyle="solid"
										borderColor="gray.300"
										borderWidth={2}
										borderRadius={10}
										p={5}
										overflow="auto"
									>
										{grantedPermissions.map((p) => (
											<Badge
												cursor="pointer"
												userSelect="none"
												key={p.id}
												p={1}
												rounded="full"
												mx={3}
												my={1}
												onClick={() => handleGrantedPermissionClick(p)}
											>
												<Text as="span">{p.name}</Text>
											</Badge>
										))}
									</Box>
								</VStack>
								<VStack>
									<Heading as="h3" fontSize="sm">
										دسترسی های قابل اعطا
									</Heading>
									<Box
										height="280px"
										w="200px"
										maxW="200px"
										borderStyle="solid"
										borderColor="gray.300"
										borderWidth={2}
										borderRadius={10}
										p={5}
										overflow="auto"
									>
										{availablePermissions.map((p) => (
											<Badge
												cursor="pointer"
												userSelect="none"
												key={p.id}
												p={1}
												rounded="full"
												mx={3}
												my={1}
												onClick={() => handleAvailablePermissionClick(p)}
											>
												<Text as="span">{p.name}</Text>
											</Badge>
										))}
									</Box>
								</VStack>
							</HStack>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" ml={3} onClick={modalOnClose}>
							بستن
						</Button>
						<Button variant="ghost" onClick={() => setResetFlag(!resetFlag)}>
							بازنشانی
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AdminPanelUserRow;

const SAMPLE_PERMISSIONS: Permission[] = [
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
	{
		id: 6,
		code: 'CHAT_DELETE',
		name: 'حذف چت ها',
	},
];
