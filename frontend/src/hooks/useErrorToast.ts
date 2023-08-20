import {useToast} from '@chakra-ui/react';

const useErrorToast = () => {
	const toast = useToast();
	const showToast = (description: string) =>
		toast({
			title: 'خطا !',
			description,
			status: 'error',
			duration: 4000,
			isClosable: true,
			position: 'top-left',
		});
	return showToast;
};

export default useErrorToast;
