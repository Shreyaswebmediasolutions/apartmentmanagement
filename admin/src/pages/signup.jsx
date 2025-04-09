import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  
  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <p>Sign up page (to be implemented)</p>
      <button className="btn" onClick={() => navigate("/")}>Go to Login</button>
    </div>
  );
}

export default SignUp;
