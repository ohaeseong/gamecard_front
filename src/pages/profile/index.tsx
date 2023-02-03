import { getGameList } from "@/apis/profile";
import ProfileContainer from "@/containers/ProfileContainer";
import ContentsLayout from "@/layouts/ContentsLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import { GameItem } from "@/types/Game";

type Props = {
  games: Array<GameItem>;
};
const ProfilePage = ({ games }: Props) => {
  return (
    <DefaultLayout>
      <ContentsLayout>
        <ProfileContainer games={games} />
      </ContentsLayout>
    </DefaultLayout>
  );
};

export default ProfilePage;

ProfilePage.getInitialProps = async ({}) => {
  const games = await getGameList();

  return {
    games,
  };
};
