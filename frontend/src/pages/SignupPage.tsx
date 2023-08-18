import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import FormContainer from "../components/FormContainer";
import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers } from "formik";
import apiClient from "../services/apiClient.ts";
import { Link } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "نام حداقل باید 3 کلمه باشد")
    .max(50, "نام حداکثر می تواند 50 کلمه باشد")
    .required("نام را وارد کنید"),
  lastName: Yup.string()
    .min(3, "نام خانوادگی حداقل باید 3 کلمه باشد")
    .max(50, "نام خانوادگی حداکثر می تواند 50 کلمه باشد")
    .required("نام خانوادگی را وارد کنید"),
  email: Yup.string()
    .email("ایمیل معتبر نیست")
    .min(4, "ایمیل بیش از حد کوتاه است")
    .max(50, "ایمیل بیش از حد طولانی است")
    .required("ایمیل را وارد کنید"),
  phoneNumber: Yup.string()
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .required("شماره موبایل را وارد کنید"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&])[A-Za-z\d@$!%^*?&]{8,}$/,
      "رمز عبور ضعیف است"
    )
    .required("رمز عبور را وارد کنید"),
  password_repeat: Yup.string()
    .oneOf([Yup.ref("password"), ""], "رمز عبور و تکرار آن باید منطبق باشند")
    .required("تکرار رمز عبور را وارد کنید"),
});

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  password_repeat: string;
}

const Signup = () => {
  const toast = useToast();
  const submitHandler = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const {
      firstName: firstName,
      lastName,
      email,
      phoneNumber,
      password,
    } = values;
    apiClient
      .post("/users/sign-up", {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      })
      .then(() => {
        actions.resetForm();
        toast({
          title: "حساب ساخته شد.",
          description: "حساب کاربری شما با موفقیت ساخته شد",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-left",
        });
      })
      .catch((err) => {
        toast({
          title: "خطایی رخ داد.",
          description: "خطای نامشخصی رخ داد.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-left",
        });
        console.log(err);
      });
  };
  return (
    <FormContainer>
      <Heading>
        ثبت نام در{" "}
        <Text
          as="span"
          bgGradient="linear(to-r, red.400, pink.400)"
          bgClip="text"
        >
          تعمیردون
        </Text>{" "}
        📝
      </Heading>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          password_repeat: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <VStack as={Form} width="100%">
            <HStack width="100%">
              <FormControl marginTop={5} isRequired>
                <FormLabel>نام</FormLabel>
                <Field as={Input} id="firstName" name="firstName" type="text" />
                {errors.firstName && touched.firstName ? (
                  <Text color="red">{errors.firstName}</Text>
                ) : null}
              </FormControl>
              <FormControl marginTop={5} isRequired>
                <FormLabel>نام خانوادگی</FormLabel>
                <Field as={Input} id="lastName" name="lastName" type="text" />
                {errors.lastName && touched.lastName ? (
                  <Text color="red">{errors.lastName}</Text>
                ) : null}
              </FormControl>
            </HStack>
            <FormControl marginTop={5} isRequired>
              <FormLabel>ایمیل</FormLabel>
              <Field
                as={Input}
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                dir="ltr"
              />
              {errors.email && touched.email ? (
                <Text color="red">{errors.email}</Text>
              ) : null}
            </FormControl>
            <FormControl marginTop={5} isRequired>
              <FormLabel>شماره موبایل</FormLabel>
              <Field
                as={Input}
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="09XX-XXX-XXXX"
                dir="ltr"
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <Text color="red">{errors.phoneNumber}</Text>
              ) : null}
            </FormControl>
            <FormControl marginTop={5} isRequired>
              <FormLabel>رمز عبور</FormLabel>
              <Field
                as={Input}
                id="password"
                name="password"
                type="password"
                placeholder="••••••••••"
                dir="ltr"
              />
              {errors.password && touched.password ? (
                <Text color="red">{errors.password}</Text>
              ) : null}
            </FormControl>
            <FormControl marginTop={5} isRequired>
              <FormLabel>تکرار رمز عبور</FormLabel>
              <Field
                as={Input}
                id="password_repeat"
                name="password_repeat"
                type="password"
                placeholder="••••••••••"
                dir="ltr"
              />
              {errors.password_repeat && touched.password_repeat ? (
                <Text color="red">{errors.password_repeat}</Text>
              ) : null}
            </FormControl>
            <Button
              bgGradient="linear(to-r, red.400, pink.400)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, red.400, pink.400)",
                boxShadow: "xl",
              }}
              marginTop={5}
              paddingX={10}
              type="submit"
            >
              ثبت نام
            </Button>
          </VStack>
        )}
      </Formik>
      <Text mt={5}>
        حساب کاربری دارید ؟{" "}
        <Link to="/signin">
          <Text color="blue.400" as="span">
            وارد شوید
          </Text>
        </Link>
      </Text>
    </FormContainer>
  );
};

export default Signup;
