import Link from "next/link";

export default function Home() {
     return (
          <div className="w-full h-screen flex flex-col justify-center items-center gap-10 md:gap-20">
               <img src="/logo.svg" className="h-8 md:h-16" />
               <Link
                    href="/api/auth/login"
                    className="rounded-xl bg-blue-500 py-5 px-16 font-semibold text-lg text-white"
               >
                    Login
               </Link>
          </div>
     );
}
