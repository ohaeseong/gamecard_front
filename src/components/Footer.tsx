type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer className="flex justify-center w-full mt-10">
      <div className="w-content border-t border-zinc-500 pt-7 pb-10">
        <pre className="text-xs text-zinc-500">
          {`GAMECARD.GG is not associated with NEXON Korea.\nGAMECARD.GG is not associated with Smilegate RPG & Smilegate Stove.\nGames metadata is powered by IGDB.com.`}
        </pre>
      </div>
    </footer>
  );
};

export default Footer;
