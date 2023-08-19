import {
  Box,
  Text,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Show,
  Hide,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BiUser } from "react-icons/bi";
import { LiaBullhornSolid } from "react-icons/lia";
import { BsBriefcase } from "react-icons/bs";
import { Link } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <Show above="md">
        <DesktopSideBar />
      </Show>
      <Hide above="md">
        <MobileSideBar isOpen={isOpen} onClose={onClose} />
      </Hide>
    </>
  );
};

const DesktopSideBar = () => {
  return (
    <VStack m={3} minW="250px" maxW="300px">
      {SIDEBAR_ITEMS.map((item) => (
        <Box width="full">
          <Link to={item.href ?? "#"}>
            <HStack
              width="100%"
              p={3}
              rounded={20}
              _hover={useColorModeValue(
                { bg: "orange.300", color: "white" },
                { bg: "orange.500" }
              )}
              textAlign="right"
            >
              {item.icon && <Icon as={item.icon} fontSize={23} />}
              <Text>{item.name}</Text>
            </HStack>
          </Link>
        </Box>
      ))}
    </VStack>
  );
};

interface MobileSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSideBar = ({ isOpen, onClose }: MobileSideBarProps) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody mt={5}>
          <VStack m={3} minW="250px">
            {SIDEBAR_ITEMS.map((item) => (
              <Box
                width="full"
                onClick={() => setTimeout(() => onClose(), 200)}
              >
                <Link to={item.href ?? "#"}>
                  <HStack
                    width="100%"
                    p={3}
                    rounded={20}
                    _hover={useColorModeValue(
                      { bg: "orange.300", color: "white" },
                      { bg: "orange.500" }
                    )}
                    textAlign="right"
                  >
                    {item.icon && <Icon as={item.icon} fontSize={23} />}
                    <Text>{item.name}</Text>
                  </HStack>
                </Link>
              </Box>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

interface SideBarItem {
  name: string;
  href: string;
  icon: IconType;
}

const SIDEBAR_ITEMS: SideBarItem[] = [
  {
    name: "کاربران",
    href: "users",
    icon: BiUser,
  },
  {
    name: "آگهی ها",
    href: "ads",
    icon: LiaBullhornSolid,
  },
  {
    name: "سرویس دهندگان",
    href: "servicemen",
    icon: BsBriefcase,
  },
];

export default AdminSidebar;
