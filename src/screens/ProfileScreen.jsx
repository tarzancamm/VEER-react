import React, { useState } from "react";
import Header from "../components/PermanentLayout/Header";
import Dashboard from "../components/Profile/Dashboard";
import Footer from "../components/PermanentLayout/Footer";

const ProfileScreen = ({ openModal, openAdventureModal }) => {
    const [collectionsOn, setCollectionsOn] = useState(true)
    const [myAdventuresOn, setMyAdventuresOn] = useState(false)

    const collectionsOffHandler = () => {
        setCollectionsOn(false);
        setMyAdventuresOn(true)
    }

    const collectionsOnHandler = () => {
        setCollectionsOn(true)
        setMyAdventuresOn(false)
    }


  return (
    <div className="relative min-h-full min-w-screen">
      <Header openModal={openModal} />
      <main className="bg-tan relative top-20">
        <Dashboard openAdventureModal={openAdventureModal} />
        <div className="h-[20rem] mt-4">
            <div className="flex flex-row justify-start gap-6 border-b-2 border-solid border-red pb-2 mx-8">
                <button onClick={collectionsOnHandler} className={collectionsOn ? "font-medium" : "font-normal"}>Collections</button>
                <button onClick={collectionsOffHandler} className={myAdventuresOn ? "font-medium" : "font-normal"}>My Adventures</button>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileScreen;
