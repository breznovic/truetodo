import { ReactNode } from "react";

type FieldErrorType = {
  error: string;
  field: string;
};

export type BaseResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
  fieldsErrors: FieldErrorType[];
};

export type PaperProps = {
  children: ReactNode;
}