/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 21048.0, "series": [{"data": [[0.0, 0.0], [0.1, 0.0], [0.2, 1.0], [0.3, 1.0], [0.4, 1.0], [0.5, 1.0], [0.6, 1.0], [0.7, 1.0], [0.8, 1.0], [0.9, 1.0], [1.0, 1.0], [1.1, 1.0], [1.2, 1.0], [1.3, 1.0], [1.4, 1.0], [1.5, 1.0], [1.6, 1.0], [1.7, 1.0], [1.8, 1.0], [1.9, 1.0], [2.0, 1.0], [2.1, 1.0], [2.2, 1.0], [2.3, 1.0], [2.4, 1.0], [2.5, 1.0], [2.6, 1.0], [2.7, 1.0], [2.8, 1.0], [2.9, 1.0], [3.0, 1.0], [3.1, 1.0], [3.2, 1.0], [3.3, 1.0], [3.4, 1.0], [3.5, 1.0], [3.6, 1.0], [3.7, 1.0], [3.8, 1.0], [3.9, 1.0], [4.0, 1.0], [4.1, 1.0], [4.2, 2.0], [4.3, 2.0], [4.4, 2.0], [4.5, 2.0], [4.6, 2.0], [4.7, 2.0], [4.8, 2.0], [4.9, 2.0], [5.0, 2.0], [5.1, 2.0], [5.2, 2.0], [5.3, 2.0], [5.4, 2.0], [5.5, 2.0], [5.6, 2.0], [5.7, 2.0], [5.8, 3.0], [5.9, 3.0], [6.0, 3.0], [6.1, 68.0], [6.2, 69.0], [6.3, 69.0], [6.4, 69.0], [6.5, 69.0], [6.6, 69.0], [6.7, 69.0], [6.8, 69.0], [6.9, 70.0], [7.0, 70.0], [7.1, 70.0], [7.2, 70.0], [7.3, 70.0], [7.4, 70.0], [7.5, 70.0], [7.6, 70.0], [7.7, 70.0], [7.8, 70.0], [7.9, 70.0], [8.0, 70.0], [8.1, 70.0], [8.2, 70.0], [8.3, 70.0], [8.4, 70.0], [8.5, 70.0], [8.6, 70.0], [8.7, 70.0], [8.8, 70.0], [8.9, 70.0], [9.0, 70.0], [9.1, 70.0], [9.2, 70.0], [9.3, 70.0], [9.4, 70.0], [9.5, 70.0], [9.6, 71.0], [9.7, 71.0], [9.8, 71.0], [9.9, 71.0], [10.0, 71.0], [10.1, 71.0], [10.2, 71.0], [10.3, 71.0], [10.4, 71.0], [10.5, 71.0], [10.6, 71.0], [10.7, 71.0], [10.8, 71.0], [10.9, 71.0], [11.0, 71.0], [11.1, 71.0], [11.2, 71.0], [11.3, 71.0], [11.4, 71.0], [11.5, 71.0], [11.6, 71.0], [11.7, 71.0], [11.8, 71.0], [11.9, 71.0], [12.0, 71.0], [12.1, 71.0], [12.2, 71.0], [12.3, 71.0], [12.4, 71.0], [12.5, 71.0], [12.6, 71.0], [12.7, 71.0], [12.8, 71.0], [12.9, 71.0], [13.0, 71.0], [13.1, 71.0], [13.2, 71.0], [13.3, 71.0], [13.4, 71.0], [13.5, 71.0], [13.6, 71.0], [13.7, 72.0], [13.8, 72.0], [13.9, 72.0], [14.0, 72.0], [14.1, 72.0], [14.2, 72.0], [14.3, 72.0], [14.4, 72.0], [14.5, 72.0], [14.6, 72.0], [14.7, 72.0], [14.8, 72.0], [14.9, 72.0], [15.0, 72.0], [15.1, 72.0], [15.2, 72.0], [15.3, 72.0], [15.4, 72.0], [15.5, 72.0], [15.6, 72.0], [15.7, 72.0], [15.8, 72.0], [15.9, 72.0], [16.0, 72.0], [16.1, 72.0], [16.2, 72.0], [16.3, 72.0], [16.4, 72.0], [16.5, 72.0], [16.6, 72.0], [16.7, 72.0], [16.8, 72.0], [16.9, 72.0], [17.0, 72.0], [17.1, 72.0], [17.2, 72.0], [17.3, 72.0], [17.4, 72.0], [17.5, 72.0], [17.6, 72.0], [17.7, 72.0], [17.8, 72.0], [17.9, 72.0], [18.0, 72.0], [18.1, 72.0], [18.2, 73.0], [18.3, 73.0], [18.4, 73.0], [18.5, 73.0], [18.6, 73.0], [18.7, 73.0], [18.8, 73.0], [18.9, 73.0], [19.0, 73.0], [19.1, 73.0], [19.2, 73.0], [19.3, 73.0], [19.4, 73.0], [19.5, 73.0], [19.6, 73.0], [19.7, 73.0], [19.8, 73.0], [19.9, 73.0], [20.0, 73.0], [20.1, 73.0], [20.2, 73.0], [20.3, 73.0], [20.4, 73.0], [20.5, 73.0], [20.6, 73.0], [20.7, 73.0], [20.8, 73.0], [20.9, 73.0], [21.0, 73.0], [21.1, 73.0], [21.2, 73.0], [21.3, 73.0], [21.4, 73.0], [21.5, 73.0], [21.6, 73.0], [21.7, 73.0], [21.8, 73.0], [21.9, 73.0], [22.0, 73.0], [22.1, 73.0], [22.2, 73.0], [22.3, 73.0], [22.4, 73.0], [22.5, 73.0], [22.6, 73.0], [22.7, 74.0], [22.8, 74.0], [22.9, 74.0], [23.0, 74.0], [23.1, 74.0], [23.2, 74.0], [23.3, 74.0], [23.4, 74.0], [23.5, 74.0], [23.6, 74.0], [23.7, 74.0], [23.8, 74.0], [23.9, 74.0], [24.0, 74.0], [24.1, 74.0], [24.2, 74.0], [24.3, 74.0], [24.4, 74.0], [24.5, 74.0], [24.6, 74.0], [24.7, 74.0], [24.8, 74.0], [24.9, 74.0], [25.0, 74.0], [25.1, 74.0], [25.2, 74.0], [25.3, 74.0], [25.4, 74.0], [25.5, 74.0], [25.6, 74.0], [25.7, 74.0], [25.8, 74.0], [25.9, 74.0], [26.0, 74.0], [26.1, 74.0], [26.2, 74.0], [26.3, 74.0], [26.4, 74.0], [26.5, 74.0], [26.6, 74.0], [26.7, 75.0], [26.8, 75.0], [26.9, 75.0], [27.0, 75.0], [27.1, 75.0], [27.2, 75.0], [27.3, 75.0], [27.4, 75.0], [27.5, 75.0], [27.6, 75.0], [27.7, 75.0], [27.8, 75.0], [27.9, 75.0], [28.0, 75.0], [28.1, 75.0], [28.2, 75.0], [28.3, 75.0], [28.4, 75.0], [28.5, 75.0], [28.6, 75.0], [28.7, 75.0], [28.8, 75.0], [28.9, 75.0], [29.0, 75.0], [29.1, 75.0], [29.2, 75.0], [29.3, 75.0], [29.4, 75.0], [29.5, 75.0], [29.6, 75.0], [29.7, 75.0], [29.8, 75.0], [29.9, 75.0], [30.0, 75.0], [30.1, 75.0], [30.2, 75.0], [30.3, 75.0], [30.4, 76.0], [30.5, 76.0], [30.6, 76.0], [30.7, 76.0], [30.8, 76.0], [30.9, 76.0], [31.0, 76.0], [31.1, 76.0], [31.2, 76.0], [31.3, 76.0], [31.4, 76.0], [31.5, 76.0], [31.6, 76.0], [31.7, 76.0], [31.8, 76.0], [31.9, 76.0], [32.0, 76.0], [32.1, 76.0], [32.2, 76.0], [32.3, 76.0], [32.4, 76.0], [32.5, 76.0], [32.6, 76.0], [32.7, 76.0], [32.8, 76.0], [32.9, 76.0], [33.0, 76.0], [33.1, 76.0], [33.2, 76.0], [33.3, 76.0], [33.4, 76.0], [33.5, 77.0], [33.6, 77.0], [33.7, 77.0], [33.8, 77.0], [33.9, 77.0], [34.0, 77.0], [34.1, 77.0], [34.2, 77.0], [34.3, 77.0], [34.4, 77.0], [34.5, 77.0], [34.6, 77.0], [34.7, 77.0], [34.8, 77.0], [34.9, 77.0], [35.0, 77.0], [35.1, 77.0], [35.2, 77.0], [35.3, 77.0], [35.4, 77.0], [35.5, 77.0], [35.6, 77.0], [35.7, 77.0], [35.8, 77.0], [35.9, 77.0], [36.0, 77.0], [36.1, 77.0], [36.2, 77.0], [36.3, 77.0], [36.4, 78.0], [36.5, 78.0], [36.6, 78.0], [36.7, 78.0], [36.8, 78.0], [36.9, 78.0], [37.0, 78.0], [37.1, 78.0], [37.2, 78.0], [37.3, 78.0], [37.4, 78.0], [37.5, 78.0], [37.6, 78.0], [37.7, 78.0], [37.8, 78.0], [37.9, 78.0], [38.0, 78.0], [38.1, 78.0], [38.2, 78.0], [38.3, 78.0], [38.4, 78.0], [38.5, 78.0], [38.6, 78.0], [38.7, 78.0], [38.8, 78.0], [38.9, 78.0], [39.0, 79.0], [39.1, 79.0], [39.2, 79.0], [39.3, 79.0], [39.4, 79.0], [39.5, 79.0], [39.6, 79.0], [39.7, 79.0], [39.8, 79.0], [39.9, 79.0], [40.0, 79.0], [40.1, 79.0], [40.2, 79.0], [40.3, 79.0], [40.4, 79.0], [40.5, 79.0], [40.6, 79.0], [40.7, 79.0], [40.8, 79.0], [40.9, 79.0], [41.0, 79.0], [41.1, 79.0], [41.2, 80.0], [41.3, 80.0], [41.4, 80.0], [41.5, 80.0], [41.6, 80.0], [41.7, 80.0], [41.8, 80.0], [41.9, 80.0], [42.0, 80.0], [42.1, 80.0], [42.2, 80.0], [42.3, 80.0], [42.4, 80.0], [42.5, 80.0], [42.6, 80.0], [42.7, 80.0], [42.8, 80.0], [42.9, 80.0], [43.0, 80.0], [43.1, 80.0], [43.2, 80.0], [43.3, 81.0], [43.4, 81.0], [43.5, 81.0], [43.6, 81.0], [43.7, 81.0], [43.8, 81.0], [43.9, 81.0], [44.0, 81.0], [44.1, 81.0], [44.2, 81.0], [44.3, 81.0], [44.4, 81.0], [44.5, 81.0], [44.6, 81.0], [44.7, 81.0], [44.8, 81.0], [44.9, 81.0], [45.0, 81.0], [45.1, 82.0], [45.2, 82.0], [45.3, 82.0], [45.4, 82.0], [45.5, 82.0], [45.6, 82.0], [45.7, 82.0], [45.8, 82.0], [45.9, 82.0], [46.0, 82.0], [46.1, 82.0], [46.2, 82.0], [46.3, 82.0], [46.4, 82.0], [46.5, 82.0], [46.6, 82.0], [46.7, 83.0], [46.8, 83.0], [46.9, 83.0], [47.0, 83.0], [47.1, 83.0], [47.2, 83.0], [47.3, 83.0], [47.4, 83.0], [47.5, 83.0], [47.6, 83.0], [47.7, 83.0], [47.8, 83.0], [47.9, 83.0], [48.0, 83.0], [48.1, 83.0], [48.2, 83.0], [48.3, 84.0], [48.4, 84.0], [48.5, 84.0], [48.6, 84.0], [48.7, 84.0], [48.8, 84.0], [48.9, 84.0], [49.0, 84.0], [49.1, 84.0], [49.2, 84.0], [49.3, 84.0], [49.4, 84.0], [49.5, 84.0], [49.6, 84.0], [49.7, 84.0], [49.8, 85.0], [49.9, 85.0], [50.0, 85.0], [50.1, 85.0], [50.2, 85.0], [50.3, 85.0], [50.4, 85.0], [50.5, 85.0], [50.6, 85.0], [50.7, 85.0], [50.8, 85.0], [50.9, 85.0], [51.0, 85.0], [51.1, 86.0], [51.2, 86.0], [51.3, 86.0], [51.4, 86.0], [51.5, 86.0], [51.6, 86.0], [51.7, 86.0], [51.8, 86.0], [51.9, 86.0], [52.0, 86.0], [52.1, 86.0], [52.2, 86.0], [52.3, 87.0], [52.4, 87.0], [52.5, 87.0], [52.6, 87.0], [52.7, 87.0], [52.8, 87.0], [52.9, 87.0], [53.0, 87.0], [53.1, 87.0], [53.2, 87.0], [53.3, 87.0], [53.4, 87.0], [53.5, 88.0], [53.6, 88.0], [53.7, 88.0], [53.8, 88.0], [53.9, 88.0], [54.0, 88.0], [54.1, 88.0], [54.2, 88.0], [54.3, 88.0], [54.4, 88.0], [54.5, 89.0], [54.6, 89.0], [54.7, 89.0], [54.8, 89.0], [54.9, 89.0], [55.0, 89.0], [55.1, 89.0], [55.2, 89.0], [55.3, 89.0], [55.4, 89.0], [55.5, 89.0], [55.6, 90.0], [55.7, 90.0], [55.8, 90.0], [55.9, 90.0], [56.0, 90.0], [56.1, 90.0], [56.2, 90.0], [56.3, 90.0], [56.4, 90.0], [56.5, 91.0], [56.6, 91.0], [56.7, 91.0], [56.8, 91.0], [56.9, 91.0], [57.0, 91.0], [57.1, 91.0], [57.2, 91.0], [57.3, 91.0], [57.4, 92.0], [57.5, 92.0], [57.6, 92.0], [57.7, 92.0], [57.8, 92.0], [57.9, 92.0], [58.0, 92.0], [58.1, 92.0], [58.2, 92.0], [58.3, 93.0], [58.4, 93.0], [58.5, 93.0], [58.6, 93.0], [58.7, 93.0], [58.8, 93.0], [58.9, 93.0], [59.0, 93.0], [59.1, 94.0], [59.2, 94.0], [59.3, 94.0], [59.4, 94.0], [59.5, 94.0], [59.6, 94.0], [59.7, 94.0], [59.8, 94.0], [59.9, 95.0], [60.0, 95.0], [60.1, 95.0], [60.2, 95.0], [60.3, 95.0], [60.4, 95.0], [60.5, 95.0], [60.6, 95.0], [60.7, 96.0], [60.8, 96.0], [60.9, 96.0], [61.0, 96.0], [61.1, 96.0], [61.2, 96.0], [61.3, 96.0], [61.4, 97.0], [61.5, 97.0], [61.6, 97.0], [61.7, 97.0], [61.8, 97.0], [61.9, 97.0], [62.0, 98.0], [62.1, 98.0], [62.2, 98.0], [62.3, 98.0], [62.4, 98.0], [62.5, 98.0], [62.6, 99.0], [62.7, 99.0], [62.8, 99.0], [62.9, 99.0], [63.0, 99.0], [63.1, 99.0], [63.2, 100.0], [63.3, 100.0], [63.4, 100.0], [63.5, 100.0], [63.6, 100.0], [63.7, 100.0], [63.8, 100.0], [63.9, 101.0], [64.0, 101.0], [64.1, 101.0], [64.2, 101.0], [64.3, 101.0], [64.4, 102.0], [64.5, 102.0], [64.6, 102.0], [64.7, 102.0], [64.8, 102.0], [64.9, 103.0], [65.0, 103.0], [65.1, 103.0], [65.2, 103.0], [65.3, 103.0], [65.4, 103.0], [65.5, 104.0], [65.6, 104.0], [65.7, 104.0], [65.8, 104.0], [65.9, 104.0], [66.0, 105.0], [66.1, 105.0], [66.2, 105.0], [66.3, 105.0], [66.4, 105.0], [66.5, 106.0], [66.6, 106.0], [66.7, 106.0], [66.8, 106.0], [66.9, 106.0], [67.0, 107.0], [67.1, 107.0], [67.2, 107.0], [67.3, 107.0], [67.4, 107.0], [67.5, 108.0], [67.6, 108.0], [67.7, 108.0], [67.8, 108.0], [67.9, 109.0], [68.0, 109.0], [68.1, 109.0], [68.2, 109.0], [68.3, 109.0], [68.4, 110.0], [68.5, 110.0], [68.6, 110.0], [68.7, 110.0], [68.8, 111.0], [68.9, 111.0], [69.0, 111.0], [69.1, 111.0], [69.2, 112.0], [69.3, 112.0], [69.4, 112.0], [69.5, 112.0], [69.6, 112.0], [69.7, 113.0], [69.8, 113.0], [69.9, 113.0], [70.0, 113.0], [70.1, 114.0], [70.2, 114.0], [70.3, 114.0], [70.4, 114.0], [70.5, 115.0], [70.6, 115.0], [70.7, 115.0], [70.8, 115.0], [70.9, 116.0], [71.0, 116.0], [71.1, 116.0], [71.2, 116.0], [71.3, 117.0], [71.4, 117.0], [71.5, 117.0], [71.6, 118.0], [71.7, 118.0], [71.8, 118.0], [71.9, 119.0], [72.0, 119.0], [72.1, 119.0], [72.2, 119.0], [72.3, 120.0], [72.4, 120.0], [72.5, 120.0], [72.6, 121.0], [72.7, 121.0], [72.8, 121.0], [72.9, 122.0], [73.0, 122.0], [73.1, 122.0], [73.2, 123.0], [73.3, 123.0], [73.4, 123.0], [73.5, 123.0], [73.6, 124.0], [73.7, 124.0], [73.8, 124.0], [73.9, 125.0], [74.0, 125.0], [74.1, 125.0], [74.2, 126.0], [74.3, 126.0], [74.4, 126.0], [74.5, 127.0], [74.6, 127.0], [74.7, 127.0], [74.8, 128.0], [74.9, 128.0], [75.0, 128.0], [75.1, 129.0], [75.2, 129.0], [75.3, 129.0], [75.4, 130.0], [75.5, 130.0], [75.6, 130.0], [75.7, 131.0], [75.8, 131.0], [75.9, 131.0], [76.0, 132.0], [76.1, 132.0], [76.2, 133.0], [76.3, 133.0], [76.4, 133.0], [76.5, 134.0], [76.6, 134.0], [76.7, 134.0], [76.8, 135.0], [76.9, 135.0], [77.0, 135.0], [77.1, 136.0], [77.2, 136.0], [77.3, 137.0], [77.4, 137.0], [77.5, 137.0], [77.6, 138.0], [77.7, 138.0], [77.8, 139.0], [77.9, 139.0], [78.0, 140.0], [78.1, 140.0], [78.2, 140.0], [78.3, 141.0], [78.4, 141.0], [78.5, 142.0], [78.6, 142.0], [78.7, 143.0], [78.8, 143.0], [78.9, 144.0], [79.0, 144.0], [79.1, 144.0], [79.2, 145.0], [79.3, 145.0], [79.4, 146.0], [79.5, 146.0], [79.6, 147.0], [79.7, 147.0], [79.8, 148.0], [79.9, 148.0], [80.0, 149.0], [80.1, 149.0], [80.2, 150.0], [80.3, 150.0], [80.4, 151.0], [80.5, 151.0], [80.6, 152.0], [80.7, 152.0], [80.8, 153.0], [80.9, 153.0], [81.0, 154.0], [81.1, 154.0], [81.2, 155.0], [81.3, 156.0], [81.4, 156.0], [81.5, 157.0], [81.6, 157.0], [81.7, 158.0], [81.8, 159.0], [81.9, 159.0], [82.0, 160.0], [82.1, 160.0], [82.2, 161.0], [82.3, 162.0], [82.4, 162.0], [82.5, 163.0], [82.6, 164.0], [82.7, 164.0], [82.8, 165.0], [82.9, 166.0], [83.0, 166.0], [83.1, 167.0], [83.2, 168.0], [83.3, 168.0], [83.4, 169.0], [83.5, 170.0], [83.6, 171.0], [83.7, 172.0], [83.8, 172.0], [83.9, 173.0], [84.0, 174.0], [84.1, 175.0], [84.2, 176.0], [84.3, 177.0], [84.4, 177.0], [84.5, 178.0], [84.6, 179.0], [84.7, 180.0], [84.8, 180.0], [84.9, 181.0], [85.0, 182.0], [85.1, 183.0], [85.2, 184.0], [85.3, 185.0], [85.4, 186.0], [85.5, 187.0], [85.6, 188.0], [85.7, 189.0], [85.8, 190.0], [85.9, 191.0], [86.0, 192.0], [86.1, 193.0], [86.2, 194.0], [86.3, 195.0], [86.4, 196.0], [86.5, 197.0], [86.6, 199.0], [86.7, 200.0], [86.8, 201.0], [86.9, 203.0], [87.0, 204.0], [87.1, 206.0], [87.2, 207.0], [87.3, 208.0], [87.4, 210.0], [87.5, 212.0], [87.6, 213.0], [87.7, 215.0], [87.8, 217.0], [87.9, 218.0], [88.0, 220.0], [88.1, 222.0], [88.2, 223.0], [88.3, 225.0], [88.4, 226.0], [88.5, 228.0], [88.6, 230.0], [88.7, 232.0], [88.8, 234.0], [88.9, 236.0], [89.0, 239.0], [89.1, 241.0], [89.2, 243.0], [89.3, 246.0], [89.4, 249.0], [89.5, 252.0], [89.6, 256.0], [89.7, 260.0], [89.8, 263.0], [89.9, 267.0], [90.0, 270.0], [90.1, 275.0], [90.2, 279.0], [90.3, 283.0], [90.4, 288.0], [90.5, 293.0], [90.6, 298.0], [90.7, 302.0], [90.8, 307.0], [90.9, 312.0], [91.0, 318.0], [91.1, 323.0], [91.2, 330.0], [91.3, 336.0], [91.4, 343.0], [91.5, 350.0], [91.6, 358.0], [91.7, 368.0], [91.8, 380.0], [91.9, 393.0], [92.0, 406.0], [92.1, 419.0], [92.2, 433.0], [92.3, 451.0], [92.4, 474.0], [92.5, 493.0], [92.6, 543.0], [92.7, 1071.0], [92.8, 1073.0], [92.9, 1074.0], [93.0, 1075.0], [93.1, 1075.0], [93.2, 1076.0], [93.3, 1077.0], [93.4, 1077.0], [93.5, 1078.0], [93.6, 1078.0], [93.7, 1079.0], [93.8, 1079.0], [93.9, 1080.0], [94.0, 1080.0], [94.1, 1081.0], [94.2, 1081.0], [94.3, 1082.0], [94.4, 1082.0], [94.5, 1083.0], [94.6, 1083.0], [94.7, 1084.0], [94.8, 1084.0], [94.9, 1085.0], [95.0, 1085.0], [95.1, 1085.0], [95.2, 1086.0], [95.3, 1086.0], [95.4, 1087.0], [95.5, 1087.0], [95.6, 1088.0], [95.7, 1088.0], [95.8, 1089.0], [95.9, 1089.0], [96.0, 1090.0], [96.1, 1091.0], [96.2, 1091.0], [96.3, 1092.0], [96.4, 1093.0], [96.5, 1094.0], [96.6, 1095.0], [96.7, 1096.0], [96.8, 1098.0], [96.9, 1099.0], [97.0, 1100.0], [97.1, 1102.0], [97.2, 1104.0], [97.3, 1106.0], [97.4, 1108.0], [97.5, 1111.0], [97.6, 1113.0], [97.7, 1115.0], [97.8, 1118.0], [97.9, 1121.0], [98.0, 1124.0], [98.1, 1128.0], [98.2, 1132.0], [98.3, 1136.0], [98.4, 1141.0], [98.5, 1146.0], [98.6, 1151.0], [98.7, 1156.0], [98.8, 1163.0], [98.9, 1170.0], [99.0, 1179.0], [99.1, 1191.0], [99.2, 1206.0], [99.3, 1223.0], [99.4, 1242.0], [99.5, 1283.0], [99.6, 1353.0], [99.7, 3082.0], [99.8, 3096.0], [99.9, 3124.0], [100.0, 21048.0]], "isOverall": false, "label": "Petición HTTP", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 66136.0, "series": [{"data": [[0.0, 66136.0], [600.0, 4.0], [700.0, 1.0], [15000.0, 1.0], [15100.0, 1.0], [1000.0, 4504.0], [1100.0, 2327.0], [1200.0, 384.0], [1300.0, 110.0], [21000.0, 2.0], [1400.0, 48.0], [1500.0, 14.0], [100.0, 24538.0], [1600.0, 2.0], [3000.0, 144.0], [3100.0, 131.0], [200.0, 4169.0], [3200.0, 13.0], [3300.0, 7.0], [3400.0, 2.0], [300.0, 1378.0], [400.0, 596.0], [7100.0, 14.0], [7000.0, 7.0], [7200.0, 3.0], [500.0, 112.0]], "isOverall": false, "label": "Petición HTTP", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 21000.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 338.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 90492.0, "series": [{"data": [[0.0, 90492.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 7490.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 338.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 6328.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 5.300000000000004, "minX": 1.76781582E12, "maxY": 100.0, "series": [{"data": [[1.76781624E12, 100.0], [1.76781594E12, 81.98055727554157], [1.7678166E12, 100.0], [1.7678163E12, 100.0], [1.76781648E12, 100.0], [1.76781618E12, 100.0], [1.76781588E12, 34.78696051423322], [1.76781654E12, 100.0], [1.76781642E12, 100.0], [1.76781612E12, 100.0], [1.76781582E12, 5.300000000000004], [1.767816E12, 100.0], [1.76781636E12, 100.0], [1.76781606E12, 100.0]], "isOverall": false, "label": "Grupo de Hilos", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7678166E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 104.57638888888891, "minX": 1.0, "maxY": 500.9142857142856, "series": [{"data": [[2.0, 134.5294117647059], [3.0, 179.84210526315786], [4.0, 292.14285714285717], [5.0, 235.483870967742], [6.0, 177.86206896551724], [7.0, 158.14583333333334], [8.0, 179.593220338983], [9.0, 217.8571428571429], [10.0, 194.11764705882348], [11.0, 196.07575757575754], [12.0, 164.2207792207792], [13.0, 189.51898734177212], [14.0, 141.11570247933884], [15.0, 133.43165467625897], [16.0, 110.22857142857137], [17.0, 116.7109375], [18.0, 129.47999999999996], [19.0, 104.57638888888891], [20.0, 112.09722222222226], [21.0, 122.69531249999996], [22.0, 183.35454545454542], [23.0, 163.0782608695651], [24.0, 155.25217391304346], [25.0, 187.28965517241372], [26.0, 145.6716417910448], [27.0, 177.51315789473688], [28.0, 189.89622641509436], [29.0, 190.125], [30.0, 107.3445945945946], [31.0, 167.79999999999993], [32.0, 196.28571428571425], [33.0, 201.93650793650798], [34.0, 232.0214285714286], [35.0, 174.7], [36.0, 117.9496402877697], [37.0, 187.87074829931967], [38.0, 175.68027210884352], [39.0, 146.63380281690144], [40.0, 139.0484848484848], [41.0, 130.95541401273886], [42.0, 180.3896103896103], [43.0, 206.010101010101], [44.0, 278.35975609756105], [45.0, 167.27922077922065], [46.0, 181.38888888888897], [47.0, 197.22012578616352], [48.0, 160.14379084967325], [49.0, 164.91390728476816], [50.0, 163.23489932885903], [51.0, 194.67808219178085], [52.0, 189.0064935064935], [53.0, 195.47916666666666], [54.0, 238.86503067484668], [55.0, 164.00671140939602], [56.0, 163.22352941176467], [57.0, 176.5316455696203], [58.0, 159.09374999999994], [59.0, 187.1103896103897], [60.0, 183.42953020134226], [61.0, 192.56804733727802], [62.0, 146.27108433734944], [63.0, 191.94488188976376], [64.0, 500.9142857142856], [65.0, 295.72820512820516], [66.0, 173.53103448275868], [67.0, 284.1589403973509], [68.0, 267.93670886075955], [69.0, 247.18954248366023], [70.0, 178.45833333333331], [71.0, 170.23076923076923], [72.0, 190.24712643678166], [73.0, 134.92727272727274], [74.0, 201.69090909090903], [75.0, 163.33125], [76.0, 165.2926829268293], [77.0, 222.1219512195123], [78.0, 202.70186335403727], [79.0, 195.81874999999997], [80.0, 268.75], [81.0, 262.40983606557353], [82.0, 217.9945355191257], [83.0, 151.14880952380952], [84.0, 186.18235294117662], [85.0, 194.944099378882], [86.0, 174.74404761904762], [87.0, 240.55555555555551], [88.0, 269.92817679558016], [89.0, 181.75000000000006], [90.0, 371.7435897435898], [91.0, 425.04285714285743], [92.0, 227.75722543352597], [93.0, 164.9151515151514], [94.0, 213.25301204819274], [95.0, 178.51515151515153], [96.0, 196.09467455621308], [97.0, 189.21965317919063], [98.0, 170.10919540229878], [99.0, 249.8214285714286], [100.0, 182.13592552747903], [1.0, 313.0]], "isOverall": false, "label": "Petición HTTP", "isController": false}, {"data": [[94.38395382615987, 183.67245432306166]], "isOverall": false, "label": "Petición HTTP-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 767.8333333333334, "minX": 1.76781582E12, "maxY": 113453.75, "series": [{"data": [[1.76781624E12, 66154.9], [1.76781594E12, 36472.083333333336], [1.7678166E12, 30016.5], [1.7678163E12, 55678.75], [1.76781648E12, 66722.55], [1.76781618E12, 53128.25], [1.76781588E12, 29511.9], [1.76781654E12, 54280.61666666667], [1.76781642E12, 57020.066666666666], [1.76781612E12, 65348.166666666664], [1.76781582E12, 767.8333333333334], [1.767816E12, 68393.28333333334], [1.76781636E12, 65874.78333333334], [1.76781606E12, 54378.083333333336]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.76781624E12, 108269.3], [1.76781594E12, 113453.75], [1.7678166E12, 68226.8], [1.7678163E12, 112442.15], [1.76781648E12, 109013.95], [1.76781618E12, 113060.35], [1.76781588E12, 91802.7], [1.76781654E12, 112273.55], [1.76781642E12, 112147.1], [1.76781612E12, 108185.0], [1.76781582E12, 2388.5], [1.767816E12, 108339.55], [1.76781636E12, 108929.65], [1.76781606E12, 112863.65]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7678166E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 168.32522191613054, "minX": 1.76781582E12, "maxY": 213.9224767801855, "series": [{"data": [[1.76781624E12, 180.14073199527675], [1.76781594E12, 213.9224767801855], [1.7678166E12, 190.50188007124544], [1.7678163E12, 179.2343436726032], [1.76781648E12, 176.83143828390516], [1.76781618E12, 184.68554872280026], [1.76781588E12, 168.32522191613054], [1.76781654E12, 177.02857481621973], [1.76781642E12, 178.47250677028217], [1.76781612E12, 183.23173475429306], [1.76781582E12, 199.93529411764723], [1.767816E12, 187.8899050298984], [1.76781636E12, 182.43915343915393], [1.76781606E12, 185.38506018409277]], "isOverall": false, "label": "Petición HTTP", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7678166E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 168.32445668809234, "minX": 1.76781582E12, "maxY": 213.92210526315773, "series": [{"data": [[1.76781624E12, 180.01853600944517], [1.76781594E12, 213.92210526315773], [1.7678166E12, 190.45438353453386], [1.7678163E12, 179.1589810119124], [1.76781648E12, 176.69593248153768], [1.76781618E12, 184.61482970671747], [1.76781588E12, 168.32445668809234], [1.76781654E12, 171.9669196110981], [1.76781642E12, 178.39338278582386], [1.76781612E12, 183.1095322676137], [1.76781582E12, 199.91764705882346], [1.767816E12, 187.75014655879883], [1.76781636E12, 182.32710170487977], [1.76781606E12, 185.3190936983723]], "isOverall": false, "label": "Petición HTTP", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7678166E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 113.13872946764333, "minX": 1.76781582E12, "maxY": 171.18235294117642, "series": [{"data": [[1.76781624E12, 123.33069657615124], [1.76781594E12, 139.32730650154818], [1.7678166E12, 113.13872946764333], [1.7678163E12, 120.34131383417888], [1.76781648E12, 113.94267963896355], [1.76781618E12, 129.31267738883662], [1.76781588E12, 120.21181512090601], [1.76781654E12, 128.74721365899973], [1.76781642E12, 120.81337572118224], [1.76781612E12, 119.0426287744231], [1.76781582E12, 171.18235294117642], [1.767816E12, 118.47238832219486], [1.76781636E12, 122.16366843033524], [1.76781606E12, 123.87231531744162]], "isOverall": false, "label": "Petición HTTP", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7678166E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 66.0, "minX": 1.76781582E12, "maxY": 15101.0, "series": [{"data": [[1.76781624E12, 7091.0], [1.76781594E12, 7104.0], [1.7678166E12, 3168.0], [1.7678163E12, 7161.0], [1.76781648E12, 7146.0], [1.76781618E12, 7120.0], [1.76781588E12, 7113.0], [1.76781654E12, 15101.0], [1.76781642E12, 7121.0], [1.76781612E12, 15099.0], [1.76781582E12, 1093.0], [1.767816E12, 7232.0], [1.76781636E12, 7089.0], [1.76781606E12, 7118.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.76781624E12, 68.0], [1.76781594E12, 66.0], [1.7678166E12, 68.0], [1.7678163E12, 68.0], [1.76781648E12, 68.0], [1.76781618E12, 68.0], [1.76781588E12, 68.0], [1.76781654E12, 68.0], [1.76781642E12, 68.0], [1.76781612E12, 69.0], [1.76781582E12, 71.0], [1.767816E12, 69.0], [1.76781636E12, 68.0], [1.76781606E12, 68.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.76781624E12, 361.0], [1.76781594E12, 441.40000000000055], [1.7678166E12, 395.5000000000009], [1.7678163E12, 221.60000000000036], [1.76781648E12, 317.0], [1.76781618E12, 266.0], [1.76781588E12, 166.0], [1.76781654E12, 185.0], [1.76781642E12, 246.0], [1.76781612E12, 258.0], [1.76781582E12, 1077.0], [1.767816E12, 322.8000000000002], [1.76781636E12, 431.0], [1.76781606E12, 282.60000000000036]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.76781624E12, 1178.0], [1.76781594E12, 1239.4799999999996], [1.7678166E12, 1189.0], [1.7678163E12, 1179.96], [1.76781648E12, 1138.0], [1.76781618E12, 1156.0], [1.76781588E12, 1132.6499999999996], [1.76781654E12, 1147.0], [1.76781642E12, 1164.17], [1.76781612E12, 1237.9899999999998], [1.76781582E12, 1090.1599999999999], [1.767816E12, 1227.0], [1.76781636E12, 1203.92], [1.76781606E12, 1215.6399999999994]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.76781624E12, 87.0], [1.76781594E12, 94.0], [1.7678166E12, 93.0], [1.7678163E12, 90.0], [1.76781648E12, 84.0], [1.76781618E12, 86.0], [1.76781588E12, 80.0], [1.76781654E12, 82.0], [1.76781642E12, 90.0], [1.76781612E12, 92.0], [1.76781582E12, 74.0], [1.767816E12, 94.0], [1.76781636E12, 82.0], [1.76781606E12, 87.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.76781624E12, 1086.0], [1.76781594E12, 1096.0], [1.7678166E12, 1083.0], [1.7678163E12, 1089.0], [1.76781648E12, 1083.0], [1.76781618E12, 1087.5999999999995], [1.76781588E12, 1082.0], [1.76781654E12, 1083.0], [1.76781642E12, 1086.8499999999995], [1.76781612E12, 1085.0], [1.76781582E12, 1082.0], [1.767816E12, 1090.0], [1.76781636E12, 1086.0], [1.76781606E12, 1088.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7678166E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 441.0, "series": [{"data": [[10.0, 74.5], [11.0, 73.0], [13.0, 76.0], [16.0, 74.5], [18.0, 73.5], [23.0, 73.0], [27.0, 73.0], [39.0, 73.0], [41.0, 74.0], [51.0, 73.0], [56.0, 73.0], [58.0, 75.0], [65.0, 74.0], [73.0, 73.0], [82.0, 174.0], [86.0, 74.0], [85.0, 80.0], [87.0, 92.0], [90.0, 79.0], [89.0, 109.0], [95.0, 73.0], [94.0, 390.0], [99.0, 74.0], [98.0, 174.0], [103.0, 74.0], [101.0, 74.0], [100.0, 107.0], [102.0, 140.0], [107.0, 96.0], [104.0, 284.0], [108.0, 118.0], [109.0, 80.0], [110.0, 326.0], [112.0, 73.0], [115.0, 73.0], [114.0, 87.0], [119.0, 83.0], [117.0, 81.0], [118.0, 89.0], [116.0, 128.0], [123.0, 111.0], [120.0, 81.0], [122.0, 104.0], [121.0, 79.0], [127.0, 95.0], [124.0, 83.0], [126.0, 88.0], [125.0, 102.0], [135.0, 82.0], [131.0, 96.0], [128.0, 99.0], [132.0, 81.0], [134.0, 86.0], [133.0, 84.0], [130.0, 88.0], [129.0, 78.0], [136.0, 82.0], [142.0, 83.0], [140.0, 83.0], [138.0, 84.0], [143.0, 82.0], [141.0, 93.0], [137.0, 85.0], [139.0, 92.0], [147.0, 90.0], [145.0, 85.0], [150.0, 83.0], [146.0, 85.5], [148.0, 85.0], [149.0, 83.0], [144.0, 88.0], [151.0, 90.0], [152.0, 106.0], [156.0, 105.0], [155.0, 105.0], [159.0, 142.5], [157.0, 96.0], [158.0, 96.0], [154.0, 104.0], [153.0, 106.0], [162.0, 119.0], [165.0, 96.0], [163.0, 430.0], [164.0, 131.5], [167.0, 185.0], [161.0, 156.0], [166.0, 98.0], [160.0, 91.0], [174.0, 184.5], [171.0, 145.0], [175.0, 159.0], [172.0, 441.0], [177.0, 99.0], [180.0, 217.0], [181.0, 340.0], [185.0, 237.0], [189.0, 316.0], [1.0, 313.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[94.0, 1.0], [98.0, 1.0], [102.0, 1.5], [110.0, 1.0], [114.0, 1.0], [117.0, 1.0], [120.0, 0.0], [124.0, 2.0], [127.0, 1.0], [126.0, 1.0], [128.0, 1.0], [131.0, 1.0], [130.0, 1.0], [129.0, 1.5], [134.0, 1.0], [135.0, 1.0], [132.0, 1.0], [133.0, 1.0], [141.0, 1.0], [143.0, 1.0], [139.0, 1.0], [137.0, 1.0], [142.0, 1.0], [136.0, 1.0], [138.0, 1.0], [140.0, 1.0], [150.0, 1.0], [149.0, 1.0], [146.0, 1.0], [145.0, 1.0], [147.0, 1.0], [144.0, 1.0], [151.0, 1.0], [148.0, 1.0], [157.0, 1.0], [158.0, 1.0], [159.0, 2.0], [152.0, 1.0], [154.0, 1.0], [153.0, 1.0], [156.0, 1.0], [155.0, 1.0], [162.0, 1.0], [167.0, 2.0], [165.0, 1.0], [161.0, 1.0], [164.0, 1.0], [166.0, 1.5], [160.0, 1.0], [175.0, 0.0], [172.0, 1.0], [180.0, 1.0], [181.0, 1.0], [185.0, 1.0], [189.0, 1.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 189.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 441.0, "series": [{"data": [[10.0, 74.5], [11.0, 73.0], [13.0, 76.0], [16.0, 74.5], [18.0, 73.5], [23.0, 73.0], [27.0, 73.0], [39.0, 73.0], [41.0, 74.0], [51.0, 73.0], [56.0, 73.0], [58.0, 75.0], [65.0, 74.0], [73.0, 73.0], [82.0, 174.0], [86.0, 74.0], [85.0, 80.0], [87.0, 92.0], [90.0, 79.0], [89.0, 109.0], [95.0, 73.0], [94.0, 390.0], [99.0, 74.0], [98.0, 174.0], [103.0, 74.0], [101.0, 74.0], [100.0, 107.0], [102.0, 140.0], [107.0, 96.0], [104.0, 284.0], [108.0, 118.0], [109.0, 80.0], [110.0, 326.0], [112.0, 73.0], [115.0, 73.0], [114.0, 87.0], [119.0, 83.0], [117.0, 81.0], [118.0, 89.0], [116.0, 128.0], [123.0, 111.0], [120.0, 81.0], [122.0, 104.0], [121.0, 79.0], [127.0, 95.0], [124.0, 83.0], [126.0, 88.0], [125.0, 102.0], [135.0, 82.0], [131.0, 96.0], [128.0, 99.0], [132.0, 81.0], [134.0, 86.0], [133.0, 84.0], [130.0, 88.0], [129.0, 78.0], [136.0, 82.0], [142.0, 83.0], [140.0, 83.0], [138.0, 84.0], [143.0, 82.0], [141.0, 93.0], [137.0, 85.0], [139.0, 92.0], [147.0, 90.0], [145.0, 85.0], [150.0, 83.0], [146.0, 85.5], [148.0, 85.0], [149.0, 83.0], [144.0, 88.0], [151.0, 90.0], [152.0, 106.0], [156.0, 105.0], [155.0, 105.0], [159.0, 142.5], [157.0, 96.0], [158.0, 96.0], [154.0, 104.0], [153.0, 106.0], [162.0, 119.0], [165.0, 96.0], [163.0, 430.0], [164.0, 131.5], [167.0, 185.0], [161.0, 156.0], [166.0, 98.0], [160.0, 91.0], [174.0, 184.5], [171.0, 145.0], [175.0, 159.0], [172.0, 441.0], [177.0, 99.0], [180.0, 217.0], [181.0, 340.0], [185.0, 237.0], [189.0, 316.0], [1.0, 310.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[94.0, 0.0], [98.0, 0.0], [102.0, 0.0], [110.0, 0.0], [114.0, 0.0], [117.0, 0.0], [120.0, 0.0], [124.0, 0.0], [127.0, 0.0], [126.0, 0.0], [128.0, 0.0], [131.0, 0.0], [130.0, 0.0], [129.0, 0.0], [134.0, 0.0], [135.0, 0.0], [132.0, 0.0], [133.0, 0.0], [141.0, 0.0], [143.0, 0.0], [139.0, 0.0], [137.0, 0.0], [142.0, 0.0], [136.0, 0.0], [138.0, 0.0], [140.0, 0.0], [150.0, 0.0], [149.0, 0.0], [146.0, 0.0], [145.0, 0.0], [147.0, 0.0], [144.0, 0.0], [151.0, 0.0], [148.0, 0.0], [157.0, 0.0], [158.0, 0.0], [159.0, 0.0], [152.0, 0.0], [154.0, 0.0], [153.0, 0.0], [156.0, 0.0], [155.0, 0.0], [162.0, 0.0], [167.0, 0.0], [165.0, 0.0], [161.0, 0.0], [164.0, 0.0], [166.0, 0.0], [160.0, 0.0], [175.0, 0.0], [172.0, 0.0], [180.0, 0.0], [181.0, 0.0], [185.0, 0.0], [189.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 189.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 2.966666666666667, "minX": 1.76781582E12, "maxY": 141.96666666666667, "series": [{"data": [[1.76781624E12, 141.06666666666666], [1.76781594E12, 134.98333333333332], [1.7678166E12, 83.86666666666666], [1.7678163E12, 141.48333333333332], [1.76781648E12, 141.96666666666667], [1.76781618E12, 141.11666666666667], [1.76781588E12, 109.21666666666667], [1.76781654E12, 140.58333333333334], [1.76781642E12, 141.75], [1.76781612E12, 140.66666666666666], [1.76781582E12, 2.966666666666667], [1.767816E12, 141.66666666666666], [1.76781636E12, 141.58333333333334], [1.76781606E12, 141.21666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7678166E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.76781582E12, "maxY": 134.58333333333334, "series": [{"data": [[1.76781624E12, 128.43333333333334], [1.76781594E12, 134.58333333333334], [1.7678166E12, 80.93333333333334], [1.7678163E12, 133.38333333333333], [1.76781648E12, 129.31666666666666], [1.76781618E12, 134.11666666666667], [1.76781588E12, 108.9], [1.76781654E12, 133.18333333333334], [1.76781642E12, 133.03333333333333], [1.76781612E12, 128.33333333333334], [1.76781582E12, 2.8333333333333335], [1.767816E12, 128.51666666666668], [1.76781636E12, 129.21666666666667], [1.76781606E12, 133.88333333333333]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.76781654E12, 0.03333333333333333]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.conn.HttpHostConnectException", "isController": false}, {"data": [[1.76781624E12, 12.733333333333333], [1.76781642E12, 8.516666666666667], [1.7678166E12, 3.283333333333333], [1.76781612E12, 12.416666666666666], [1.7678163E12, 7.933333333333334], [1.76781648E12, 12.866666666666667], [1.767816E12, 13.633333333333333], [1.76781618E12, 6.816666666666666], [1.76781636E12, 12.533333333333333], [1.76781654E12, 7.35], [1.76781606E12, 7.35]], "isOverall": false, "label": "Non HTTP response code: java.net.BindException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7678166E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 2.8333333333333335, "minX": 1.76781582E12, "maxY": 134.58333333333334, "series": [{"data": [[1.76781624E12, 128.43333333333334], [1.76781594E12, 134.58333333333334], [1.7678166E12, 80.93333333333334], [1.7678163E12, 133.38333333333333], [1.76781648E12, 129.31666666666666], [1.76781618E12, 134.11666666666667], [1.76781588E12, 108.9], [1.76781654E12, 133.18333333333334], [1.76781642E12, 133.03333333333333], [1.76781612E12, 128.33333333333334], [1.76781582E12, 2.8333333333333335], [1.767816E12, 128.51666666666668], [1.76781636E12, 129.21666666666667], [1.76781606E12, 133.88333333333333]], "isOverall": false, "label": "Petición HTTP-success", "isController": false}, {"data": [[1.76781624E12, 12.733333333333333], [1.76781642E12, 8.516666666666667], [1.7678166E12, 3.283333333333333], [1.76781612E12, 12.416666666666666], [1.7678163E12, 7.933333333333334], [1.76781648E12, 12.866666666666667], [1.767816E12, 13.633333333333333], [1.76781618E12, 6.816666666666666], [1.76781636E12, 12.533333333333333], [1.76781654E12, 7.383333333333334], [1.76781606E12, 7.35]], "isOverall": false, "label": "Petición HTTP-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7678166E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 2.8333333333333335, "minX": 1.76781582E12, "maxY": 134.58333333333334, "series": [{"data": [[1.76781624E12, 128.43333333333334], [1.76781594E12, 134.58333333333334], [1.7678166E12, 80.93333333333334], [1.7678163E12, 133.38333333333333], [1.76781648E12, 129.31666666666666], [1.76781618E12, 134.11666666666667], [1.76781588E12, 108.9], [1.76781654E12, 133.18333333333334], [1.76781642E12, 133.03333333333333], [1.76781612E12, 128.33333333333334], [1.76781582E12, 2.8333333333333335], [1.767816E12, 128.51666666666668], [1.76781636E12, 129.21666666666667], [1.76781606E12, 133.88333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.76781624E12, 12.733333333333333], [1.76781642E12, 8.516666666666667], [1.7678166E12, 3.283333333333333], [1.76781612E12, 12.416666666666666], [1.7678163E12, 7.933333333333334], [1.76781648E12, 12.866666666666667], [1.767816E12, 13.633333333333333], [1.76781618E12, 6.816666666666666], [1.76781636E12, 12.533333333333333], [1.76781654E12, 7.383333333333334], [1.76781606E12, 7.35]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7678166E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

