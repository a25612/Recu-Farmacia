<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <p>{{ message }}</p>
        <div class="buttons">
          <button @click="onConfirm" class="btn-confirm">Sí</button>
          <button @click="onCancel" class="btn-cancel">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  
  // Props para recibir datos desde el componente padre
  defineProps({
    show: Boolean,
    message: String,
  });
  
  // Emitir eventos al componente padre
  const emit = defineEmits(['confirm', 'cancel']);
  
  // Funciones para manejar la confirmación y cancelación
  const onConfirm = () => emit('confirm');
  const onCancel = () => emit('cancel');
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  
  .buttons {
    display: flex;
    justify-content: space-around;
  }
  
  .btn-confirm {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
  }
  
  .btn-cancel {
    background-color: #ff4444;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
  }
  
  .btn-confirm:hover {
    background-color: #45a049;
  }
  
  .btn-cancel:hover {
    background-color: #e63939;
  }
  </style>
  