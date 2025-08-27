import React from "react";
import Container from "@mui/material/Container";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";

export default function Company() {
  const companyData = {
    name: "Your Company Name",
    about:
      "We are a leading company providing high-quality services and products. Our mission is to deliver excellence and build long-term trust with our customers.",
    mission:
      "To innovate and provide top-notch solutions that make life easier and businesses more successful.",
    vision:
      "To be recognized globally as a trusted brand known for quality, innovation, and customer satisfaction.",
    contact: {
      email: "info@yourcompany.com",
      phone: "+91 98765 43210",
      address: "123 Business Street, City, Country - 000000",
    },
  };

  return (
    <div className="custom-gradient">
      {/* Hamburger Menu */}
      <HamburgerMenu />
      {/* // Hamburger Menu */}

      <section id="company" className="py-24">
        <Container>
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-white">Company Information</h3>
          </div>

          <div className="text-white space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">About Us</h4>
              <p>{companyData.about}</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">Our Mission</h4>
              <p>{companyData.mission}</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">Our Vision</h4>
              <p>{companyData.vision}</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">Contact Information</h4>
              <p>Email: {companyData.contact.email}</p>
              <p>Phone: {companyData.contact.phone}</p>
              <p>Address: {companyData.contact.address}</p>
            </div>
          </div>
        </Container>
      </section>

      <HomeFooter />
    </div>
  );
}
