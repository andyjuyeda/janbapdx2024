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
import rulesForm from "@/assets/doc/2024 JANBA Tournament Rules.pdf";

import { Button } from "./components/ui/button";

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
    <Card className="col-start-1 col-end-4 flex flex-col md:row-span-6 lg:col-span-4">
      <CardHeader className="">
        <CardTitle className="text-xl md:text-2xl">Park Lanes Family Entertainment Center</CardTitle>
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
    <div className="bg-transparent col-start-5 col-end-12 row-span-4 row-start-1 rounded-lg p-2 md:px-5">
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
              If none of the above, the highest known current league average, 21
              games or more as of December 31, 2023.
            </p>
            <br />
            <p>
              If none of the above applies, men will enter at 190 and women will
              enter at 175.
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
    <div className="col-start-5 col-end-12 row-span-2 row-start-5 grid grid-cols-1 grid-rows-[1fr_2fr_1fr] items-center rounded-lg bg-primary">
      <h1 className="row-start-1 m-3 text-center text-lg font-bold text-dark-blue">
        Hotel Information
      </h1>
      <p className="row-start-2 px-5">
        Staybridge Suites in Orenco Station has special rates available for
        JANBA bowlers! Click the link below to view available rates.
      </p>
      <a
        href="https://www.staybridge.com/redirect?path=asearch&brandCode=SB&localeCode=en&regionCode=1&hotelCode=PDXHS&checkInDate=03&checkInMonthYear=022024&checkOutDate=09&checkOutMonthYear=022024&rateCode=6CBARC&_PMID=99801505&GPC=JBT&cn=no&viewfullsite=true"
        target="_blank"
        rel="noopener noreferrer"
        className="row-start-3 mx-auto mb-4"
      >
        <Button variant="secondary" className="flex items-center gap-3">
          <span>Staybridge Suites</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </span>
        </Button>
      </a>
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
      <div className="flex h-full grid-cols-12 grid-rows-6 flex-col gap-5 md:grid md:h-3/4">
        <MapsCard />
        <FAQ />
        <HotelInfo />
      </div>
    </div>
  );
}
