import { Fragment, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Popover, Menu, Transition } from "@headlessui/react";
import PopUp from "../notification/NotificationPopup";

import {
  Bars3Icon,
  BellIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  XMarkIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { NotificationItem, chainNameType } from "@epnsproject/sdk-uiweb";
import * as EpnsAPI from "@epnsproject/sdk-restapi";

import WalletPopup from "../walletconnect/WalletPopup";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import logo from "../assets/images/logo.png";
import SelectChain from "../walletconnect/SelectChain";
import { ethers } from "ethers";

const solutions = [
  {
    name: "My Tests",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "candidate-test-results",
    icon: ChartBarIcon,
  },
  {
    name: "My Applications",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "applications",
    icon: CursorArrowRaysIcon,
  },
  //   {
  //     name: "Security",
  //     description: "Your customers' data will be safe and secure.",
  //     href: "#",
  //     icon: ShieldCheckIcon,
  //   },
  //   {
  //     name: "Integrations",
  //     description: "Connect with third-party tools that you're already using.",
  //     href: "#",
  //     icon: Squares2X2Icon,
  //   },
  //   {
  //     name: "Automations",
  //     description:
  //       "Build strategic funnels that will drive your customers to convert",
  //     href: "#",
  //     icon: ArrowPathIcon,
  //   },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CandidateHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSelectChain, setIsOpenSelectChain] = useState(false);

  const [data, setData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  var useraddress = "";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signerobject = provider.getSigner();

  const checkSusbcription = async () => {
    await getuseraddress();
    const subscriptions = await EpnsAPI.user.getSubscriptions({
      user: "eip155:42:" + useraddress, // user address in CAIP
      env: "staging",
    });

    var flag = false;
    console.log(subscriptions);
    // console.log(subscriptions[0].channel);
    // console.log(subscriptions[1].channel);
    // console.log(subscriptions[2].channel);

    for (let i = 0; i < subscriptions.length; i++) {
      if (
        subscriptions[i].channel ===
        "0xfaabb044AF5C19145cA4AE13CA12C419395A72FB"
      ) {
        flag = true;
      }
    }
    return flag;
  };
  const fetchNotifications = async () => {
    await getuseraddress();
    console.log(useraddress);
    const notifications = await EpnsAPI.user.getFeeds({
      user: "eip155:42:" + useraddress, // user address in CAIP
      env: "staging",
    });
    setData(notifications);
    // console.log(notifications)
  };

  const getuseraddress = async () => {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((res) => {
        // Return the address of the wallet
        // console.log(res)
        useraddress = res;
      });
  };
  const optIn = async () => {
    if ((await checkSusbcription()) === true) {
      alert("you are already opted in");
      setIsOpen(!isOpen);
      // setOpted(!opted);
      return;
    }

    await getuseraddress();

    await EpnsAPI.channels.subscribe({
      signer: signerobject,
      channelAddress: "eip155:42:0xfaabb044AF5C19145cA4AE13CA12C419395A72FB", // channel address in CAIP
      userAddress: "eip155:42:" + useraddress, // user address in CAIP
      onSuccess: () => {
        alert("opt in success");
      },
      onError: () => {
        alert("opt in error");
      },
      env: "staging",
    });
  };

  const toggleSelectChain = () => {
    setIsOpenSelectChain(!isOpenSelectChain);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Popover className="z-10 fixed bg-white w-full">
        <div className=" px-4 sm:px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-2 md:justify-start md:space-x-10">
            <div className="flex justify-start sm:flex-1">
              <Link to="/">
                <span className="sr-only">Workflow</span>
                <img className="h-12 w-auto sm:h-20" src={logo} alt="logo" />
              </Link>
            </div>
            {/* <div className="grow"></div> */}

            <div className="-my-2 -mr-2 md:hidden">
              <button
                type="button"
                className="rounded-full p-1 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <form className="hidden space-x-10 md:flex items-center w-1/4">
              <div className="relative w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-400 left-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full py-2 pl-10  text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                />
              </div>
            </form>
            <Popover.Group
              as="nav"
              className="hidden space-x-10 md:flex items-center"
            >
              <Link
                to="/candidate"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Feed
              </Link>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none  header-orange "
                      )}
                    >
                      <span>Tests</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            {solutions.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                              >
                                <item.icon
                                  className="h-6 w-6 flex-shrink-0 header-svg"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                            {/* {callsToAction.map((item) => (
                              <div key={item.name} className="flow-root">
                                <Link
                                  to="/#"
                                  className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                                >
                                  <item.icon
                                    className="h-6 w-6 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3">{item.name}</span>
                                </Link>
                              </div>
                            ))} */}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Link
                to="/candidate/message"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Messages
              </Link>
              {/* <button className="hireverse-btn">
                <Link to="/#" className=" ">
                  HireVerse
                </Link>
              </button> */}
            </Popover.Group>

            {/* *************** Hireverse ************* */}

            <Menu as="div" className="relative ml-3 z-50">
              <div>
                <Menu.Button className="flex rounded-full text-sm  ">
                  <span className="sr-only">Open user menu</span>
                  <button className="hireverse-btn">HireVerse</button>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        onClick={() =>
                          window.open(
                            "https://office.dehitas.xyz/?username=admin"
                          )
                        }
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Personal Office
                      </Link>
                    )}
                  </Menu.Item>
                  {/* <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Settings
                        </Link>
                      )}
                    </Menu.Item> */}
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        // onClick={() =>
                        //   window.open("https://office.dehitas.xyz/?username=jd")
                        // }
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Public Office
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* *************** Hireverse ************* */}

            {/* <Popover className="relative"> */}
            {/* <form className="hidden space-x-10 md:flex items-center">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-400 left-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full py-1 pl-10  text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                />
              </div>
            </form> */}
            {/* </Popover> */}
            {/* Profile image and notification icon  */}
            <div className="hidden items-center justify-end md:flex ">
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full p-1 text-gray-400 header-orange focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 "
                  onClick={toggleSelectChain}
                >
                  <span className="sr-only">select chain options</span>
                  <LinkIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {isOpenSelectChain && (
                  <WalletPopup
                    content={
                      <>
                        {/* <WalletConnect /> */}
                        <SelectChain />
                      </>
                    }
                    title="Switch Network"
                    handleClose={toggleSelectChain}
                  />
                )}

                <button
                  onClick={() => {
                    fetchNotifications();
                    togglePopup();
                  }}
                  type="button"
                  className="rounded-full p-1 text-gray-400 header-orange focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 "
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* EPNS code */}

                <div className="no-test">
                  {isOpen && (
                    <PopUp
                      content={
                        <>
                          <div>
                            <ul>
                              {/* <li>
                        <img src={channelData.icon} />
                      </li>
                      <li>{channelData.channel}</li>
                      <li>{channelData.name}</li>
                      <li>{channelData.info}</li>
                       <button
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          onClick={() => fetchChannel()}
                        >
                          Fetch-Channel
                        </button> */}
                              <button
                                type="button"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                onClick={() => optIn()}
                                disabled={checkSusbcription() ? false : true}
                              >
                                Opt-In
                              </button>
                              {/* <button
                          type="button"
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          onClick={() => optOut()}
                        >
                          Opt-Out
                        </button> */}
                            </ul>
                          </div>

                          {data.length > 0 ? (
                            // **********************
                            <>
                              {data.map((oneNotification, i) => {
                                const {
                                  cta,
                                  title,
                                  message,
                                  app,
                                  icon,
                                  image,
                                  url,
                                  blockchain,
                                  secret,
                                  notification,
                                } = oneNotification;

                                return (
                                  <div className="grid grid-col-1 flex-shrink-1">
                                    <NotificationItem
                                      key={`notif-${i}`}
                                      notificationTitle={notification.title}
                                      notificationBody={notification.body}
                                      cta={cta}
                                      app={app}
                                      icon={icon}
                                      image={image}
                                      url={cta}
                                    />
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            // ********************
                            <>
                              <div>
                                <p>
                                  **********************************************
                                </p>
                                <p>
                                  Currently there is no notification for you.☺
                                </p>
                                <p>
                                  **********************************************
                                </p>
                              </div>
                            </>
                          )}
                        </>
                      }
                      handleClose={togglePopup}
                    />
                  )}
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3 z-50">
                  <div>
                    <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 header-orange">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="candidate-profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      {/* <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Settings
                        </Link>
                      )}
                    </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              {/* <Link
              to="/#"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link
              to="/#"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Sign up
            </Link> */}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img className="h-14 w-auto" src={logo} alt="Workflow" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  {/* <Popover className="relative"> */}
                  <form className="mb-5 space-x-10 md:flex items-center py-2">
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-400 left-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full py-1 pl-10  text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                      />
                    </div>
                  </form>
                  {/* </Popover> */}
                  <nav className="grid gap-y-8 ">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        to="/#"
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                      >
                        <item.icon
                          className="h-6 w-6 flex-shrink-0 header-svg"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <Link
                    to="/candidate"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Feed
                  </Link>

                  <Link
                    to="/candidate/message"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Messages
                  </Link>
                  <Link
                    to="candidate-profile"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Your Profile
                  </Link>
                  <button
                    type="button"
                    className="rounded-full p-1 text-gray-400 header-orange focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  {/* {resources.map((item) => (
                  <Link
                    key={item.name}
                    to="/#"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </Link>
                ))} */}
                </div>
                <button className="hireverse-btn-mobile">
                  <Link to="/#" className="text-base font-medium ">
                    HireVerse
                  </Link>
                </button>
                <div>
                  <Link
                    to="/#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Sign up
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{" "}
                    <Link
                      to="/#"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <Outlet />
    </>
  );
}
