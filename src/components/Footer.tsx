type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer className="border-t w-full pl-20 pt-10 pb-4  mt-10">
      <pre className="text-xs text-slate-500">
        {`GAMECARD.GG is not associated with NEXON Korea.\nGAMECARD.GG is not associated with Smilegate RPG & Smilegate Stove.\nGames metadata is powered by IGDB.com.`}
      </pre>
    </footer>
  );
};

export default Footer;
