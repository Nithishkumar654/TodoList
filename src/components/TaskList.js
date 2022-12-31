import React, { useEffect , useState} from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios'
import { Modal,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {BiListPlus} from 'react-icons/bi'
import {AiTwotoneEdit} from 'react-icons/ai'
import {MdRemoveCircle} from 'react-icons/md'
import {RiSave2Fill} from 'react-icons/ri'
import {FaTrashAlt} from 'react-icons/fa'

function TaskList() {
    let [users,setUsers]=useState([])
    let [show,setShow]=useState(false)
    let {register,handleSubmit,formState:{errors},setValue,getValues}=useForm();

    let [editUser,setEditUser]=useState({})

    let getTask=()=>{
        axios.get('http://localhost:4000/users')
        .then(response=>setUsers(response.data))    
        .catch(err=>console.log(err.message))
    };

    let showModal=()=>{
        setShow(true)
    }
    let closeModal=()=>{
        setShow(false)
    }
    let editTask=(userObjEdit)=>{
        showModal();
        setEditUser(userObjEdit);
        setValue("task",userObjEdit.task)
        setValue("startTime",userObjEdit.startTime)
        setValue("endTime",userObjEdit.endTime)
        setValue("category",userObjEdit.category)
        setValue("status",userObjEdit.status)
    }

    let deleteTask=(userObjDel)=>{
        axios.delete(`http://localhost:4000/users/${userObjDel.id}`)
        .then(res=>getTask())
        .catch(err=>console.log(err))
    }

    let saveTask=()=>{
        closeModal();
        let modifyUser=getValues();
        modifyUser.id= editUser.id;
        
        axios.put(`http://localhost:4000/users/${modifyUser.id}`,modifyUser)
        .then(response=>{
            if(response.status===200){
            getTask();
            }
        })
        .catch(err=>console.log(err))

    }
    useEffect(()=>{
        axios.get('http://localhost:4000/users')
        .then(response=>setUsers(response.data))    
        .catch(err=>console.log(err.message))
    },[])

    let clearAll=()=>{
      {
        users.map(userObj=>deleteTask(userObj))
      }
      getTask();
    }
  return (
    <div className='container mx-auto text-center' style={{minHeight:"30rem"}}>
        <h1 className='display-5 text-center m-5'>Today's Tasks List</h1> 
        {users.length!=0 ? 
        <div className='container' style={{width:"85%"}}>
            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-7 m-2 border p-2 bg-warning bg-opacity-50 rounded-3">

                    <div className='col mx-auto my-auto text-center fw-bold' style={{width:"20%"}}>Task</div>

                    <div className='col mx-auto my-auto text-center fw-bold' style={{width:"10%"}}>StartTime</div>

                    <div className='col mx-auto my-auto text-center fw-bold' style={{width:"10%"}}>EndTime</div>

                    <div className='col mx-auto my-auto text-center fw-bold' style={{width:"10%"}}>Category</div>

                    <div className='col mx-auto my-auto text-center fw-bold' style={{width:"10%"}}>Status</div>

                    <div className='col-2 mx-auto my-auto text-center fw-bold' style={{width:"23%"}}>Options</div>

            </div>  
                {
                    users.map(userObj=>
                        <div key={userObj.id} className="row row-cols-2 row-cols-md-4 row-cols-lg-7 m-2 border rounded-4 p-1 bg-dark bg-opacity-10">

                            <div className='col mx-auto my-auto text-center' style={{width:"20%"}}>{userObj.task}</div>

                            <div className='col mx-auto my-auto text-center' style={{width:"10%"}}>{userObj.startTime}</div>
                        
                            <div className='col mx-auto my-auto text-center' style={{width:"10%"}}>{userObj.endTime}</div>
                        
                            <div className='col mx-auto my-auto text-center' style={{width:"10%"}}>{userObj.category}</div>
                        
                            <div className='col mx-auto my-auto text-center' style={{width:"10%"}}>{userObj.status}</div>
                            
                            <div className='col-2 text-center mt-1' >
                            <div className="row row-cols-2 mb-2 mt-1 ms-2 text-center">

                            <div className='btn btn-primary col ms-1 justify-content-center' style={{width:'35%'}} onClick={()=>{editTask(userObj)}}>Edit <AiTwotoneEdit/></div>

                            <div className='btn btn-danger col ms-1 justify-content-center' style={{width:'45%'}} onClick={()=>{deleteTask(userObj)}}>Remove <MdRemoveCircle/></div>
                            
                            </div>
                            </div>
                        
                        </div>
                    
                     )   
                }   
        </div>
        : <h2 className='text-center display-4 text-info'>Tasks List is Empty..!!</h2>    
    }
      <Link className="btn bg-success m-5 text-white" to={"/"}>Add a Task  <BiListPlus className='fs-4'/></Link>
      {users.length!=0 && <div className="btn bg-danger m-5 text-white" onClick={clearAll}>Clear all Tasks <FaTrashAlt/></div> }
        <Modal 
        show={show}
        onHide={closeModal}
        centered
        className="modal">
            <Modal.Header><Modal.Title>Edit Task</Modal.Title></Modal.Header>
            <Modal.Body>
            <form className=" container form-inline">
        <div className="row row-cols-1">
      <div className="col">
    <div className="form-group">
      <label htmlFor="task" className="d-flex fw-bold">Task</label>
      <input type="text" className="form-control d-flex" {...register("task")} placeholder="WorkOut" />
    </div>
  </div>
  <div className="col">
    <div className="form-group">
      <label htmlFor="pwd" className="fw-bold">Start Time</label>
      <input type="time" className="form-control w-75" {...register("startTime")} id="pwd" />
    </div>
  </div>
  <div className="col">
    <div className="form-group">
      <label htmlFor="pwd" className="fw-bold">End Time</label>
      <input type="time" className="form-control w-75" {...register("endTime")} id="pwd" />
    </div>
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
</div>
  </form>
        </Modal.Body>
            <Modal.Footer>
                <Button onClick={saveTask}>Save <RiSave2Fill/></Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default TaskList