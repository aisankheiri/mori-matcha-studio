import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--container-width)] px-4 md:px-6 xl:px-8 ${className}`}
    >
      {children}
    </div>
  );
}