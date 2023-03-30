import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type FreightForm = {
  cidadeA: string;
  cidadeB: string;
  freightType: string;
};

const schema = yup.object().shape({
  cidadeA: yup.string().required("Você precisa prencher a cidade de origem"),
  cidadeB: yup.string().required("Você precisa prencher a cidade de destino"),
  freightType: yup
    .string()
    .required("Você precisa prencher a modalidade de transporte"),
});

export const useCreateFreightForm = () => {
  return useForm<FreightForm>({
    defaultValues: {
      cidadeA: "",
      cidadeB: "",
      freightType: "",
    },
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
};
