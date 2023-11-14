import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

const schema = yup.object().shape({
  searchValue: yup.string().optional(),
});

interface FormValues {
  searchValue: string;
}

export const useHooks = () => {
  const { control, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [filter, setFilter] = useState<string>("");

  const watchSearchValue = useWatch({ control, name: "searchValue" });

  const appendRequestParamForFilter = () => {
    if (watchSearchValue.length) {
      setFilter(`?ref=${watchSearchValue}`);
    }
  };

  useEffect(() => {
    if (watchSearchValue === "") setFilter("");
  }, [watchSearchValue]);

  return {
    control,
    appendRequestParamForFilter,
    filter,
  };
};
