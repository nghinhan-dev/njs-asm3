export async function loader() {
  const response = await fetch("https://njs-asm3.onrender.com/product", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Couldn't fetch data");
  }

  return response;
}
