import React from "react";
import { useForm } from "react-hook-form";

function LoginPage() {
  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = handleSubmit(data=> {
    console.log(data)
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
          <h1 className="text-center">Log in</h1>
          <div className="row mb-4 d-flex justify-content-center align-items-center">
            <div className="m-2 border border-dark rounded ">
              <div data-mdb-input-init className="form-outline">
                <input type="text" className="form-control"  {...register("emailOrUsername", {
                  validate: value => value.trim() !== '' || 'Email or Username is required'
                })}/>
                <label className="form-label" htmlFor="form3Example1">
                  Email 📧 or UserName 👨🏻‍💼
                </label>
                {errors.emailOrUsername && (
                  <p className="text-danger">{errors.emailOrUsername.message}</p>
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
          <button type="submit">Sign IN</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
