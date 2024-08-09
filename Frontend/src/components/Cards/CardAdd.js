import React from "react";
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';

export default function CardAdd() {
  const [capVal, setCapVal] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

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
  });

  const formik = useFormik({
    initialValues: {
      prenom: '',
      nom: '',
      email: '',
      mdpass: '',
      role: 'client',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const url = 'http://localhost:5000/api/user';
        const { data: res } = await axios.post(url, values);
        setMsg(res.message);
        alert('Utilisateur ajouté avec succès');
        window.location.href = 'http://localhost:3000/admin/tables';
      } catch (error) {
        if (error.response) {
          if (error.response.status >= 400 && error.response.status < 500) {
            setError(error.response.data.message || 'Vérifier vos champs');
          }
        } else {
          setError('Erreur de serveur, veuillez réessayer plus tard.');
        }
      }
    },
  });

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Ajouter utilisateur</h6>
          <a
            href="/admin/tables"
            className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          >
            Retour
          </a>

        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={formik.handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Produit Information
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="prenom">
                  Prénom<span className="text-red-500">*</span>
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
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="nom">
                  Nom<span className="text-red-500">*</span>
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
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                  Email<span className="text-red-500">*</span>
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
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="mdpass">
                  Mot de passe<span className="text-red-500">*</span>
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
            </div>
          </div>

          <ReCAPTCHA
            sitekey="6LemURcqAAAAANcfK7SEk_yhng-UMazJZh3Y7iE3"
            onChange={val => setCapVal(val)}
          />
          {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
          {msg && <div className="text-green-500 text-xs mt-2">{msg}</div>}
          <div className="text-center mt-6">
            <button
              disabled={!capVal}
              className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Créer compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}