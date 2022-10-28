import React from "react";

function CandidateTest() {
  return (
    <div class="bg-gray-100">
      <div class="w-full text-white bg-main-color">
        <div
          x-data="{ open: false }"
          class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8 sm:flex-col sm:justify-end"
        >
          {/* <div class="p-4 flex flex-row items-center justify-between">
                        <a href="#"
                            class="text-lg font-semibold black tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">TEST DESCRIPTION</a>
                    </div> */}
        </div>

        <div class="container mx-auto my-5 p-5">
          <div class="md:flex  md:-mx-2 ">
            {/* <!-- Right Side --> */}
            <div class="w-full md:w-9/12 mx-2 h-auto">
              {/* <!-- Profile tab --> */}
              {/* <!-- TD section --> */}
              <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="flex items-center space-x-2 space-y-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </span>
                  <span class="tracking-wide">TEST DESCRIPTION</span>
                </div>
                <div class="text-gray-900">
                  <div class="grid md:grid-cols-3">
                    <h1 className="font-extrabold">Account management TEST</h1>
                  </div>
                  <div>
                    <h3 className="font-bold">
                      Use our Account management test to hire the best
                    </h3>
                  </div>

                  <p>
                    This communication test evaluates candidates' skills in
                    communicating clearly and effectively using professional
                    etiquette. The test assesses candidates in both written and
                    verbal communication, as well as non-verbal cues and active
                    listening.
                  </p>
                  {/* OPTION PAGE  */}
                </div>
              </div>
              {/* <!-- TD section finish --> */}

              <div class="my-4"></div>

              {/* <!-- cost section--> */}
              <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="grid gap-6 grid-row-3">
                  <div className="grid border-double border-4 border-black rounded md:grid-rows-1 lg:grid-cols-1 text-black">
                    <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-6 sm:p-5">
                      <h1>Option 1</h1>
                    </div>
                  </div>
                  <div className="grid border-double border-4 border-black rounded md:grid-rows-1 lg:grid-cols-1 text-black">
                    <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-6 sm:p-5">
                      <h1>Option 2</h1>
                    </div>
                  </div>
                  <div className="grid border-double border-4 border-black rounded md:grid-rows-1 lg:grid-cols-1 text-black">
                    <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-6 sm:p-5">
                      <h1>Option 3</h1>
                    </div>
                  </div>
                  <div className="grid border-double border-4 border-black rounded md:grid-rows-1 lg:grid-cols-1 text-black">
                    <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-6 sm:p-5">
                      <h1>Option 4</h1>
                    </div>
                  </div>
                </div>
                {/* <!-- End of cost grid --> */}
              </div>
            </div>

            <div class="w-full md:w-3/12 md:mx-3">
              <div class="bg-white p-3 border-t-4 border-black-400">
                <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                  Attempt Summery
                </h1>

                <ul class="grid grid-cols-2 gap-2 ">
                  <li class="bg-green-300 rounded-lg shadow-xl">
                    <div class="h-10 m-3 flex justify-center">
                      <span className="text-2xl">1</span>
                    </div>
                  </li>
                  <li class="bg-green-300 rounded-lg shadow-xl">
                    <div class="h-10 m-3 flex justify-center">
                      <span className="text-2xl">2</span>
                    </div>
                  </li>
                  <li class="bg-green-300 rounded-lg shadow-xl">
                    <div class="h-10 m-3 flex justify-center">
                      <span className="text-2xl">3</span>
                    </div>
                  </li>
                  <li class="bg-green-300 rounded-lg shadow-xl">
                    <div class="h-10 m-3 flex justify-center">
                      <span className="text-2xl">4</span>
                    </div>
                  </li>
                  <li class="bg-green-300 rounded-lg shadow-xl">
                    <div class="h-10 m-3 flex justify-center">
                      <span className="text-2xl">5</span>
                    </div>
                  </li>
                  <li class="bg-green-300 rounded-lg shadow-xl">
                    <div class="h-10 m-3 flex justify-center">
                      <span className="text-2xl">6</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="my-4"></div>
              {/* <!-- area of expertise starts--> */}

              <div class="bg-white p-3 border-t-4 border-black-400">
                <h3 class="text-gray-900 font-lg text-center font-bold leading-6">
                  Verbal and logical judgment
                </h3>
                <h1 class="text-gray-900  text-center text-xl leading-8 my-1">
                  PASS
                </h1>

                <button
                  type="button"
                  class="text-white bg-gray-800 justify-center hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  END TEST
                </button>
              </div>
              {/* <!-- area of expertise ends --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateTest;
