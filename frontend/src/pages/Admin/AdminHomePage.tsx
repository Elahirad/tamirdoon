import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // TODO: Should call API for checking user is logged in or note
    const isLoggedIn = false;
    if (!isLoggedIn) navigate("/admin/signin?redirected=true");
  }, []);
  return <Text>صفحه اصلی ادمین</Text>;
};

export default AdminHomePage;
