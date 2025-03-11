"use client";

import CheckAuth from '@/utils/checkauth';

export default function Home() {
  return (
    <>
      <CheckAuth />
      <div className="text-center my-3">Loading...</div>
    </>
  );
}