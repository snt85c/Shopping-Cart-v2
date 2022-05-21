import bgVideo from "./bkgVideo.mp4";
export default function SuggestionsShowBackgroundVideo() {
    const deviconsScrPath = [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg",
    ];

    const devIcons = deviconsScrPath.map((iconSrcPath) => {
      return <img width="40px" height="40px" src={iconSrcPath} />;
    });

    return (
      <div className="  video p-5 h-1/2 md:w-1/2">
        <video loop autoPlay muted>
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="flex md:fixed flex-col justify-center items-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl duration-300 text-white font-extrabold text-center select-none">
          <span>
            {" "}
            Choose between thousand of events all over the world with
            <span className="text-amber-500"> Ticketmaster API</span>
          </span>
          <div className="text-sm">created with:</div>
          <div className="flex flex-row justify-between mt-4 items-center p-3 md:p-10">
            {devIcons}
          </div>
        </div>
      </div>
    );
  }