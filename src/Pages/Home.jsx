import React from 'react'

const Home = () => {
  return (
    <>
     <header className="text-center py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
          Discover Stories That Matter
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Dive into inspiring blogs, helpful tips, and powerful ideas. Share your voice with the world.
        </p>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-full shadow hover:bg-purple-700 transition">
          Start Reading
        </button>
      </header>
      <section className="px-6 py-12">
        <h3 className="text-2xl font-semibold text-center text-purple-700 mb-10">Featured Blogs</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-bold mb-2 text-purple-800">Blog Title {item}</h4>
              <p className="text-gray-600 mb-4">This is a short preview of the blog post. It draws attention and invites users to read more.</p>
              <button className="text-purple-600 font-semibold hover:underline">Read More →</button>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home