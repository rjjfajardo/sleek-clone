import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /login page
    router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // This is an empty component, as it will immediately redirect.
};

export default Home;
