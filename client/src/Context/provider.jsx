/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { UserArr } from "./context"; // user array context
import { useDispatch } from "react-redux";
import { cartAction } from "../store/store";

export default function UserProvider({ children }) {
  const dispatch = useDispatch();

  const [userArr, setUserArr] = useState(
    JSON.parse(localStorage.getItem("userArr")) || []
  );

  // get the last user didn't log out
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));

    if (currentUser !== null) {
      dispatch(cartAction.UPDATE_CART(currentUser.cart));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // save NEW current_user & user_arr state when cart change

  useEffect(() => {
    // Save the userArr to localStorage when a new user sign-up
    localStorage.setItem("userArr", JSON.stringify(userArr));
  }, [userArr]);

  return (
    <UserArr.Provider value={{ userArr, setUserArr }}>
      {children}
    </UserArr.Provider>
  );
}
