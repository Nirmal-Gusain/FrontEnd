import React from "react";

const Contact = () => {
  return (
    <div className="bg-purple-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have a question, suggestion, or just want to say hello? We’d love to hear from you.
        </p>
      </section>

      {/* Contact Form + Info Section */}
      <section className="px-6 pb-24 grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Form */}
        <form className="bg-white rounded-2xl shadow-md p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Your message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Info / Image / Map Section */}
        <div className="bg-purple-100 rounded-2xl shadow-md p-8 space-y-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">Contact Information</h2>
          <p className="text-gray-700">
            Dehradun, Uttarakhand, India    
          </p>
          <div className="mt-4">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.0010766794107!2d77.99446557556334!3d30.294030974798833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b0ed7332cd1%3A0xd228ad28305973a9!2sBrillica%20Services!5e0!3m2!1sen!2sin!4v1744315383835!5m2!1sen!2sin" width="100%" height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
