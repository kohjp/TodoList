import "./Modal.css";
import { useState } from "react";

export const ModifyModal = ({ modal, setModal, title, dateData, setUpdate, update }) => {
  const modalClose = () => {
    setModal({ ...modal, open: false });
  };

  const [inputValue, setInputValue] = useState(modal.title)
  const modifyBtn = () => {
    fetch(`http://localhost:3001/todo/${modal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ title: inputValue }),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        setUpdate(!update)
        modalClose();
      })
      .catch((err) => {
        console.error("Error", err);
      });
  }

  const deleteBtn = () => {
    fetch(`http://localhost:3001/todo/${modal.id}`, {
        method: "DELETE"
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        setUpdate(!update)
        modalClose();
    })
    .catch((err) => {
        console.error("Error", err);
      });
  }

  return (
    <>
      <div className="modal" onClick={modalClose}>
        <div className="modal_container" onClick={(e) => e.stopPropagation()}>
          <span className="closeBtn" onClick={modalClose}>
           ✕
          </span>
            <h1>To Do</h1>
          <div className="modalBody">
          <input className="modalInput" defaultValue={title} onChange={(e) => {setInputValue(e.target.value)}}></input>
          </div>
          <div className="modalBtn">
          <button className="modifyBtn" onClick={modifyBtn}>변경</button>
          <button className="deleteBtn" onClick={deleteBtn}>삭제</button>
          </div>
        </div>
      </div>
    </>
  );
};
