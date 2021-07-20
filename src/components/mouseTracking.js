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
                    var lastMouseStyle = "auto";
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
                                if ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent == "Scan details")
                                    || ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent) == "Model card")
                                    || ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent) == "Active AI: Nodule detection & classification")
                                    || ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent) == "")
                                    || ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent) == "Select a tabOverviewClinical validationDatasetsPerformanceOverviewClinical validationDatasetsPerformanceDatasetsData formatLow-dose chest CTs in DICOM formatRecording period01.01.2016-31.12.2016Recording devicesGE LightspeedSiemens SensationToshiba AquilionPhilips BrillianceSiemens EmotionSiemens DefinitionPatient cohort10,100 patients (male: 4950, female: 5150, age: 55 +/- 10.50)Nodule distributionstotal: 26,512 nodules from 10,100 scans (benign: 20,711, malignant: 5,901, avg. diameter: 10.2 +/- 6.7 mm)training dataset: 21,612 nodules from 8,200 scans (benign: 16,801, malignant: 4,811, avg. diameter: 10.1 +/- 6.8 mm)test dataset: 5,000 nodules from 1,900 scans (benign: 3,910, malignant: 1,090, avg. diameter: 10.3 +/- 6.6 mm)Labeling procedureLabels determined by 3/4 radiologist consensus (see Clinical Validation for more information)Data preprocessingRescaling to consistent voxel sizeIntensity rescaling to 0-1 rangeCenter spatial cropping to uniform volume size")
                                    || ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent) == "Datasets")
                                    || ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent) == "Select a tabOverviewClinical validationDatasetsPerformanceOverviewClinical validationDatasetsPerformanceModule overviewModule nameLung nodule detection & classificationPublication date13.06.2020, Version 1.0.3-0085DeveloperRadiology AI Inc., 1 Main Street, San Francisco, CA 94107, USAIntended useThe module provides AI-based support to help the user detect, classify and report lung nodules in CT scans. It is intended to be used by trained healthcare professionals to assist in the diagnosis of lung cancer.LimitationsThe nodule detection and classification module is optimized for Low Dose-CT. However, the models will process any chest CT in DICOM format, including regular dose CT, CAP and PA series.Included modelsModel 1: Segmentation of lung nodules in chest CT scansModel 2: Classification of lung nodules from their 3D image volume into benign or malignant nodules")
                                    || ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent) == "Clinical validation")
                                    || ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent) == "RadiologyAI Module: Nodule Detection & Classification")
                                    || ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent) == "Overview")
                                    || ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent) == "Performance")
                                    || ((document.elementFromPoint(lastSeenAt.x, lastSeenAt.y).textContent) == "Scan #1234")
                                ) {
                                    endHoverTime = (new Date()).getTime() - sHoverTime;
                                    allHoverTime = allHoverTime + endHoverTime;
                                }
                                lastMouseStyle = "auto";
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
                                    "UserId": userId, //Test bestanden  2
                                    "PageTime": timeSpent,  //Test bestanden  2
                                    "Distance": totalDistance,  //Test bestanden  2
                                    "NAD": normalizedAdditionalDistance,  //Test bestanden 2
                                    "AllMouseHoverThatTurnedIntoClicks": allMouseHoverThatTurnedIntoClicks, //Test bestanden 2
                                    "AverageTimeOfMouseHoverThatTurnedIntoClicks": averageMouseHoverThatTurnedIntoClicks, //Test bestanden 2
                                    "StraightLinesCount": straightLinesCounter,  //Test bestanden 2
                                    "MouseClickCount": mouseClickCounter, //Test bestanden 2
                                    "MouseHoverThatTurnedIntoClicksCount": countMouseHoverThatTurnedIntoClicks, //Test bestanden  2
                                    "MouseMovementCount": mouseMovementCounter, //Test bestanden 2
                                    "NonDirectMovementsCount": nonDirectMovementsCounter, //Test bestanden 2
                                    "MouseClickCounterOutsideOfDirectMovements": mouseClickCounterOutsideOfDirectMovements,  //Test bestanden  2
                                    "MouseHoverCount": mouseHoverCount, //Test bestanden 2
                                    "AllPauseDuration": allPauseDuration,     //Test bestanden 2                               
                                    "AveragePauseDuration": averagePauseDuration,     //Test bestanden 2      
                                    "AveragePauseDurationDIVIDEDBYTaskDuration": averagePauseDurationDIVIDEDBYTaskDuration,  //Test bestanden  2
                                    "AllPauseDurationBeforeClick": allPauseDurationBeforeClick,  //Test bestanden  2
                                    "PauseDurationBeforeClickCounter": pauseDurationBeforeClickCounter, //Test bestanden 2 (==mouseClickCounterOutsideOfDirectMovements)
                                    "AveragePauseDurationBeforeClicksDIVIDEDBYTaskDuration": averagePauseDurationBeforeClicksDIVIDEDBYTaskDuration,  //Test bestanden  2
                                    "LongDirectMovementCount": longStraightLinesCounter, //Test bestanden 2
                                    "SlowMovementCount": slowMovementCounter, //Test bestanden 2
                                    "TimeMouseMovementsDIVIDEDBYTaskDuration": timeMouseMovementsDIVIDEDBYTaskDuration,  //Test bestanden 2
                                    "AllHoverTime": allHoverTime, // Test bestanden 2
                                    "AverageHoverTime": averageHoverTime, //Test bestanden 2
                                    "MouseMovementTime": allMouseMovementTime,  //Test bestanden 2
                                    "PauseCount": pauseCounter,  //Test bestanden 2
                                    "AllMinDistanceSincePause": allMinDistanceSincePause,   //Test bestanden 2
                                    "AllNormalizedAdditionalDistance": allNormalizedAdditionalDistance,  //Test bestanden  2
                                    "UTurnCount": uTurnCounter, //Test bestanden 2
                                    "Json": json,   //Test bestanden 2
                                    "Transparent": transparent  //Test bestanden 2
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
                            if ((window.getComputedStyle(event.target)["cursor"]) != null) {
                                if ((window.getComputedStyle(event.target)["cursor"] != "auto") && (lastMouseStyle == "auto") && !mouseHover) {
                                    lastMouseStyle = (window.getComputedStyle(event.target)["cursor"]);
                                    sHoverTime = (new Date()).getTime();
                                    mouseHoverCount = mouseHoverCount + 1;
                                    mouseHover = true;
                                } else if ((window.getComputedStyle(event.target)["cursor"] == "auto") && (lastMouseStyle != "auto") && mouseHover) {
                                    endHoverTime = (new Date()).getTime() - sHoverTime;
                                    allHoverTime = allHoverTime + endHoverTime;
                                    mouseHover = false;
                                    lastMouseStyle = "auto";
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
                        //Dectect Browsers
                        // Firefox 1.0+
                        var isFirefox = typeof InstallTrigger !== 'undefined';
                        //Browser Unterscheidung Firefox 
                        if (distanceSincePause < 120 && !isFirefox) {
                            if (mouseMovementTime > 2000) {
                                slowMovementCounter = slowMovementCounter + 1;
                            }
                            if ((distanceSincePause / minDistanceSincePause) - 1 < 0.29) {
                                straightLinesCounter = straightLinesCounter + 1;
                            } else {
                                nonDirectMovementsCounter = nonDirectMovementsCounter + 1;
                            }
                            if ((distanceSincePause / minDistanceSincePause) > 1.85) {
                                uTurnCounter += 1;
                            }
                        } else {
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
                            if ((distanceSincePause / minDistanceSincePause) > 1.4) {
                                uTurnCounter += 1;
                            }
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