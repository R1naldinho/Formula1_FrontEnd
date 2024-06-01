<template>
  <v-card
    class="mx-auto card-position"
    theme="dark"
    max-width="90%"
    border
    flat
  >
    <div class="chart-container">
      <div class="chart-scroll">
        <apexchart
          type="line"
          :options="chartOptions"
          :series="chartSeries"
          theme="dark"
        />
      </div>
    </div>
  </v-card>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "DriversPositionsView",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
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
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: [],
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ",",
              headerCategory: "category",
              headerValue: "value",
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString();
              },
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            },
          },
          autoSelected: "zoom",
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
        stroke: {
          width: 4,
          curve: "straight",
        },
        title: {
          text: "Drivers Positions Over Laps",
          align: "center",
          style: {
            fontSize: "24px",
            color: "var(--color-primary-500)",
          },
        },
        grid: {
          show: true,
          borderColor: "#90A4AE",
          strokeDashArray: 0,
          position: "back",
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },

        xaxis: {
          categories: [],
          title: {
            text: "Lap",
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
          categories: [],
          title: {
            text: "Position",
            style: {
              fontSize: "15px",
              color: "var(--color-primary-500)",
            },
          },
          min: 1,
          max: 20,
          reversed: true,
          step: 1,
          labels: {
            rotate: 0,
            style: {
              colors: "var(--color-primary-600)",
              fontSize: "12px",
            },
          },
        },
        colors: [],
      },
      chartSeries: [],
    };
  },

  methods: {
    async fetchData() {
      const sessionPath = localStorage.getItem("session_path");
      if (sessionPath == "null") {
        this.$router.push("/");
        return;
      }

      const sessionInfoResponse = await fetch(
        `http://localhost:3000/api/SessionInfo/${sessionPath}`
      );
      const session = await sessionInfoResponse.json();
      this.$emit(
        "update-session-name",
        `${session.Meeting.Name} - ${session.Name}`
      );

      const lapSeriesResponse = await fetch(
        `http://localhost:3000/api/lapSeries/${sessionPath}`
      );
      const lapSeries = await lapSeriesResponse.json();

      const driverListResponse = await fetch(
        `http://localhost:3000/api/driverList/${sessionPath}`
      );
      const driverList = await driverListResponse.json();

      this.processData(lapSeries, driverList);
    },
    processData(lapSeries, driverList) {
      const pilotNumbers = Object.values(lapSeries).map(
        (pilot) => pilot.RacingNumber
      );
      const maxLaps = Math.max(
        ...Object.values(lapSeries).map((pilot) => pilot.LapPosition.length)
      );

      const lapPositions = Object.values(lapSeries).map(
        (pilot) => pilot.LapPosition
      );
      const lapLabels = Array.from(
        { length: maxLaps },
        (_, i) => `Lap ${i + 1}`
      );

      this.chartOptions.xaxis.categories = lapLabels;

      this.chartOptions.yaxis.categories = Array.from(
        { length: 20 },
        (_, i) => `Position ${i + 1}`
      );

      const datasets = pilotNumbers.map((pilotNumber, index) => {
        const driver = driverList[pilotNumber];
        return {
          name: `${driver.Tla}`,
          number: `${driver.RacingNumber}`,
          data: lapPositions[index],
          color: `#${driver.TeamColour}`,
        };
      });

      this.chartSeries = datasets;
      this.chartOptions.colors = datasets.map((dataset) => dataset.TeamColour);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
}

.chart-scroll {
  overflow-x: auto; /* Aggiunge uno scroll orizzontale se necessario */
  overflow-y: hidden; /* Nasconde lo scroll verticale */
  max-width: 100%; /* Imposta la larghezza massima del contenitore del grafico al 100% */
}

.card-position {
  padding: 40px;
}
</style>
