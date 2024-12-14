import React from "react";
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
      <div className="w-full md:w-1/2">
        <h1 className="font-primary md:text-5xl font-medium text-2xl mb-7">
          New releases this week
        </h1>
        <p className="font-secondary mb-7">
          It's time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week's new releases offer something for
          everyone
        </p>
        <button className='btn-primary' >Subscribe</button>
      </div>
      <div className="flex w-full md:w-1/2 md:justify-end">
        <img src={bannerImg} alt="" />
      </div>
    </div>
  );
};

export default Banner;
