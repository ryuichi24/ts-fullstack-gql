import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import MoonLoader from "react-spinners/MoonLoader";
import { ArgumentTypes } from "../../../utils/ArgumentTypes";

const variants = {
  sync: "sync",
  moon: "moon",
};

type LoaderSizeMarginProps = ArgumentTypes<typeof SyncLoader>[0];
type LoaderSizeProps = ArgumentTypes<typeof MoonLoader>[0];

type LoaderProps = LoaderSizeMarginProps &
  LoaderSizeProps & {
    variant?: keyof typeof variants;
  };

export const Loader: React.FC<LoaderProps> = ({
  variant = "sync",
  ...props
}) => {
  if (variant === variants.sync) {
    return <SyncLoader {...props} />;
  }

  if (variant === variants.moon) {
    return <MoonLoader {...props} />;
  }

  return <span>loading...</span>;
};
