import React, { useState, useEffect } from 'react'
import './InputForm.css';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { studentActions } from '../redux/store'
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { formActions } from '../redux/store'

const InputForm = props => {

    const actionsStudent = bindActionCreators(studentActions, useDispatch())
     const actionsForm = bindActionCreators(formActions, useDispatch())
    const dispatch = useDispatch();
    const form = useSelector(state => state.form)
    const students = useSelector(state => state.student)


    const addStudent = async () => {

    await axios.post(`http://localhost/api/students/`, form)

    // dispatch({
    //     type: 'ADD_STUDENT', student: {
    //         id: students.length > 0 ? students[students.length - 1].id + 1 : 0,
    //         ...form
    //     }
    // })

    actionsStudent.addStudent(students, form)

}

return (
    <div>
        <h2 className="Add" >AddStudent</h2>
        <table>
            <tbody>
                <tr>
                    <td>GENERAION</td>
                    <td>
                        <input className='Input-text' type="number" onChange={(e) => actionsForm.changeGeneration(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>ID</td>
                    <td>
                        <input className='Input-text' type="number" onChange={(e) => actionsForm.changeIdStudent(e.target.value)}  />
                    </td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>
                        <input className='Input-text' type="text" onChange={(e) => actionsForm.changeName(e.target.value)}  /> <br />
                    </td>
                </tr>
                <tr>
                    <td>Surname</td>
                    <td>
                        <input className='Input-text' type="text" onChange={(e) => actionsForm.changeSurname(e.target.value)}  /> <br />
                    </td>
                </tr>
                <tr>
                    <td>faculty</td>
                    <td>
                        <input className='Input-text' type="text" onChange={(e) => actionsForm.changeFaculty(e.target.value)}  /> <br />
                    </td>
                </tr>
                <tr>
                    <td>Advisor</td>
                    <td>
                        <input className='Input-text' type="text" onChange={(e) => actionsForm.changeAdvisor(e.target.value)}  /> <br />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button className='btn' onClick={() => addStudent()}>CREATE</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
)
}

export default InputForm;