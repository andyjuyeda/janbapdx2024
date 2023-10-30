import stormLogo from "@/assets/storm-logo.png"
import rotoGripLogo from "@/assets/roto-grip-logo.png"
import globalLogo from "@/assets/900_Global_ball_listing_icon.png"

export default function Footer() {
  return (
    <>
      <h1
        id="sponsors"
        className="mt-20 text-center text-2xl font-bold uppercase text-slate-50 xl:text-5xl"
      >
        Sponsors
      </h1>
      <div className="mx-auto flex h-[500px] flex-col gap-10 p-10 lg:h-80 lg:w-3/4 lg:flex-row">
        <div style={{ backgroundImage: `url(${stormLogo})` }} className="flex-1 bg-contain bg-center bg-no-repeat"></div>
        <div style={{ backgroundImage: `url(${rotoGripLogo})` }} className="flex-1 bg-contain bg-center bg-no-repeat"></div>
        <div style={{ backgroundImage: `url(${globalLogo})` }} className="flex-1 bg-contain bg-center bg-no-repeat"></div>
      </div>
      <div className="flex justify-between p-3 text-sm text-slate-50">
        <span>Copyright JANBA 2024</span>
        {/* <a href="/dashboard">Login</a> */}
      </div>
    </>
  );
}
