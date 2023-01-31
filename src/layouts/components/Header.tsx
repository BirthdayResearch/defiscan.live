import { Link } from "@components/commons/link/Link";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { DeFiChainLogo } from "@components/icons/DeFiChainLogo";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { Container } from "@components/commons/Container";
import { SearchBar } from "@components/commons/searchbar/SearchBar";
import { Menu, Transition } from "@headlessui/react";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { useWhaleApiClient } from "@contexts/WhaleContext";
import {
  ListProposalsType,
  ListProposalsStatus,
} from "@defichain/jellyfish-api-core/dist/category/governance";
import { HeaderNetworkMenu } from "./HeaderNetworkMenu";
import { HeaderCountBar } from "./HeaderCountBar";

export function Header(): JSX.Element {
  const [menu, setMenu] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
  const [openProposalsLength, setOpenProposalsLength] = useState(0);
  const router = useRouter();

  const api = useWhaleApiClient();

  function editDrawerMenuItemLinks(item: { text: string; pathname: string }) {
    if (item.text.toLowerCase() === "governance" && openProposalsLength !== undefined) {
      item.text = `Governance (${openProposalsLength})`;
    }
  }

  async function getOpenProposalsLength() {
    await api.governance
      .listGovProposals({
        type: ListProposalsType.ALL,
        status: ListProposalsStatus.VOTING,
        all: true,
      })
      .then((res) => {
        setOpenProposalsLength(res.length);
      })
      .catch(() => {
        setOpenProposalsLength(0);
      });
  }

  useEffect(() => {
    getOpenProposalsLength();
  }, []);

  useEffect(() => {
    drawerMenuItemLinks.map(editDrawerMenuItemLinks);
  }, [openProposalsLength]);

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

  useEffect(() => {
    if (menu) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [menu]);

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
              {isSearchIconClicked ? (
                <div className="flex flex-row items-center w-full m-2 h-9">
                  <div
                    data-testid="Mobile.HeaderSearchBar"
                    className="flex grow"
                  >
                    <SearchBar atHeader />
                  </div>
                  <MdClose
                    role="button"
                    onClick={() => setIsSearchIconClicked(false)}
                    className="h-6 w-6 text-primary-500 ml-4"
                  />
                </div>
              ) : (
                <>
                  <div className="flex w-full">
                    <Link href={{ pathname: "/" }} passHref>
                      <a className="flex cursor-pointer items-center hover:text-primary-500">
                        <DeFiChainLogo className="h-full w-36 lg:w-40 md:m-0 m-2" />
                      </a>
                    </Link>
                    <DesktopNavbar openProposalsLength={openProposalsLength} />
                  </div>
                  <div className="lg:hidden flex flex-row items-center md:gap-x-6 gap-x-5">
                    <div
                      data-testid="Tablet.HeaderSearchBar"
                      className="md:block hidden w-[275px]"
                    >
                      <SearchBar atHeader />
                    </div>
                    <div className="md:hidden">
                      <BiSearchAlt2
                        size={24}
                        className="text-gray-600 dark:text-dark-gray-600"
                        role="button"
                        onClick={() => setIsSearchIconClicked(true)}
                        data-testid="Header.Mobile.SearchIcon"
                      />
                    </div>

                    {menu ? (
                      <MdClose
                        className="h-6 w-6 text-primary-500"
                        onClick={() => setMenu(false)}
                        data-testid="Header.CloseMenu"
                      />
                    ) : (
                      <MdMenu
                        role="button"
                        className="h-6 w-6 text-primary-500"
                        onClick={() => setMenu(true)}
                        data-testid="Header.OpenMenu"
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </Container>
        </div>
      </header>
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
  );
}

function DesktopNavbar({
  openProposalsLength,
}: {
  openProposalsLength: number;
}): JSX.Element {
  return (
    <div className="ml-2 hidden items-center text-gray-600 dark:text-dark-gray-900 md:w-full md:justify-between lg:ml-8 lg:flex">
      <div className="hidden md:flex">
        <HeaderLink
          className="ml-1 lg:ml-2"
          text="DEX"
          pathname="/dex"
          testId="Desktop.HeaderLink.DEX"
        />
        <HeaderLink
          className="ml-1 lg:ml-2"
          text="Blocks"
          pathname="/blocks"
          testId="Desktop.HeaderLink.Blocks"
        />
        <HeaderLink
          className="ml-1 lg:ml-2"
          text="Vaults"
          pathname="/vaults"
          testId="Desktop.HeaderLink.Vaults"
        />
        <HeaderLink
          className="ml-1 lg:ml-2"
          text="Auctions"
          pathname="/auctions"
          testId="Desktop.HeaderLink.Auctions"
        />
        <HeaderLink
          className="ml-1 lg:ml-2"
          text="Oracles"
          pathname="/oracles"
          testId="Desktop.HeaderLink.Oracles"
        />
        <HeaderLink
          className="ml-1 lg:ml-2 whitespace-nowrap"
          text={`Governance (${openProposalsLength})`}
          pathname="/governance"
          testId="Desktop.HeaderLink.Governance"
        />
        <HeaderLink
          className="ml-1 lg:ml-2"
          text="Masternodes"
          pathname="/masternodes"
          testId="Desktop.HeaderLink.Masternodes"
        />
        <MoreDropdown />
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
      onClick={() => {
        toggleMenu();
      }}
      className="h-screen w-screen backdrop-blur-[2px] backdrop-brightness-50"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex flex-col float-right h-screen w-5/12 bg-white dark:bg-gray-900 lg:hidden"
        data-testid="TabletMenu"
      >
        <div className="flex flex-row justify-between p-6 items-center">
          <Link href={{ pathname: "/" }} passHref>
            <a className="hover:text-primary-500">
              <DeFiChainLogo className="h-full w-36" />
            </a>
          </Link>
          <MdClose
            role="button"
            className="h-6 w-6 text-primary-500"
            onClick={() => toggleMenu()}
            data-testid="Header.CloseMenu"
          />
        </div>
        <div className="flex h-full flex-col ">
          <div className="flex flex-wrap bg-primary-700 p-4 dark:bg-gray-900">
            <HeaderCountBar className="flex w-full flex-wrap" />
            <div className="mt-4 w-full">
              <HeaderNetworkMenu />
            </div>
          </div>
          <div className="mt-2">
            <MenuItems viewPort="Tablet" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ toggleMenu }: { toggleMenu: () => void }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const dimension = useWindowDimensions();
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = `${
        dimension.height - ref.current.offsetTop
      }px`;
    }
  }, [ref, dimension]);

  return (
    <div
      className="bg-white dark:bg-gray-900 md:hidden"
      data-testid="MobileMenu"
    >
      <div className="flex flex-row justify-between m-6 items-center">
        <Link href={{ pathname: "/" }} passHref>
          <a className="hover:text-primary-500">
            <DeFiChainLogo className="h-full w-36" />
          </a>
        </Link>
        <MdClose
          role="button"
          className="h-6 w-6 text-primary-500"
          onClick={() => toggleMenu()}
          data-testid="Header.Mobile.CloseMenu"
        />
      </div>
      <div className="flex flex-wrap bg-primary-700 p-4 dark:bg-gray-900 md:p-0">
        <HeaderCountBar className="flex w-full flex-wrap" />
        <div className="mt-4 w-full">
          <HeaderNetworkMenu />
        </div>
      </div>
      <div
        ref={ref}
        className={classNames(
          "text-gray-600 dark:text-dark-gray-900 overflow-auto"
        )}
      >
        <MenuItems viewPort="Mobile" />
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
            "dark:text-dark-50 text-primary-500": router.pathname.includes(
              props.pathname
            ),
          },
          {
            "text-gray-900 dark:text-dark-gray-900": !router.pathname.includes(
              props.pathname
            ),
          }
        )}
        data-testid={props.testId}
      >
        <div
          className={classNames(
            "dark:hover:text-dark-50 m-2 inline cursor-pointer pb-0.5 text-lg hover:text-primary-500",
            {
              "dark:border-dark-50 border-b-2 border-primary-500":
                router.pathname.includes(props.pathname),
            }
          )}
        >
          {props.text}
        </div>
      </a>
    </Link>
  );
}

