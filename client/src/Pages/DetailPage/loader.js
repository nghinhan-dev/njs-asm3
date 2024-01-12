export async function getDetail({ params }) {
  const productID = params.productID;

  const res = await fetch(`http://localhost:5000/product/${productID}`);

  return res;
}
