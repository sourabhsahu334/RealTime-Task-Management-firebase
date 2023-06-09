import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get, set } from "firebase/database";
import app from '../firebase.config';
import { useScrollTo } from 'react-scroll-to-bottom'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
function Dashboard() {
    const database = getDatabase(app);
    const userId = "gno10i1t6BP3CrdtFGWz8V9vCy43";
    const [list, setList] = useState([]);
    const [newtask, setnewtask] = useState("");
    const [duedate, setduedate] = useState('');
    const [allusers,setallusers]=useState()

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `/User/${userId}/arrayData`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setList(snapshot.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);


    // const updatearrayoflistTodo = (id, name, email, imageUrl) => {
    //     const db = getDatabase();
    //     set(ref(db, `/List/${userId}/Todo`), {
    //         username: name,
    //         email: email,
    //         profile_picture: imageUrl
    //     });
    // }
    const getAllUsers = ()=>{
        const dbRef = ref(getDatabase());
        get(child(dbRef, `/User`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setallusers(snapshot.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const deleteTodo = (date) => {
        const db = getDatabase();
        const newlist = list.filter(obj => obj.createDate !== date)
        setList(newlist);
        set(ref(db, `/User/${userId}/`), {
            arrayData: newlist
        }).then(() => console.log("done")).catch((error) => {
            console.log(error);
        });

    }
    const addnewTodo = () => {
        const db = getDatabase();
        let newarray = [...list];
        const newdate = new Date()
        const newobject = {
            task: newtask,
            dueDate: new Date(duedate).getTime().toString(),
            createDate: new Date().getTime().toString(),
            status: "pending"
        }
        newarray = [...newarray, newobject];
        setList(newarray);
        set(ref(db, `/User/${userId}/`), {
            arrayData: newarray
        }).then(() => console.log("done")).catch((error) => {
            console.log(error);
        });

    }
    const buttonstyle = {
        height: "30px", marginTop: "13px"
    }
    const displayFlexStyle = {
        display: "flex",
        flexDirection: "row",

    }


    return (
        <div>
        {/* <div style={{ display :"none",width:"300px",height:"300px",backgroundColor:"#dcdcdc"}}>{allusers.map((item)=>(
            <p>{item.name}</p>
        ))}</div> */}
            <div>
            <h2>YOUR TASKS HERE</h2>

                <div style={{display:"flex",flexDirection:"row",margintop:"50px"}}> <input placeholder=' add your task here ' value={newtask} onChange={(e) => { setnewtask(e.target.value) }} style={{ width: "70%" }} />

                    <input type="date" onChange={(e) => { setduedate(e.target.value); console.log(duedate) }} value={duedate} />
                    <AddCircleIcon style={{ color: "green", fontSize: "30px", marginTop: "30px", cursor: "pointer",fontSize:"40px",margintop:"30px" }} onClick={() => addnewTodo()} /></div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Due Date</TableCell>
                            <TableCell align="right">Pending</TableCell>
                            <TableCell align="right">Delete</TableCell>
                            <TableCell align='right'>AssignTo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list &&
                            list.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.task}</TableCell>
                                    <TableCell align="right">{new Date(parseInt(item.dueDate)).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">
                                        {item.status === "pending" && (
                                            <PendingActionsIcon style={{ cursor: "pointer" }} />
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <DeleteIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => deleteTodo(item.createDate)}
                                        />
                                    </TableCell>
                                    <TableCell align='right' ><button onClick={()=>getAllUsers()}>assign</button></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Dashboard