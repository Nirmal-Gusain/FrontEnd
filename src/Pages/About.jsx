import React from "react";

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero / Intro Section */}
      <section className="py-20 px-6 text-center bg-purple-50">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We’re passionate about sharing knowledge, stories, and ideas that matter. Whether you’re here to learn, grow, or connect — you’re in the right place.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="about.jpeg"
            alt="Our Mission"
            className="rounded-2xl shadow-md w-full h-72 object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At the heart of everything we do is the goal of creating meaningful content that informs, inspires, and empowers. We believe in the power of stories, and our platform is a space where ideas come alive.
          </p>
          <p className="text-gray-700">
            Whether it’s tech tutorials, personal blogs, or industry insights — we strive to deliver quality and authenticity in every post.
          </p>
        </div>
      </section>

      {/* What We Offer / Values Section */}
      <section className="py-16 px-6 bg-purple-50">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">What We Stand For</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">Creativity</h3>
            <p className="text-gray-600">
              We encourage bold ideas and unique voices. Everyone has a story to tell — and we give it a stage.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">Clarity</h3>
            <p className="text-gray-600">
              Clear, well-crafted content helps people understand complex ideas simply and quickly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">Community</h3>
            <p className="text-gray-600">
              Our readers, writers, and developers form a growing community that supports and uplifts each other.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
