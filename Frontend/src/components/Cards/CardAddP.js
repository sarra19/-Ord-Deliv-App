import React from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";

export default function CardAddP() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const validateFileType = (file, allowedTypes) => {
    if (!file) return false;
    return allowedTypes.includes(file.type);
  };
  
  const validationSchema = Yup.object({
    nomProd: Yup.string().required('Nom du produit est requis'),
    image: Yup.mixed().required('Image est requise').test(
      'fileType',
      'Format d\'image invalide. Les formats autorisés sont jpg, jpeg, png.',
      value => validateFileType(value, ['image/jpeg', 'image/png', 'image/jpg'])
    ),
    categorie: Yup.string().required('Catégorie est requise'),
    prix: Yup.number().required('Prix est requis').positive('Le prix doit être un nombre positif'),
    quantite: Yup.number().required('Quantité est requise').integer('La quantité doit être un entier').min(0, 'La quantité ne peut pas être négative'),
    marque: Yup.string().required('Marque est requise'),
    taille: Yup.string(),
    couleur: Yup.string(),
    description: Yup.string(),
    video: Yup.mixed().test(
      'fileType',
      'Format de vidéo invalide. Seul le format mp4 est autorisé.',
      value => validateFileType(value, ['video/mp4'])
    ),
    enStock: Yup.boolean().required('État de stock est requis'),
  });

  const formik = useFormik({
    initialValues: {
      nomProd: '',
      image: null,
      categorie: '',
      prix: '',
      quantite: '',
      marque: '',
      taille: '',
      couleur: '',
      description: '',
      video: null,
      enStock: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

      try {
        const url = 'http://localhost:5000/api/produit/add';
        const { data: res } = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMsg(res.message);
        alert('Produit ajouté avec succès');
        history.push('/admin/maps'); // Redirect to the products page
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
          <h6 className="text-blueGray-700 text-xl font-bold">Ajouter Produit</h6>
          <a
            href="/admin/maps"
            className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          >
            Retour
          </a>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={formik.handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Informations Produit
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="nomProd">
                  Nom du Produit<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nomProd"
                  name="nomProd"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Nom du produit"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nomProd}
                />
                {formik.touched.nomProd && formik.errors.nomProd ? (
                  <div className="text-red-500 text-xs">{formik.errors.nomProd}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="categorie">
                  Catégorie<span className="text-red-500">*</span>
                </label>
                <select
                  id="categorie"
                  name="categorie"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categorie}
                >
                  <option value="" label="Sélectionnez une catégorie" />
                  <option value="Category1" label="Catégorie 1" />
                  <option value="Category2" label="Catégorie 2" />
                  <option value="Category3" label="Catégorie 3" />
                </select>
                {formik.touched.categorie && formik.errors.categorie ? (
                  <div className="text-red-500 text-xs">{formik.errors.categorie}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="prix">
                  Prix<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="prix"
                  name="prix"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Prix"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.prix}
                />
                {formik.touched.prix && formik.errors.prix ? (
                  <div className="text-red-500 text-xs">{formik.errors.prix}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="quantite">
                  Quantité<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="quantite"
                  name="quantite"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Quantité"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.quantite}
                />
                {formik.touched.quantite && formik.errors.quantite ? (
                  <div className="text-red-500 text-xs">{formik.errors.quantite}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="marque">
                  Marque<span className="text-red-500">*</span>
                </label>
                <select
                  id="marque"
                  name="marque"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.marque}
                >
                  <option value="" label="Sélectionnez une marque" />
                  <option value="Brand1" label="Marque 1" />
                  <option value="Brand2" label="Marque 2" />
                  <option value="Brand3" label="Marque 3" />
                </select>
                {formik.touched.marque && formik.errors.marque ? (
                  <div className="text-red-500 text-xs">{formik.errors.marque}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="taille">
                  Taille
                </label>
                <select
                  id="taille"
                  name="taille"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.taille}
                >
                  <option value="" label="Sélectionnez une taille" />
                  <option value="Small" label="Petit" />
                  <option value="Medium" label="Moyen" />
                  <option value="Large" label="Grand" />
                </select>
                {formik.touched.taille && formik.errors.taille ? (
                  <div className="text-red-500 text-xs">{formik.errors.taille}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="couleur">
                  Couleur
                </label>
                <select
                  id="couleur"
                  name="couleur"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.couleur}
                >
                  <option value="" label="Sélectionnez une couleur" />
                  <option value="Red" label="Rouge" />
                  <option value="Blue" label="Bleu" />
                  <option value="Green" label="Vert" />
                </select>
                {formik.touched.couleur && formik.errors.couleur ? (
                  <div className="text-red-500 text-xs">{formik.errors.couleur}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Description du produit"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-red-500 text-xs">{formik.errors.description}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="image">
                  Image<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
                />
                {formik.touched.image && formik.errors.image ? (
                  <div className="text-red-500 text-xs">{formik.errors.image}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="video">
                  Vidéo
                </label>
                <input
                  type="file"
                  id="video"
                  name="video"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={(event) => formik.setFieldValue('video', event.currentTarget.files[0])}
                />
                {formik.touched.video && formik.errors.video ? (
                  <div className="text-red-500 text-xs">{formik.errors.video}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full px-4">
              <div className="relative flex items-center mb-3">
                <input
                  type="checkbox"
                  id="enStock"
                  name="enStock"
                  className="form-checkbox h-4 w-4 text-blueGray-600"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.enStock}
                />
                <label className="ml-2 text-blueGray-600 text-sm font-bold" htmlFor="enStock">
                  En Stock<span className="text-red-500">*</span>
                </label>
                {formik.touched.enStock && formik.errors.enStock ? (
                  <div className="text-red-500 text-xs">{formik.errors.enStock}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Ajouter Produit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}