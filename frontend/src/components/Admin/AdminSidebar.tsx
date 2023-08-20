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
import { Link, useLocation } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: Props) => {
  const path = useLocation().pathname.split("/");
  const subPath = path[path.length - 1];
  return (
    <>
      <Show above="md">
        <DesktopSideBar subPath={subPath} />
      </Show>
      <Hide above="md">
        <MobileSideBar isOpen={isOpen} onClose={onClose} subPath={subPath} />
      </Hide>
    </>
  );
};

interface DesktopSideBarProps {
  subPath: string;
}

const DesktopSideBar = ({ subPath }: DesktopSideBarProps) => {
  return (
    <VStack m={3} minW="250px" maxW="300px">
      {SIDEBAR_ITEMS.map((item) => (
        <Box key={item.id} width="full">
          <Link to={item.href ?? "#"}>
            <HStack
              width="100%"
              p={3}
              rounded={20}
              bg={
                subPath === item.href
                  ? useColorModeValue("orange.300", "orange.500")
                  : "white"
              }
              color={subPath === item.href ? "white" : "black"}
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
  subPath: string;
}

const MobileSideBar = ({ isOpen, onClose, subPath }: MobileSideBarProps) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody mt={5}>
          <VStack m={3} minW="250px">
            {SIDEBAR_ITEMS.map((item) => (
              <Box width="full" onClick={() => onClose()}>
                <Link to={item.href ?? "#"}>
                  <HStack
                    width="100%"
                    p={3}
                    rounded={20}
                    bg={
                      subPath === item.href
                        ? useColorModeValue("orange.300", "orange.500")
                        : "white"
                    }
                    color={subPath === item.href ? "white" : "black"}
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
  id: number;
  name: string;
  href: string;
  icon: IconType;
}

const SIDEBAR_ITEMS: SideBarItem[] = [
  {
    id: 1,
    name: "کاربران",
    href: "users",
    icon: BiUser,
  },
  {
    id: 2,
    name: "آگهی ها",
    href: "ads",
    icon: LiaBullhornSolid,
  },
  {
    id: 3,
    name: "سرویس دهندگان",
    href: "servicemen",
    icon: BsBriefcase,
  },
];

export default AdminSidebar;
