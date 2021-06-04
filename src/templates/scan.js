import React from "react"
import classnames from "classnames"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XIcon, ArrowCircleRightIcon } from "@heroicons/react/outline"
import { Link, graphql } from "gatsby"
import {
  ClipboardListIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ScanImage from "../components/scanImage"
import NoduleList from "../components/noduleList.js"






function Scan({ data }) {
  //mus.js
  //TODO: Is broken, because it uses onMouseMoves like in line 139
  /*
  var mus = new Mus();
  mus.setTimePoint(true);
  mus.setPlaybackSpeed(mus.speed.SLOW);
  mus.record();
  var endRecord = function() {
    mus.stop();
    getReport();
  };
  const getReport = function(){
    const json = JSON.stringify(mus.getData());
    console.log(json);

    //const csvData = objectToCsv(data);
  }*/

  //Public Settings
  var userId = "123456";
  var backEndURL = "http://localhost:22709/api/record";
  var pauseAfter = 200;
  var trackingPathName = "/scans/1234";

  //logic variable
  var doOnce = false;
  var elementExists = document.getElementsByClassName("text-2xl py-4 font-bold leading-tight text-gray-900 mouse");
  var pause = false;

  //time
  var startTime = 0;
  var timeSpent = 0;
  //Duration of Movements
  var mouseMovementTime = 0;
  var smouseMovementTime = 0;
  var allMouseMovementTime = 0;
  //MouseTracking
  var lastSeenAt = { x: null, y: null };
  //Distanz
  var totalDistance = 0;
  var additionalDistance = 0;
  var normalizedAdditionalDistance = 0;
  //MouseHover
  var sHoverTime = 0;
  var mouseHoverCount = 0;
  var mouseHover = false;
  var countMouseHoverThatTurnedIntoClicks = 0;
  var mouseHoverThatTurnedIntoClicks = 0;
  var allMouseHoverThatTurnedIntoClicks = 0;
  var averageMouseHoverThatTurnedIntoClicks = 0
  var endHoverTime = 0;
  //MouseClick
  var mouseClickCounter = 0;
  var mouseClickCounterOutsideOfDirectMovements = 0;
  //MouseMovementCounter
  var mouseMovementCounter = 0;
  //Counter
  var straightLinesCounter = 0;
  var longStraightLinesCounter = 0;
  var slowMovementCounter = 0;
  var nonDirectMovementsCounter = 0;
  //XY from pause to click
  var pauseX;
  var pauseY;
  var distanceSincePause = 0;
  var minDistanceSincePause = 0;

  //Duration of Pause
  var pauseCounter = 0;
  var sPauseDuration = 0;
  var pauseDuration  = 0;
  var allPauseDuaration = 0;
  var averagePauseDuration = 0;
  var pauseDurationBeforeClick = 0;
  var allPauseDurationBeforeClick = 0; 
  var timeMouseMovementsDIVIDEDBYTaskDuration = 0;
  var averagePauseDurationDIVIDEDBYTaskDuration = 0;
  var averagePauseDurationBeforeClicksDIVIDEDBYTaskDuration = 0;
  var pauseDurationBeforeClickCounter = 0;
  var averagePauseDurationBeforeClicks = 0;
  var allHoverTime = 0;
  var averageHoverTime = 0;
  //TODO: SCAN DETAILS
  //leftPage()
  //if(scanInfoOpen){
    //leftPage()
  //}UMGEKEHRT // NUR EINMAL

  onclick = function addOne() {
    //Find Element on Page
    elementExists = document.getElementsByClassName("text-2xl py-4 font-bold leading-tight text-gray-900 mouse");
    if (elementExists.length == 1) {
      //MouseClickCounter
      mouseClickCounter += 1;
      //mouseClickCounterOutsideOfDirectMovements
      if(pause){
        mouseClickCounterOutsideOfDirectMovements = mouseClickCounterOutsideOfDirectMovements + 1;
        pauseDurationBeforeClick = (new Date()).getTime() - sPauseDuration;
        allPauseDurationBeforeClick = allPauseDurationBeforeClick + pauseDurationBeforeClick;
        pauseDurationBeforeClickCounter = pauseDurationBeforeClickCounter + 1;
      }
      //MouseHover
      if (mouseHover) {
        mouseHoverThatTurnedIntoClicks = (new Date()).getTime() - sHoverTime;
        countMouseHoverThatTurnedIntoClicks = countMouseHoverThatTurnedIntoClicks + 1;
        mouseHover = false;
        allMouseHoverThatTurnedIntoClicks = allMouseHoverThatTurnedIntoClicks + mouseHoverThatTurnedIntoClicks;
        averageMouseHoverThatTurnedIntoClicks = allMouseHoverThatTurnedIntoClicks/countMouseHoverThatTurnedIntoClicks;
      }
      var isOnScansPage = window.location.pathname === trackingPathName;
      if (!isOnScansPage) {
          timeSpent = (new Date()).getTime() - startTime;
          //endRecord();
          additionalDistance = distanceSincePause - minDistanceSincePause;
          if(minDistanceSincePause != 0){
            normalizedAdditionalDistance = additionalDistance/minDistanceSincePause;
          }if(pauseCounter != 0){
            averagePauseDuration = allPauseDuaration/pauseCounter;
          }
          if(pauseDurationBeforeClickCounter != 0){
            averagePauseDurationBeforeClicks = allPauseDurationBeforeClick/pauseDurationBeforeClickCounter;
          }
          if(timeSpent != 0){
            timeMouseMovementsDIVIDEDBYTaskDuration = (timeSpent - allPauseDuaration)/timeSpent;
            averagePauseDurationDIVIDEDBYTaskDuration = averagePauseDuration/timeSpent;
            averagePauseDurationBeforeClicksDIVIDEDBYTaskDuration = averagePauseDurationBeforeClicks/timeSpent;
          }
          if(pauseCounter == 0){
            mouseMovementCounter = 1;
          }
          //Distanz
          minDistanceSincePause = Math.round(Math.sqrt(Math.pow(pauseY - lastSeenAt.y, 2) + Math.pow(pauseX - lastSeenAt.x, 2)));
          doOnce = false;
          mouseHoverCount = mouseHoverCount + 1;
          endHoverTime = (new Date()).getTime() - sHoverTime;
          allHoverTime = allHoverTime + endHoverTime;
          averageHoverTime = allHoverTime/mouseHoverCount;
          //DataTable of record
          var record = {
            "UserId": userId,
            "pageTime": timeSpent,
            "distance": totalDistance,
            "NAD": normalizedAdditionalDistance,
            "averageTimeOfMouseHoverThatTurnedIntoClicks": averageMouseHoverThatTurnedIntoClicks,
            "straightLinesCount": straightLinesCounter,
            "mouseClickCount": mouseClickCounter,
            "mouseHoverThatTurnedIntoClicksCount": countMouseHoverThatTurnedIntoClicks,
            "mouseMovementCount": mouseMovementCounter,
            "nonDirectMovementsCount": nonDirectMovementsCounter,
            "mouseClickCounterOutsideOfDirectMovements": mouseClickCounterOutsideOfDirectMovements,
            "mouseHoverCount": mouseHoverCount,
            "averagePauseDurationDIVIDEDBYTaskDuration": averagePauseDurationDIVIDEDBYTaskDuration,
            "averagePauseDurationBeforeClicksDIVIDEDBYTaskDuration": averagePauseDurationBeforeClicksDIVIDEDBYTaskDuration,
            "longDirectMovementCount": longStraightLinesCounter,
            "slowMovementCount": slowMovementCounter,
            "timeMouseMovementsDIVIDEDBYTaskDuration": timeMouseMovementsDIVIDEDBYTaskDuration,
            "averageHoverTime": averageHoverTime,
            "mouseMovementTime": allMouseMovementTime,
            "mouseHoverCount": mouseHoverCount
            } 
            // Sending data in JSON format using POST method
            var xmlhttp= new XMLHttpRequest();
            xmlhttp.open("POST", backEndURL, true);
            xmlhttp.setRequestHeader("Content-type", "application/json");
            //TODO: Testen ob notwendig
            var data = JSON.stringify(record);
            xmlhttp.send(data);
            console.log(record);
      }
    }
  }

  onmousemove = function (event) {
    elementExists = document.getElementsByClassName("text-2xl py-4 font-bold leading-tight text-gray-900 mouse");
    if (elementExists.length == 1) {
      if (!doOnce) {
        startTime = (new Date()).getTime();
      }
      doOnce = true;
      //Zeit
      //Distanz
      if (lastSeenAt.x) {
        totalDistance += Math.sqrt(Math.pow(lastSeenAt.y - event.clientY, 2) + Math.pow(lastSeenAt.x - event.clientX, 2));
        distanceSincePause += Math.sqrt(Math.pow(lastSeenAt.y - event.clientY, 2) + Math.pow(lastSeenAt.x - event.clientX, 2));
      }

      //MouseHover
      if ((document.elementFromPoint(event.clientX, event.clientY).tagName == "BUTTON" || document.elementFromPoint(event.clientX, event.clientY).tagName == "A") &&
        !(document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).tagName == "BUTTON" || document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).tagName == "A")
      ) {
        sHoverTime = (new Date()).getTime();
        mouseHover = true;
      } else if ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).tagName == "BUTTON" || document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).tagName == "A") &&
        !(document.elementFromPoint(event.clientX, event.clientY).tagName == "BUTTON" || document.elementFromPoint(event.clientX, event.clientY).tagName == "A")) {
        endHoverTime = (new Date()).getTime() - sHoverTime;
        mouseHoverCount = mouseHoverCount + 1;
        mouseHover = false;
      }
      lastSeenAt.x = event.clientX;
      lastSeenAt.y = event.clientY;

      isPause(event.clientX, event.clientY);
    }
  }

  function isPause(x,y){
    setTimeout(function(){ 
      if(x == lastSeenAt.x && y == lastSeenAt.y){
        countMovementTypes();
        sPauseDuration =  (new Date()).getTime() - pauseAfter;
        pauseX = x;
        pauseY = y;
        distanceSincePause = 0;
        mouseMovementCounter = mouseMovementCounter + 1;
        pause = true;
      }else if(pause){
        pauseDuration = (new Date()).getTime() - sPauseDuration - pauseAfter;
        allPauseDuaration = allPauseDuaration + pauseDuration;
        smouseMovementTime = (new Date()).getTime() - pauseAfter;
        pauseCounter += 1;
        pause = false;
      }
    }, pauseAfter);
  }

  function countMovementTypes(){
    mouseMovementTime = (new Date()).getTime() - smouseMovementTime - pauseAfter;
    allMouseMovementTime = allMouseMovementTime + mouseMovementTime;
    if(mouseMovementTime > 2000 ){
      slowMovementCounter = slowMovementCounter + 1;
    }
    minDistanceSincePause = Math.round(Math.sqrt(Math.pow(pauseY - lastSeenAt.y, 2) + Math.pow(pauseX - lastSeenAt.x, 2)));
    if((distanceSincePause/minDistanceSincePause) -1 < 0.05){
      straightLinesCounter = straightLinesCounter + 1;
      if(distanceSincePause > 120){
        longStraightLinesCounter = longStraightLinesCounter + 1;
      }
    }else{
      nonDirectMovementsCounter = nonDirectMovementsCounter + 1;
    }
  }

  const scan = data.scansJson
  const [scanInfoOpen, setScanInfoOpen] = useState(false)
  return (
    
    <Layout>
      <SEO title={"Scan #" + scan.id} />
      <div className="max-w-7xl py-8 mx-auto sm:px-6 lg:px-8">
        <div>
          <div>
            <nav className="sm:hidden" aria-label="Back">
              <Link
                to="/"
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <ChevronLeftIcon
                  className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Back
              </Link>
            </nav>
            <nav className="hidden sm:flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <div>
                    <Link
                      to="/"
                      className="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Worklist
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <Link
                      to="#"
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Scan #{scan.id}
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Scan #{scan.id}
              </h1>
            </div>
            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
              <button
                type="button"
                className="mr-4 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx={4} cy={4} r={3} />
                </svg>
                Active AI: Nodule detection & classification
              </button>
              <button
                onClick={() => setScanInfoOpen(true)}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ClipboardListIcon className="h-5 w-5 text-white mr-2" />
                Scan details
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8">
          <div className="flex-1">
            <ScanImage images={scan.images} />
          </div>
          <div className="flex-1">
            <NoduleList data={scan.nodules} />
          </div>
        </div>
        <Transition.Root show={scanInfoOpen} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed inset-0 overflow-hidden"
            open={scanInfoOpen}
            onClose={setScanInfoOpen}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Dialog.Overlay className="absolute inset-0" />

              <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Scan details
                          </Dialog.Title>
                          <div className="ml-3 h-7 flex items-center">
                            <button
                              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={() => setScanInfoOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 relative flex-1 px-4 sm:px-6">
                        {/* Replace with your content */}
                        <div className="absolute inset-0 px-4 sm:px-6">
                          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 ">
                                <dt className="text-sm font-medium text-gray-500">
                                  Priority
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                  <span
                                    className={classnames(
                                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                      {
                                        "bg-red-100 text-red-800":
                                          scan.priority.code == "High",
                                        "bg-yellow-100 text-yellow-800":
                                          scan.priority.code == "Medium",
                                        "bg-green-100 text-green-800":
                                          scan.priority.code == "Low",
                                      }
                                    )}
                                  >
                                    {scan.priority.code}:{" "}
                                    {scan.priority.explanation}
                                  </span>
                                </dd>
                              </div>
                              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 ">
                                <dt className="text-sm font-medium text-gray-500">
                                  Patient
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                  <div className="flex flex-col">
                                    <div className="text-sm text-gray-900">
                                      {scan.patient.name}
                                    </div>
                                    <div className="text-sm text-gray-900">
                                      {scan.patient.sex}
                                    </div>
                                    <div className="text-sm text-gray-900">
                                      {scan.patient.age} years
                                    </div>
                                    <button
                                      type="button"
                                      className="inline-flex w-40 items-center mt-2 px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                      <ArrowCircleRightIcon className="h-4 w-4 text-white mr-2" />
                                      Open full EHR
                                    </button>
                                  </div>
                                </dd>
                              </div>
                              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 ">
                                <dt className="text-sm font-medium text-gray-500">
                                  Procedure
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                  <div className="flex flex-col">
                                    <div className="text-sm text-gray-900">
                                      {scan.procedure.name}
                                    </div>
                                    <div className="text-sm text-gray-900">
                                      {scan.procedure.datetime}
                                    </div>
                                    <div className="text-sm text-gray-900">
                                      {scan.procedure.reason}
                                    </div>
                                  </div>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                        {/* /End replace */}
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query ScanbyId($scanId: String!) {
    scansJson(id: { eq: $scanId }) {
      id
      priority {
        code
        explanation
      }
      patient {
        name
        sex
        age
      }
      procedure {
        datetime
        name
        reason
      }
      images {
        raw
        overlay
        num_slices
        raw_slices
        overlay_slices
      }
      nodules {
        id
        measurements {
          name
          stat
          unit
        }
        classifications {
          main {
            ai
            physician
          }
        }
        images {
          thumbnail
        }
      }
    }
  }
`
Scan.propTypes = {
  data: PropTypes.shape({
    scansJson: PropTypes.shape({
      id: PropTypes.string.isRequired,
      priority: PropTypes.shape({
        code: PropTypes.string,
        explanation: PropTypes.string,
      }),
      patient: PropTypes.shape({
        name: PropTypes.string,
        sex: PropTypes.string,
        age: PropTypes.number,
      }),
      procedure: PropTypes.shape({
        name: PropTypes.string,
        datetime: PropTypes.string,
        reason: PropTypes.string,
      }),
      images: PropTypes.shape({
        raw: PropTypes.string,
        overlay: PropTypes.string,
        num_slices: PropTypes.number,
        raw_slices: PropTypes.string,
        overlay_slices: PropTypes.string,
      }),
      nodules: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        images: PropTypes.shape({
          thumbnail: PropTypes.string,
        }),
        measurements: PropTypes.arrayOf({
          name: PropTypes.string,
          stat: PropTypes.number,
          unit: PropTypes.string,
        }),
        classifications: PropTypes.shape({
          main: PropTypes.shape({
            ai: PropTypes.number,
            physician: PropTypes.string,
          }),
        }),
      }),
    }),
  }),
}
export default Scan
