/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useAuth();
  console.log(user);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="">
        <div className="max-w-6xl px-6 py-10 mx-auto">
          <h1 
          data-aos="fade-up"
          data-aos-duration="1000" 
          data-aos-delay="200"
          className="mt-2 text-2xl font-semibold capitalize lg:text-3xl text-colorPrimary ">
            My Profile
          </h1>
            <div className="divide-x-2 bg-colorPrimary h-1 my-4"></div>
          <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
            <div 
            data-aos="zoom-in"
            data-aos-duration="1000" 
            data-aos-delay="300"
            className="absolute w-full bg-colorPrimary -z-10 md:h-96 rounded-2xl"></div>

            <div className="w-full p-6 bg-colorPrimary md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
              <img
              data-aos="fade-up"
              data-aos-duration="1000" 
              data-aos-delay="500"
                className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                src={user?.photoURL || "https://i.ibb.co/vY5bFQR/2151033973-min.jpg"}
                alt="client photo"
              />

              <div 
              data-aos="zoom-in"
              data-aos-duration="1000" 
              data-aos-delay="700"
              className="mt-2 md:mx-6 space-y-3">
                <div className="space-y-3">
                  <p className="text-xl font-medium tracking-tight text-white">{user?.user?.displayName || "User name not found"}</p>
                  <p className="text-blue-200 ">Email: {user?.user?.email}</p>
                </div>
                <div className="space-y-3">
                  <p>Creation Time: {user?.user?.metadata?.creationTime}</p>
                  <p>Last Login Time: {user?.user?.metadata?.lastSignInTime}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
      
    </div>
  );
};

export default Profile;
