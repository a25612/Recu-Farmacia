import { defineStore } from 'pinia';

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string; 
}

export const useClienteStore = defineStore('clientes', {
  state: () => ({
    clientes: [] as Cliente[],
  }),
  
  actions: {
    async fetchClientes() {
      try {
        const response = await fetch('http://localhost:5239/api/Clientes');
        if (!response.ok) {
          throw new Error('Error al obtener los clientes');
        }
        this.clientes = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    
    async deleteCliente(id: number) {
      try {
        const response = await fetch(`http://localhost:5239/api/Clientes/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Error al eliminar el cliente');
        }

        this.clientes = this.clientes.filter(cliente => cliente.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
