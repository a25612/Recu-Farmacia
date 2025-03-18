<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useVentaStore, Venta } from '../stores/ventas';
  import ConfirmarDelete from '../components/ConfirmarDelete.vue';
  
  const store = useVentaStore();
  
  const isLoading = ref(true);
  const showConfirm = ref(false);
  const successMessage = ref('');
  const ventaToDelete = ref<Venta | null>(null);
  
  onMounted(async () => {
    await store.fetchVentas();
    isLoading.value = false;
  });
  
  const confirmDelete = (venta: Venta) => {
    ventaToDelete.value = venta;
    showConfirm.value = true;
  };
  
  const cancelDelete = () => {
    ventaToDelete.value = null;
    showConfirm.value = false;
  };
  
  const deleteVentaConfirmed = async () => {
    if (ventaToDelete.value) {
      await store.deleteVenta(ventaToDelete.value.id);
      successMessage.value = `Venta #${ventaToDelete.value.id} eliminada exitosamente.`;
      ventaToDelete.value = null;
      showConfirm.value = false;
  
      setTimeout(() => (successMessage.value = ''), 3000);
    }
  };
  
  const ventas = store.ventas;
  </script>

<template>
    <div>
      <h1>Ventas</h1>
  
      <div v-if="isLoading" class="loading">Cargando ventas...</div>
  
      <div v-else>
        <div v-for="venta in ventas" :key="venta.id" class="card">
          <h2>Venta #{{ venta.id }}</h2>
          <p>Cliente ID: {{ venta.clienteId }}</p>
          <p>Fecha: {{ new Date(venta.fecha).toLocaleDateString() }}</p>
          <p>Total: {{ venta.total }}€</p>
          <button @click="confirmDelete(venta)">Eliminar</button>
        </div>
      </div>
  
      <ConfirmarDelete
        v-if="showConfirm"
        :show="showConfirm"
        :message="'¿Estás seguro que quieres eliminar la venta #' + ventaToDelete?.id + '?'"
        @confirm="deleteVentaConfirmed"
        @cancel="cancelDelete"
      />

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  </template>
  
  <style scoped>
  .card { border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 8px; }
  button { background-color: #ff4444; color: white; border-radius: 4px; padding:8px;}
  .loading { text-align:center;font-size:18px;}
  .success-message { margin-top:20px;padding:10px;background-color:#4caf50;color:white;}
  </style>
  