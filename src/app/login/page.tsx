import { doSocialLogin } from "../actions";

export default function LoginDisplay() {
  return (
    <form action={doSocialLogin} className="flex items-center flex-col">
      <button
        className="px-2 rounded bg-white text-black"
        type="submit"
        name="action"
        value="azure-ad-b2c"
      >
        Sign in with azure AD
      </button>
    </form>
  );
}
