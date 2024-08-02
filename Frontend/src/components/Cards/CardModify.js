import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getById } from '../../Services/ApiUser'; // Adjust the path as needed

export default function CardModify() {
    const history = useHistory();
    const { id } = useParams(); // Assuming you're passing id in the route
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await getById(id);
                setUserData(data);
                formik.setValues({
                    prenom: data.prenom || '',
                    nom: data.nom || '',
                    email: data.email || '',
                    mdpass: '',
                    role: data.role || 'client',
                    adresse: data.adresse || '',
                    photoProfile: null, // Handle this separately
                    dateNaissance: data.dateNaissance || '',
                    tel: data.tel || '',
                    Genre: data.Genre || '',
                    verified: data.verified || false,
                });
            } catch (error) {
                setError('Erreur lors de la récupération des données utilisateur.');
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);

    const validationSchema = Yup.object({
        prenom: Yup.string()
            .required('Prénom est requis')
            .matches(/^[^\d]*$/, 'Le prénom ne doit pas contenir de chiffres'),
        nom: Yup.string()
            .required('Nom est requis')
            .matches(/^[^\d]*$/, 'Le nom ne doit pas contenir de chiffres'),
        email: Yup.string().email('Email invalide').required('Email est requis'),
        mdpass: Yup.string()
            .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
            .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
            .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
            .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
            .matches(/[@$!%*?&#-]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
        adresse: Yup.string(),
        photoProfile: Yup.mixed(),
        dateNaissance: Yup.string(),
        tel: Yup.string()
            .length(8, 'Le numéro de téléphone doit comporter 8 chiffres')
            .matches(/^\d+$/, 'Le numéro de téléphone doit être un nombre'),
        Genre: Yup.string()
            .oneOf(['Femme', 'Homme', 'Autre'], 'Genre non valide'),
        verified: Yup.boolean(),
    });

    const formik = useFormik({
        initialValues: {
            prenom: '',
            nom: '',
            email: '',
            mdpass: '',
            role: 'client',
            adresse: '',
            photoProfile: null,
            dateNaissance: '',
            tel: '',
            Genre: '',
            verified: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('prenom', values.prenom);
            formData.append('nom', values.nom);
            formData.append('email', values.email);
            formData.append('mdpass', values.mdpass);
            formData.append('role', values.role);
            formData.append('adresse', values.adresse);
            formData.append('photoProfile', values.photoProfile);
            formData.append('dateNaissance', values.dateNaissance);
            formData.append('tel', values.tel);
            formData.append('Genre', values.Genre);
            formData.append('verified', values.verified);

            try {
                const url = `http://localhost:5000/api/user/updateUser/${id}`;
                const { data: res } = await axios.put(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setMsg(res.message);
                alert('Utilisateur modifié avec succès');
                history.push('/admin/tables');
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
    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue("photoProfile", file);
       
    };
    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">Modifier Utilisateur</h6>
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
                        User Information
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
                                    Mot de Passe<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="mdpass"
                                    name="mdpass"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Mot de Passe"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.mdpass}
                                />
                                {formik.touched.mdpass && formik.errors.mdpass ? (
                                    <div className="text-red-500 text-xs">{formik.errors.mdpass}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="role">
                                    Rôle<span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.role}
                                >
                                    <option value="client">Client</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {formik.touched.role && formik.errors.role ? (
                                    <div className="text-red-500 text-xs">{formik.errors.role}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="adresse">
                                    Adresse
                                </label>
                                <input
                                    type="text"
                                    id="adresse"
                                    name="adresse"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Adresse"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.adresse}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="dateNaissance">
                                    Date de Naissance
                                </label>
                                <input
                                    type="date"
                                    id="dateNaissance"
                                    name="dateNaissance"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.dateNaissance}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="tel">
                                    Téléphone
                                </label>
                                <input
                                    type="text"
                                    id="tel"
                                    name="tel"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Téléphone"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.tel}
                                />
                                {formik.touched.tel && formik.errors.tel ? (
                                    <div className="text-red-500 text-xs">{formik.errors.tel}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="Genre">
                                    Genre
                                </label>
                                <select
                                    id="Genre"
                                    name="Genre"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Genre}
                                >
                                    <option value="">Sélectionner</option>
                                    <option value="Femme">Femme</option>
                                    <option value="Homme">Homme</option>
                                    <option value="Autre">Autre</option>
                                </select>
                                {formik.touched.Genre && formik.errors.Genre ? (
                                    <div className="text-red-500 text-xs">{formik.errors.Genre}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="photoProfile">
                                    Photo de Profil
                                </label>
                                <input
                                    type="file"
                                    id="photoProfile"
                                    name="photoProfile"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="photoProfile"
                                    className="flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg py-3 px-6 cursor-pointer bg-white shadow-sm hover:bg-gray-50"
                                >
                                    <span className="text-gray-600">Choisir une photo</span>
                                </label>
                                
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <button
                            type="submit"
                            className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        >
                            Modifier
                        </button>
                    </div>
                    {error && <div className="text-red-500 text-xs text-center mt-4">{error}</div>}
                    {msg && <div className="text-green-500 text-xs text-center mt-4">{msg}</div>}
                </form>
            </div>
        </div>
    );
}