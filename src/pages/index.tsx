import ContentsLayout from "@/layouts/ContentsLayout";
import DefaultLayout from "@/layouts/DefaultLayout";

export default function HomePage() {
  return (
    <DefaultLayout>
      <ContentsLayout>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </ContentsLayout>
    </DefaultLayout>
  );
}
