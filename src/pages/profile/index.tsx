import ContentsLayout from "@/layouts/ContentsLayout";
import DefaultLayout from "@/layouts/DefaultLayout";

export default function Profile() {
  return (
    <DefaultLayout>
      <ContentsLayout>
        <h1 className="text-3xl font-bold underline">Hello profile!</h1>
      </ContentsLayout>
    </DefaultLayout>
  );
}
