<template>
  <v-app>
    <v-main>
      <v-app-bar density="compact" app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title ><a href="/" class="nav-link">Formula 1</a></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list dense nav>
          <a href="/" class="nav-link">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </a>
          
        </v-list>
      </v-navigation-drawer>

      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      session_path: null,
      drawer: false,
    };
  },
  mounted() {
    this.session_path = localStorage.getItem("session_path");
  },
  methods: {
  }
};
</script>

<style>
:root {
  /** CSS DARK THEME PRIMARY COLORS */
  --color-primary-100: #382bf0;
  --color-primary-200: #5e43f3;
  --color-primary-300: #7a5af5;
  --color-primary-400: #9171f8;
  --color-primary-500: #a688fa;
  --color-primary-600: #ba9ffb;

  /** CSS DARK THEME SURFACE COLORS */
  --color-surface-100: #121212;
  --color-surface-200: #282828;
  --color-surface-300: #3f3f3f;
  --color-surface-400: #575757;
  --color-surface-500: #717171;
  --color-surface-600: #8b8b8b;

  /** CSS DARK THEME MIXED SURFACE COLORS */
  --color-surface-mixed-100: #1a1625;
  --color-surface-mixed-200: #2f2b3a;
  --color-surface-mixed-300: #46424f;
  --color-surface-mixed-400: #5e5a66;
  --color-surface-mixed-500: #76737e;
  --color-surface-mixed-600: #908d96;
}

.v-app {
  background-color: var(--color-surface-100);
  color: var(--color-primary-600) !important;
}

.v-app-bar {
  background-color: var(--color-surface-200) !important;
  color: var(--color-primary-600) !important;
}

.v-navigation-drawer {
  background-color: var(--color-surface-200) !important;
  color: var(--color-primary-600) !important;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  padding: 2px;
  border-radius: 0.25rem;
}

.nav-link:hover {
  color: var(--color-primary-400);
}
</style>
