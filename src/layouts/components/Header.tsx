import { Link } from "@components/commons/link/Link";
import { DeFiChainLogo } from "@components/icons/DeFiChainLogo";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { Container } from "@components/commons/Container";
import { SearchBar } from "@components/commons/searchbar/SearchBar";
import { HeaderCountBar } from "./HeaderCountBar";
import { HeaderNetworkMenu } from "./HeaderNetworkMenu";

export function Header(): JSX.Element {
  const [menu, setMenu] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const router = useRouter();

  useEffect(() => {
    function routeChangeStart(): void {
      setMenu(false);
    }

    router.events.on("routeChangeStart", routeChangeStart);
    return () => router.events.off("routeChangeStart", routeChangeStart);
  }, []);

  useEffect(() => {
    function scrollHandler(): void {
      window.pageYOffset > 30 ? setAtTop(false) : setAtTop(true);
    }

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <header
        className={classNames(
          "sticky top-0 z-50 bg-white md:static md:shadow-none",
          { "shadow-lg": !atTop }
        )}
      >
        <div className="hidden border-b border-gray-100 bg-primary-700 dark:border-0 dark:bg-gray-800 md:block">
          <Container className="py-1">
            <div className="flex h-8 items-center justify-between">
              <HeaderCountBar className="flex h-full" />
              <HeaderNetworkMenu />
            </div>
          </Container>
        </div>

        <div className="border-b border-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <Container className="py-4 md:py-8">
            <div className="flex items-center justify-between">
              <div className="flex w-full">
                <Link href={{ pathname: "/" }} passHref>
                  <a className="flex cursor-pointer items-center hover:text-primary-500">
                    <DeFiChainLogo className="h-full w-32 sm:hidden md:block lg:w-40" />
                  </a>
                </Link>
                <DesktopNavbar />
              </div>
              <div className="lg:hidden">
                {menu ? (
                  <MdClose
                    className="h-6 w-6 text-primary-500"
                    onClick={() => setMenu(false)}
                    data-testid="Header.CloseMenu"
                  />
                ) : (
                  <MdMenu
                    className="h-6 w-6 text-primary-500"
                    onClick={() => setMenu(true)}
                    data-testid="Header.OpenMenu"
                  />
                )}
              </div>
            </div>
          </Container>
        </div>
      </header>
      <>
        {menu && (
          <>
            <div className="fixed z-50 md:hidden">
              <MobileMenu toggleMenu={() => setMenu(false)} />
            </div>
            <div className="w-full hidden md:block md:fixed md:z-50">
              <TabletMenu toggleMenu={() => setMenu(false)} />
            </div>
          </>
        )}
      </>
    </>
  );
}

function DesktopNavbar(): JSX.Element {
  return (
    <div className="ml-2 hidden items-center text-gray-600 dark:text-dark-gray-900 md:w-full md:justify-between lg:ml-8 lg:flex">
      <div className="hidden md:flex">
        <HeaderLink
          className="ml-1 lg:ml-4"
          text="DEX"
          pathname="/dex"
          testId="Desktop.HeaderLink.DEX"
        />
        <HeaderLink
          className="ml-1 lg:ml-4"
          text="Blocks"
          pathname="/blocks"
          testId="Desktop.HeaderLink.Blocks"
        />
        <HeaderLink
          className="ml-1 lg:ml-4"
          text="Vaults"
          pathname="/vaults"
          testId="Desktop.HeaderLink.Vaults"
        />
        <HeaderLink
          className="ml-1 lg:ml-4"
          text="Auctions"
          pathname="/auctions"
          testId="Desktop.HeaderLink.Auctions"
        />
        <HeaderLink
          className="ml-1 lg:ml-4"
          text="Oracles"
          pathname="/oracles"
          testId="Desktop.HeaderLink.Oracles"
        />
        <HeaderLink
          className="ml-1 lg:ml-4"
          text="Tokens"
          pathname="/tokens"
          testId="Desktop.HeaderLink.Tokens"
        />
        <HeaderLink
          className="ml-1 lg:ml-4"
          text="Masternodes"
          pathname="/masternodes"
          testId="Desktop.HeaderLink.Masternodes"
        />
        <HeaderLink
          className="ml-1 lg:ml-4"
          text="Consortium"
          pathname="/consortium/asset_breakdown"
          testId="Desktop.HeaderLink.Consortium"
        />
      </div>
      <div
        className="hidden w-1/4 md:block"
        data-testid="Desktop.HeaderSearchBar"
      >
        <SearchBar atHeader />
      </div>
    </div>
  );
}

function TabletMenu({ toggleMenu }: { toggleMenu: () => void }): JSX.Element {
  return (
    <div
      className="flex flex-col float-right h-screen w-5/12 bg-white dark:bg-gray-900 lg:hidden"
      data-testid="TabletMenu"
    >
      <div className="flex flex-row justify-between m-4">
        <Link href={{ pathname: "/" }} passHref>
          <a className="hover:text-primary-500">
            <DeFiChainLogo className="h-full w-32" />
          </a>
        </Link>
        <MdClose
          className="h-6 w-6 text-primary-500"
          onClick={() => toggleMenu()}
          data-testid="Header.CloseMenu"
        />
      </div>
      <div className="flex h-full flex-col justify-between">
        <Container className="pt-2 pb-4 text-gray-600 dark:text-dark-gray-900">
          <MenuItems />
        </Container>
        <div className="flex flex-wrap bg-primary-700 p-4 dark:bg-gray-900">
          <HeaderCountBar className="flex w-full flex-wrap" />
          <div className="mt-4 w-full">
            <HeaderNetworkMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ toggleMenu }: { toggleMenu: () => void }): JSX.Element {
  return (
    <div
      className="bg-white dark:bg-gray-900 md:hidden"
      data-testid="MobileMenu"
    >
      <div className="flex flex-row justify-between m-4">
        <Link href={{ pathname: "/" }} passHref>
          <a className="hover:text-primary-500">
            <DeFiChainLogo className="h-full w-32" />
          </a>
        </Link>
        <MdClose
          className="h-6 w-6 text-primary-500"
          onClick={() => toggleMenu()}
          data-testid="Header.CloseMenu"
        />
      </div>

      <Container className="border-b border-gray-100 pt-2 pb-4 text-gray-600 shadow-sm dark:text-dark-gray-900">
        <MenuItems />
        <div className="mt-4" data-testid="Mobile.HeaderSearchBar">
          <SearchBar atHeader={false} />
        </div>
      </Container>

      <div className="flex flex-wrap bg-primary-700 p-4 dark:bg-gray-900 md:p-0">
        <HeaderCountBar className="flex w-full flex-wrap" />
        <div className="mt-4 w-full">
          <HeaderNetworkMenu />
        </div>
      </div>
    </div>
  );
}

export function HeaderLink(props: {
  text: string;
  pathname: string;
  className: string;
  testId?: string;
}): JSX.Element {
  const router = useRouter();
  return (
    <Link href={{ pathname: props.pathname }}>
      <a
        className={classNames(
          props.className,
          {
            "dark:text-dark-50 text-primary-500":
              router.pathname === props.pathname,
          },
          {
            "text-gray-900 dark:text-dark-gray-900":
              router.pathname !== props.pathname,
          }
        )}
        data-testid={props.testId}
      >
        <div
          className={classNames(
            "dark:hover:text-dark-50 m-2 inline cursor-pointer pb-0.5 text-lg  hover:text-primary-500",
            {
              "dark:border-dark-50 border-b-2 border-primary-500":
                router.pathname === props.pathname,
            }
          )}
        >
          {props.text}
        </div>
      </a>
    </Link>
  );
}

function MenuItems(): JSX.Element {
  return (
    <div className="flex flex-col">
      <HeaderLink
        className="flex justify-center border-b border-gray-100 dark:border-gray-700 md:p-1.5"
        text="DEX"
        pathname="/dex"
        testId="Mobile.HeaderLink.DEX"
      />
      <HeaderLink
        className="flex justify-center border-b border-gray-100 dark:border-gray-700 md:p-1.5"
        text="Blocks"
        pathname="/blocks"
        testId="Mobile.HeaderLink.Blocks"
      />
      <HeaderLink
        className="flex justify-center border-b border-gray-100 dark:border-gray-700 md:p-1.5"
        text="Vaults"
        pathname="/vaults"
        testId="Mobile.HeaderLink.Vaults"
      />
      <HeaderLink
        className="flex justify-center border-b border-gray-100 dark:border-gray-700 md:p-1.5"
        text="Auctions"
        pathname="/auctions"
        testId="Mobile.HeaderLink.Auctions"
      />
      <HeaderLink
        className="flex justify-center border-b border-gray-100 dark:border-gray-700 md:p-1.5"
        text="Oracles"
        pathname="/oracles"
        testId="Mobile.HeaderLink.Oracles"
      />
      <HeaderLink
        className="flex justify-center border-b border-gray-100 dark:border-gray-700 md:p-1.5"
        text="Tokens"
        pathname="/tokens"
        testId="Mobile.HeaderLink.Tokens"
      />
      <HeaderLink
        className="flex justify-center border-b border-gray-100 dark:border-gray-700 md:p-1.5"
        text="Masternodes"
        pathname="/masternodes"
        testId="Mobile.HeaderLink.Masternodes"
      />
      <HeaderLink
        className="flex justify-center border-b border-gray-100 dark:border-gray-700 md:p-1.5"
        text="Consortium"
        pathname="/consortium/asset_breakdown"
        testId="Mobile.HeaderLink.Consortium"
      />
    </div>
  );
}
