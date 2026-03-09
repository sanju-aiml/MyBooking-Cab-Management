import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


function BookCab(){

    const nav=useNavigate()

    const [form,setform]=useState(
        {
            employee_name:"",
            pickup:"",
            drop_location:"",
            pickuptime:"",
            cabType:"cab"
        }
    )

    const change =(e)=> {
        setform({...form,[e.target.name]:e.target.value})
    }

    const submit =async (e) => {

        e.preventDefault();
        // const role=localStorage.getItem("role");
        const hremail=localStorage.getItem("email");
        try{
            const result=await axios.post(`http://localhost:1111/api/hr/book/${hremail}`,form)
            console.log(result);
            alert(result.data);
            nav("/log");
        }
        catch(err){
            console.log(err);
            alert(err.response.data);
       
        }

    }

    return(
        <>
            <h1>welcome registration page</h1>
            <p>employee_name:{form.employee_name}</p>
            <p>pickup:{form.pickup}</p>
            <p>drop_location:{form.drop_location}</p>
            <p>pickuptime:{form.pickuptime}</p>

            <form onSubmit={submit}>
                <input onChange={change} name="employee_name" placeholder="enter the employee name" type="text"/><br/>
                <input onChange={change} name="pickup" placeholder="enter the pickup location" type="text"/><br/>
                <input onChange={change} name="drop_location" placeholder="enter the drop location" type="text"/><br/>
                <input onChange={change} name="pickuptime" placeholder="enter the pickuptime" type="time"/><br/>
                
                
                <label>cabType:</label><br/>

                <select name="cabType" onChange={change}>
                    <option value="van">van</option>
                    <option value="cab">cab</option>
                </select>

                <button type="submit">Book</button>
            </form>
        </>
    )
}
export default BookCab