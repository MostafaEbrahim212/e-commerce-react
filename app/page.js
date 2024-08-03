import Link from "next/link"
import Navbar from "./components/Navbar"

function Page() {
  return (
    <>
      <section className="py-3 h-[calc(100vh-60px)]">
        <div className="container flex items-center justify-center h-full">
          <div className="flex flex-col space-y-4 text-center">
            <h1 className="text-5xl font-bold text-indigo-600">Welcome to our Store App </h1>
            <p className="text-slate-500 text-2xl">Our store is the best store in the world </p>
            <button className="text-indigo-600 p-4 rounded-lg bg-transparent border-2 border-indigo-600  hover:text-white hover:bg-indigo-600 w-[fit-content] mx-auto text-xl font-bold">
              <Link className="w-full h-full block" href='/products'>Shop Now</Link>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
