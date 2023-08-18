import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // TODO: Should call API for checking user is logged in or note
    const isLoggedIn = true;
    if (!isLoggedIn) return navigate("/admin/signin?redirected=true");
  }, []);
  return (
    <HStack>
      <VStack>
        <Text>Sidebar</Text>
      </VStack>
      <Box>
        <Text>Main area</Text>
      </Box>
    </HStack>
  );
};

export default AdminHomePage;
