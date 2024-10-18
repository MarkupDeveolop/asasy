"use client"
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { LottieHandler } from "../../Feedback/LottiHandler/LottiHandler";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useLocale } from "next-intl";

type SliderListProps<T> = {
  records?: T[];
  renderItem: (itemData: T) => React.ReactNode;
  emptyMessage: string;
};

type HasId = { id: number };

const NewListTwo = <T extends HasId>({
  records = [],
  renderItem,
  emptyMessage,
}: SliderListProps<T>): JSX.Element => {
  const [init, setInit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const locale = useLocale();


  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (init) {
      setInit(false);
    }
  }, [init]);

  const handleSlideChange = (swiper: any) => {
    setIsAtBeginning(swiper.isBeginning);
    setIsAtEnd(swiper.isEnd);
  };

  return (
    <div
      className={`relative ${
        locale === "ar" ? "__rtl_lang" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={10}
        dir={
          locale === "ar" ? "__rtl_lang" : ""
        }
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 0,
          },

          500: {
            slidesPerView: 2,
            spaceBetween: 0,
          },

          600: {
            slidesPerView: 3,
            spaceBetween: 0,
          },

         
          
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={() => setInit(true)}
        onSlideChange={handleSlideChange}
      >
        {records.length > 0 ? (
          records.map((itemData) => (
            <SwiperSlide key={itemData.id}>{renderItem(itemData)}</SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div>
              <LottieHandler type="empty" message={emptyMessage} />
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      <div
        className={` md:block w-full absolute top-[40%] z-10 px-4  ${
          isHovered
            ? "opacity-100 transition-opacity duration-300 ease-in-out"
            : "opacity-70 transition-opacity duration-300 ease-in-out"
        }`}
      >
        <div
          ref={prevRef}
          className={`p-2  lg:p-3 rounded-full  ${
            isAtBeginning ? "bg-black/70 text-white" : "bg-primary text-white"
          } cursor-pointer shadow-sm absolute -left-1 lg:-left-4`}
        >
          <HiChevronLeft />
        </div>
        <div
          ref={nextRef}
          className={`p-2 lg:p-3 rounded-full ${
            isAtEnd ? "bg-black/70 text-white" : "bg-primary text-white"
          } cursor-pointer shadow-sm absolute -right-2 lg:-right-4`}
        >
          <HiChevronRight />
        </div>
      </div>
    </div>
  );
};

export default NewListTwo;