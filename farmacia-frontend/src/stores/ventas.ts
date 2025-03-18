import { defineStore } from 'pinia';

export interface Venta {
  id: number;
  clienteId: number;
  fecha: string;
  total: number;
}

export const useVentaStore = defineStore('ventas', {
  state: () => ({
    ventas: [] as Venta[],
  }),
  
  actions: {
    async fetchVentas() {
      try {
        const response = await fetch('http://localhost:5239/api/Ventas');
        if (!response.ok) {
          throw new Error('Error al obtener las ventas');
        }
        this.ventas = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    
    async deleteVenta(id: number) {
      try {
        const response = await fetch(`http://localhost:5239/api/Ventas/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Error al eliminar la venta');
        }

        this.ventas = this.ventas.filter(venta => venta.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
