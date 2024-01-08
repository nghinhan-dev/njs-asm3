import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export async function signUp({ request }) {
  const data = Object.fromEntries(await request.formData());

  try {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const result = await res.json();

      return toast.error(result.message, { icon: "💢" });
    }

    toast.success("Account created", { icon: "🥰" });
    return redirect("/");
  } catch (error) {
    console.log("Something wrong:", error.message);
  }
}
