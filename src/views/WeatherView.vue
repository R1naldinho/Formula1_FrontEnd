<template>
  <div class="weather">
    <v-container>
      <v-tabs v-model="tab" align-tabs="center" 
      center-active fixed-tabs class="tabs-weather">
        <v-tab value="one"
          >Air & Track Temperatures &nbsp;
          <v-icon size="x-large">mdi-sun-thermometer-outline </v-icon>
        </v-tab>
        <v-tab value="two"
          >Pressure &nbsp;
          <v-icon size="x-large">mdi-gauge </v-icon>
        </v-tab>
        <v-tab value="three"
          >Humudity & Rain &nbsp;
          <v-icon size="x-large">mdi-water-outline </v-icon>
        </v-tab>
        <v-tab value="four"
          >Wind &nbsp;
          <v-icon size="x-large"> mdi-weather-windy </v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <v-card
            class="mx-auto card-position"
            theme="dark"
            max-width="100%"
            border
            flat
          >
            <div v-if="weatherData">
              <v-container>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    md="3"
                    class="d-flex justify-center align-center"
                  >
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-sheet class="pa-2 ma-2 sheet-temp">
                            <h3>
                              Air Temp&nbsp;
                              <v-icon size="x-large"> mdi-cloud </v-icon>
                            </h3>
                            <v-row>
                              <v-col>Min:</v-col>
                              <v-col>{{ tempAir.min }} °C</v-col>
                            </v-row>
                            <v-row>
                              <v-col>Max:</v-col>
                              <v-col>{{ tempAir.max }} °C</v-col>
                            </v-row>
                            <v-row>
                              <v-col>Avg:</v-col>
                              <v-col>{{ tempAir.avg }} °C</v-col>
                            </v-row>
                          </v-sheet>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-sheet class="pa-2 ma-2 sheet-temp">
                            <h3>
                              Track Temp&nbsp;
                              <v-icon size="x-large"> mdi-road-variant </v-icon>
                            </h3>
                            <v-row>
                              <v-col>Min:</v-col>
                              <v-col>{{ tempTrack.min }} °C</v-col>
                            </v-row>
                            <v-row>
                              <v-col>Max:</v-col>
                              <v-col>{{ tempTrack.max }} °C</v-col>
                            </v-row>
                            <v-row>
                              <v-col>Avg:</v-col>
                              <v-col>{{ tempTrack.avg }} °C</v-col>
                            </v-row>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col cols="12" md="9">
                    <div id="chart-air-temp">
                      <apexchart
                        type="line"
                        :options="chartOptionsTemp"
                        :series="seriesTemp"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <div v-else class="loading">
              <v-container>
                <v-row no-gutters class="d-flex justify-center align-center">
                  <v-col cols="12" class="text-center">
                    <h1>Loading...</h1>
                  </v-col>

                  <v-col cols="12" class="text-center">
                    <v-progress-circular
                      :size="70"
                      :width="7"
                      color="purple"
                      indeterminate
                    ></v-progress-circular>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          <v-card
            class="mx-auto card-position"
            theme="dark"
            max-width="100%"
            border
            flat
          >
            <div v-if="weatherData">
              <v-container>
                <v-row no-gutters>
                  <v-col cols="12" md="3" class="align-center">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="12"
                          ><v-sheet class="pa-2 ma-2 sheet-temp">
                            <h3>
                              Pressure&nbsp;
                              <v-icon size="x-large"> mdi-gauge </v-icon>
                            </h3>
                            <v-row>
                              <v-col>Min:</v-col>
                              <v-col>{{ press.min }} mBar</v-col>
                            </v-row>
                            <v-row>
                              <v-col>Max:</v-col>
                              <v-col>{{ press.max }} mBar</v-col>
                            </v-row>
                            <v-row>
                              <v-col>Avg:</v-col>
                              <v-col>{{ press.avg }} mBar</v-col>
                            </v-row>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col cols="12" md="9">
                    <div id="chart-press-temp">
                      <apexchart
                        type="line"
                        :options="chartOptionsPress"
                        :series="seriesPress"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <div v-else class="loading">
              <v-container>
                <v-row no-gutters class="d-flex justify-center align-center">
                  <v-col cols="12" class="text-center">
                    <h1>Loading...</h1>
                  </v-col>

                  <v-col cols="12" class="text-center">
                    <v-progress-circular
                      :size="70"
                      :width="7"
                      color="purple"
                      indeterminate
                    ></v-progress-circular>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="three">
          <v-card
            class="mx-auto card-position"
            theme="dark"
            max-width="100%"
            border
            flat
          >
            <div v-if="weatherData">
              <v-container>
                <v-row no-gutters>
                  <v-col cols="12" md="3" class="align-center">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="12"
                          ><v-sheet class="pa-2 ma-2 sheet-temp">
                            <h3>
                              Humidity&nbsp;
                              <v-icon size="x-large">
                                mdi-water-outline
                              </v-icon>
                            </h3>
                            <v-row>
                              <v-col>Min:</v-col>
                              <v-col>{{ humidity.min }} %</v-col>
                            </v-row>
                            <v-row>
                              <v-col>Max:</v-col>
                              <v-col>{{ humidity.max }} %</v-col>
                            </v-row>
                            <v-row>
                              <v-col>Avg:</v-col>
                              <v-col>{{ humidity.avg }} %</v-col>
                            </v-row>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col cols="12" md="9">
                    <div id="chart-humidity">
                      <apexchart
                        type="line"
                        :options="chartOptionsHumidity"
                        :series="seriesHumidity"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <div v-else class="loading">
              <v-container>
                <v-row no-gutters class="d-flex justify-center align-center">
                  <v-col cols="12" class="text-center">
                    <h1>Loading...</h1>
                  </v-col>

                  <v-col cols="12" class="text-center">
                    <v-progress-circular
                      :size="70"
                      :width="7"
                      color="purple"
                      indeterminate
                    ></v-progress-circular>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="four">
          <v-card
            class="mx-auto card-position"
            theme="dark"
            max-width="100%"
            border
            flat
          >
            <div v-if="weatherData">
              <v-container>
                <v-row no-gutters>
                  <v-col cols="12" md="3" class="align-center">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="12"
                          ><v-sheet class="pa-2 ma-2 sheet-temp">
                            <h3>
                              Wind&nbsp;
                              <v-icon size="x-large">
                                mdi-weather-windy
                              </v-icon>
                            </h3>
                            <v-row>
                              <v-col>Min:</v-col>
                              <v-col>{{ wind.min }} m/s</v-col>
                            </v-row>
                            <v-row>
                              <v-col>Max:</v-col>
                              <v-col>{{ wind.max }} m/s</v-col>
                            </v-row>
                            <v-row>
                              <v-col>Avg:</v-col>
                              <v-col>{{ wind.avg }} m/s</v-col>
                            </v-row>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col cols="12" md="9">
                    <v-tabs
                      v-model="tabWind"
                      align-tabs="center"
                      fixed-tabs
                      class="tabs-wind"
                    >
                      <v-tab value="oneWind"
                        >Wind Speed&nbsp;
                        <v-icon size="x-large"> mdi-windsock </v-icon></v-tab
                      >
                      <v-tab value="twoWind"
                        >Wind Direction&nbsp;
                        <v-icon size="x-large">
                          mdi-compass-rose
                        </v-icon></v-tab
                      >
                    </v-tabs>
                    <v-tabs-window v-model="tabWind">
                      <v-tabs-window-item value="oneWind">
                        <div id="chart-wind">
                          <apexchart
                            type="line"
                            :options="chartOptionsWind"
                            :series="seriesWind"
                          /></div
                      ></v-tabs-window-item>
                      <v-tabs-window-item value="twoWind">
                        <div id="chart-wind-direction">
                          <apexchart
                            type="scatter"
                            :options="chartOptionsWindDirection"
                            :series="seriesWindDirection"
                          />
                        </div>
                      </v-tabs-window-item>
                    </v-tabs-window>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <div v-else class="loading">
              <v-container>
                <v-row no-gutters class="d-flex justify-center align-center">
                  <v-col cols="12" class="text-center">
                    <h1>Loading...</h1>
                  </v-col>

                  <v-col cols="12" class="text-center">
                    <v-progress-circular
                      :size="70"
                      :width="7"
                      color="purple"
                      indeterminate
                    ></v-progress-circular>
                  </v-col>
                </v-row>
              </v-container>
            </div> </v-card
        ></v-tabs-window-item>
      </v-tabs-window>
    </v-container>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "WeatherView",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      tab: null,
      tabWind: null,
      session_path: null,
      weatherData: null,
      tempAir: {
        min: 0,
        max: 0,
        avg: 0,
      },
      tempTrack: {
        min: 0,
        max: 0,
        avg: 0,
      },
      press: {
        min: 0,
        max: 0,
        avg: 0,
      },
      humidity: {
        min: 0,
        max: 0,
        avg: 0,
      },
      wind: {
        min: 0,
        max: 0,
        avg: 0,
      },

      chartOptionsTemp: {
        responsive: [
          {
            breakpoint: 1024,
            options: {
              chart: {
                width: 750,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 768,
            options: {
              chart: {
                width: 450,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 320,
            options: {
              chart: {
                width: 250,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        chart: {
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        grid: {
          show: true,
          borderColor: "var(--color-primary-600)",
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        tooltip: {
          theme: "dark",
          style: {
            fontSize: "12px",
            color: "var(--color-primary-500)",
          },
        },
        stroke: {
          width: 2,
          curve: "straight",
        },
        title: {
          text: "Air & Track Temperature",
          align: "center",
          style: {
            fontSize: "24px",
            color: "var(--color-primary-500)",
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "center",
          offsetX: 10,
          offsetY: -20,
          style: {
            fontSize: "12px",
            color: "var(--color-primary-500)",
          },
          itemMargin: {
            horizontal: 5,
            vertical: 0,
          },
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
          labels: {
            colors: "var(--color-primary-600)",
            fontSize: "12px",
          },
        },
        xaxis: {
          categories: [],
          title: {
            text: "Time",

            style: {
              fontSize: "15px",
              color: "var(--color-primary-500)",
            },
          },
          labels: {
            rotate: 0,
            style: {
              colors: "var(--color-primary-600)",
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          title: {
            text: "Temperature (°C)",
            style: {
              fontSize: "15px",
              color: "var(--color-primary-500)",
            },
          },
          labels: {
            rotate: 0,
            style: {
              colors: "var(--color-primary-600)",
              fontSize: "12px",
            },
          },
        },
        annotations: {
          yaxis: [
            {
              //temp air min
              y: 0,
              strokeDashArray: 4,
              borderColor: "#FF5722",
              borderWidth: 1,
            },
            {
              //temp air avg
              y: 0,
              strokeDashArray: 4,
              borderColor: "#FFEB3B",
              borderWidth: 1,
            },
            {
              //temp air max
              y: 0,
              strokeDashArray: 4,
              borderColor: "#4CAF50",
              borderWidth: 1,
            },
            {
              //temp track min
              y: 0,
              strokeDashArray: 4,
              borderColor: "#FF5722",
              borderWidth: 1,
            },
            {
              //temp track avg
              y: 0,
              strokeDashArray: 4,
              borderColor: "#FFEB3B",
              borderWidth: 1,
            },
            {
              //temp track max
              y: 0,
              strokeDashArray: 4,
              borderColor: "#4CAF50",
              borderWidth: 1,
            },
          ],
        },
      },
      chartOptionsPress: {
        responsive: [
          {
            breakpoint: 1024,
            options: {
              chart: {
                width: 750,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 768,
            options: {
              chart: {
                width: 450,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 320,
            options: {
              chart: {
                width: 250,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        chart: {
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        grid: {
          show: true,
          borderColor: "var(--color-primary-600)",
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        tooltip: {
          theme: "dark",
          style: {
            fontSize: "12px",
            color: "var(--color-primary-500)",
          },
        },
        stroke: {
          width: 2,
          curve: "straight",
        },
        title: {
          text: "Pressure",
          align: "center",
          style: {
            fontSize: "24px",
            color: "var(--color-primary-500)",
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "center",
          offsetX: 10,
          offsetY: -20,
          style: {
            fontSize: "12px",
            color: "var(--color-primary-500)",
          },
          itemMargin: {
            horizontal: 5,
            vertical: 0,
          },
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
          labels: {
            colors: "var(--color-primary-600)",
            fontSize: "12px",
          },
        },
        xaxis: {
          categories: [],
          title: {
            text: "Time",

            style: {
              fontSize: "15px",
              color: "var(--color-primary-500)",
            },
          },
          stepSize: 10,
          labels: {
            rotate: 0,
            style: {
              colors: "var(--color-primary-600)",
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          title: {
            text: "Pressure (mBar)",
            style: {
              fontSize: "15px",
              color: "var(--color-primary-500)",
            },
          },
          labels: {
            rotate: 0,
            style: {
              colors: "var(--color-primary-600)",
              fontSize: "12px",
            },
          },
        },
        annotations: {
          yaxis: [
            {
              //temp pressure min
              y: 0,
              strokeDashArray: 4,
              borderColor: "#FF5722",
              borderWidth: 1,
            },
            {
              //temp pressure avg
              y: 0,
              strokeDashArray: 4,
              borderColor: "#FFEB3B",
              borderWidth: 1,
            },
            {
              //temp pressure max
              y: 0,
              strokeDashArray: 4,
              borderColor: "#4CAF50",
              borderWidth: 1,
            },
          ],
        },
      },
      chartOptionsHumidity: {
        responsive: [
          {
            breakpoint: 1024,
            options: {
              chart: {
                width: 750,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 768,
            options: {
              chart: {
                width: 450,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 320,
            options: {
              chart: {
                width: 250,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        chart: {
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        grid: {
          show: true,
          borderColor: "var(--color-primary-600)",
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        tooltip: {
          theme: "dark",
          style: {
            fontSize: "12px",
            color: "var(--color-primary-500)",
          },
        },
        stroke: {
          width: 2,
          curve: "straight",
        },
        title: {
          text: "Humidity",
          align: "center",
          style: {
            fontSize: "24px",
            color: "var(--color-primary-500)",
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "center",
          offsetX: 10,
          offsetY: -20,
          style: {
            fontSize: "12px",
            color: "var(--color-primary-500)",
          },
          itemMargin: {
            horizontal: 5,
            vertical: 0,
          },
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
          labels: {
            colors: "var(--color-primary-600)",
            fontSize: "12px",
          },
        },
        xaxis: {
          categories: [],
          title: {
            text: "Time",

            style: {
              fontSize: "15px",
              color: "var(--color-primary-500)",
            },
          },
          stepSize: 10,
          labels: {
            rotate: 0,
            style: {
              colors: "var(--color-primary-600)",
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          title: {
            text: "Humidity (%)",
            style: {
              fontSize: "15px",
              color: "var(--color-primary-500)",
            },
          },
          min: 0,
          max: 100,
          labels: {
            rotate: 0,
            style: {
              colors: "var(--color-primary-600)",
              fontSize: "12px",
            },
          },
        },
        annotations: {
          yaxis: [
            {
              //temp humidity min
              y: 0,
              strokeDashArray: 4,
              borderColor: "#FF5722",
              borderWidth: 1,
            },
            {
              //temp humidity avg
              y: 0,
              strokeDashArray: 4,
              borderColor: "#FFEB3B",
              borderWidth: 1,
            },
            {
              //temp humidity max
              y: 0,
              strokeDashArray: 4,
              borderColor: "#4CAF50",
              borderWidth: 1,
            },
          ],
        },
      },
      chartOptionsWind: {
        responsive: [
          {
            breakpoint: 1024,
            options: {
              chart: {
                width: 750,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 768,
            options: {
              chart: {
                width: 450,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 320,
            options: {
              chart: {
                width: 250,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        chart: {
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        grid: {
          show: true,
          borderColor: "var(--color-primary-600)",
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        tooltip: {
          theme: "dark",
          style: {
            fontSize: "12px",
            color: "var(--color-primary-500)",
          },
        },
        stroke: {
          width: 2,
          curve: "straight",
        },
        title: {
          text: "Wind Speed",
          align: "center",
          style: {
            fontSize: "24px",
            color: "var(--color-primary-500)",
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "center",
          offsetX: 10,
          offsetY: -20,
          style: {
            fontSize: "12px",
            color: "var(--color-primary-500)",
          },
          itemMargin: {
            horizontal: 5,
            vertical: 0,
          },
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
          labels: {
            colors: "var(--color-primary-600)",
            fontSize: "12px",
          },
        },
        xaxis: {
          categories: [],
          title: {
            text: "Time",

            style: {
              fontSize: "15px",
              color: "var(--color-primary-500)",
            },
          },
          stepSize: 10,
          labels: {
            rotate: 0,
            style: {
              colors: "var(--color-primary-600)",
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          title: {
            text: "Wind Speed (m/s)",
            style: {
              fontSize: "15px",
              color: "var(--color-primary-500)",
            },
          },
          labels: {
            rotate: 0,
            style: {
              colors: "var(--color-primary-600)",
              fontSize: "12px",
            },
          },
        },
        annotations: {
          yaxis: [
            {
              //temp wind min
              y: 0,
              strokeDashArray: 4,
              borderColor: "#FF5722",
              borderWidth: 1,
            },
            {
              //temp wind avg
              y: 0,
              strokeDashArray: 4,
              borderColor: "#FFEB3B",
              borderWidth: 1,
            },
            {
              //temp wind max
              y: 0,
              strokeDashArray: 4,
              borderColor: "#4CAF50",
              borderWidth: 1,
            },
          ],
        },
      },
      chartOptionsWindDirection: {
        responsive: [
          {
            breakpoint: 1024,
            options: {
              chart: {
                width: 750,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 768,
            options: {
              chart: {
                width: 450,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 320,
            options: {
              chart: {
                width: 250,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        chart: {
          type: "scatter",
          zoom: {
            enabled: true,
          },
        },
        grid: {
          show: true,
          borderColor: "var(--color-primary-600)",
        },
        markers: {
          size: 5,
          hover: {
            sizeOffset: 6,
          },
        },
        tooltip: {
          theme: "dark",
          style: {
            fontSize: "12px",
            color: "var(--color-primary-500)",
          },
        },
        stroke: {
          width: 2,
          curve: "straight",
        },
        title: {
          text: "Wind Direction",
          align: "center",
          style: {
            fontSize: "24px",
            color: "var(--color-primary-500)",
          },
        },
        xaxis: {
          type: "numeric",
          min: 0,
          max: 360,
          tickAmount: 8,
          labels: {
            formatter: (value) => {
              const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
              return directions[Math.round(value / 45) % 8];
            },
            style: {
              colors: "var(--color-primary-600)",
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          title: {
            text: "Wind Speed (km/h)",
            style: {
              fontSize: "15px",
              color: "var(--color-primary-500)",
            },
          },
          labels: {
            style: {
              colors: "var(--color-primary-600)",
              fontSize: "12px",
            },
          },
        },
        plotOptions: {
          scatter: {
            size: 5,
            colors: ["#FF5722", "#FFEB3B", "#4CAF50"],
          },
        },
      },

      seriesTemp: [],
      seriesPress: [],
      seriesHumidity: [],
      seriesWind: [],
      seriesWindDirection: [],
    };
  },
  methods: {
    async fetchWeatherData() {
      const weatherResponse = await fetch(
        `http://localhost:3000/api/weatherDataSeries/${this.session_path}`
      );
      this.weatherData = await weatherResponse.json();
      console.log(this.weatherData);
      this.processData();
    },
    processData() {
      const airTempValues = this.weatherData.Series.map((data) =>
        parseFloat(data.Weather.AirTemp)
      );

      this.tempAir.max = Math.max(...airTempValues).toFixed(1);
      this.tempAir.min = Math.min(...airTempValues).toFixed(1);
      this.tempAir.avg = (
        airTempValues.reduce((sum, value) => sum + value, 0) /
        airTempValues.length
      ).toFixed(1);

      const trackTempValues = this.weatherData.Series.map((data) =>
        parseFloat(data.Weather.TrackTemp)
      );

      this.chartOptionsTemp.annotations.yaxis[0].y = this.tempAir.min;
      this.chartOptionsTemp.annotations.yaxis[1].y = this.tempAir.avg;
      this.chartOptionsTemp.annotations.yaxis[2].y = this.tempAir.max;

      this.tempTrack.max = Math.max(...trackTempValues).toFixed(1);
      this.tempTrack.min = Math.min(...trackTempValues).toFixed(1);
      this.tempTrack.avg = (
        trackTempValues.reduce((sum, value) => sum + value, 0) /
        trackTempValues.length
      ).toFixed(1);

      this.chartOptionsTemp.annotations.yaxis[3].y = this.tempTrack.min;
      this.chartOptionsTemp.annotations.yaxis[4].y = this.tempTrack.avg;
      this.chartOptionsTemp.annotations.yaxis[5].y = this.tempTrack.max;

      this.seriesTemp = [
        { name: "Air Temperature", data: airTempValues },
        { name: "Track Temperature", data: trackTempValues },
      ];

      const pressureValues = this.weatherData.Series.map((data) =>
        parseFloat(data.Weather.Pressure)
      );

      this.press.max = Math.max(...pressureValues).toFixed(1);
      this.press.min = Math.min(...pressureValues).toFixed(1);
      this.press.avg = (
        pressureValues.reduce((sum, value) => sum + value, 0) /
        pressureValues.length
      ).toFixed(1);

      this.chartOptionsPress.annotations.yaxis[0].y = this.press.min;
      this.chartOptionsPress.annotations.yaxis[1].y = this.press.avg;
      this.chartOptionsPress.annotations.yaxis[2].y = this.press.max;

      this.seriesPress = [{ name: "Pressure", data: pressureValues }];

      const humidityValues = this.weatherData.Series.map((data) =>
        parseFloat(data.Weather.Humidity)
      );

      this.humidity.max = Math.max(...humidityValues).toFixed(1);
      this.humidity.min = Math.min(...humidityValues).toFixed(1);
      this.humidity.avg = (
        humidityValues.reduce((sum, value) => sum + value, 0) /
        humidityValues.length
      ).toFixed(1);

      this.chartOptionsHumidity.annotations.yaxis[0].y = this.humidity.min;
      this.chartOptionsHumidity.annotations.yaxis[1].y = this.humidity.avg;
      this.chartOptionsHumidity.annotations.yaxis[2].y = this.humidity.max;

      const rainValues = this.weatherData.Series.map(
        (data) => parseFloat(data.Weather.Rainfall) * 100
      );

      this.seriesHumidity = [
        { name: "Rainfall", data: rainValues },
        { name: "Humidity", data: humidityValues },
      ];

      const windValues = this.weatherData.Series.map((data) =>
        parseFloat(data.Weather.WindSpeed)
      );

      this.wind.max = Math.max(...windValues).toFixed(1);
      this.wind.min = Math.min(...windValues).toFixed(1);
      this.wind.avg = (
        windValues.reduce((sum, value) => sum + value, 0) / windValues.length
      ).toFixed(1);

      this.chartOptionsWind.annotations.yaxis[0].y = this.wind.min;
      this.chartOptionsWind.annotations.yaxis[1].y = this.wind.avg;
      this.chartOptionsWind.annotations.yaxis[2].y = this.wind.max;

      this.seriesWind = [{ name: "Wind Speed", data: windValues }];

      const windArray = this.weatherData.Series.map((data) => {
        return [
          parseFloat(data.Weather.WindDirection),
          parseFloat(data.Weather.WindSpeed),
        ];
      });

      this.seriesWindDirection = [{ name: "Wind Speed", data: windArray }];
    },
  },
  async mounted() {
    this.session_path = localStorage.getItem("session_path");
    await this.fetchWeatherData();
  },
  computed: {
    chartOptionsPressure() {
      return {
        chart: {
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        xaxis: {
          categories: this.weatherData
            ? this.weatherData.Series.map((data) => data.timestamp)
            : [],
          title: {
            text: "Time",
          },
        },
        yaxis: {
          title: {
            text: "Pressure (hPa)",
          },
        },
      };
    },
    seriesPressure() {
      return [
        {
          name: "Pressure",
          data: this.weatherData
            ? this.weatherData.Series.map((data) => parseFloat(data.Pressure))
            : [],
        },
      ];
    },
  },
};
</script>

<style>
.loading {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.divider-temp {
  background-color: var(--color-surface-300) !important;
  margin: 20px 0;
}

.sheet-temp {
  background-color: var(--color-surface-300) !important;
  width: 100% !important;
  border-radius: 5px;
}

.v-tab {
  color: var(--color-primary-600) !important;
  background-color: var(--color-surface-200) !important;
}

.tabs-weather {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.tabs-wind {
  margin-bottom: 20px;
}
</style>
