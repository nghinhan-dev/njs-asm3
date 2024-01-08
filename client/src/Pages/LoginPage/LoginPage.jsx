/* eslint-disable no-prototype-builtins */
// redux
// import { useDispatch, useSelector } from "react-redux";
// import { cartAction } from "../../store/store";
import { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { useUserContext } from "../../Context/context";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const { setUser } = useUserContext();
  const actionData = useActionData();

  useEffect(() => {
    if (actionData.userName) {
      setUser(() => actionData.userName);
    }
  }, [actionData, setUser]);

  // const dispatch = useDispatch();
  // const cart = useSelector((state) => state.cart);

  // signUp handle

  return (
    <>
      <div
        id="homepage_banner"
        className="d-flex flex-column align-items-start justify-content-center"
      >
        <div id="authForm">
          <h3>{isLogin ? "Sign In" : "Sign Up"}</h3>
          <Form method="POST" className="h-auto d-flex flex-column">
            <div className="formContainer">
              <input type="email" id="email" name="email" placeholder="Email" />

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                minLength={8}
              />

              {!isLogin && (
                <>
                  <input
                    type="text"
                    id="userName"
                    name="confirmPassword"
                    placeholder="Confirm password"
                  />

                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="User Name"
                  />

                  <input
                    type="tel"
                    id="phone"
                    name="phoneNumber"
                    placeholder="Phone"
                  />
                </>
              )}
            </div>

            <input
              className="bg-dark mb-2 text-white"
              type="submit"
              value={isLogin ? "Sign In" : "Sign Up"}
            />
          </Form>

          {isLogin ? (
            <p>
              Create an account?{" "}
              <span onClick={() => setIsLogin((prevState) => !prevState)}>
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span onClick={() => setIsLogin((prevState) => !prevState)}>
                Sign in
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
