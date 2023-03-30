import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type CidadeForm = {
  cidadeToAdd: string;
};

export type CidadesListForm = {
  cidades: { value: string }[];
};

const cidadeSchema = yup.object().shape({
  cidadeToAdd: yup
    .string()
    .required("Você precisa prencher a cidade de origem"),
});

const cidadesListSchema = yup.object().shape({
  cidades: yup
    .array()
    .of(yup.string().required("Uma das cidades da lista é inválida"))
    .min(2, "Você precisa inserir ao menos duas cidades"),
});

export const useCreateCidadesForm = () => {
  const cidadeForm = useForm<CidadeForm>({
    defaultValues: {
      cidadeToAdd: "",
    },
    resolver: yupResolver(cidadeSchema),
    mode: "onSubmit",
  });

  const cidadesListForm = useForm<CidadesListForm>({
    defaultValues: {
      cidades: [],
    },
    resolver: yupResolver(cidadesListSchema),
    mode: "onSubmit",
  });

  return { cidadeForm, cidadesListForm };
};
