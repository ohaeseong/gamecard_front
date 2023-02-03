import classNames from "classnames";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

const GameCard: React.FC<Props> = ({ className }) => {
  return (
    <div className="md:w-96 w-full h-40 bg-slate-50 border shadow-md rounded"></div>
  );
};

export default GameCard;
