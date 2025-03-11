"use client";
 
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

export default function CheckAuth() {
    const router = useRouter();
    useEffect(() => {
        const isAuthed = localStorage.getItem("token") ? true : false;
        if (!isAuthed) {
            router.replace("/login");
        }
    }, [router]);
    return("");
}