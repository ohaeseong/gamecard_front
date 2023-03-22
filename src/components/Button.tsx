import classNames from "classnames";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  theme?: "primary" | "clear";
  disable?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({
  className,
  theme = "primary",
  disable = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        "outline-none border-none w-full h-10 text-white",
        className,
        {
          border: theme === "primary",
          "bg-slate-400": disable,
          "bg-indigo-600": !disable,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
