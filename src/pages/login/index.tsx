import LoginContainer from "@/containers/LoginContainer";
import ContentsLayout from "@/layouts/ContentsLayout";
import DefaultLayout from "@/layouts/DefaultLayout";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoginContainer />
    </div>
  );
}
