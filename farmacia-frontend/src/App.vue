<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/" class="nav-link">Inicio</router-link>
        <router-link to="/clientes" class="nav-link">Clientes</router-link>
        <router-link to="/medicamentos" class="nav-link">Medicamentos</router-link>
        <router-link to="/ventas" class="nav-link">Ventas</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}

header {
  background-color: #007bff;
  padding: 10px 0;
}

nav {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.nav-link:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
}
</style>
