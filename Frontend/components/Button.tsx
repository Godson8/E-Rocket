import { forwardRef } from "react";

interface Props {
  title: string;
  filled?: boolean;
  outline?: boolean;
  href?: string;
}

const Button = forwardRef(({ filled, outline, title, href }: Props) => {
  return (
    <a
      href={href}
      className={`${filled && "bg-[#FFD55A] text-primary"} ${
        outline &&
        "border border-solid border-secondary bg-transparent text-secondary"
      } px-[28px] py-2 font-primary font-semibold text-[17px] w-fit rounded-md hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer`}
    >
      {title}
    </a>
  );
});

Button.displayName = "Button";
export default Button;
