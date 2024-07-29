import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ForgotPassword() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email('Email invalide').required('Email est requis'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const url = `http://localhost:5000/api/password-reset`;
        const { data } = await axios.post(url, { email: values.email });
        setMsg(data.message);
        setError("");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
          setMsg("");
        } else {
          setError("Erreur de serveur, veuillez réessayer plus tard.");
          setMsg("");
        }
      }
    },
  });

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mt-4 mb-3 font-bold">
                <small>Entrer Votre Email</small>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-xs">{formik.errors.email}</div>
                  ) : null}
                </div>
                {error && <div className={styles.error_msg}>{error}</div>}
                {msg && <div className={styles.success_msg}>{msg}</div>}
                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Réinitialiser le mot de passe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-full text-center">
              <Link to="/auth/register" className="text-blueGray-200">
                <small>Créer nouveau compte</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
