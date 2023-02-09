import { useState } from "react";
import './Modal.css'

export const AddModal = ({setModal, dateData, update, setUpdate}) => {
  const modalClose = () => {
    setModal(false);
  };

  const [inputValue, setInputValue] = useState("");

  const addBtn = () => {
    
    let postData = {
        "title": inputValue,
        "complete": false,
        "createdAt": dateData
    }

    fetch(`http://localhost:3001/todo`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(postData),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        setUpdate(!update);
        modalClose();
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };


  return (
    <>
      <div className="modal" onClick={modalClose}>
        <div className="modal_container" onClick={(e) => e.stopPropagation()}>
          <span className="closeBtn" onClick={modalClose}>
            ✕
          </span>
          <h1>To Do 추가</h1>
          <div className="modalBody">
            <input
              className="modalInput"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            ></input>
          </div>
          <div className="modalBtn">
            <button className="modifyBtn" onClick={addBtn}>
              추가
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
