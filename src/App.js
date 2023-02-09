import './App.css';
import { Header } from './components/Header';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale'
import { Todos } from './components/Todos';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { AddModal } from './components/AddModal';


function App() {

  const [selectedDate, setSelectedDate] = useState(new Date())

  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="custom-input" onClick={onClick}>
      {value}
    </button>
  );

  const [dateData, setDateDate] = useState('');
    
  const [list, setList] = useState([]);

  const [modal, setModal] = useState(false);

  const [update, setUpdate] = useState(false);


  useEffect(() => {
    setDateDate(`${selectedDate.getFullYear()}-${( (selectedDate.getMonth()+1) < 9 ? "0" + (selectedDate.getMonth()+1) : (selectedDate.getMonth()+1) )}-${( (selectedDate.getDate()) < 9 ? "0" + (selectedDate.getDate()) : (selectedDate.getDate()) )}`)
  }, [selectedDate])


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
  }, [dateData])

  const addBtn = () => {
    setModal(true)
  }

  return (
    <>
    <Header />
    <div className='datePositon'>
    <DatePicker 
      className='date'
      locale={ko}
      dateFormat="yyyy년 MM월 dd일"
      selected={selectedDate} 
      onChange={(date) => setSelectedDate(date)}
      customInput={<ExampleCustomInput />} />
    </div>
    <Todos setList={setList} list={list} dateData={dateData} update={update} setUpdate={setUpdate} />
    {modal 
    ? <AddModal setModal={setModal} dateData={dateData} list={list} setList={setList} update={update} setUpdate={setUpdate} /> 
    : ""}
    <div className="addBtnContainer">
    <FontAwesomeIcon onClick={addBtn} className="addBtn" icon={faCirclePlus} size="4x" />
    </div>
    </>
  );
}

export default App;
