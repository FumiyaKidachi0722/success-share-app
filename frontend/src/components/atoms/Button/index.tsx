// frontend/src/components/atoms/Button/index.tsx

import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  variant = "primary",
}) => {
  const classNames = [styles.button, styles[variant]].join(" ");

  return (
    <button type={type} onClick={onClick} className={classNames}>
      {children}
    </button>
  );
};
