import { useState, useEffect, useRef } from "react";
import logo from "../images/logo.webp";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import contact_bck from "../images/contact-bck.webp";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Jméno je povinné"),
    email: Yup.string().email("Neplatný email").required("Email je povinný"),
    phone: Yup.string()
      .matches(/^\+?\d{9,15}$/, "Neplatné telefonní číslo")
      .required("Telefon je povinný"),
    message: Yup.string().required("Zpráva je povinná"),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);
  const handleSubmit = async (
    values:
      | string
      | Record<string, string>
      | string[][]
      | URLSearchParams
      | undefined,
    { resetForm }: any
  ) => {
    try {
      const response = await fetch("send_email.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(values),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        resetForm();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Chyba při odesílání e-mailu. Zkuste to prosím znovu.");
    }
  };

  return (
    <section
      id="kontakt"
      ref={formRef}
      className={`py-24 bg-transparent flex items-center justify-center min-h-screen px-3 ${
        isVisible ? "animate-slide-up" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-14 backdrop-blur-xl rounded-2xl py-12">
        <div className="absolute inset-0 bg-[#dbdbd9] opacity-10 pointer-events-none rounded-2xl"></div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
          <div className="flex items-center lg:mb-0 mb-10">
            <div className="w-full">
              <h2
                className="text-[#ff007f] font-manrope text-4xl font-bold leading-10 mb-9 lg:text-left text-center"
                style={{
                  textShadow:
                    "0 0 20px rgba(255, 0, 128, 0.8), 0 0 30px rgba(255, 0, 128, 0.6)",
                  fontFamily: "mexcellent",
                }}
              >
                Ozvěte se nám
              </h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-8">
                      <Field
                        name="name"
                        type="text"
                        className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4"
                        placeholder="Jméno"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-[#FF007F] text-sm mt-1"
                      />
                    </div>
                    <div className="mb-8">
                      <Field
                        name="email"
                        type="email"
                        className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-[#FF007F] text-sm mt-1"
                      />
                    </div>
                    <div className="mb-8">
                      <Field
                        name="phone"
                        type="tel"
                        className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4"
                        placeholder="Telefon"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-[#FF007F] text-sm mt-1"
                      />
                    </div>
                    <div className="mb-8">
                      <Field
                        name="message"
                        as="textarea"
                        className="w-full h-48 shadow-sm resize-none text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-2xl border border-gray-200 focus:outline-none px-4 py-4"
                        placeholder="Zpráva"
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-[#FF007F] text-sm mt-1"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-center text-white text-base font-semibold leading-6 rounded-full bg-[#FF007F] shadow transition-all duration-700 hover:bg-[#C1053F]"
                    >
                      Odeslat!
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div
            className="lg:max-w-xl w-full h-[600px] flex items-center justify-center bg-cover bg-no-repeat my-4 rounded-2xl"
            style={{ backgroundImage: `url(${contact_bck})` }}
          >
            <div className="">
              <div className="lg:w-96 w-auto h-auto bg-white shadow-xl lg:p-6 p-4 rounded-2xl">
                <img src={logo} alt="logo" className="mb-6 mx-auto w-2/5" />
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    // Můžete zde přidat logiku, kterou chcete provést při kliknutí
                  }}
                  className="flex items-center mb-6"
                  aria-label="Telefon"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z"
                      stroke="#111111"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <h5 className="text-black text-base font-normal leading-6 ml-5">
                    +420 777 034 364
                  </h5>
                </a>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    // Můžete zde přidat logiku, kterou chcete provést při kliknutí
                  }}
                  className="flex items-center mb-6"
                  aria-label="Email"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <h5 className="text-black text-base font-normal leading-6 ml-5">
                    neonar@seznam.cz
                  </h5>
                </a>

                <div className="flex items-center justify-center border-t border-gray-100 pt-6">
                  <a
                    href="https://www.facebook.com/petrjiri.brejsa"
                    className="mr-6"
                    aria-label="Facebook"
                  >
                    <svg
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.0683594"
                        width="30"
                        height="30"
                        rx="15"
                        fill="#337FFF"
                      ></rect>
                      <path
                        d="M18.5094 15.937L18.9369 13.2236H16.3038V11.4599C16.3038 10.7179 16.6714 9.99293 17.8469 9.99293H19.0608V7.68231C18.3539 7.56968 17.6396 7.50874 16.9236 7.5C14.7565 7.5 13.3417 8.80158 13.3417 11.1546V13.2236H10.9395V15.937H13.3417V22.5H16.3038V15.937H18.5094Z"
                        fill="white"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/oas_neon/"
                    className="mr-6"
                    aria-label="Instagram"
                  >
                    <svg
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.0683594"
                        width="30"
                        height="30"
                        rx="15"
                        fill="url(#paint0_linear_11773_24443)"
                      ></rect>
                      <path
                        d="M12.2692 14.9998C12.2692 13.4919 13.492 12.2692 15.0008 12.2692C16.5096 12.2692 17.733 13.4919 17.733 14.9998C17.733 16.5077 16.5096 17.7304 15.0008 17.7304C13.492 17.7304 12.2692 16.5077 12.2692 14.9998ZM10.7922 14.9998C10.7922 17.3228 12.6764 19.2059 15.0008 19.2059C17.3252 19.2059 19.2094 17.3228 19.2094 14.9998C19.2094 12.6768 17.3252 10.7937 15.0008 10.7937C12.6764 10.7937 10.7922 12.6768 10.7922 14.9998ZM18.3925 10.6269C18.3924 10.8213 18.45 11.0114 18.558 11.1731C18.666 11.3348 18.8196 11.4608 18.9993 11.5353C19.1789 11.6098 19.3767 11.6293 19.5675 11.5915C19.7583 11.5536 19.9336 11.4601 20.0712 11.3226C20.2088 11.1852 20.3025 11.0101 20.3406 10.8195C20.3786 10.6288 20.3592 10.4312 20.2848 10.2515C20.2104 10.0719 20.0844 9.91833 19.9227 9.81026C19.7611 9.70219 19.5709 9.64446 19.3764 9.64438H19.376C19.1153 9.6445 18.8652 9.74805 18.6808 9.93228C18.4964 10.1165 18.3927 10.3663 18.3925 10.6269ZM11.6896 21.6672C10.8905 21.6308 10.4561 21.4978 10.1675 21.3854C9.78486 21.2366 9.51183 21.0592 9.22477 20.7727C8.93771 20.4862 8.76002 20.2136 8.6117 19.8312C8.49918 19.5429 8.36608 19.1087 8.32975 18.3101C8.29002 17.4467 8.28208 17.1873 8.28208 14.9998C8.28208 12.8124 8.29067 12.5538 8.32975 11.6896C8.36614 10.891 8.50023 10.4577 8.6117 10.1685C8.76067 9.78606 8.9381 9.51319 9.22477 9.22631C9.51143 8.93942 9.7842 8.76183 10.1675 8.6136C10.456 8.50116 10.8905 8.36813 11.6896 8.33183C12.5535 8.29212 12.813 8.28419 15.0008 8.28419C17.1886 8.28419 17.4483 8.29277 18.313 8.33183C19.1121 8.3682 19.5457 8.5022 19.835 8.6136C20.2177 8.76183 20.4907 8.93981 20.7778 9.22631C21.0649 9.5128 21.2419 9.78606 21.3909 10.1685C21.5034 10.4568 21.6365 10.891 21.6728 11.6896C21.7125 12.5538 21.7205 12.8124 21.7205 14.9998C21.7205 17.1873 21.7125 17.4459 21.6728 18.3101C21.6364 19.1087 21.5027 19.5427 21.3909 19.8312C21.2419 20.2136 21.0645 20.4865 20.7778 20.7727C20.4911 21.059 20.2177 21.2366 19.835 21.3854C19.5465 21.4979 19.1121 21.6309 18.313 21.6672C17.4491 21.7069 17.1895 21.7149 15.0008 21.7149C12.812 21.7149 12.5532 21.7069 11.6896 21.6672ZM11.6217 6.8582C10.7492 6.89791 10.153 7.03618 9.63228 7.23866C9.09304 7.44777 8.63655 7.7283 8.18039 8.18347C7.72422 8.63864 7.44425 9.09557 7.23502 9.63449C7.03241 10.1552 6.89406 10.7507 6.85432 11.6227C6.81393 12.4961 6.80469 12.7753 6.80469 14.9998C6.80469 17.2242 6.81393 17.5035 6.85432 18.3768C6.89406 19.2489 7.03241 19.8444 7.23502 20.3651C7.44425 20.9037 7.72429 21.3611 8.18039 21.8161C8.63648 22.2711 9.09304 22.5512 9.63228 22.7609C10.1539 22.9634 10.7492 23.1017 11.6217 23.1414C12.4961 23.1811 12.775 23.191 15.0008 23.191C17.2266 23.191 17.506 23.1817 18.3799 23.1414C19.2525 23.1017 19.8483 22.9634 20.3693 22.7609C20.9082 22.5512 21.365 22.2713 21.8212 21.8161C22.2774 21.3609 22.5567 20.9037 22.7666 20.3651C22.9692 19.8444 23.1082 19.2488 23.1473 18.3768C23.187 17.5028 23.1962 17.2242 23.1962 14.9998C23.1962 12.7753 23.187 12.4961 23.1473 11.6227C23.1075 10.7507 22.9692 10.1549 22.7666 9.63449C22.5567 9.0959 22.2766 8.63936 21.8212 8.18347C21.3658 7.72758 20.9082 7.44777 20.37 7.23866C19.8483 7.03618 19.2524 6.89726 18.3805 6.8582C17.5066 6.81849 17.2272 6.80859 15.0014 6.80859C12.7756 6.80859 12.4961 6.81783 11.6217 6.8582Z"
                        fill="white"
                      ></path>
                      <defs>
                        <linearGradient
                          id="paint0_linear_11773_24443"
                          x1="29.4918"
                          y1="30"
                          x2="-0.50824"
                          y2="-8.07516e-07"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FBE18A"></stop>
                          <stop offset="0.21" stopColor="#FCBB45"></stop>
                          <stop offset="0.38" stopColor="#F75274"></stop>
                          <stop offset="0.52" stopColor="#D53692"></stop>
                          <stop offset="0.74" stopColor="#8F39CE"></stop>
                          <stop offset="1" stopColor="#5B4FE9"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
