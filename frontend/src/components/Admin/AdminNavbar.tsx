import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  Heading,
  useColorMode,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuDivider,
  MenuItem,
  Center,
  IconButton,
  Hide,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const SAMPLE_USER = {
  username: "نام کاربری",
  picture: "https://avatars.dicebear.com/api/male/username.svg",
};

interface Props {
  onOpen: () => void;
}

export default function AdminNavbar({ onOpen }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align="center"
      >
        <Hide above="md">
          <IconButton
            onClick={() => onOpen()}
            icon={<HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Hide>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align="center"
        >
          <Link to="/admin/panel">
            <Heading
              margin={2}
              as="h1"
              fontSize={useBreakpointValue({
                base: "2xl",
                md: "3xl",
                lg: "4xl",
              })}
              bgGradient="linear(to-r, red.400, orange.400)"
              bgClip="text"
            >
              پنل همکاران
            </Heading>
          </Link>
        </Flex>

        <Stack justify="flex-end" direction="row" spacing={6}>
          <Button onClick={() => toggleColorMode()}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar size="sm" src={SAMPLE_USER.picture} />
            </MenuButton>
            <MenuList alignItems="center">
              <br />
              <Center>
                <Avatar size="2xl" src={SAMPLE_USER.picture} />
              </Center>
              <br />
              <Center>
                <Text>{SAMPLE_USER.username}</Text>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>پروفایل شما</MenuItem>
              <MenuItem>تنظیمات</MenuItem>
              <MenuItem>خروج</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </Box>
  );
}
