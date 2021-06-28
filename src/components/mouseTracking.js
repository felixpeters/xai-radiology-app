import React, { Component } from "react"
import { render } from "react-dom";

class MouseTracking extends Component {
    componentDidMount() {

        //Initialize Page
        const isBrowser = typeof window !== "undefined"
        var wasOnPage = true;
        if (isBrowser) {
            onmouseover = function () {

                if (wasOnPage && isBrowser) {
                    wasOnPage = false;
                      
                    //mus.js
                    //TODO: Is broken, because mus.js also uses onmousemove in line 218
                    var json;
                    var mus = new Mus();
                    mus.setTimePoint(true);
                    mus.setPlaybackSpeed(mus.speed.SLOW);
                    mus.record();
                    var endRecord = function () {
                      mus.stop();
                      getReport();
                    };
                    const getReport = function () {
                      json = JSON.stringify(mus.getData());
                    }
                    
                    //Public Settings
                    var userId = "3";
                    var backEndURL = "https://mouse-tracking-api.brickstream.eu/api/records";
                    var pauseAfter = 200;
                    var trackingPathName = "/scans/1234";
                    var trackingPathName2 = "/scans/1234/";
                    var transparent = true;
                    //logic variable
                    var doOnce = true;
                    var elementExists = document.getElementsByClassName("text-2xl py-4 font-bold leading-tight text-gray-900 mouse");
                    var pause = true;
                    //time
                    var startTime = (new Date()).getTime();
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
                    var allNormalizedAdditionalDistance = 0;
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
                    var allMinDistanceSincePause = 0;

                    //Duration of Pause
                    var pauseCounter = 0;
                    var sPauseDuration = (new Date()).getTime();
                    var pauseDuration = 0;
                    var allPauseDuration = 0;
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
                    var uTurnCounter = 0;
                    var distanceSincePauseBuffer = 0;
                    var minDistanceSincePauseBuffer = 0;

                    /**
                     * This functions sets the values if a user is clicking
                     * and posts the data to the backend
                     */
                    onclick = function () {
                        //Set StartTime
                        if ((document.getElementsByClassName("text-2xl py-4 font-bold leading-tight text-gray-900 mouse").length != 1) && (window.location.pathname === trackingPathName)) {
                            startTime = (new Date()).getTime();
                            sPauseDuration = (new Date()).getTime();
                        }
                        //Find Element on Page
                        elementExists = document.getElementsByClassName("text-2xl py-4 font-bold leading-tight text-gray-900 mouse");
                        if (elementExists.length == 1) {
                            //MouseClickCounter
                            mouseClickCounter += 1;
                            //mouseClickCounterOutsideOfDirectMovements
                            if (pause) {
                                mouseClickCounterOutsideOfDirectMovements = mouseClickCounterOutsideOfDirectMovements + 1;
                                pauseDurationBeforeClick = (new Date()).getTime() - sPauseDuration;
                                allPauseDurationBeforeClick = allPauseDurationBeforeClick + pauseDurationBeforeClick;
                                pauseDurationBeforeClickCounter = pauseDurationBeforeClickCounter + 1;
                            }
                            //MouseHover
                            if (mouseHover) {
                                if ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent == "Scan details")||(document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent == "Active AI: Nodule detection & classification")) {
                                    endHoverTime = (new Date()).getTime() - sHoverTime;
                                    allHoverTime = allHoverTime + endHoverTime;
                                }
                                mouseHoverThatTurnedIntoClicks = (new Date()).getTime() - sHoverTime;
                                countMouseHoverThatTurnedIntoClicks = countMouseHoverThatTurnedIntoClicks + 1;
                                mouseHover = false;
                                allMouseHoverThatTurnedIntoClicks = allMouseHoverThatTurnedIntoClicks + mouseHoverThatTurnedIntoClicks;
                                averageMouseHoverThatTurnedIntoClicks = allMouseHoverThatTurnedIntoClicks / countMouseHoverThatTurnedIntoClicks;
                            }
                            //Check if leaving page and posting Data
                            var isOnScansPage = (window.location.pathname === trackingPathName) || (window.location.pathname === trackingPathName2);
                            if (!isOnScansPage) {
                                timeSpent = (new Date()).getTime() - startTime;
                                endRecord(); // mus.js stops recording
                                if (pause) {
                                    pauseDuration = (new Date()).getTime() - sPauseDuration;
                                    allPauseDuration = allPauseDuration + pauseDuration;
                                }
                                if (!pause) {
                                    mouseMovementTime = (new Date()).getTime() - smouseMovementTime;
                                    allMouseMovementTime = allMouseMovementTime + mouseMovementTime;
                                }
                                minDistanceSincePause = Math.round(Math.sqrt(Math.pow(pauseY - lastSeenAt.y, 2) + Math.pow(pauseX - lastSeenAt.x, 2)));
                                additionalDistance = distanceSincePause - minDistanceSincePause;
                                allMinDistanceSincePause = allMinDistanceSincePause + minDistanceSincePause;
                                if ((additionalDistance != 0) && (minDistanceSincePause != 0)) {
                                    normalizedAdditionalDistance = additionalDistance / minDistanceSincePause;
                                } else {
                                    normalizedAdditionalDistance = ((distanceSincePauseBuffer - minDistanceSincePauseBuffer) / minDistanceSincePauseBuffer)
                                }
                                if (pauseCounter != 0) {
                                    averagePauseDuration = allPauseDuration / pauseCounter;
                                }
                                if (pauseDurationBeforeClickCounter != 0) {
                                    averagePauseDurationBeforeClicks = allPauseDurationBeforeClick / pauseDurationBeforeClickCounter;
                                }
                                if (timeSpent != 0) {
                                    timeMouseMovementsDIVIDEDBYTaskDuration = (allMouseMovementTime / timeSpent);
                                    averagePauseDurationDIVIDEDBYTaskDuration = averagePauseDuration / timeSpent;
                                    averagePauseDurationBeforeClicksDIVIDEDBYTaskDuration = averagePauseDurationBeforeClicks / timeSpent;
                                }
                                if (!pause) {
                                    mouseMovementCounter += 1;
                                    countMovementTypes();
                                }
                                doOnce = true;
                                endHoverTime = (new Date()).getTime() - sHoverTime;
                                allHoverTime = allHoverTime + endHoverTime;
                                averageHoverTime = allHoverTime / mouseHoverCount;
                                allNormalizedAdditionalDistance = (totalDistance - allMinDistanceSincePause) / allMinDistanceSincePause;
                                //DataTable of record
                                var record = {
                                    "UserId": userId, //Test bestanden  
                                    "PageTime": timeSpent,  //Test bestanden  
                                    "Distance": totalDistance,  //Test bestanden  
                                    "NAD": normalizedAdditionalDistance,  //Test bestanden
                                    "AllMouseHoverThatTurnedIntoClicks": allMouseHoverThatTurnedIntoClicks,
                                    "AverageTimeOfMouseHoverThatTurnedIntoClicks": averageMouseHoverThatTurnedIntoClicks, //Test bestanden 
                                    "StraightLinesCount": straightLinesCounter,  //Test bestanden 
                                    "MouseClickCount": mouseClickCounter, //Test bestanden 
                                    "MouseHoverThatTurnedIntoClicksCount": countMouseHoverThatTurnedIntoClicks, //Test bestanden  |  svg x wird nicht gezählt + Man muss neu hovern, um counter zu erhöhen
                                    "MouseMovementCount": mouseMovementCounter, //Test bestanden 
                                    "NonDirectMovementsCount": nonDirectMovementsCounter, //Test bestanden 
                                    "MouseClickCounterOutsideOfDirectMovements": mouseClickCounterOutsideOfDirectMovements,  //Test bestanden
                                    "MouseHoverCount": mouseHoverCount, //Test bestanden  | Nur <button> oder <a>
                                    "AllPauseDuration": allPauseDuration,                                    
                                    "AveragePauseDuration": averagePauseDuration,
                                    "AveragePauseDurationDIVIDEDBYTaskDuration": averagePauseDurationDIVIDEDBYTaskDuration,  //Test bestanden
                                    "AllPauseDurationBeforeClick": allPauseDurationBeforeClick,
                                    "PauseDurationBeforeClickCounter": pauseDurationBeforeClickCounter,
                                    "AveragePauseDurationBeforeClicksDIVIDEDBYTaskDuration": averagePauseDurationBeforeClicksDIVIDEDBYTaskDuration,  //Test bestanden
                                    "LongDirectMovementCount": longStraightLinesCounter, //Test bestanden 
                                    "SlowMovementCount": slowMovementCounter, //Test bestanden 
                                    "TimeMouseMovementsDIVIDEDBYTaskDuration": timeMouseMovementsDIVIDEDBYTaskDuration,  //Test bestanden 
                                    "AllHoverTime": allHoverTime,
                                    "AverageHoverTime": averageHoverTime, //Test bestanden 
                                    "MouseMovementTime": allMouseMovementTime,  //Test bestanden 
                                    "PauseCount": pauseCounter,  //Test bestanden 
                                    "AllMinDistanceSincePause": allMinDistanceSincePause,
                                    "AllNormalizedAdditionalDistance": allNormalizedAdditionalDistance,  //Test bestanden
                                    "UTurnCount": uTurnCounter, //Test bestanden 
                                    "Json": json,
                                    "Transparent": transparent
                                }
                                // Sending data in JSON format using POST method
                                var xmlhttp = new XMLHttpRequest();
                                xmlhttp.open("POST", backEndURL, true);
                                xmlhttp.setRequestHeader("Content-type", "application/json");
                                var data = JSON.stringify(record);
                                xmlhttp.send(data);
                                wasOnPage = true;
                            }
                        }
                    }

                    /**
                     * This function is triggert, if the mouse moves. Because of that, mus.js is not working.
                     * Calculates the distance, mouseHover and checks for a pause.
                     */
                    onmousemove = function (event) {
                        elementExists = document.getElementsByClassName("text-2xl py-4 font-bold leading-tight text-gray-900 mouse");
                        if (elementExists.length == 1) {
                            //Set startPosition
                            if (doOnce) {
                                pauseX = event.x;
                                pauseY = event.y;
                                if (((new Date()).getTime() - startTime) > pauseAfter) {
                                    pauseCounter += 1;
                                }
                            }
                            doOnce = false;
                            //Distanz
                            if (lastSeenAt.x) {
                                totalDistance += Math.sqrt(Math.pow(lastSeenAt.y - event.clientY, 2) + Math.pow(lastSeenAt.x - event.clientX, 2));
                                distanceSincePause += Math.sqrt(Math.pow(lastSeenAt.y - event.clientY, 2) + Math.pow(lastSeenAt.x - event.clientX, 2));
                            }
                            //MouseHover
                            if(document.elementFromPoint(lastSeenAt.x, lastSeenAt.y) != null){
                                if ((document.elementFromPoint(event.clientX, event.clientY).tagName == "BUTTON" || document.elementFromPoint(event.clientX, event.clientY).tagName == "A") &&
                                    !(document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).tagName == "BUTTON" || document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).tagName == "A")
                                ) {
                                    sHoverTime = (new Date()).getTime();
                                    mouseHoverCount = mouseHoverCount + 1;
                                    mouseHover = true;
                                } else if ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).tagName == "BUTTON" || document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).tagName == "A") &&
                                    !(document.elementFromPoint(event.clientX, event.clientY).tagName == "BUTTON" || document.elementFromPoint(event.clientX, event.clientY).tagName == "A")) {
                                    endHoverTime = (new Date()).getTime() - sHoverTime;
                                    allHoverTime = allHoverTime + endHoverTime;
                                    mouseHover = false;
                                }
                            }
                            isPause(event.clientX, event.clientY);
                            lastSeenAt.x = event.clientX;
                            lastSeenAt.y = event.clientY;


                        }
                    }

                    /**
                     * Set var and check if there is an mouse idle
                     * @param {position X} x 
                     * @param {position Y} y 
                     */
                    function isPause(x, y) {
                        setTimeout(function () {
                            if (x == lastSeenAt.x && y == lastSeenAt.y) {
                                if (!pause) {
                                    minDistanceSincePause = Math.round(Math.sqrt(Math.pow(pauseY - lastSeenAt.y, 2) + Math.pow(pauseX - lastSeenAt.x, 2)));
                                    minDistanceSincePauseBuffer = minDistanceSincePause;
                                    allMinDistanceSincePause = allMinDistanceSincePause + minDistanceSincePause;
                                    sPauseDuration = (new Date()).getTime() - pauseAfter;
                                    pauseX = x;
                                    pauseY = y;
                                    mouseMovementTime = (new Date()).getTime() - smouseMovementTime - pauseAfter;
                                    allMouseMovementTime = allMouseMovementTime + mouseMovementTime;
                                    countMovementTypes();
                                    distanceSincePauseBuffer = distanceSincePause;
                                    distanceSincePause = 0;
                                    mouseMovementCounter = mouseMovementCounter + 1;
                                }
                                pause = true;
                            } else if (pause) {
                                pauseDuration = (new Date()).getTime() - sPauseDuration - pauseAfter;
                                allPauseDuration = allPauseDuration + pauseDuration;
                                smouseMovementTime = (new Date()).getTime() - pauseAfter;
                                pauseCounter += 1;
                                pause = false;
                            }
                        }, pauseAfter);
                    }
                    /**
                     * Counts the different MovementTime after a Pause and onPageLeave
                     */
                    function countMovementTypes() {
                        if (mouseMovementTime > 2000) {
                            slowMovementCounter = slowMovementCounter + 1;
                        }
                        if ((distanceSincePause / minDistanceSincePause) - 1 < 0.05) {
                            straightLinesCounter = straightLinesCounter + 1;
                            if (distanceSincePause > 120) {
                                longStraightLinesCounter = longStraightLinesCounter + 1;
                            }
                        } else {
                            nonDirectMovementsCounter = nonDirectMovementsCounter + 1;
                        }
                        if ((distanceSincePause / minDistanceSincePause) > 1.3) {
                            uTurnCounter += 1;
                        }
                    }
                }
            }



        }
    }

    render() {
        return (
            <div style={{ visibility: "hidden" }}>MouseTracking</div>
        );
    }
}
export default MouseTracking