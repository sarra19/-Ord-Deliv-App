import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../../assets/img/success.png";
import styles from "./styles.module.css";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(null); // Initialize as null for better control
  const { id, token } = useParams(); // Destructure useParams directly

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/api/user/${id}/verify/${token}`;
        const { data } = await axios.get(url);

        // Log the data to see if the response is as expected
        console.log('Response data:', data);

        // Assume that a successful response means the URL is valid
        setValidUrl(true);
      } catch (error) {
        // Log error to understand what went wrong
        console.error('Verification error:', error);
        setValidUrl(false);
      }
    };

    verifyEmailUrl();
  }, [id, token]); // Use id and token as dependencies

  if (validUrl === null) {
    // Optionally, show a loading state while verification is in progress
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {validUrl ? (
        <>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>Email verified successfully</h1>
          <Link to="/auth/login">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
};

export default EmailVerify;
