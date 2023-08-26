'use client';
import {Center, Heading, Text, Box} from '@chakra-ui/react';

const AdminHomePage = () => {
	return (
		<Center width="full" mt={10}>
			<Box textAlign="center" p={3}>
				<Heading>
					<Text
						as="span"
						bgGradient="linear(to-r, red.400, orange.400)"
						bgClip="text"
					>
						کاربر
					</Text>{' '}
					عزیز به{' '}
					<Text
						as="span"
						bgGradient="linear(to-r, purple.300, red.300)"
						bgClip="text"
					>
						پنل مدیریت
					</Text>{' '}
					خود خوش آمدید ⚙️
				</Heading>
				<br />
				<Text>
					از سمت راست صفحه می توانید به بخش مدیریتی مدنظر خود هدایت شوید.
				</Text>
			</Box>
		</Center>
	);
};

export default AdminHomePage;
