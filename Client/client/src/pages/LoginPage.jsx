import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {signin, isAuthenticated ,errors: signinErrors} = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(data=> {
    signin(data)
  })

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('/IMG/1326676.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <form
          onSubmit={onSubmit}
          className="formRegister"
          style={{
            backdropFilter: "blur(5px)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
        { signinErrors.map((error, i) => (
          <div className="p-3 mb-2 bg-danger text-white text-center" key={i}>
            {error}
          </div>
        ))}
          <h1 className="text-center">Log in</h1>
          <div className="row mb-4 d-flex justify-content-center align-items-center">
            <div className="m-2 border border-dark rounded ">
              <div data-mdb-input-init className="form-outline">
                <input type="text" className="form-control"  {...register("emailOrUsername", { required: true })} />
                <label className="form-label" htmlFor="form3Example1">
                  Email 📧 or UserName 👨🏻‍💼
                </label>
                {errors.emailOrUsername && (
                  <p className="text-danger">Email or UserName is required</p>
                )}
              </div>
            </div>
            <div className="m-2 border border-dark rounded">
              <div data-mdb-input-init className="form-outline">
                <input type="password" className="form-control" {...register("password", { required: true })}/>
                <label className="form-label" htmlFor="form3Example2">
                  Password
                </label>
                {errors.password && <p className="text-danger">Password is required</p>}
              </div>
            </div>
          </div>
          <button className="button1" type="submit">Sign IN</button>
          <p className="d-flex justify-content-around m-2">
          Don't have an account? <Link className="btn btn-outline-info btn-rounded" to="/register">Sign Up</Link>
        </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
