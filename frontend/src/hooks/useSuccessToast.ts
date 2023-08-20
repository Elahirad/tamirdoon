import {useToast} from '@chakra-ui/react';

const useSuccessToast = () => {
	const toast = useToast();
	const showToast = (title: string, description: string) =>
		toast({
			title,
			description,
			status: 'success',
			duration: 4000,
			isClosable: true,
			position: 'top-left',
		});
	return showToast;
};

export default useSuccessToast;
