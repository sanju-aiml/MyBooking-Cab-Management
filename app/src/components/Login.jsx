import { useState } from "react"
import axios from 'axios'
import {Navigate, useNavigate} from 'react-router-dom' 

function Login(){
    const nav=useNavigate();

    const [form,setform]=useState(
        {
            email:"",
            password:""
        }
    )

    const change =(e)=> {
        setform({...form,[e.target.name]:e.target.value})
    }

    const submit =async (e) => {

        e.preventDefault();
        
        try{
            const result=await axios.post("http://localhost:1111/api/user/login",form,{withCredentials:true})
            console.log(result)
            console.log(result.data)
            console.log(result.data.role)
            localStorage.setItem("email",result.data.email)
            const role=result.data.role

            if(role == "admin") nav("/admin-dashboard");
            else if(role == "hr") nav("/hr-dashboard");
            else if(role == "it") nav("/admin-dashboard");
            else if(role == "driver") nav("/admin-dashboard");
            else nav("/BookCab");
        }
        catch(err){
            console.log(err);
        }
        

    }

    return(
        <>
            <h1>welcome Login page</h1>
            <p>name:{form.email}</p>
            <p>name:{form.password}</p>
            <form onSubmit={submit}>
                <input onChange={change} name="email" placeholder="enter email" type="email"/>
                <input onChange={change} name="password" placeholder="create password" type="password"/>
                <button type="submit">Login</button>
            </form>
        </>
    )
}
export default Login