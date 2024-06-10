import { background } from "@/assets/background";
import { TextField } from "@/components/form";
import { signIn } from "@/utils/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export type SignInValues = {
  username: string;
  password: string;
};

const SignInPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<SignInValues>();

  const onSignIn: SubmitHandler<SignInValues> = async (data) => {
    const { username, password } = data;

    const signedIn = await signIn(username, password);

    if (signedIn) {
      navigate("/");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        background: `url(${background})`,
      }}
    >
      <div className="w-2/5 rounded-lg px-10 py-10 bg-neutral-100/80 backdrop-blur">
        <h1 className="text-center text-2xl font-bold text-primary-500">
          Sign In
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSignIn)}>
          <TextField
            {...register("username", { required: true })}
            placeholder="user123456"
            label="Username"
          />

          <TextField
            {...register("password", { required: true })}
            type="password"
            placeholder="password"
            label="password"
          />
          <button
            type="submit"
            className="py-1 font-bold text-lg text-neutral-100 bg-primary-500 shadow transition-colors cursor-pointer hover:bg-primary-600 active:bg-primary-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
