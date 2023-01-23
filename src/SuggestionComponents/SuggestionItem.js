import { indexBestRatioUrl } from "../Services";

export default function SuggestItem({data, handleClick}) {
    return (
      <>
        <div
          className="flex flex-col md:rounded-xl border-gray-700 md:border-2 border-b-2  hover:border-4 hover:border-amber-500 duration-100 h-[7rem] md:h-[12rem]  md:p-2 cursor-pointer font-bold text-lg md:text-5xl md:mb-1 p-1"
          style={{
            background: `linear-gradient(to right, black 20%, rgba(0, 0, 0, 0) 80%),url(${
              data.images[indexBestRatioUrl("16_9", data)].url
            })no-repeat 50% 30%`,
          }}
          onClick={() => handleClick(data)}
        >
          <div className=" text-3xl md:text-5xl font-extrabold ">
            {data.name}
          </div>
          <div className="text-xs text-gray-400">
            {data.classifications[0].segment.name}:{" "}
            {data.classifications[0].genre.name}/
            {data.classifications[0].subGenre.name}
          </div>
          <div className="text-xs text-gray-400">
            {data.upcomingEvents._total} upcoming{" "}
            {data.upcomingEvents._total > 1 ? "events" : "event"}
          </div>
        </div>
      </>
    );
  }