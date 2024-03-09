import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function RefisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  useEffect(() => {
    const cityInput = document.getElementById("city");
    const cityAutocomplete = new window.google.maps.places.Autocomplete(
      cityInput,
      {
        types: ["(cities)"],
        key: "AIzaSyAP18Z7ieROrj4hC4q8ZoEE80Dp2WmI1p4",
      }
    );

    cityAutocomplete.addListener("place_changed", () => {
      const selectedCity = cityAutocomplete.getPlace();
      const cityLatLng = selectedCity.geometry.location;

      const addressInput = document.getElementById("address");
      const addressAutocomplete = new window.google.maps.places.Autocomplete(
        addressInput,
        {
          bounds: new google.maps.LatLngBounds(cityLatLng, cityLatLng),
          types: ["address"],
          key: "AIzaSyAP18Z7ieROrj4hC4q8ZoEE80Dp2WmI1p4",
        }
      );
    });
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ height: "100vh", paddingTop: "130px" }}
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
      { registerErrors.map((error, i) => (
        <div className="p-3 mb-2 bg-danger text-white text-center" key={i}>
          {error}
        </div>
      ))}
        <h1 className="text-center">Register Now!</h1>
        <div className="row mb-4 d-flex justify-content-center align-items-center">
          <div className="col-5 m-2 border border-dark rounded ">
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                {...register("name", { required: true })}
              />
              <label className="form-label" htmlFor="form3Example1">
                First name
              </label>
              {errors.name && <p className="text-danger">First Name is required</p>}
            </div>
          </div>
          <div className="col-5 m-2 border border-dark rounded">
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                {...register("lastName", { required: true })}
                className="form-control"
              />
              <label className="form-label" htmlFor="form3Example2">
                Last name
              </label>
              {errors.lastName && <p className="text-danger">Last Name is required</p>}
            </div>
          </div>
        </div>
        <div className="row mb-4 d-flex justify-content-center align-items-center">
          <div className="col-5 m-2 border border-dark rounded ">
            <div data-mdb-input-init className="form-outline">
              <input
                type="email"
                {...register("email", { required: true })}
                className="form-control"
              />
              <label className="form-label" htmlFor="form3Example1">
                Email 📧
              </label>
              {errors.email && <p className="text-danger">Email is required</p>}
            </div>
          </div>
          <div className="col-5 m-2 border border-dark rounded">
            <div data-mdb-input-init className="form-outline">
              <input
                type="password"
                {...register("password", { required: true })}
                className="form-control"
              />
              <label className="form-label" htmlFor="form3Example2">
                Password
              </label>
              {errors.password && <p className="text-danger">Password is required</p>}
            </div>
          </div>
        </div>
        <div className="row mb-4 d-flex justify-content-center align-items-center">
          <div className="col-5 m-2 border border-dark rounded ">
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                {...register("username", { required: true })}
                className="form-control"
              />
              <label className="form-label" htmlFor="form3Example1">
                Username 👨🏻‍💼
              </label>
              {errors.username && <p className="text-danger">username is required</p>}
            </div>
          </div>
          <div className="col-5 m-2 border border-dark rounded">
            <div data-mdb-input-init className="form-outline">
              <input
                type="number"
                {...register("phoneNumber", { required: true })}
                className="form-control"
              />
              <label className="form-label" htmlFor="form3Example2">
                Phone Number 📱
              </label>
              {errors.phoneNumber && <p className="text-danger">Phone Number is required</p>}
            </div>
          </div>
        </div>
        <div className="row mb-4 d-flex justify-content-center align-items-center">
          <div className="col-5 m-2 border border-dark rounded ">
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                id="city"
                {...register("city", { required: true })}
                className="form-control"
              />
              <label className="form-label" htmlFor="form3Example1">
                City
              </label>
              {errors.city && <p className="text-danger">City is required</p>}
            </div>
          </div>
          <div className="col-5 m-2 border border-dark rounded">
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                id="address"
                {...register("address", { required: true })}
                className="form-control"
              />
              <label className="form-label" htmlFor="form3Example2">
                Address 🗺️
              </label>
              {errors.address && <p className="text-danger">Address is required</p>}
            </div>
          </div>
          <div className="col-5 m-2 border border-dark rounded">
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                {...register("imageProfile", { required: false })}
                className="form-control"
                defaultValue="/IMG/default.png"
              />
              <label className="form-label" htmlFor="form3Example2">
                URL Image 🖼️
              </label>
            </div>
          </div>
        </div>
        <button
          data-mdb-ripple-init
          type="submit"
          className="button1"
        >
          Sign Up
        </button>
        <p className="d-flex justify-content-around m-2">Already have an account, So lets: 
        <Link to="/login" className="btn btn-outline-info btn-rounded" data-mdb-ripple-init  data-mdb-ripple-color="dark">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default RefisterForm;
