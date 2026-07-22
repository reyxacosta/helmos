import type { ReactNode } from "react";

import { Input, type InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";

export function FormField({
  id,
  label,
  labelSuffix,
  errors,
  optional,
  ...inputProps
}: InputProps & {
  id: string;
  label: string;
  labelSuffix?: ReactNode;
  errors?: string[];
  optional?: boolean;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>
          {label}
          {optional && (
            <span className="ml-1 font-normal text-muted-foreground">(optional)</span>
          )}
        </Label>
        {labelSuffix}
      </div>
      <Input
        id={id}
        invalid={Boolean(errors?.length)}
        aria-describedby={errors?.length ? errorId : undefined}
        {...inputProps}
      />
      {errors?.length ? (
        <div id={errorId}>
          <FieldError messages={errors} />
        </div>
      ) : null}
    </div>
  );
}
