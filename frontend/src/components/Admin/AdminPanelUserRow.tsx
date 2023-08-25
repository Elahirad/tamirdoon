import {
	Tr,
	Td,
	Icon,
	IconButton,
	Editable,
	EditablePreview,
	EditableInput,
	HStack,
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import _ from 'lodash';
import {useRef, useState} from 'react';
import {MdOutlineVerified, MdDone, MdDelete} from 'react-icons/md';

interface Props {
	user: User;
}

interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	phoneNumberIsVerified: boolean;
	emailIsVerified: boolean;
}

const AdminPanelUserRow = ({user}: Props) => {
	const [isTouched, setTouched] = useState(false);
	const [editedUser, setEditedUser] = useState<User>(user);

	const {isOpen, onOpen, onClose} = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement>(null);

	const {
		id,
		firstName,
		lastName,
		email,
		phoneNumber,
		phoneNumberIsVerified,
		emailIsVerified,
	} = editedUser;

	const handleEdit = () => {
		const userToSend = _.pick(editedUser, [
			'firstName',
			'lastName',
			'email',
			'phoneNumber',
		]);
		console.log(userToSend);
	};

	const handleDelete = () => {
		const id = editedUser.id;
		console.log(id);
	};

	return (
		<>
			<Tr>
				<Td>{id}</Td>
				<Td width="150px" maxW="150px" overflow="auto">
					<Editable defaultValue={firstName}>
						<EditablePreview />
						<EditableInput
							onChange={(e) => {
								setTouched(true);
								setEditedUser({
									...editedUser,
									firstName: e.currentTarget.value,
								});
							}}
							value={firstName}
							width="100%"
						/>
					</Editable>
				</Td>
				<Td width="180px" maxW="180px" overflow="auto">
					<Editable defaultValue={lastName}>
						<EditablePreview />
						<EditableInput
							onChange={(e) => {
								setTouched(true);
								setEditedUser({...editedUser, lastName: e.currentTarget.value});
							}}
							value={lastName}
							width="100%"
						/>
					</Editable>
				</Td>
				<Td width="230px" maxW="230px" overflow="auto">
					<HStack dir="ltr">
						<Editable defaultValue={email}>
							<EditablePreview />
							<EditableInput
								onChange={(e) => {
									setTouched(true);
									setEditedUser({...editedUser, email: e.currentTarget.value});
								}}
								value={email}
								width="100%"
							/>
						</Editable>{' '}
						{emailIsVerified && (
							<Icon as={MdOutlineVerified} w={5} h={5} color="green.400" />
						)}
					</HStack>
				</Td>
				<Td width="180px" maxW="180px" overflow="auto">
					<HStack dir="ltr">
						<Editable defaultValue={phoneNumber}>
							<EditablePreview />
							<EditableInput
								onChange={(e) => {
									setTouched(true);
									setEditedUser({
										...editedUser,
										phoneNumber: e.currentTarget.value,
									});
								}}
								value={phoneNumber}
								width="100%"
							/>
						</Editable>{' '}
						{phoneNumberIsVerified && (
							<Icon as={MdOutlineVerified} w={5} h={5} color="green.400" />
						)}
					</HStack>
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
							حذف کاربر
						</AlertDialogHeader>

						<AlertDialogBody>
							آیا از حذف این کاربر مطمئن هستید؟ این کار غیر قابل بازگشت است!
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
