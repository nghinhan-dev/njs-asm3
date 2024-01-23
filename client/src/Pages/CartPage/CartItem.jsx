/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateCartMutation } from "../../store/services";

export default function CartItem({ item, quantity }) {
  const [currentQ, setQuantity] = useState(quantity);
  const [updateCart] = useUpdateCartMutation();

  const onChangeQuantity = async (intent) => {
    let newQuantity;

    if (currentQ === 1) {
      return;
    }

    if (intent === "plus") {
      newQuantity = currentQ + 1;
    } else if (intent === "minus") {
      newQuantity = currentQ - 1;
    }

    setQuantity(newQuantity); // Update state

    try {
      const res = await updateCart({ _id: item._id, newQuantity: newQuantity });

      if (!res.ok) {
        throw new Error(res.error);
      }

      intent === "minus"
        ? toast.success("Minus item", { icon: "➖" })
        : toast.success("Added to cart");
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <tr>
      <td>
        <img className="img-table" src={item.img1} alt={`${item.name}.jpg`} />
      </td>
      <td>{item.name}</td>
      <td>{item.price} VND</td>
      <td>
        <div className="px-3 d-flex align-items-center">
          <i
            onClick={() => {
              onChangeQuantity("minus");
            }}
            className="fa-solid fa-chevron-left"
          ></i>
          <p className="px-2">{currentQ}</p>
          <i
            onClick={() => {
              onChangeQuantity("plus");
            }}
            className="fa-solid fa-chevron-right"
          ></i>
        </div>
      </td>
      <td>
        {(quantity * item.price)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        VND
      </td>
      <td>
        <i
          onClick={() => {
            toast.info("Remove from cart", { icon: "🗑" });
          }}
          className="fa-solid fa-trash-can"
        ></i>
      </td>
    </tr>
  );
}
