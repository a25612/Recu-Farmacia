<template>
    <div class="home">
      <h1>Bienvenido a la Farmacia</h1>
      <p>Seleccione una opción para gestionar los datos:</p>
      <div class="buttons">
        <router-link to="/clientes" class="btn">Clientes</router-link>
        <router-link to="/medicamentos" class="btn">Medicamentos</router-link>
        <router-link to="/ventas" class="btn">Ventas</router-link>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  // No necesitas lógica adicional aquí
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    margin-top: 50px;
  }
  
  .buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  