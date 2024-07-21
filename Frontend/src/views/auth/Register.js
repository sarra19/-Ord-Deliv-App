import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Register() {
  const history = useHistory();

  const validationSchema = Yup.object({
    prenom: Yup.string()
      .required('Prénom est requis')
      .matches(/^[^\d]*$/, 'Le prénom ne doit pas contenir de chiffres'),
    nom: Yup.string()
      .required('Nom est requis')
      .matches(/^[^\d]*$/, 'Le nom ne doit pas contenir de chiffres'),
    email: Yup.string().email('Email invalide').required('Email est requis'),
    mdpass: Yup.string()
      .required('Mot de passe est requis')
      .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
      .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
      .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
      .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
      .matches(/[@$!%*?&#-]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
    role: Yup.string().oneOf(['client', 'admin', 'livreur'], 'Le rôle est requis').required('Rôle est requis'),
  });

  const formik = useFormik({
    initialValues: {
      prenom: '',
      nom: '',
      email: '',
      mdpass: '',
      role: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const url = 'http://localhost:5000/api/user';
        const { data: res } = await axios.post(url, values);
        history.push('/auth/login');
        alert('Inscription réussie !');
        console.log(res.message);
      } catch (error) {
        if (error.response) {
          if (error.response.status >= 400 && error.response.status < 500) {
            if (error.response.data.message) {
              alert(error.response.data.message);
            } else {
              alert('Vérifier vos champs');
            }
          }
        } else {
          alert('Erreur de serveur, veuillez réessayer plus tard.');
        }
      }
    },
  });

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">Inscrivez-vous avec</h6>
              </div>
              <div className="btn-wrapper text-center">
                <button
                  className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                >
                  <img
                    alt="Github"
                    className="w-5 mr-1"
                    src={require('assets/img/github.svg').default}
                  />
                  Github
                </button>
                <button
                  className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                >
                  <img
                    alt="Google"
                    className="w-5 mr-1"
                    src={require('assets/img/google.svg').default}
                  />
                  Google
                </button>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>Ou inscrivez-vous avec vos identifiants</small>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="prenom">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Prénom"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.prenom}
                  />
                  {formik.touched.prenom && formik.errors.prenom ? (
                    <div className="text-red-500 text-xs">{formik.errors.prenom}</div>
                  ) : null}
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="nom">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Nom"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nom}
                  />
                  {formik.touched.nom && formik.errors.nom ? (
                    <div className="text-red-500 text-xs">{formik.errors.nom}</div>
                  ) : null}
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
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
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="mdpass">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="mdpass"
                    name="mdpass"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Mot de passe"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mdpass}
                  />
                  {formik.touched.mdpass && formik.errors.mdpass ? (
                    <div className="text-red-500 text-xs">{formik.errors.mdpass}</div>
                  ) : null}
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="role">
                    Rôle
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                  >
                    <option value="" label="Choisir un rôle" />
                    <option value="client" label="Client" />
                    <option value="admin" label="Admin" />
                    <option value="livreur" label="Livreur" />
                  </select>
                  {formik.touched.role && formik.errors.role ? (
                    <div className="text-red-500 text-xs">{formik.errors.role}</div>
                  ) : null}
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Créer compte
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
