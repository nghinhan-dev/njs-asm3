import { toast } from "react-toastify";

export async function signUp({ request }) {
  const data = Object.fromEntries(await request.formData());

  try {
    const res = await fetch(`http://localhost:5000/${data.intent}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await res.json();
    console.log("result:", result);

    if (!res.ok) {
      return toast.error(result.message, { icon: "💢" });
    }

    toast.success(
      data.intent === "signup"
        ? "Account created"
        : `Welcome ${result.userName}`,
      { icon: "🥰" }
    );
    return result;
  } catch (error) {
    console.log("Something wrong:", error.message);
  }
}
