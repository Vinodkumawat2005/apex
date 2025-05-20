// About.jsx
import React from "react";

const About = () => {
  return (
    <div className="w-[100%] bg-[white]">
    <div className="max-w-5xl mx-auto px-4 py-12 pt-[100px] bg-[white]">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold">Apex</span> – your go-to destination for quality, affordability, and style.
          Founded in 10 year, we’re dedicated to delivering top-notch products across fashion, electronics, home, and more — all in one place.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">What Makes Us Different</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
          <li>🚚 Fast & reliable shipping</li>
          <li>🔐 Safe & secure checkout process</li>
          <li>🛍️ Curated product collections</li>
          <li>📞 24/7 responsive customer support</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed">
          We aim to be a leading eCommerce platform that blends technology and convenience to offer a seamless shopping experience for everyone, everywhere.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          Have questions? We’d love to hear from you!  
          Reach out via our <a href="/contact" className="text-blue-600 hover:underline">Contact Page </a>  
          or email us at <a href="mailto:support@yourstorename.com" className="text-blue-600 hover:underline">support@yourstorename.com</a>.
        </p>
      </section>
    </div>
    </div>
  );
};

export default About;
