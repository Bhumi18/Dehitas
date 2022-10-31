import React, { useState } from "react";
import "../company/styles/availabletest.css";

function AvailableTest() {
  const [purchased, setPurchased] = useState();
  const [created, setCreated] = useState();

  return (
    <>
      <div className="availabletest-main-content">
        <div className="availabletest-header">
          <h2 class="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600 invitecandidate-title">
            AVAILABLE TEST
          </h2>
        </div>
        <div className="avilabletest-front-buttons">
          <button
            onClick={() => {
              setPurchased(true);
              setCreated(false);
            }}
            for="first_name"
            class="block text-large font-medium text-gray-900 dark:text-gray-300 purchased-name"
            value={purchased}
          >
            Purchased
          </button>

          <button
            onClick={() => {
              setCreated(true);
              setPurchased(false);
            }}
            for="first_name"
            class="block text-large font-medium text-gray-900 dark:text-gray-300 created-name"
            value={created}
          >
            Created
          </button>
        </div>
        <div className="availabletest-main-information">
          <div className="available-information">
            <div className="availabletest-title">
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 jobtitle-name"
              >
                Title
              </label>
            </div>
            <div className="availabletest-variable-cost">
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 variable-cost-name"
              >
                Variable Cost:
              </label>
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 variable-cost-price"
              >
                $20
              </label>
            </div>
            <div className="availabletest-description-to-button">
              <div className="availabletest-description">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </label>
              </div>

              <div className="availabletest-user-icon">
                <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
                  <svg
                    class=""
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="available-creator-name">
                  <label
                    for="first_name"
                    class="block  text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Creator Name
                  </label>
                </div>

                <div className="availabletest-usetest-button">
                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-3 text-center    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 use-test-button"
                  >
                    Use This Test
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="available-information">
            <div className="availabletest-title">
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 jobtitle-name"
              >
                Title
              </label>
            </div>
            <div className="availabletest-variable-cost">
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 variable-cost-name"
              >
                Variable Cost:
              </label>
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 variable-cost-price"
              >
                $20
              </label>
            </div>
            <div className="availabletest-description-to-button">
              <div className="availabletest-description">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </label>
              </div>

              <div className="availabletest-user-icon">
                <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
                  <svg
                    class=""
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="available-creator-name">
                  <label
                    for="first_name"
                    class="block  text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Creator Name
                  </label>
                </div>

                <div className="availabletest-usetest-button">
                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-3 text-center    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 use-test-button"
                  >
                    Use This Test
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="available-information">
            <div className="availabletest-title">
              <label
                for="first_name"
                class="block text-large font-medium text-gray-900 dark:text-gray-300 jobtitle-name"
              >
                Title
              </label>
            </div>
            <div className="availabletest-variable-cost">
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 variable-cost-name"
              >
                Variable Cost:
              </label>
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 variable-cost-price"
              >
                $20
              </label>
            </div>
            <div className="availabletest-description-to-button">
              <div className="availabletest-description">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </label>
              </div>

              <div className="availabletest-user-icon">
                <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
                  <svg
                    class=""
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="available-creator-name">
                  <label
                    for="first_name"
                    class="block  text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Creator Name
                  </label>
                </div>

                <div className="availabletest-usetest-button">
                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-3 text-center    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 use-test-button"
                  >
                    Use This Test
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="available-information">
            <div className="availabletest-title">
              <label
                for="first_name"
                class="block text-large font-medium text-gray-900 dark:text-gray-300 jobtitle-name"
              >
                Title
              </label>
            </div>
            <div className="availabletest-variable-cost">
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 variable-cost-name"
              >
                Variable Cost:
              </label>
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 variable-cost-price"
              >
                $20
              </label>
            </div>

            <div className="availabletest-description-to-button">
              <div className="availabletest-description">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </label>
              </div>

              <div className="availabletest-user-icon">
                <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
                  <svg
                    class=""
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="available-creator-name">
                  <label
                    for="first_name"
                    class="block  text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Creator Name
                  </label>
                </div>

                <div className="availabletest-usetest-button">
                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-3 text-center    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 use-test-button"
                  >
                    Use This Test
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="available-information">
            <div className="availabletest-title">
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 jobtitle-name"
              >
                Title
              </label>
            </div>
            <div className="availabletest-variable-cost">
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 variable-cost-name"
              >
                Variable Cost:
              </label>
              <label
                for="first_name"
                class="block  text-large font-medium text-gray-900 dark:text-gray-300 variable-cost-price"
              >
                $20
              </label>
            </div>
            <div className="availabletest-description-to-button">
              <div className="availabletest-description">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </label>
              </div>

              <div className="availabletest-user-icon">
                <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
                  <svg
                    class=""
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="available-creator-name">
                  <label
                    for="first_name"
                    class="block  text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Creator Name
                  </label>
                </div>

                <div className="availabletest-usetest-button">
                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 use-test-button"
                  >
                    Use This Test
                  </button>
                </div>
              </div>
            </div>
            <div className="availabletest-submit">
              <a
                href="/company/invite-candidate"
                target="_blank"
                rel="noreferrer"
              >
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-3 text-center    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 availabletest-save-button"
                >
                  Save & Continue
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AvailableTest;
