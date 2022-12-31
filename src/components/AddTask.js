import React, { useState } from 'react'
import {BsPlusCircle} from 'react-icons/bs'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineUnorderedList} from 'react-icons/ai'
function AddTask() {

  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 3);
  
    return previous;
  }
  
  console.log(getPreviousDay().getDay(),getPreviousDay()); //  yesterday
  

    let navigate=useNavigate();
    let [err,setErr]=useState("")
    let {register,handleSubmit,formState:{errors}}=useForm();
    let submitForm=(newTask)=>{
        axios.post('http://localhost:4000/users',newTask)
        .then(response=>{
             setErr("")
             alert("Task added Successfully")
             navigate("/tasklist")
        })
        .catch(error=>{
            setErr(error.message)
        })
    }
  return (
    <div className='container' style={{minHeight:"30rem"}}>
            <h3 className='mt-5 ms-2'>Today</h3>
            {err.length!=0 && <p className='text-danger text-center'>{err}</p>}
            <form className=" container form-inline mt-5" onSubmit={handleSubmit(submitForm)}>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-6">
              <div className="col">
            <div className="form-group">
              <label htmlFor="task" className="d-flex fw-bold">Task</label>
              <input type="text" className="form-control d-flex" {...register("task",{required:true})} placeholder="WorkOut" />
              {errors.task?.type==="required"&&<p className='text-danger'>*This Field is required</p>}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="pwd" className="fw-bold">Start Time</label>
              <input type="time" className="form-control w-75" {...register("startTime",{required:true})} id="pwd" />
            </div>
            {errors.startTime?.type==="required"&&<p className='text-danger'>*This Field is required</p>}
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="pwd" className="fw-bold">End Time</label>
              <input type="time" className="form-control w-75" {...register("endTime",{required:true})} id="pwd" />
            </div>
            {errors.endTime?.type==="required"&&<p className='text-danger'>*This Field is required</p>}
          </div>
          <div className="col">
            <label htmlFor="cat" className="fw-bold">Category</label> <br />
            <select className="form-control" {...register("category")} defaultValue={'DEFAULT'}>
              <option value="DEFAULT" disabled>Choose Category</option>
              <option value="Personal">Personal</option>
              <option value="Office">Office</option>
              <option value="Family">Family</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="status" className="fw-bold">Status</label> <br />
            <select className="form-control" defaultValue={'DEFAULT'} {...register("status")}>
                <option value="DEFAULT" disabled>Choose Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="col text-center">
            <label htmlFor="status" className="fw-bold">AddToList</label> <br />
            <button type="submit" className="btn mt-2 pt-0 bg-success"><BsPlusCircle className='text-white' /></button>
          </div>
        </div>
          </form>
          <div className='text-center'>
          <Link className="btn bg-primary m-5 text-white" to={"/tasklist"}>See Your Tasks <AiOutlineUnorderedList/></Link>
          </div>
    </div>
    
  )
}

export default AddTask