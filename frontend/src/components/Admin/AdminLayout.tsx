import { HStack, useDisclosure } from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useEffect } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // TODO: Should call API for checking user is logged in or note
    const isLoggedIn = true;
    if (!isLoggedIn) return navigate("/admin/signin?redirected=true");
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <AdminNavbar onOpen={onOpen} />
      <HStack align="flex-start">
        <AdminSidebar isOpen={isOpen} onClose={onClose} />
        <Outlet />
      </HStack>
    </>
  );
};

export default AdminLayout;
