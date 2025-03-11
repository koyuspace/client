"use client";

import CheckAuth from '@/utils/checkauth';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <CheckAuth />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center">Hello, world!</h1>
        <Image src="/img/pb-icon.svg" alt="Logo" width={300} height={300} />
      </div>
    </>
  );
}