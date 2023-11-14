import Profile from "@/components/templates/Profile";
import { getSession } from "next-auth/react";
import { CtxOrReq } from "next-auth/client/_utils";

import React from "react";

const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;

export async function getServerSideProps(context: CtxOrReq) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
