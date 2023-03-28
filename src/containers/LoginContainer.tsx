import { createAccount, login } from "@/apis/account";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { setCookie } from "@/hooks/cookie";
import { IResponseLogin } from "@/types/Account";
import classNames from "classnames";
import React from "react";
import { useRouter } from "next/router";

const LoginContainer: React.FC = ({}) => {
  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [comfirmPw, setComfirmPw] = React.useState("");

  const [regist, setRegist] = React.useState(false);

  const router = useRouter();

  return (
    <div
      className={classNames(
        "p-20 rounded w-fit h-fit bg-zinc-800 flex flex-col items-center justify-center shadow-lg"
      )}
    >
      <h1 className="mb-8 font-bold text-xl text-zinc-200">GAMECARD.GG</h1>

      {!regist ? (
        <div className="space-y-3">
          <Input placeholder="ID" onChange={handleId} value={id} />
          <Input
            placeholder="PW"
            onChange={handlePw}
            value={pw}
            type="password"
          />
        </div>
      ) : (
        <div className="space-y-3">
          <Input placeholder="ID" onChange={handleId} value={id} />
          <Input
            placeholder="PW"
            onChange={handlePw}
            value={pw}
            type="password"
          />
          <Input
            placeholder="Confirm PW"
            onChange={handleComfirmPw}
            value={comfirmPw}
            type="password"
          />
        </div>
      )}

      <div className="w-full mt-7 mb-1">
        {!regist ? (
          <Button className="w-full h-10 bg-black text-white" onClick={onLogin}>
            로그인
          </Button>
        ) : (
          <Button
            className="w-full h-10 bg-black text-white"
            onClick={onRegist}
          >
            가입하기
          </Button>
        )}
      </div>

      <div className="w-full flex justify-between mt-3">
        <span
          className="text-xs text-zinc-400 cursor-pointer"
          onClick={() => router.push("/")}
        >
          홈으로
        </span>
        {!regist ? (
          <span
            className="text-xs text-zinc-400 cursor-pointer"
            onClick={toggleRegist}
          >
            간편 가입
          </span>
        ) : (
          <span
            className="text-xs text-zinc-400 cursor-pointer"
            onClick={toggleRegist}
          >
            로그인 하기
          </span>
        )}
      </div>
    </div>
  );

  function toggleRegist() {
    setId("");
    setPw("");
    setRegist(!regist);
  }

  async function onLogin() {
    if (!id || !pw) {
      window.alert("양식을 확인해 주세요");
      return;
    }

    const response: IResponseLogin = await login({ id, pw });

    if (response?.Err === "NotExistUser") {
      window.alert("아이디 혹은 비밀번호를 확인해주세요");
      return;
    }
    const { authToken } = response;
    setCookie("authToken", authToken);
    setCookie("userId", id);

    router.push(`/profile/${id}`);
  }

  async function onRegist() {
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

    if (!id || !pw) {
      window.alert("아이디 혹은 비밀번호를 작성 해주세요.");
      return;
    }

    if (pw.length < 4) {
      window.alert("비밀번호는 4글자 이상으로 작성 해주세요");
      return;
    }

    if (!regex.test(id)) {
      window.alert("아이디에 특수문자는 사용할 수 없어요");
      return;
    }

    if (pw !== comfirmPw) {
      window.alert("비밀번호가 다릅니다");
      return;
    }

    const response: IResponseLogin = await createAccount({ id, pw });

    const tickets = JSON.stringify(response.tickets);
    localStorage.setItem("tickets", tickets);

    if (response?.Err === "existnick") {
      window.alert("이미 등록된 ID에요");
      return;
    }

    const { authToken } = response;

    setCookie("authToken", authToken);
    setCookie("userId", id);

    router.push(`/profile/${id}`);
  }

  function handleId(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
  }

  function handlePw(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }

  function handleComfirmPw(e: React.ChangeEvent<HTMLInputElement>) {
    setComfirmPw(e.target.value);
  }
};

export default LoginContainer;
