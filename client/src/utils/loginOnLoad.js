import { useUserContext } from "../Context/context";

const useLoginLoad = () => {
  const { setUser } = useUserContext();

  const loginLoad = async () => {
    const response = await fetch(
      "https://njs-asm3.onrender.com/user/loginWithSessionCokiee",
      {
        credentials: "include",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      return { error: data.error };
    }

    return setUser(data);
  };

  return loginLoad;
};

export default useLoginLoad;
