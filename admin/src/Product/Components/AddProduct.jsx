import FormContainer from "../../ReusableComponent/FormContainer";
import FormDisplay from "../../ReusableComponent/FormDisplay";
import FormInputs from "../../ReusableComponent/FormInputs";

import { useState } from "react";

export default function AddHotel() {
  const [formFields, setFormFields] = useState({
    category: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    long_desc: "",
    name: "",
    price: 0,
    count: 0,
    short_desc: "",
  });

  return (
    <>
      <FormContainer title={"Add Hotel"}>
        <FormDisplay fields={formFields} />
        <FormInputs fields={formFields} setFormInput={setFormFields} />
      </FormContainer>
    </>
  );
}
