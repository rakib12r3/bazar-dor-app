import Image from 'next/image';
import React from 'react';
import BannerImage from '@/assets/bazar-hero.png'

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD",{
    dateStyle:"full"
  })
  return (
    <div className='w-full max-w-6xl mx-auto px-5'>

    <div className='px-5 bg-white rounded-2xl my-6'>

      <div className='flex justify-between'>
      <div className='max-w-[600px]'>
     <p className='mt-3'><span className='bg-green-100 text-[#05893E] px-3 rounded-2xl mt-7'>{date}</span></p>
      <h2 className='text-3xl font-extrabold py-2'>আজকের বাজারের দাম এক নজরে</h2>
      <p className='text-gray-500 py-4'>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
      <button className='bg-[#05893E] px-5 py-2 rounded-[10px] text-white'>সব পণ্য দেখুন</button>
      </div>


      <Image src={BannerImage} alt='BannerImg'/>
      </div>
    </div>
    </div>
  );
};

export default Banner;