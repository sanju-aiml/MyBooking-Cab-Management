import { Link } from "react-router-dom"

function Hrdashboard(){
    return(
        <>
        <h1>HR DASHBOARd</h1>
        <Link to={"/BookCab"}>BookCab</Link>
        <Link to={"/MyBookings"}>My Bookings</Link>
        </>
    )
}
export default Hrdashboard