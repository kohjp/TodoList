import "./Todos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import { ModifyModal } from "./ModifyModal";

export const Todos = ({ setList, list, dateData, update, setUpdate }) => {


    const [modal, setModal] = useState({open: false});

    useEffect(() => {
      fetch(`http://localhost:3001/todo`)
      .then((res) => {
        if(res.ok){
          return res.json()
        }
        else {
          return []
        }
      })
      .then((data) => {
        setList(data.filter(el => {
          return el.createdAt === dateData
        }))
      })
      }, [update])

  const completeButton = (id, complete) => {
    fetch(`http://localhost:3001/todo/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ complete: !complete }),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        setUpdate(!update)
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  const modalOpen = (title,id) => {
    setModal({...modal, open: true, title, id})
  }

  return (
    <>
    <div className="todo_container">
      {list.map((el) => {
        return (
          <div className="todo_content" key={el.id}>
            <div className={el.complete ? "complete title" : "title"} onClick={()=>modalOpen(el.title, el.id)}>{el.title}</div>
            {el.complete 
            ? <FontAwesomeIcon onClick={() => completeButton(el.id, el.complete)} className="complete" icon={faCircleCheck} size="2x"/>
            : <FontAwesomeIcon onClick={() => completeButton(el.id, el.complete)} className="incomplete" icon={faCircle} size="2x"/>
            }
          </div>
        );
      })}
    </div>
      {modal.open 
      ? <ModifyModal 
      modal={modal} 
      setModal={setModal} 
      title={modal.title} 
      dateData={dateData}
      setUpdate={setUpdate}
      update={update}
       /> 
      : ""}
    </>
  );
};
