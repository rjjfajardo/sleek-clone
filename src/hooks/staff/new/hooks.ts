import { useForm } from "react-hook-form";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "@/lib/axios";
import { User } from "@prisma/client";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useRouter } from "next/router";

interface UserI extends Partial<User> {}

const schema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  contactNumber: yup.string().required(),
});

export const useHooks = () => {
  const router = useRouter();
  const { setSnackbarProps } = useSnackbar();
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onSubmit",
  });

  const createUserHandler = async (values: UserI) => {
    try {
      await axios({
        method: "POST",
        url: "/api/auth/staffaccount",
        data: {
          values,
        },
      }).then((res) => {
        setSnackbarProps({
          open: true,
          message: "User creation was successful",
          severity: "success",
        });
        router.push("/staff");
      });
    } catch (e) {
      setSnackbarProps({
        open: true,
        message: "Failed to create user",
        severity: "error",
      });
    }
  };

  return { control, onSubmit: handleSubmit(createUserHandler) };
};
