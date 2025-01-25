import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="absolute gradiant h-full z-0 w-full top-0"></div>
      <section className="bg-blue-600 text-white py-20 px-10 z-10 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Welcome to FinanceApp
          </h1>
          <p className="mt-4 text-xl sm:text-2xl">
            Manage your finances, track expenses, and save smarter.
          </p>
        </div>
      </section>

      <section className="py-16 px-10 bg-white z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                Who We Are
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                FinanceApp is tool that helps you manage your income, expenses, savings, and investments.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                Our Mission
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Finance App
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 FinanceApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
