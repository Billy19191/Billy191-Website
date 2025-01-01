export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen gap-y-6">
        <div className="font-semibold text-6xl">What&apos;s up!</div>
        <div>Welcome to Billy&apos;s world :&#41;</div>
        <div className="flex gap-x-6">
          <a
            className="rounded-full bg-black text-white px-5 py-2 mt-4 hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-105"
            href="/wealth"
          >
            Wealth &gt;
          </a>
          <a
            className="rounded-full bg-black text-white px-5 py-2 mt-4 hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-105"
            href="https://resume.billy191.live"
          >
            Resume &gt;
          </a>
        </div>
      </div>
    </>
  )
}
