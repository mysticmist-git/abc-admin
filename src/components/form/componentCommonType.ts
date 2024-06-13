import { LabelHTMLAttributes } from "react";

export type WithLabelProperty = LabelHTMLAttributes<HTMLLabelElement> & {
  label: string | undefined;
  horizontal?: boolean;
};

export type InputCommonProps = Partial<WithLabelProperty>;
