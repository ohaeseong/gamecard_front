import LoginContainer from "@/containers/LoginContainer";
import ContentsLayout from "@/layouts/ContentsLayout";
import DefaultLayout from "@/layouts/DefaultLayout";

export default function LoginPage() {
  return (
    <DefaultLayout>
      <ContentsLayout>
        <LoginContainer />
      </ContentsLayout>
    </DefaultLayout>
  );
}
