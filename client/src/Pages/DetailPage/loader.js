export async function getDetail({ params }) {
  const productID = params.productID;

  const res = await fetch(`https://njs-asm3.onrender.com/product/${productID}`);

  return res;
}
