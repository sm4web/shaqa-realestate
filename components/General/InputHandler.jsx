import React from "react";
import { ErrorMessage, useField } from "formik";

const ReturnLabel = ({ children, label, name }) => {
  return (
    <div className="flex-grow w-full flex flex-col gap-[6px] mb-4">
      {label ? <h1 className="font-medium text-[20px]">{label}</h1> : <></>}
      {children}
      <ErrorMessage
        className="text-red-500 text-sm"
        name={name}
        component="div"
      />
    </div>
  );
};

const InputHandler = ({ label, kind, ...props }) => {
  const [field] = useField(props);
  return (
    <ReturnLabel label={label} name={field.name}>
      {kind === "area" ? (
        <textarea
          rows={"4"}
          cols={"50"}
          className="mainInput h-fit w-full"
          autoComplete="off"
          {...field}
          {...props}
        />
      ) : (
        <input
          className="mainInput w-full"
          autoComplete="off"
          {...field}
          {...props}
        />
      )}
    </ReturnLabel>
  );
};

export default InputHandler;
