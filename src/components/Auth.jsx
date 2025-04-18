import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Make sure to include this for styling

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true); // State to toggle between login/signup
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // for signup only
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here (validation, API calls, etc.)
    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Proceed with the signup/login logic here
    alert(`${isSignup ? "Signup" : "Login"} successful`);
    navigate("/"); // Redirect after successful login/signup
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span
                className="eye-icon"
                onClick={togglePasswordVisibility}
              >
                👁️
              </span>
            </div>
          </div>
          {isSignup && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="eye-icon"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  👁️
                </span>
              </div>
            </div>
          )}
          <button className="btn" type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
        </form>
        <div className="toggle-form">
          <span>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button onClick={() => setIsSignup((prev) => !prev)}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
