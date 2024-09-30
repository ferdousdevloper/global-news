import React from "react";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const user = useAuth();
  console.log(user);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-neutral-900 text-gray-100 glass shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 ">
          User Profile
        </h1>
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/vY5bFQR/2151033973-min.jpg"}
            alt="User Avatar"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-indigo-500 mb-6 shadow-md"
          />
          <div className="text-center space-y-3">
            <p className="text-lg md:text-2xl font-semibold ">
              {user?.user?.displayName || "User name not found"}
            </p>
            <p className="text-sm md:text-base ">
              {user?.user?.email || "Email not found"}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
