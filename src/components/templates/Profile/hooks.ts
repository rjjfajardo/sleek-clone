import { useForm, useWatch } from "react-hook-form";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "@/lib/axios";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSnackbar } from "@/hooks/useSnackbar";
import useSWR, { mutate } from "swr";

interface UserI extends Partial<User> {
  newPassword: string;
}

const schema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  contactNumber: yup.string().required(),
  dob: yup.string().required(),
});

const isChangePasswordOnlySchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters")
    .matches(/[a-z]+/, "Password must contain at least one lowercase character")
    .matches(/[A-Z]+/, "Password must contain at least one uppercase character")
    .matches(
      /[@$!%*#?&]+/,
      "Password must contain at least one special character"
    )
    .matches(/\d+/, "Password must contain at least one number")
    .required(),
});

export const useHooks = () => {
  const session = useSession();
  const [isChangePasswordOnly, setIsChangePasswordOnly] =
    useState<boolean>(false);
  const { setSnackbarProps } = useSnackbar();

  const {
    data: user,
    isLoading,
  }: { data: User | undefined; isLoading: boolean } = useSWR(
    `/user/${session.data?.user.id}`
  );

  const { control, handleSubmit, reset } = useForm<UserI>({
    resolver: yupResolver(
      isChangePasswordOnly ? isChangePasswordOnlySchema : schema
    ),
    reValidateMode: "onChange",
    mode: "onSubmit",
  });

  useEffect(() => {
    reset({
      fullName: user?.fullName || "",
      email: user?.email || "",
      dob: user?.dob || "",
      contactNumber: user?.contactNumber || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const updateUserProfileHandler = async (values: UserI) => {
    try {
      await axios({
        method: "PUT",
        url: `/api/user/me`,
        data: {
          values,
          userId: session.data?.user.id,
        },
      }).then((res) => {
        setSnackbarProps({
          open: true,
          message: "Save was successful",
          severity: "success",
        });
      });
      mutate(`/user/${session.data?.user.id}`);
    } catch (e) {
      reset({
        newPassword: "",
      });
      setSnackbarProps({
        open: true,
        message: "Error while trying to update profile",
        severity: "error",
      });
    }
  };

  const resetPasswordHandler = async (values: UserI) => {
    try {
      await axios({
        method: "POST",
        url: "/api/auth/reset-password",
        data: {
          values,
          userId: session.data?.user.id,
        },
      }).then((res) => {
        setSnackbarProps({
          open: true,
          message:
            "Successfully updated password. Please check your email if your forgotten it.",
          severity: "success",
        });
        reset({
          newPassword: "",
        });
        setIsChangePasswordOnly(false);
      });
    } catch (e) {
      reset({
        newPassword: "",
      });
      setIsChangePasswordOnly(false);

      setSnackbarProps({
        open: true,
        message: "Error while trying to update password",
        severity: "error",
      });
    }
  };

  return {
    control,
    onSubmitUpdateProfile: handleSubmit(updateUserProfileHandler),
    onSubmitChangePassword: handleSubmit(resetPasswordHandler),
    showPassword,
    handleClickShowPassword,
    isChangePasswordOnly,
    setIsChangePasswordOnly,
    isLoading,
  };
};
