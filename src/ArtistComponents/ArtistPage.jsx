import { lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import ShowArtistMetadata from "./ShowArtistMetadata";
import {
  convertDate,
  indexBestRatioUrl,
  FetchEventsInTicketmasterAPI,
  FetchArtistMetadataFromLastFM,
  FetchTopTracksFromLastFM,
  Spinner,
} from "../Services";
import { setVenue } from "../redux/slice";
import { useDispatch } from "react-redux";
import BackArrowOverlay from "../NavbarComponents/BackArrowOverlay";
import {
  BsSpotify,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { setArtist } from "../redux/slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ArtistPage({ onScreen }) {
  const dispatch = useDispatch();
  const eventData = useSelector((state) => state.reducer.events);
  const metadata = useSelector((state) => state.reducer.artistMetadata);
  const topTracks = useSelector((state) => state.reducer.artistTopTracks);
  const ShowArtistMetadata = lazy(() => import("./ShowArtistMetadata"));
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  const navigate = useNavigate();
  let params = useParams();
  let data = onScreen;

  //this bit allows for the Artist page to be rendered in case of hot reload, as it will save it on localStorage everytime i come here, and will extract it if onScreen is missing (a.k.a there is no global state for it)
  if (onScreen.id) {
    localStorage.setItem("ArtistPage", JSON.stringify(onScreen));
    console.log(JSON.parse(localStorage.getItem("ArtistPage")));
  } else {
    data = JSON.parse(localStorage.getItem("ArtistPage"));
    dispatch(setArtist(data));
  }

  FetchEventsInTicketmasterAPI(data.id);
  FetchArtistMetadataFromLastFM(data);
  FetchTopTracksFromLastFM(data);

  function Breadcrumbs() {
    return (
      <>
        <div className="text-sm breadcrumbs pl-2  ">
          <ul>
            <li>
              <a
                className="select-none cursor-pointer"
                onClick={() => navigate("/")}
              >
                Attractions
              </a>
            </li>
            <li className="select-none ">Events</li>
          </ul>
        </div>
      </>
    );
  }

  function EventList() {
    function EventItem({ data }) {
      return (
        <div
          className="border-2 rounded border-gray-600 mb-1 pl-1 py-2 hover:border-amber-500 duration-200 "
          onClick={() => {
            navigate(`/${params.second}/${data.id}`);
            dispatch(setVenue(data));
          }}
        >
          <div className="flex flex-col text-sm flex-wrap my-0.5">
            <div className="text-white">
              {convertDate(data.dates.start.localDate)}
            </div>
            <div className="flex flex-row pt-1 text-xs text-gray-400">
              {data._embedded.venues[0].name} {" - "}
              <div className="text-white ">
                {data._embedded.venues[0].city.name}
              </div>
              {" - "}
              {data._embedded.venues[0].country.countryCode}
            </div>
          </div>
        </div>
      );
    }

    const options = eventData.map((item, i) => (
      <EventItem data={item} key={i} />
    ));

    return (
      <div className="md:h-[300px] flex flex-col px-5 md:w-1/2 md:overflow-auto bg-black md:bg-opacity-0 cursor-pointer ">
        {options}
      </div>
    );
  }

  function AttractionShow() {
    return (
      <div className="flex flex-col h-100 text-sm font-bold  text-white ">
        <div className=" ml-5 mt-2 text-4xl md:text-6xl">{data.name}</div>
        <div className="ml-5 text-lg">
          {data.classifications[0].genre.name}/
          {data.classifications[0].subGenre.name}
        </div>
        <div className="m-2 ml-5 text-sm ">
          {data.upcomingEvents._total}{" "}
          {data.upcomingEvents._total > 1 ? "events" : "event"}
        </div>
        <div className="flex flex-col md:flex-row-reverse ">
          <Suspense
            fallback={
              <div className="flex flex-col justify-center items-center md:w-1/2">
                <Spinner />
              </div>
            }
          >
            <ShowArtistMetadata metadata={metadata} topTracks={topTracks} />
          </Suspense>
          {data._embedded ? (
            <EventList />
          ) : (
            <div className=" mx-4 m-2">
              {" "}
              an error occurred within ticketmaster API provider, no events could be
              loaded
            </div>
          )}
        </div>
        <AttractionShowSocialsIcons />
      </div>
    );
  }

  function AttractionShowSocialsIcons() {
    const icons = [
      AiOutlineHome,
      BsSpotify,
      BsInstagram,
      BsFacebook,
      BsTwitter,
      BsYoutube,
    ];
    const dataExternaLinksNames = [
      "homepage",
      "spotify",
      "instagram",
      "facebook",
      "twitter",
      "youtube",
    ];

    const result = dataExternaLinksNames.map((name, i) => {
      if (data.externalLinks && data.externalLinks[name]) {
        let IconType = icons[i];
        return (
          <div key={i} className="h-0">
            <a href={data.externalLinks[name][0].url} style={{ padding: "1%" }}>
              <IconType className="text-white h-12 w-12 object-contain pl-2 hover:text-amber-500 duration-100 " />
            </a>
          </div>
        );
      }
    });
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row pt-2 ">{result}</div>
        <span>external links</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between dark:bg-gray-800 bg-gray-400">
        <Breadcrumbs />
        <BackArrowOverlay />
      </div>
      <div
        className="fadeInAnimation h-[85vh]"
        style={{
          background: `linear-gradient(to right, black 20%, rgba(0, 0, 0, 0), black),linear-gradient(to bottom, black 5%, rgba(0, 0, 0, 0), black), url(${
            data.images[indexBestRatioUrl("16_9", data)].url
          }) no-repeat 50% 30%`,
        }}
      >
        <AttractionShow />
      </div>
    </div>
  );
}
