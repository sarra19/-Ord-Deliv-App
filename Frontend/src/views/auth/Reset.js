import React from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Reset() {
  const history = useHistory();

  const validationSchema = Yup.object({
    email: Yup.string().email('Email invalide').required('Email est requis'),
    mdpass: Yup.string()
      .required('Mot de passe est requis')
      .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
      .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
      .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
      .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
      .matches(/[@$!%*?&#-]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      mdpass: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const url = 'http://localhost:5000/api/auth';
        const { data: res } = await axios.post(url, values);
        localStorage.setItem("token", res.data);
        history.push('/'); // Redirect to a dashboard or home page upon successful login
        alert('Connexion réussie !');
        console.log(res.message);
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message || 'Erreur lors de la connexion';
          alert(errorMessage);
        } else {
          alert('Erreur de serveur, veuillez réessayer plus tard.');
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
