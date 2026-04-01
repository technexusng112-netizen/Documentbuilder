import { signIn } from "@/lib/auth";

export default function SignInPage() {
  return (
    <form
      className="mx-auto max-w-md space-y-3 rounded-xl border p-6"
      action={async (formData) => {
        "use server";
        await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirectTo: "/dashboard"
        });
      }}
    >
      <h1 className="text-2xl font-bold">Sign in</h1>
      <input name="email" type="email" placeholder="Email" required className="w-full rounded border p-2" />
      <input name="password" type="password" placeholder="Password" required className="w-full rounded border p-2" />
      <button className="w-full rounded bg-brand-700 py-2 text-white">Sign In</button>
    </form>
  );
}
