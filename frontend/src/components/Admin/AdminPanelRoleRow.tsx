import {
	Tr,
	Td,
	Icon,
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
} from '@chakra-ui/react';
import _ from 'lodash';
import React, {useRef, useState} from 'react';
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
	const [isTouched, setTouched] = useState(false);
	const [editedRole, setEditedRole] = useState<Role>(role);

	const {isOpen, onOpen, onClose} = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement>(null);

	const {id, name, permissions} = editedRole;

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
						<SimpleGrid columns={3} spacing={3}>
							{permissions.map((p) => (
								<Box key={p.id}>
									<Badge variant="solid" p={2} rounded="2xl">
										<Text fontSize={15}>{p.name}</Text>
									</Badge>
								</Box>
							))}
						</SimpleGrid>
						<IconButton
							mt={3}
							aria-label="change-permissions"
							icon={<BsWrenchAdjustable />}
							colorScheme="green"
							rounded="full"
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
						onClick={() => onOpen()}
						width="full"
						aria-label="delete-user"
						icon={<MdDelete />}
						colorScheme="red"
					/>
				</Td>
			</Tr>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
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
							<Button ref={cancelRef} onClick={onClose}>
								لغو
							</Button>
							<Button
								colorScheme="red"
								onClick={() => {
									handleDelete();
									onClose();
								}}
								mr={3}
							>
								حذف
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default AdminPanelUserRow;
