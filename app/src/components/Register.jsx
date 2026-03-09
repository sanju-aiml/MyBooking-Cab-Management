import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


function Register(){

    const nav=useNavigate()

    const [form,setform]=useState(
        {
            username:"",
            email:"",
            password:"",
            role:"Admin"
        }
    )

    const change =(e)=> {
        setform({...form,[e.target.name]:e.target.value})
    }

    const submit =async (e) => {
        e.preventDefault();
        try{
            const result=await axios.post("http://localhost:1111/api/user/register",form)
            console.log(result);
            alert(result.data);
            nav("/log");
        }
        catch(err){
            console.log(err);
            alert(err.response?.data || "Registration failed");
        }
    }

    return(
        <>
            <h1>welcome registration page</h1>
            <p>name:{form.username}</p>
            <p>email:{form.email}</p>
            <p>password:{form.password}</p>

            <form onSubmit={submit}>
                <input onChange={change} name="username" placeholder="create username" type="text"/>
                <input onChange={change} name="email" placeholder="enter email" type="email"/>
                <input onChange={change} name="password" placeholder="create password" type="password"/>
                
                <label>Role:</label><br/>

                <select name="role" onChange={change}>
                    <option value="Admin">Admin</option>
                    <option value="Hr">Hr</option>
                    <option value="Driver">Driver</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </>
    )
}
export default Register