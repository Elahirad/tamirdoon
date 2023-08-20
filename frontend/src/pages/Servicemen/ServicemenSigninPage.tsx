import {
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	VStack,
	Text,
	Checkbox,
	Flex,
} from '@chakra-ui/react';
import FormContainer from '../../components/FormContainer.js';
import * as Yup from 'yup';
import {Field, Form, Formik, FormikHelpers} from 'formik';
import apiClient from '../../services/apiClient.js';
import {Link} from 'react-router-dom';
import useErrorToast from '../../hooks/useErrorToast.js';
import useSuccessToast from '../../hooks/useSuccessToast.js';

const SigninSchema = Yup.object().shape({
	username: Yup.string().required('ایمیل یا شماره موبایل را وارد کنید'),
	password: Yup.string().required('رمز عبور را وارد کنید'),
});

interface FormValues {
	username: string;
	password: string;
	remember: boolean;
}

const ServicemanSigninPage = () => {
	const errorToast = useErrorToast();
	const successToast = useSuccessToast();
	const submitHandler = (
		values: FormValues,
		actions: FormikHelpers<FormValues>
	) => {
		const {username, password, remember} = values;
		apiClient
			.post('/servicemen/sign-in', {
				username,
				password,
				remember,
			})
			.then(() => {
				actions.resetForm();
				successToast(
					'ورود موفقیت آمیز !',
					'با موفقیت به حساب کاربری خود وارد شدید'
				);
			})
			.catch(() => {
				errorToast('خطای نامشخصی رخ داد.');
			});
	};
	return (
		<FormContainer>
			<Heading textAlign="center">
				ورود{' '}
				<Text
					as="span"
					bgGradient="linear(to-r, blue.500, green.300)"
					bgClip="text"
				>
					سرویس دهندگان
				</Text>{' '}
				به{' '}
				<Text
					as="span"
					bgGradient="linear(to-r, red.400, pink.400)"
					bgClip="text"
				>
					تعمیردون
				</Text>{' '}
				👨‍🔧
			</Heading>
			<Formik
				initialValues={{
					username: '',
					password: '',
					remember: false,
				}}
				validationSchema={SigninSchema}
				onSubmit={submitHandler}
			>
				{({errors, touched}) => (
					<VStack as={Form} width="100%">
						<FormControl marginTop={5} isRequired>
							<FormLabel>ایمیل یا شماره موبایل</FormLabel>
							<Field
								as={Input}
								id="username"
								name="username"
								type="text"
								dir="ltr"
							/>
							{errors.username && touched.username ? (
								<Text color="red">{errors.username}</Text>
							) : null}
						</FormControl>
						<FormControl marginTop={5} isRequired>
							<FormLabel>رمز عبور</FormLabel>
							<Field
								as={Input}
								id="password"
								name="password"
								type="password"
								dir="ltr"
							/>
							{errors.password && touched.password ? (
								<Text color="red">{errors.password}</Text>
							) : null}
						</FormControl>
						<Flex width="100%" justify="space-between">
							<Field as={Checkbox} type="checkbox" name="remember">
								مرا به خاطر بسپار
							</Field>
							<Link to="#">
								<Text as="span" color="blue.400">
									فراموشی رمز عبور
								</Text>
							</Link>
						</Flex>
						<Button
							marginTop={5}
							paddingX={10}
							bgGradient="linear(to-r, pink.400, blue.300)"
							color="white"
							_hover={{
								bgGradient: 'linear(to-r, pink.400, blue.300)',
								boxShadow: 'xl',
							}}
							type="submit"
						>
							ورود
						</Button>
					</VStack>
				)}
			</Formik>
			<Text mt={5}>
				حساب کاربری ندارید ؟{' '}
				<Link to="/signup">
					<Text color="blue.400" as="span">
						ثبت نام کنید
					</Text>
				</Link>
			</Text>
		</FormContainer>
	);
};

export default ServicemanSigninPage;
