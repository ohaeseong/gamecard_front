import classNames from "classnames";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "password" | "button";
  value?: string;
};

const Input: React.FC<Props> = ({
  className,
  placeholder,
  onChange,
  value,
  type,
}) => {
  return (
    <div className="flex flex-row justify-around w-full">
      <input
        className={classNames("outline-none border-b pl-1", className)}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type={type}
      />
    </div>
  );
};

export default Input;
