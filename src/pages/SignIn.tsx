import { background } from "@/assets/background";
import { signIn } from "@/utils/auth";
import clsx from "clsx";
import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  forwardRef,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SignInValues = {
  username: string;
  password: string;
};

const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
  const defaultClassName = "font-bold";
  const className = clsx(defaultClassName, props.className);

  return <label {...props} className={className} />;
};

const Input = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => {
  const defaultClassName = "w-full px-2 py-1 shadow";
  const className = clsx(defaultClassName, props.className);

  return <input {...props} ref={ref} className={className} />;
});

const SignIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<SignInValues>();

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
          <Label>
            <p>Username</p>
            <Input
              type="text"
              {...register("username", { required: true })}
              placeholder="user123456"
            />
          </Label>
          <Label>
            <p>Password</p>
            <Input
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </Label>
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

export default SignIn;
