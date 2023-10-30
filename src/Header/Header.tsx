import { useState, useEffect } from "react";
import { Squash as Hamburger } from "hamburger-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import styles from "./header.module.css";
type NavLinkProps = {
  link: string;
};

function NavLink({ link, onClick }: NavLinkProps & { onClick: () => void }) {
  return (
    <a
      href={link === "home" || link === "janba 2024" ? "#" : `#${link}`}
      className="transition-colors duration-200 md:hover:text-primary"
      onClick={onClick}
    >
      {link}
    </a>
  );
}

function FormsMenu() {
  return (
    <DropdownMenuContent>
      <DropdownMenuItem>Men's Entry</DropdownMenuItem>
      <DropdownMenuItem>Women's Entry</DropdownMenuItem>
      <DropdownMenuItem>Senior Event Info</DropdownMenuItem>
      <DropdownMenuItem>Tournament Rules</DropdownMenuItem>
      <DropdownMenuItem>Average Verification</DropdownMenuItem>
      <DropdownMenuItem>Substitute/Replacement</DropdownMenuItem>
      <DropdownMenuItem>Dress Code</DropdownMenuItem>
      <DropdownMenuItem>Advertising</DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    // If the menu is open, disable scrolling
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      // If the menu is closed, re-enable scrolling
      document.body.style.overflow = "";
    }

    // Clean up when the component is unmounted
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]); // This effect will run whenever isOpen changes

  return (
    <>
      <aside
        className={`fixed top-0 z-10 h-screen w-screen ${
          isOpen ? "" : "-translate-x-full"
        } grid bg-dark-blue transition-all duration-300`}
      >
        <nav className="flex flex-col gap-7 place-self-center text-center text-lg font-bold uppercase text-slate-50">
          <NavLink link="home" onClick={closeMenu} />
          <NavLink link="information" onClick={closeMenu} />
          <NavLink link="schedule" onClick={closeMenu} />
          <NavLink link="contact" onClick={closeMenu} />
          <DropdownMenu>
            <DropdownMenuTrigger className="text-lg font-bold uppercase text-slate-50">
              Forms
            </DropdownMenuTrigger>
            <FormsMenu />
          </DropdownMenu>
        </nav>
      </aside>

      <div className="mx-3">
        <span className="fixed left-4 top-4 z-30 font-bold uppercase text-white drop-shadow md:hidden">
          <NavLink link="janba 2024" onClick={closeMenu} />
        </span>
        <span className="fixed right-2 top-1 z-30 drop-shadow md:hidden">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            color="#FFFFFF"
            size={24}
          />
        </span>
      </div>
      <header
        className={`${styles.header} sticky top-0 z-20 flex grid-cols-[1fr_1.5fr_1fr] items-center justify-between bg-dark-blue px-5 md:grid`}
      >
        <a href="#" className="mx-3 hidden font-bold text-slate-50 md:block">
          JANBA 2024
        </a>
        <nav className="hidden w-4/5 justify-evenly place-self-center font-semibold uppercase text-slate-50 md:flex">
          <NavLink link="information" onClick={closeMenu} />
          <NavLink link="schedule" onClick={closeMenu} />
          <NavLink link="contact" onClick={closeMenu} />
        </nav>
        <div className="col-start-3 mx-3 hidden justify-self-end md:block">
          <DropdownMenu>
            <DropdownMenuTrigger className="font-semibold uppercase text-slate-50">
              Forms
            </DropdownMenuTrigger>
            <FormsMenu />
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
