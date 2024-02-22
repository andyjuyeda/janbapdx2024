import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import parkLanesImg from "@/assets/img/parklanes.jpeg";
import jerseyPink from "@/assets/img/janba_2024pinksleeve_front_opt.webp";
import jerseyGray from "@/assets/img/janba_2024graysleeve_front_opt.webp";
import rulesForm from "@/assets/doc/2024 JANBA Tournament Rules.pdf";
import entertainmentSchedule from "@/assets/doc/Live Entertainment Bar Digital Signage JANBA Resize-min.pdf";
import foodMenu from "@/assets/doc/JANBA Menu 2024-min.pdf";
import proShopSpecials from "@/assets/doc/JANBA Pro Shop Specials 2024-min.pdf";
import monteCarloForm from "@/assets/doc/CV LH Monte Carlo Flyer-min.pdf";
import proAmForm from "@/assets/doc/CV LH Pro Am Flyer-min.pdf";
import matchmakerForm from "@/assets/doc/MatchMaker JANBA-min.pdf";

import { Button } from "./components/ui/button";

import stormLogo from "@/assets/img/storm-logo.png";
import rotoGripLogo from "@/assets/img/roto-grip-logo.png";
import globalLogo from "@/assets/img/900_Global_ball_listing_icon.png";

function detectDevice() {
  const userAgent = navigator.userAgent || navigator.vendor;

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  } else if (/android/i.test(userAgent)) {
    return "Android";
  } else {
    return "Other";
  }
}

