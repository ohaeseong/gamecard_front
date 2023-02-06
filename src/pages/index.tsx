import ContentsLayout from "@/layouts/ContentsLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import Link from "next/link";

export default function HomePage() {
  return (
    <DefaultLayout>
      <ContentsLayout>
        <h1 className="text-3xl font-bold underline">
          <Link href="/login">로그인 하러 가기!</Link>
        </h1>
      </ContentsLayout>
    </DefaultLayout>
  );
}