function MenuItems({ viewPort }: { viewPort: string }): JSX.Element {
  return (
    <div className="flex flex-col">
      {drawerMenuItemLinks.map((item, index) => {
        return (
          <HeaderLink
            key={index}
            className={classNames(
              "flex justify-start border-b border-gray-200 dark:border-gray-700 px-4 p-1.5",
              { "md:pt-0": index === 0 }
            )}
            text={item.text}
            pathname={item.pathname}
            testId={`${viewPort}.HeaderLink.${item.testId}`}
          />
        );
      })}
    </div>
  );
}

function MoreDropdown(): JSX.Element {
  const [isItemClicked, setIsItemClicked] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsItemClicked(
      dropDownLinks.some((ddl) =>
        router.pathname.includes(ddl.rootPathName.toLowerCase())
      )
    );
  }, [router.pathname]);

  return (
    <Menu as="div" className="relative">
      {({ open, close }) => (
        <>
          <Menu.Button
            data-testid="Desktop.HeaderLink.More"
            className={classNames(
              "flex flex-row items-center mx-4 dark:hover:text-dark-50 cursor-pointer text-lg hover:text-primary-500",
              {
                "dark:text-dark-50 text-primary-500": isItemClicked,
              }
            )}
          >
            More
            {open ? (
              <IoChevronUp className="ml-2" size={20} />
            ) : (
              <IoChevronDown className="ml-2" size={20} />
            )}
          </Menu.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items
              data-testid="Desktop.HeaderLink.More.Items"
              className="absolute m-4 min-w-max flex flex-col divide-y bg-white border rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700"
            >
              {dropDownLinks.map((item, index) => {
                return (
                  <Menu.Item key={index}>
                    <DropDownLink
                      routerPathName={router.pathname}
                      item={item}
                      close={close}
                    />
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

interface DropDownLinkProps {
  routerPathName: string;
  item: {
    name: string;
    rootPathName: string;
    link: string;
  };
  close: () => void;
}

const DropDownLink = React.forwardRef<HTMLAnchorElement, DropDownLinkProps>(
  ({ routerPathName, item, close }, ref) => {
    return (
      <Link href={{ pathname: item.link }} passHref legacyBehavior>
        <a
          data-testid={`Desktop.HeaderLink.More.Items.${item.rootPathName}`}
          ref={ref}
          href={item.link}
          onClick={close}
          className={classNames(
            "px-6 py-3.5 cursor-pointer text-sm border-gray-200 hover:text-primary-500 dark:hover:text-dark-50",
            {
              "dark:text-dark-50 text-primary-500": routerPathName.includes(
                item.rootPathName
              ),
            }
          )}
        >
          {item.name}
        </a>
      </Link>
    );
  }
);

const dropDownLinks = [
  // {
  //   name: "Consortium",
  //   link: "/consortium/asset_breakdown",
  //   rootPathName: "consortium",
  // },
  {
    name: "Tokens",
    link: "/tokens",
    rootPathName: "tokens",
  },
];

let drawerMenuItemLinks = [
  {
    text: "Dex",
    pathname: "/dex",
    testId: "Dex",
  },
  {
    text: "Blocks",
    pathname: "/blocks",
    testId: "Blocks",
  },
  {
    text: "Vaults",
    pathname: "/vaults",
    testId: "Vaults",
  },
  {
    text: "Auctions",
    pathname: "/auctions",
    testId: "Auctions",
  },
  {
    text: "Oracles",
    pathname: "/oracles",
    testId: "Oracles",
  },
  {
    text: "Governance",
    pathname: "/governance",
    testId: "Governance",
  },
  {
    text: "Masternodes",
    pathname: "/masternodes",
    testId: "Masternodes",
  },
  // {
  //   text: "Consortium",
  //   pathname: "/consortium/asset_breakdown"
  // },
  {
    text: "Tokens",
    pathname: "/tokens",
    testId: "Tokens",
  },
];
