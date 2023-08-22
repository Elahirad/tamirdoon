import {useToast} from '@chakra-ui/react';

const useInfoToast = () => {
	const toast = useToast();
	const showToast = (title: string, description: string) =>
		toast({
			title,
			description,
			status: 'info',
			duration: 4000,
			isClosable: true,
			position: 'top-left',
		});
	return showToast;
};

export default useInfoToast;
