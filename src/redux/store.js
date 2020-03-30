import { createStore, combineReducers, applyMiddleware } from "../../node_modules/redux";
import logger from 'redux-logger';
import axios from 'axios'
import thunk from 'redux-thunk';

axios.defaults.withCredentials = true


//ส่วนของการยืนยันตัวตน

const initAuthData = {

    accessToken: null,
    psuInfo: null

}

export const studentActions = {

    getStudentsSuccess: students => ({
        type: 'GET_STUDENTS_SUCCESS', students
    }),
    getStudentsFailed: () => ({ type: 'GET_STUDENTS_FAILED' }),

    getStudents: () => async (dispatch) => {
        try {
            console.log('get Student New')
            const response = await axios.get(`http://localhost/api/students`)
            const responseBody = await response.data;
            console.log('response: ', responseBody)
            dispatch({ type: 'GET_STUDENTS_SUCCESS', students: responseBody });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'GET_STUDENTS_FAILED' });
        }
    },
    addStudent: (students, form) => ({
        type: 'ADD_STUDENT', students: {
            generation: students.length > 0 ? students[students.length - 1].generation + 1 : 0,
            ...form
        }
    }),

    deleteStudent: (generation) => ({ type: 'DELETE_STUDENT', generation: generation }),
    updateStudent: (generation, form) => ({ type: 'UPDATE_STUDENT', generation: generation, student: { ...form, generation: generation } })
}

export const AuthActions = {

    getLoginStatus: () => async (dispatch) => {
        const res = await axios.get(`http://localhost/api/auth`)
        dispatch({ type: 'GET_LOGIN_STATUS', payload: res.data });
    },
    loginPSU: (username, password) => async (dispatch) => {
        const name = username + ''
        const pass = password + ''
        if (name.length === 10 && pass.length > 6 && username == '6035512034') {
            const res = await axios.post('http://localhost/api/auth/psu', { username, password })
            const { stdId, firstname, lastname, id, type } = res.data;

            if (type == ' ') {
                return alert('username or password incorrect');
                // alert('username or password incorrect');
            }
            else {
                dispatch({ type: 'LOGIN_PSU', payload: res.data })
            }
        }
    },
    logout: () => async (dispatch) => {
        const res = await axios.get(`http://localhost/api/auth/logout`)
        dispatch({ type: 'LOGOUT' })
    }
}

const AuthReducer = (data = initAuthData, action) => {
    switch (action.type) {
        case 'GET_LOGIN_STATUS': return action.payload;
        case 'LOGIN_PSU': return { ...data, psuInfo: action.payload };
        case 'LOGOUT': return initAuthData
        default: return data
    }
}


// ส่วนของ fontend

const initialform = {

    generation: 0,
    idStudent: 0,
    name: '',
    surname: '',
    faculty: '',
    advisor: ''

}

export const formActions = {
    changeGeneration: (generation) => ({ type: 'CHANGE_GENERATION', generation: generation }),
    changeIdStudent: (idStudent) => ({ type: 'CHANGE_ID', idStudent: idStudent }),
    changeName: (name) => ({ type: 'CHANGE_NAME', name: name }),
    changeSurname: (surname) => ({ type: 'CHANGE_SURNAME', surname: surname }),
    changeFaculty: (faculty) => ({ type: 'CHANGE_FACULTY', faculty: faculty }),
    changeAdvisor: (advisor) => ({ type: 'CHANGE_ADVISOR', advisor: advisor })
}


const formReducer = (data = initialform, action) => {

    switch (action.type) {

        case 'CHANGE_GENERATION':
            return { ...data, generation: action.generation }
        case 'CHANGE_ID':
            return { ...data, idStudent: action.idStudent }
        case 'CHANGE_NAME':
            return { ...data, name: action.name }
        case 'CHANGE_SURNAME':
            return { ...data, surname: action.surname }
        case 'CHANGE_FACULTY':
            return { ...data, faculty: action.faculty }
        case 'CHANGE_ADVISOR':
            return { ...data, advisor: action.advisor }
        default: return data;
    }

}


const studentReducer = (students = [], action) => {
    switch (action.type) {
        case 'GET_STUDENTS':
            return action.students;
        case 'ADD_STUDENT':
            return [...students, action.students]
        case 'DELETE_STUDENT':
            return students.filter((student, index) => +student.generation !== +action.generation)
        case 'UPDATE_STUDENT':
            return students.map((student, index) => {
                if (+student.generation === +action.generation) {
                    return action.student;
                }
                else {
                    return student;
                }
            })

        case 'GET_STUDENTS_SUCCESS':
            console.log('action: ', action.students)
            return action.students
        case 'GET_STUDENTS_FAILED':
            console.log('action: Failed')
            return action.students

    }

    return students;
}

// Reducer เป็นส่วนที่รับ input มาแล้วส่งกระบวนการเปลี่ยนแปลงค่า state

const reducers = combineReducers({
    student: studentReducer,
    form: formReducer,
    Auth: AuthReducer
})

//เรียกใช้ redux-thunk
export const store = createStore(reducers, applyMiddleware(logger, thunk));
