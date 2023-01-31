import Navigation from "@/components/Navigation";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col border border-black h-screen">
      {children}
      <Navigation />
    </div>
  );
};

export default DefaultLayout;
