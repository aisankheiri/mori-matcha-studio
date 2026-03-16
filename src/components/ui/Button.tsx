import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-300 ease-out will-change-transform";

  const variants = {
    primary:
      "bg-[var(--color-primary-dark)] text-white shadow-[var(--shadow-soft)] hover:scale-[1.02] hover:shadow-[var(--shadow-medium)]",
    secondary:
      "border border-black/10 bg-white/70 text-[var(--color-text)] backdrop-blur-md hover:bg-white",
    ghost:
      "bg-transparent text-[var(--color-text-soft)] hover:bg-black/[0.03]",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}