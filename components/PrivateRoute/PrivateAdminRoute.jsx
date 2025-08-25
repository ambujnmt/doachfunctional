import { useUser } from "../../context/UserContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PrivateAdminRoute = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminAuthToken");

    if (storedAdmin) {
      setIsChecked(true); // user authenticated
    } else {
      setIsChecked(true); // check done
      if (router.pathname !== "/administor/login") {
        router.push("/administor/login");
      }
    }
  }, [router]);

  // Jab tak check ho raha hai tab tak kuch render na ho
  if (!isChecked) {
    return <p>Loading...</p>; // ya spinner dikha sakte ho
  }

  return children;
};

export default PrivateAdminRoute;
