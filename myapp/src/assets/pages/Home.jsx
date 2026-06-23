import React, { useEffect } from 'react';
import Swal from "sweetalert2";
import "../css/style.css";
import '../css/media.css'
import { FaPlus ,FaListUl} from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaTrash, FaCheck } from "react-icons/fa";
import { FaList, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";
import { useState } from 'react';
 

function Home() {
  let [formdata, setFormData] = useState({ task: "", Description: "" })
  let [Details, setDetails] = useState([])
  const [filter, setFilter] = useState("all");

  let submitHandler = async (e) => {
    e.preventDefault()
    let response = await fetch("http://localhost:5000/Addlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formdata)
    })
    let result = await response.json()
    if (response.status != 200) {
      Swal.fire({
        icon: "error",
        title: "❌ Task Add Agilla",
        text: "Dayavittu matte try maadi.",
      });
    }
    else {
      Swal.fire({
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 1500
      });
    setFormData({ task: "", Description: "" });
       
    }
  }

  let SelectList = async () => {
    let response = await fetch("http://localhost:5000/DetailsData")
    let result = await response.json()
    setDetails(result)
  }
  console.log(Details)
  console.log(formdata)
  let texbHandler = (e) => {
    let { name, value } = e.target
    setFormData((exstingData) => ({
      ...exstingData, [name]: value
    }))
  }
  let deleteHandler = async (id) => {
    // e.preventDefault()
    let response = await fetch(`http://localhost:5000/removelist/${id}`, {
      method: "DELETE"
    })
    let result = await response.json();
    if (response.status != 200) {
      alert(result.message)
    }
    else {
      alert(result.message)
        SelectList()
    }
  }
  let completeHandler = async (id) => {
    let response = await fetch(
      `http://localhost:5000/completelist/${id}`,
      {
        method: "PUT"
      }
    );
    let result = await response.json()
    if (response.status != 200) {
      alert(result.message)

    }
    else {
      alert(result.message)
     SelectList();
    }
  }


  return (
    <>
      <div className="container">
        <div className='left'>
          <h1><FaClipboardList />Add your Task</h1>
          <form onSubmit={submitHandler}>
            <div className='todo-list'>
              <input type='text' className='from-control' placeholder="What do you want to do?" name="task" onChange={texbHandler}  value={formdata.task} required></input>
            </div>
            <div className='todo-list'>
              <input type='text' className='from-control' placeholder="Enter task description..." name="Description" onChange={texbHandler}  value={formdata.Description} required></input>
            </div>

            <div className='todo-list'>
              <div className="btn1-group">
                 <button className="sub-btn"><FaPlus/> AddTask</button>
                <button className="display-btn" onClick={SelectList}><FaListUl /> Display List</button>
              </div>
            </div>
          </form>
        </div>


        <div className='right'>
          <div className="filter-btns">
            <button onClick={() => setFilter("all")}> <FaList /> All</button>
            <button onClick={() => setFilter("pending")}><FaHourglassHalf /> Pending</button>
            <button onClick={() => setFilter("complete")}>   <FaCheckCircle /> Completed</button>
          </div>
          <div className='row'>

            {

              <div className='row'>
                {Details
                  .filter(list => {
                    if (filter === "all") return true;
                    if (filter === "pending") return list.status === "pending";
                    if (filter === "complete") return list.status === "Complete";
                    return true;
                  })
                  .map(list => (
                    <div className={list.status === "Complete" ? "card completed-card" : "card"} key={list.listid}>
                      <h1 className="list-id">{list.listid}</h1>
                      <h1>{list.listname}</h1>
                      <p>{list.description}</p>

                      <p>Status: {list.status}</p>

                      {list.completed_at && (
                        <p>
                          Date: {new Date(list.completed_at).toLocaleString()}
                        </p>
                      )}

                      <div className='btn-group'>
                        <button onClick={() => deleteHandler(list.listid)}>
                          <FaTrash />
                        </button>

                        <button onClick={() => completeHandler(list.listid)}>
                          <FaCheck />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;