import { useState } from "react";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({name : "", email : "", message : ""});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {name, email, message} = formData;

  const handleChangeInput = (e) => {
    const {name , value} = e.target;
    setFormData({...formData, [name] : value})
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name : name,
      email : email,
      message : message
    }

    client.create(contact)
    .then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    })
  }


  return (
    <>
      <h2 className="head-text" style={{color: "#fff"}}>Take a coffe & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:nkachukwuvictor2016@gmail.com" className="p-text">
            Nkachukwuvictor2016@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +2349136376386" className="p-text">
            09136376386
          </a>
        </div>
      </div>

    {!isFormSubmitted ?
      <div className="app__footer-form app__flex">
        <div className="app__flex">
          <input
            type="text"
            className="p-text"
            placeholder="Your name"
            value={name}
            onChange={handleChangeInput }
            name="name"
          />
        </div>
        <div className="app__flex">
          <input
            type="email"
            className="p-text"
            placeholder="Your email"
            value={email}
            onChange={handleChangeInput }
            name="email"
          />
        </div>
        <div>
          <textarea className="p-text" placeholder="Your Message" value={message} name="message" onChange={handleChangeInput }></textarea>
        </div>
        <button className="p-text" type="button" onClick={handleSubmit}>{loading ? "Sending " : "Send Message"}</button>
      </div>
      :
      <div>
        <h3 className="head-text" style={{color: "limegreen", fontSize: "1.8rem"}}>Thank you for getting in touch</h3>
      </div>
    }
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__secondarybg"
);
