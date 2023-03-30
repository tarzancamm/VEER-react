import React, { useContext } from "react";
import AuthContext from "../../store/authContext";
import { GiAirBalloon } from "react-icons/gi";

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  let name = authCtx.firstName;
  let year = authCtx.createdAt;

  return (
    <section className="h-[35rem]">
        <div className="w-10/12 h-[30rem] relative bg-white rounded-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center justify-center gap-4 h-64 border-b border-solid border-pink">
            <GiAirBalloon className="text-6xl" />
            <div className="flex flex-col items-center">
              <p className="text-2xl font-medium">{name}</p>
              <p className="text-sm">Veering into adventures since {year}</p>
            </div>
            <button className="bg-red rounded-3xl text-white text-sm font-semibold w-44 h-9">
              Add My Adventure
            </button>
          </div>
          <div className="h-64">
            <p className="mt-6 ml-6">Badges</p>
          </div>
        </div>
    </section>
  );
};

export default Dashboard;
