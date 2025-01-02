import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import logo from "../images/logo.webp";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = (values: { username: string; password: string }) => {
    const errors: { username?: string; password?: string } = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = (
    values: { username: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const storedUsername = "niger";
    const storedPassword = "niger";

    if (
      values.username === storedUsername &&
      values.password === storedPassword
    ) {
      console.log("Uživatel přihlášen");
      login(); // Zavolá funkci login z AuthContext
      setErrorMessage(null);
      navigate("/upload");
    } else {
      setErrorMessage("Přihlašovací údaje nejsou správné");
    }

    setSubmitting(false);
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <img
        //src="https://pagedone.io/asset/uploads/1702362010.png"
        alt="Gradient background image"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="relative max-w-md w-full p-6 lg:p-8 bg-gray-800 rounded-3xl shadow-lg">
        <img
          src={logo}
          alt="OAS-NEON logo"
          className="w-24 h-24 mx-auto mb-8 object-contain"
        />
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white neon-text mb-4">
                  Vítejte zpět
                </h1>
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Uživatelské jméno"
                    className="w-full h-12 px-4 text-lg text-gray-200 rounded-full bg-gray-700 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Heslo"
                    className="w-full h-12 px-4 text-lg text-gray-200 rounded-full bg-gray-700 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition-all"
              >
                Přihlásit se
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default LoginPage;
