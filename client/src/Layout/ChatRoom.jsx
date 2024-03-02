import { useRef } from "react";
// import { sendMsgHandler } from "../socket";

export default function ChatRoom() {
  const inputRef = useRef(null);

  // const onSendMessage = () => {
  //   if (inputRef.current.value?.length !== 0) {
  //     sendMsgHandler(inputRef.current.value, "sillywhale");
  //     inputRef.current.value = "";
  //   }
  // };

  return (
    <div id="chatRoom" className="card">
      <div className="card-header bg-white d-flex align-items-center justify-content-between">
        <p>CUSTOMER SUPPORT</p>
        <span className="bg-light">Let&apos;s Chap App </span>
      </div>
      <div className="card-body"></div>
      <div className="card-footer">
        <label className="d-flex align-items-center justify-content-between">
          <input
            ref={inputRef}
            // onKeyDown={(event) => event.key === "Enter" && onSendMessage()}
            type="text"
            placeholder="Enter Your Message !"
          />
          <div className="d-flex align-items-center justify-content-between">
            <i className="fa-solid fa-paperclip"></i>
            <i className="fa-solid fa-face-smile"></i>
            {/* <i onClick={onSendMessage} className="fa-solid fa-paper-plane"></i> */}
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </label>
      </div>
    </div>
  );
}
