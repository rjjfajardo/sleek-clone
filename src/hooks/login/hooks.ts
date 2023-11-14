import { useSnackbar } from "@/hooks/useSnackbar";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInResponse, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const useHooks = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmitLogin = (data: FormValues) => {
    setLoading(true);
    signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
      redirect: false,
    }).then((result: SignInResponse | undefined) => {
      if (result?.error !== null) {
        if (result?.status === 401) {
          setLoading(false);
          setError(`The email or password you entered is not correct.`);
        }
      } else {
        setTimeout(() => {
          setLoading(true);
        }, 10000);
        router.push("/dashboard");
      }
    });
  };

  return {
    control,
    loading,
    error,
    errors,
    showPassword,
    handleClickShowPassword,
    handleSubmit,
    getSession,
    onSubmitLogin,
  };
};
