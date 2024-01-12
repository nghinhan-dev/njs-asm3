export async function loader() {
  const response = await fetch("http://localhost:5000/product");

  if (!response.ok) {
    throw new Error("Couldn't fetch data");
  }

  return response;
}
