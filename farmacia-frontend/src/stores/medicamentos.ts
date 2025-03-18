import { defineStore } from 'pinia';

export interface Medicamento {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

export const useMedicamentoStore = defineStore('medicamentos', {
  state: () => ({
    medicamentos: [] as Medicamento[],
  }),
  
  actions: {
    async fetchMedicamentos() {
      try {
        const response = await fetch('http://localhost:5239/api/Medicamentos');
        if (!response.ok) {
          throw new Error('Error al obtener los medicamentos');
        }
        this.medicamentos = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    
    async deleteMedicamento(id: number) {
      try {
        const response = await fetch(`http://localhost:5239/api/Medicamentos/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Error al eliminar el medicamento');
        }

        this.medicamentos = this.medicamentos.filter(medicamento => medicamento.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
