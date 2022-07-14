import MainNavBar from "@components/common/MainNavBar";
import Main from "@screens/Main";
import FeedPage from "@screens/FeedPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import TipPage from "@screens/TipPage";
import DealPage from "@screens/DealPage";
import Join from "@screens/Join/Join";

function RootRouter() {
  return (
    <>
      <MainNavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/tip" element={<TipPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/deal" element={<DealPage />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </>
  );
}

export default RootRouter;
