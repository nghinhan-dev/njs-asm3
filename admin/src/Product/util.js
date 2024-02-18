import { toastSuccess, toastError } from "../util/toast";
import { redirect } from "react-router-dom";

export async function getSinglePrd({ params }) {
  const id = params.prdId;
  const res = fetch(`http://localhost:5000/product/${id}`);

  console.log("res:", res);
  return res;
}

export async function getProducts() {
  try {
    const res = await fetch("http://localhost:5000/product/");

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res;
  } catch (error) {
    console.log("error:", error);
  }
}

export async function addPrd({ request }) {
  const notify = {};
  const data = Object.fromEntries(await request.formData());

  try {
    const res = await fetch("http://localhost:5000/add_hotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    notify.success = await res.json();
    return notify;
  } catch (error) {
    console.log("error:", error);
  }
}

export async function updateProduct({ params, request }) {
  const id = params.prdId;

  const data = Object.fromEntries(await request.formData());

  try {
    const res = await fetch(`http://localhost:5000/product/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (response.errors) {
      throw new Error(response.errors[0]);
    }

    return toastSuccess("Updated");
  } catch (error) {
    return toastError(error?.message ?? "Lost connect to server");
  }
}

export async function delHotel({ params }) {
  const id = params.hotelId;

  try {
    const res = await fetch(`http://localhost:5000/hotel/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res) {
      throw new Error("Cannot deleted");
    }

    toastSuccess("Updated");
    return redirect("/hotel");
  } catch (error) {
    toastError(error?.message ?? "Lost connect to server");
  }
}
