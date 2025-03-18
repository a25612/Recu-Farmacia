<template>
    <div>
      <h1>Clientes</h1>

      <div v-if="isLoading" class="loading">Cargando clientes...</div>
  
      <div v-else>
        <div v-for="cliente in clientes" :key="cliente.id" class="card">
          <h2>{{ cliente.nombre }} {{ cliente.apellido }}</h2>
          <p>Email: {{ cliente.email }}</p>
          <p>Teléfono: {{ cliente.telefono }}</p>
          <button @click="confirmDelete(cliente)">Eliminar</button>
        </div>
      </div>

      <ConfirmarDelete
        v-if="showConfirm"
        :show="showConfirm"
        :message="'¿Estás seguro que quieres eliminar a ' + clienteToDelete?.nombre + ' ' + clienteToDelete?.apellido + '?'"
        @confirm="deleteClienteConfirmed"
        @cancel="cancelDelete"
      />
  
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useClienteStore, Cliente } from '../stores/clientes';
  import ConfirmarDelete from '../components/ConfirmarDelete.vue';
  
  const store = useClienteStore();
  
  const isLoading = ref(true);
  const showConfirm = ref(false);
  const successMessage = ref('');
  const clienteToDelete = ref<Cliente | null>(null);
  
  onMounted(async () => {
    await store.fetchClientes();
    isLoading.value = false;
  });
  
  const confirmDelete = (cliente: Cliente) => {
    clienteToDelete.value = cliente;
    showConfirm.value = true;
  };
  
  const cancelDelete = () => {
    clienteToDelete.value = null;
    showConfirm.value = false;
  };
  
  const deleteClienteConfirmed = async () => {
    if (clienteToDelete.value) {
      await store.deleteCliente(clienteToDelete.value.id);
      successMessage.value = `Cliente ${clienteToDelete.value.nombre} eliminado exitosamente.`;
      clienteToDelete.value = null;
      showConfirm.value = false;
  
      setTimeout(() => (successMessage.value = ''), 3000);
    }
  };
  
  const clientes = store.clientes;
  </script>
  
  <style scoped>
  .card { border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 8px; }
  button { background-color: #ff4444; color: white; border-radius: 4px; padding: 8px; cursor:pointer;}
  .loading { text-align:center; font-size:18px;}
  .success-message { margin-top:20px; padding:10px; background-color:#4caf50;color:white;}
  </style>
  