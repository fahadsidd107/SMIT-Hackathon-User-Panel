import React, { useState } from 'react'
import { Header } from './Header'
import { auth, db } from '../Config/Config'
import { Todos } from './Todos';
import { Modal } from './Modal';

export const Home = ({ currentUser, todos, deleteTodo,
  editTodoValue, editModal, updateTodoHandler }) => {

  const [uname, setUname] = useState('');
  const [fname, setFname] = useState('');
  const [cnic, setCnic] = useState('');
  const [dob, setDob] = useState('');
  const [fm, setFm] = useState('');
  const [todoError, setTodoError] = useState('');

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('info of ' + user.uid).add({
            Name: uname,
            FatherName: fname,
            CNIC: cnic,
            DateOfBirth: dob,
            FamilyMembers: fm,
          
        }).then(setUname(''), setFm(''), setFname(''), setCnic(''), setDob('')).catch(err => setTodoError(err.message))
      }
      else {
        console.log('user is not signed in to add todo to database');
      }
    })
  }

  return (
    <div className='wrapper'>
      <Header currentUser={currentUser} />
      <br></br>
      <br></br>
      <div className='container'>
        <form autoComplete='off' className='form-group'
          onSubmit={handleTodoSubmit}>

          {currentUser && <>
            <input type="text" placeholder="Enter Name"
              className='form-control' required
              onChange={(e) => setUname(e.target.value)}
              value={uname}
            />
            <input type="text" placeholder="Enter Father Name"
              className='form-control' required
              onChange={(e) => setFname(e.target.value)}
              value={fname}
            />
            <input type="number" placeholder="Enter CNIC"
              className='form-control' required
              onChange={(e) => setCnic(e.target.value)}
              value={cnic}
            />
            <input type="date" placeholder="Enter Date of Birth"
              className='form-control' required
              onChange={(e) => setDob(e.target.value)}
              value={dob}
            />
            <input type="number" placeholder="Enter Family Members"
              className='form-control' required
              onChange={(e) => setFm(e.target.value)}
              value={fm}
            />
            <br></br>
            <div style={{
              width: 100 + '%',
              display: 'flex', justifyContent: 'flex-end'
            }}>
              <button type="submit" className='btn btn-success' onClick={()=>{alert('Data is Fowarded to Saylani')}}
                style={{ width: 100 + '%' }}>
                ADD
              </button>
            </div>

          </>}

          {!currentUser && <>
            
            <br></br>
            <div style={{
              width: 100 + '%',
              display: 'flex', justifyContent: 'flex-end'
            }}>
              
            </div>
            <div className='error-msg'>
              Please register your account or login to use application
            </div>
          </>}

        </form>
        {todoError && <div className='error-msg'>{todoError}</div>}
        <Todos todos={todos} deleteTodo={deleteTodo}
          editModal={editModal} />
      </div>

      {editTodoValue && <Modal editTodoValue={editTodoValue}
        editModal={editModal} updateTodoHandler={updateTodoHandler}
      />}

    </div>
  )
}
