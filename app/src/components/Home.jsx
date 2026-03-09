import { useNavigate } from "react-router-dom";
function Home() {
  const nav = useNavigate();

  return (
    <>
      <h1>📝 Welcome to Home</h1>
      <p>Please register or login to continue.</p>
      <button onClick={() => nav("/reg")}>Register</button>
      <button onClick={() => nav("/log")}>Login</button>
    </>
  );
}

export default Home;