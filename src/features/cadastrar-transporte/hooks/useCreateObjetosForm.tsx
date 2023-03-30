import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type ObjetoForm = {
  objetoToAdd: string;
  quantity: number;
  cidadeDestino: string;
};

export type ObjetosListForm = {
  objetos: { value: string; quantity: number; cidadeDestino: string }[];
};

const objetoSchema = yup.object().shape({
  objetoToAdd: yup
    .string()
    .required("Você precisa selecionar um objeto para adicionar"),
  quantity: yup
    .number()
    .typeError("Você precisa preencher a quantidade")
    .required("Você precisa preencher a quantidade")
    .min(1, "A quantidade mínima é 1"),
  cidadeDestino: yup
    .string()
    .required("Você precisa selecionar uma cidade de destino"),
});

const objetosListSchema = yup.object().shape({
  objetos: yup
    .array()
    .of(yup.string().required("Um dos objetos da lista é inválido"))
    .min(1, "Você precisa inserir ao menos um objeto"),
});

export const useCreateObjetosForm = () => {
  const objetoForm = useForm<ObjetoForm>({
    defaultValues: {
      objetoToAdd: "",
      quantity: 1,
      cidadeDestino: "",
    },
    resolver: yupResolver(objetoSchema),
    mode: "onSubmit",
  });

  const objetosListForm = useForm<ObjetosListForm>({
    defaultValues: {
      objetos: [],
    },
    resolver: yupResolver(objetosListSchema),
    mode: "onSubmit",
  });

  return { objetoForm, objetosListForm };
};
