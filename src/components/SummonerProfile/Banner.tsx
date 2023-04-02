import Image from "next/image";

export default function Banner() {
  return <div className="flex flex-col justify-center items-center w-full bg-white shadow-md">
    <div className="flex justify-center items-center w-full">
        <ProfileIcon />
        <ProfileInfo />
    </div>
    <Tabs />
  </div>;
}

function ProfileIcon() {
    return <div className="flex flex-col justify-center items-center w-[150px] h-[200px]">
        <div className="w-[150px] h-[150px] rounded-lg p-2 bg-gray-100">
            <Image src="/summonericon.jpg" alt="summoner icon" width={150} height={150} quality={100} className="rounded-lg" />
        </div>
    </div>
}

function ProfileInfo() {
    return <div className="w-full"></div>
}

function Tabs(){
    return <div></div>
}