<template>
  <div class="home">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" md="2">
          <v-row no-gutters>
            <v-col cols="12">
              <v-sheet class="pa-2 ma-2">
                <v-select
                  label="Select year"
                  :items="yearsSelect"
                  v-model="selectedYear"
                  variant="underlined"
                  density="comfortable"
                ></v-select>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <v-sheet v-if="showRacesSelect" class="pa-2 ma-2">
                <v-select
                  label="Select Race"
                  :items="races"
                  v-model="selectedRaces"
                  item-title="name"
                  item-value="raceId"
                  variant="underlined"
                  density="comfortable"
                  return-object
                ></v-select>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md>
          <v-sheet v-if="showContent" class="pa-2 ma-2">
            <a v-if="session_path" href="/driversPositions" class="nav-link">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-chart-timeline-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Drivers Positions</v-list-item-title>
              </v-list-item>
            </a>
            <a v-if="session_path" href="/weather" class="nav-link">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-weather-partly-cloudy</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Weather</v-list-item-title>
              </v-list-item>
            </a>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      yearsSelect: [],
      selectedYear: "",
      selectedRaces: null,
      showRacesSelect: false,
      showContent: false,
      races: [],
      session_path: localStorage.getItem("session_path"),
    };
  },
  methods: {
    loadYearsSelect() {
      const currentYear = new Date().getFullYear();
      for (let year = currentYear; year >= 1950; year--) {
        this.yearsSelect.push(year.toString());
      }
    },
    async fetchRaces(year) {
      const racesResponse = await fetch(
        `http://localhost:3000/races/year/${year}`
      );
      const races = await racesResponse.json();
      return races;
    },
    async updateRaces() {
      if (this.selectedYear) {
        const races = await this.fetchRaces(this.selectedYear);
        this.races = [];
        races.forEach((race) => {
          this.races.push({ name: race.name, raceId: race.raceId });
        });
        this.showRacesSelect = true;
        this.setSelectedRace();
      }
    },
    async fetchRaceByID(year, raceId) {
      const racesResponse = await fetch(
        `http://localhost:3000/races/year/${year}/id/${raceId}`
      );
      const race = await racesResponse.json();
      if (race[0].meeting_key) {
        const meetingResponse = await fetch(
          `http://localhost:3000/api/races/${year}/${race[0].meeting_key}`
        );
        const meeting = await meetingResponse.json();
        let path = meeting[0].Sessions[meeting[0].Sessions.length - 1].Path;
        localStorage.setItem("session_path", path);
        this.session_path = path;
      } else {
        localStorage.setItem("session_path", null);
        this.session_path = null;
      }
    },
    setSelectedRace() {
      const selectedRace = JSON.parse(localStorage.getItem("selectedRaces"));
      if (selectedRace) {
        this.selectedRaces = this.races.find(race => race.raceId === selectedRace.raceId) || null;
      }
    }
  },
  watch: {
    async selectedYear() {
      localStorage.setItem("selectedYear", this.selectedYear);
      this.showRacesSelect = false;
      this.showContent = false;
      this.races = [];
      this.selectedRaces = null;
      await this.updateRaces();
    },
    async selectedRaces() {
      localStorage.setItem("selectedRaces", JSON.stringify(this.selectedRaces));
      console.log(this.selectedRaces);
      this.showContent = true;
      if (this.selectedRaces != null) {
        await this.fetchRaceByID(this.selectedYear, this.selectedRaces.raceId);
      }
    },
  },
  async mounted() {
    this.selectedYear = localStorage.getItem("selectedYear");
    this.selectedRaces = JSON.parse(localStorage.getItem("selectedRaces"));
    if (this.selectedYear === null) {
      this.selectedYear = new Date().getFullYear().toString();
      localStorage.setItem("selectedYear", this.selectedYear);
    }
    this.loadYearsSelect();
    await this.updateRaces();
  },
};
</script>

<style>
.v-sheet {
  background-color: var(--color-surface-200) !important;
  color: var(--color-primary-600) !important;
}

.v-field {
  background-color: var(--color-surface-200) !important;
  color: var(--color-primary-600) !important;
}
.v-list-item,
.v-list {
  background-color: var(--color-surface-300) !important;
  color: var(--color-primary-500) !important;
  scrollbar-color: var(--color-primary-400) var(--color-surface-400) !important;
  scrollbar-width: thin !important;
}

.v-list-item:hover {
  background-color: var(--color-surface-400) !important;
  color: var(--color-primary-400) !important;
}

.v-list-item--active {
  background-color: var(--color-surface-400) !important;
  color: var(--color-primary-400) !important;
}
</style>
