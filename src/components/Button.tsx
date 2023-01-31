import classNames from "classnames";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  theme?: "primary" | "clear";
  onClick: () => void;
};

const Button: React.FC<Props> = ({ className, theme = "primary", onClick }) => {
  return (
    <button
      className={classNames("outline-none", className, {
        "": theme === "primary",
      })}
      onClick={onClick}
    />
  );
};

export default Button;
