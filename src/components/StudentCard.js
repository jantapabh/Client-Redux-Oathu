import React from 'react';
import './StudentCard.css';
import axios from 'axios';
import { studentsActions } from '../redux/store'
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
// ส่วนจัดการ update และ delete ข้อมูลของนักเรียน


const StudentCard = props => {

    const form = useSelector(state => state.form)
    const actions = bindActionCreators(studentsActions, useDispatch)
    const dispatch = useDispatch();

    const deleteStudent = async () => {
        await axios.delete(`http://localhost/api/students/${props.generation}`)
      actions.deleteStudent(props.generation)
    }

    const updateStudent = async () => {

        await axios.put(`http://localhost/api/students/${props.generation}`, form)
       actions.updateStudent(props.generation, form)
    }

    return (
        <div className="List">
            <div className="Top-up">
                GEN : {props.generation} <br />
                ID : {props.idStudent} <br />
                Name : {props.name} <br />
                Surname : {props.surname} <br />
                Faculty : {props.faculty} <br />
                Advisor :  {props.advisor} <br />
            </div>
            <div>
                <button className="Button" onClick={updateStudent}>Update</button>
                <button className="Button" onClick={deleteStudent}>Delete</button>
            </div>

        </div>
    )
}

export default StudentCard;