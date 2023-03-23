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
        "outline-none border-none w-full h-10 rounded text-white",
        className,
        {
          border: theme === "primary",
          "bg-zinc-700 opacity-80 cursor-default": disable,
          "bg-indigo-600": !disable,
        }
      )}
      onClick={!disable ? onClick : () => {}}
    >
      {children}
    </button>
  );
};

export default Button;
