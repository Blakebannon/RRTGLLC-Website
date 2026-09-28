import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** "wide" for full layouts, "narrow" for long-form reading. */
  size?: "wide" | "narrow";
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  size = "wide",
  className = "",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  const width = size === "narrow" ? "max-w-3xl" : "max-w-7xl";
  return <Component className={`mx-auto w-full ${width} px-5 sm:px-8 lg:px-10 ${className}`} {...props} />;
}
