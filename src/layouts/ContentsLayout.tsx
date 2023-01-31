type Props = {
  children: React.ReactNode;
};

const ContentsLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-gray-800">
      {children}
    </div>
  );
};

export default ContentsLayout;
