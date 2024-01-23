/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";

export default function CartItem({ item, quantity }) {
  const [currentQ, setQuantity] = useState(quantity);

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
              setQuantity((prev) => prev - 1);
              toast.success("Minus item", { icon: "➖" });
            }}
            className="fa-solid fa-chevron-left"
          ></i>
          <p className="px-2">{currentQ}</p>
          <i
            onClick={() => {
              setQuantity((prev) => prev + 1);
              toast.success("Added to cart");
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
