
<script setup>
import { computed } from 'vue'

const props = defineProps({
  producto: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['agregar-al-carrito'])

const precioFinal = computed(() =>
  Math.round(
    props.producto.precio * (1 - props.producto.descuento / 100)
  )
)

function formatoCOP(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor)
}
</script>

<template>
  <article class="producto">
    <div class="imagen-contenedor">
      <img
        :src="producto.imagen"
        :alt="producto.nombre"
        loading="lazy"
      />

      <span v-if="producto.descuento > 0" class="etiqueta-descuento">
        -{{ producto.descuento }}%
      </span>
    </div>

    <div class="datos">
      <span class="categoria">{{ producto.categoria }}</span>
      <h3>{{ producto.nombre }}</h3>

      <p v-if="producto.descuento > 0" class="precio-anterior">
        {{ formatoCOP(producto.precio) }}
      </p>

      <p class="precio-final">{{ formatoCOP(precioFinal) }}</p>

      <button @click="emit('agregar-al-carrito', producto)">
        + Agregar al carrito
      </button>
    </div>
  </article>
</template>

<style scoped>
.producto {
  overflow: hidden;
  background: white;
  border: 1px solid #e9e2f5;
  border-radius: 15px;
  box-shadow: 0 4px 14px #2410440d;
  transition: transform 0.2s, box-shadow 0.2s;
}

.producto:hover {
  transform: translateY(-4px);
  box-shadow: 0 9px 24px #24104416;
}

.imagen-contenedor {
  position: relative;
  display: grid;
  place-items: center;
  height: 190px;
  padding: 12px;
  background: #f5f1fb;
}

.imagen-contenedor img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.etiqueta-descuento {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 9px;
  border-radius: 20px;
  background: #7c3aed;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.datos {
  padding: 16px;
}

.categoria {
  color: #7c3aed;
  font-size: 12px;
  font-weight: 800;
}

h3 {
  min-height: 42px;
  margin: 8px 0;
  color: #302044;
  font-size: 16px;
}

.precio-anterior {
  margin: 0;
  color: #8a8292;
  font-size: 13px;
  text-decoration: line-through;
}

.precio-final {
  margin: 10px 0 16px;
  color: #5b21b6;
  font-size: 21px;
  font-weight: 800;
}

button {
  width: 100%;
  padding: 11px 8px;
  border: 0;
  border-radius: 9px;
  background: #7c3aed;
  color: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  background: #5b21b6;
}

@media (max-width: 450px) {
  .imagen-contenedor {
    height: 160px;
  }

  .datos {
    padding: 12px;
  }

  .precio-final {
    font-size: 18px;
  }
}
</style>
