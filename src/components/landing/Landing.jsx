import React from "react";
import './landing.css'

const Landing = () => {
  return (
    <div className="">
        <div className="absolute gradiant h-full z-0 w-full top-0"></div>
      <div className="grid grid-cols-2 gap-10 items-center text-center pt-36 z-10 relative">
        <div className="text-center space-y-10">
            <h2 className="text-7xl font-bold">Finance App</h2>
            <p className="text-gray-500 text-xl">Manage your finential growth in a smart way </p>
        </div>

        <div className="flex justify-center items-center">
          <img className="w-[90%] shadow-lg shadow-black rounded-lg"
            src="https://ik.imagekit.io/nyw3wwqix/finance-app/banner%20(1).png?updatedAt=1733130695152"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
