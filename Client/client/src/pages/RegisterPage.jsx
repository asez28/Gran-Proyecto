import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

function RefisterForm() {
  const { register, handleSubmit } = useForm();

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
    const res = await registerRequest(values);
    console.log(res);
  });

  return (
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
          className="btn btn-primary btn-block mb-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RefisterForm;
