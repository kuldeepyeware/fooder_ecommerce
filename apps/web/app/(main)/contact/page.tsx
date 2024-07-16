import React from "react";
import ContactHeroSection from "../../../components/Contact/ContactHeroSection";
import ContactMainSection from "../../../components/Contact/ContactMainSection";

const ContactRootPage = () => {
  return (
    <div className='pt-20'>
      <ContactHeroSection />
      <ContactMainSection />
    </div>
  );
};

export default ContactRootPage;