function MapsCard() {
  const device = detectDevice();
  return (
    <Card className="col-start-1 col-end-4 flex flex-col md:row-span-3 lg:col-span-4">
      <CardHeader className="">
        <CardTitle className="text-xl md:text-2xl">
          Park Lanes Family Entertainment Center
        </CardTitle>
        <CardDescription>Hillsboro, OR</CardDescription>
      </CardHeader>
      <CardContent
        style={{ backgroundImage: `url(${parkLanesImg})` }}
        className="mx-5 mb-5 hidden flex-1 rounded-md bg-cover md:block"
      ></CardContent>
      <CardFooter className="">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#F9A4BB"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <a
              href={
                device == "iOS"
                  ? "http://maps.apple.com/?q=6360+SE+Alexander+St,Hillsboro,OR+97123"
                  : "https://goo.gl/maps/2oxLG6NxqQtKxGDm8"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              6360 SE Alexander St, Hillsboro, OR 97123
            </a>
          </div>
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#F9A4BB"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clipRule="evenodd"
              />
            </svg>
            <a href="tel:+15036422161">(503) 642-2161</a>
          </div>
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#F9A4BB"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z"
                clipRule="evenodd"
              />
            </svg>
            <a className="hover:underline" href="https://www.parklanes.net/">
              parklanes.net
            </a>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function FAQ() {
  return (
    <div className="bg-transparent col-start-5 col-end-9 row-span-4 row-start-3 rounded-lg p-2 md:px-5">
      <h1 className="m-5 text-center text-lg font-bold text-primary">
        Frequently Asked Questions
      </h1>
      <Accordion type="single" collapsible className="">
        <AccordionItem value="average" className="">
          <AccordionTrigger className="bg-transparent text-white">
            How is my average determined?
          </AccordionTrigger>
          <AccordionContent className="bg-transparent text-white">
            <p>
              Highest USBC standard composite or sport composite average of
              2021-2022 or 2022-2023 season (min. 21 games).
            </p>
            <br />
            <p>
              If none, then JANBA tournament average from 2017-2023 (min. 15
              games). Hardship cases may be submitted to the JANBA tournament
              manager and the JANBA Board average committee.
            </p>
            <br />
            <p>
              For more information, see{" "}
              <a
                href={rulesForm}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                Tournament Rules
              </a>
              .
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="check-in" className="">
          <AccordionTrigger className="bg-transparent text-white">
            How early should I check in?
          </AccordionTrigger>
          <AccordionContent className="bg-transparent text-white">
            <p>
              Bowlers must report 15 minutes before their squad time. Tardy
              bowlers will begin from the frame in progress on their assigned
              lanes.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function HotelInfo() {
  return (
    <div className="col-start-5 col-end-9 row-span-2 row-start-1 grid grid-cols-1 grid-rows-[1fr_1fr_3fr] items-center rounded-lg bg-primary">
      <h1 className="row-start-1 m-3 text-center text-lg font-bold text-dark-blue">
        Hotel Information
      </h1>
      <p className="row-start-2 px-5">
        The following Hillsboro hotels have provided discounted rates for JANBA
        bowlers.
      </p>
      <div className="row-start-3 mx-auto mb-4 flex flex-col gap-3">
        <a
          href="https://www.staybridge.com/redirect?path=asearch&brandCode=SB&localeCode=en&regionCode=1&hotelCode=PDXHS&checkInDate=03&checkInMonthYear=022024&checkOutDate=09&checkOutMonthYear=022024&rateCode=6CBARC&_PMID=99801505&GPC=JGB&cn=no&viewfullsite=true"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <Button
            variant="secondary"
            className="flex w-[250px] items-center gap-3"
          >
            <span>Staybridge Suites</span>
          </Button>
        </a>
        <a
          href="https://www.marriott.com/events/start.mi?id=1705090769176&key=GRP"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <Button
            variant="secondary"
            className="flex w-[250px] items-center gap-3"
          >
            <span>Courtyard</span>
          </Button>
        </a>
        <a
          href="https://www.holidayinn.com/redirect?path=hd&brandCode=HI&localeCode=en&regionCode=1&hotelCode=HIOHO&_PMID=99801505&GPC=JAN&cn=no&viewfullsite=true"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <Button
            variant="secondary"
            className="flex w-[250px] items-center gap-3"
          >
            <span>Holiday Inn</span>
          </Button>
        </a>
      </div>
    </div>
  );
}

function JerseyInfo() {
  return (
    <div className="col-start-10 items-center rounded-lg md:row-span-3 lg:col-span-4">
      <Card className="h-full border-none shadow-none">
        <CardHeader className="">
          <CardTitle className="">Janba 2024 Jersey</CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <div>
            <img src={jerseyPink}></img>
          </div>
          <div>
            <img src={jerseyGray}></img>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="mb-8">
            <p>
              H5G is the official jersey provider for JANBA. The links below
              will take you to the H5G website where you can purchase your own
              JANBA 2024 jersey!
            </p>
          </div>
          <div className="flex gap-5">
            <a
              href="https://h5gbrands.com/janba-2024-pink.html"
              target="_blank"
              rel="noopener roreferrer"
            >
              <Button className="w-28 font-bold">Pink</Button>
            </a>
            <a
              href="https://h5gbrands.com/janba-2024-grey.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-28 bg-slate-600 font-bold text-slate-50 hover:bg-slate-700">
                Grey
              </Button>
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function SponsorInfo() {
  return (
    <div className="col-start-10 row-start-4 items-center rounded-lg md:row-span-2 lg:col-span-4">
      <Card className="min-h-full">
        <CardHeader>
          <CardTitle>Tournament Sponsors</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="mx-auto flex items-center gap-3 lg:flex-row">
            <div className="flex-1">
              <img
                src={stormLogo}
                alt="Storm Logo"
                className="h-auto max-w-full"
              />
            </div>
            <div className="flex-1">
              <img
                src={rotoGripLogo}
                alt="Roto Grip Logo"
                className="h-auto max-w-full"
              />
            </div>
            <div className="flex-1">
              <img
                src={globalLogo}
                alt="Global Logo"
                className="h-auto max-w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ParkLanesSpecials() {
  return (
    <div className="col-span-4 col-start-1 row-span-2 row-start-4">
      <Card className="min-h-full bg-primary">
        <CardHeader>
          <CardTitle>Park Lanes Specials</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            During the week of JANBA, Park Lanes will have deals in the pro
            shop, some special food options, as well as nightly entertainment in
            the bar area! There will also be a night of Monte Carlo as well as a Pro-Am with Chris Via and Leanne Hulsenburg!
          </p>
        </CardContent>
        <CardFooter>
          <div className="mx-auto flex flex-col items-center gap-2">
            <a href={proShopSpecials} target="_blank" rel="noopener noreferrer">
              <Button variant={"secondary"} className="w-[250px]">
                Pro Shop Specials
              </Button>
            </a>
            <a href={foodMenu} target="_blank" rel="noopener noreferrer">
              <Button variant={"secondary"} className="w-[250px]">
                Food Specials
              </Button>
            </a>
            <a
              href={entertainmentSchedule}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant={"secondary"} className="w-[250px]">
                Entertainment Schedule
              </Button>
            </a>
            <a
              href={monteCarloForm}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant={"secondary"} className="w-[250px]">
                Monte Carlo
              </Button>
            </a>
            <a
              href={proAmForm}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant={"secondary"} className="w-[250px]">
                Pro-Am
              </Button>
            </a>
            <a
              href={matchmakerForm}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant={"secondary"} className="w-[250px]">
                Storm Matchmaker
              </Button>
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function Information() {
  return (
    <div className="min-h-screen">
      <h1
        id="information"
        className="my-10 text-center text-2xl font-bold uppercase text-slate-50 xl:text-5xl"
      >
        Event Information
      </h1>
      <div className="md:min-h-3/4 flex h-full grid-cols-12 grid-rows-6 flex-col gap-5 md:grid">
        <MapsCard />
        <ParkLanesSpecials />
        <FAQ />
        <HotelInfo />
        <JerseyInfo />
        <SponsorInfo />
      </div>
    </div>
  );
}
