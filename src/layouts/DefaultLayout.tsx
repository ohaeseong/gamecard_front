import Navigation from "@/components/Navigation";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col items-center h-[calc(100vh-56px)] overflow-auto">
      {children}
      <Navigation />
    </div>
  );
};

export default DefaultLayout;
