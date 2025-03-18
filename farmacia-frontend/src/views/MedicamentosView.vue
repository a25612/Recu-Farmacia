<template>
    <div>
      <h1>Medicamentos</h1>

      <div v-if="isLoading" class="loading">Cargando medicamentos...</div>

      <div v-else>
        <div v-for="medicamento in medicamentos" :key="medicamento.id" class="card">
          <h2>{{ medicamento.nombre }}</h2>
          <p>Descripción: {{ medicamento.descripcion }}</p>
          <p>Precio: {{ medicamento.precio }}€</p>
          <p>Stock: {{ medicamento.stock }}</p>
          <button @click="confirmDelete(medicamento)">Eliminar</button>
        </div>
      </div>

      <ConfirmarDelete
        v-if="showConfirm"
        :show="showConfirm"
        :message="'¿Estás seguro que quieres eliminar el medicamento ' + medicamentoToDelete?.nombre + '?'"
        @confirm="deleteMedicamentoConfirmed"
        @cancel="cancelDelete"
      />

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useMedicamentoStore, Medicamento } from '../stores/medicamentos';
  import ConfirmarDelete from '../components/ConfirmarDelete.vue';
  
  const store = useMedicamentoStore();
  
  const isLoading = ref(true);
  const showConfirm = ref(false);
  const successMessage = ref('');
  const medicamentoToDelete = ref<Medicamento | null>(null);
  
  onMounted(async () => {
    await store.fetchMedicamentos();
    isLoading.value = false;
  });
  
  const confirmDelete = (medicamento: Medicamento) => {
    medicamentoToDelete.value = medicamento;
    showConfirm.value = true;
  };
  
  const cancelDelete = () => {
    medicamentoToDelete.value = null;
    showConfirm.value = false;
  };
  
  const deleteMedicamentoConfirmed = async () => {
    if (medicamentoToDelete.value) {
      await store.deleteMedicamento(medicamentoToDelete.value.id);
      successMessage.value = `Medicamento ${medicamentoToDelete.value.nombre} eliminado exitosamente.`;
      medicamentoToDelete.value = null;
      showConfirm.value = false;
  
      setTimeout(() => (successMessage.value = ''), 3000);
    }
  };
  
  const medicamentos = store.medicamentos;
  </script>
  
  <style scoped>
  .card { border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 8px; }
  button { background-color: #ff4444; color: white; border-radius: 4px; padding: 8px; cursor:pointer;}
  .loading { text-align:center; font-size:18px;}
  .success-message { margin-top:20px; padding:10px; background-color:#4caf50;color:white;}
  </style>
  