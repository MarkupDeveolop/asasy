import React from "react";
import { HiChevronLeft } from "react-icons/hi2";

function PrevArrow({ onClick }: any) {
  return (
    <div className="container">
      <div
        className="absolute -left-2 md:-left-4  z-10  top-[40%] "
        onClick={onClick}
      >
        <div className="bg-gray-500/70 text-white hover:bg-gray-300 shadow-2xl  h-[37px]   w-[37px]  rounded-full grid place-items-center cursor-pointer">
          <HiChevronLeft />
        </div>
      </div>
    </div>
  );
}

export default PrevArrow;