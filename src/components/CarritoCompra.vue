
<script setup>
defineProps({
  carrito: {
    type: Array,
    default: () => []
  },
  subtotal: {
    type: Number,
    default: 0
  },
  descuentoTotal: {
    type: Number,
    default: 0
  },
  iva: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits([
  'incrementar',
  'decrementar',
  'eliminar',
  'finalizar-compra'
])

function formatoCOP(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor)
}

function precioUnitario(producto) {
  return Math.round(
    producto.precio * (1 - producto.descuento / 100)
  )
}
</script>

<template>
  <aside class="carrito">
    <div class="titulo-carrito">
      <h2>Tu carrito</h2>
      <span>{{ carrito.length }} productos</span>
    </div>

    <div v-if="carrito.length === 0" class="vacio">
      <span>🛒</span>
      <h3>Tu carrito está vacío</h3>
      <p>Agrega productos del catálogo para comenzar.</p>
    </div>

    <template v-else>
      <div class="lista-carrito">
        <article
          v-for="producto in carrito"
          :key="producto.id"
          class="articulo"
        >
          <img :src="producto.imagen" :alt="producto.nombre" />

          <div class="informacion">
            <h3>{{ producto.nombre }}</h3>
            <p>{{ formatoCOP(precioUnitario(producto)) }} c/u</p>

            <div class="controles">
              <button
                class="cantidad"
                :aria-label="`Disminuir cantidad de ${producto.nombre}`"
                @click="emit('decrementar', producto.id)"
              >−</button>

              <span>{{ producto.cantidad }}</span>

              <button
                class="cantidad"
                :aria-label="`Aumentar cantidad de ${producto.nombre}`"
                @click="emit('incrementar', producto.id)"
              >+</button>
            </div>
          </div>

          <button
            class="eliminar"
            :aria-label="`Eliminar ${producto.nombre}`"
            title="Eliminar producto"
            @click="emit('eliminar', producto.id)"
          >×</button>
        </article>
      </div>

      <div class="resumen">
        <div>
          <span>Subtotal</span>
          <span>{{ formatoCOP(subtotal) }}</span>
        </div>

        <div>
          <span>Descuentos</span>
          <span class="descuento">− {{ formatoCOP(descuentoTotal) }}</span>
        </div>

        <div>
          <span>IVA (19 %)</span>
          <span>{{ formatoCOP(iva) }}</span>
        </div>

        <div class="total">
          <strong>Total</strong>
          <strong>{{ formatoCOP(total) }}</strong>
        </div>
      </div>

      <button
        class="finalizar"
        @click="emit('finalizar-compra')"
      >
        Continuar al pago →
      </button>
    </template>

    <p class="nota">Proyecto académico · Compra de demostración</p>
  </aside>
</template>

<style scoped>
.carrito {
  position: sticky;
  top: 18px;
  padding: 20px;
  border: 1px solid #e9e2f5;
  border-radius: 16px;
  background: white;
  box-shadow: 0 5px 18px #2410440c;
}

.titulo-carrito {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee7f6;
}

.titulo-carrito h2 {
  margin: 0;
  font-size: 21px;
}

.titulo-carrito span {
  color: #766c83;
  font-size: 12px;
}

.vacio {
  padding: 28px 4px;
  text-align: center;
}

.vacio > span {
  font-size: 40px;
}

.vacio h3 {
  margin-bottom: 8px;
}

.vacio p,
.nota {
  color: #82798d;
  font-size: 12px;
  line-height: 1.5;
}

.lista-carrito {
  display: grid;
  gap: 17px;
  padding: 18px 0;
}

.articulo {
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr) 24px;
  gap: 10px;
  align-items: start;
}

.articulo img {
  width: 58px;
  height: 58px;
  object-fit: contain;
  border-radius: 9px;
  background: #f5f1fb;
}

.informacion h3 {
  margin: 0 0 6px;
  font-size: 13px;
  line-height: 1.4;
}

.informacion p {
  margin: 0 0 9px;
  color: #6d28d9;
  font-size: 12px;
  font-weight: bold;
}

.controles {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}

.cantidad {
  width: 25px;
  height: 25px;
  border: 1px solid #ded2ef;
  border-radius: 7px;
  background: #faf7ff;
  color: #5b21b6;
  font-weight: bold;
  cursor: pointer;
}

.eliminar {
  border: none;
  background: transparent;
  color: #a33a55;
  font-size: 23px;
  cursor: pointer;
}

.resumen {
  display: grid;
  gap: 13px;
  padding: 17px 0;
  border-top: 1px solid #eee7f6;
}

.resumen > div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
}

.descuento {
  color: #16804a;
}

.resumen .total {
  padding-top: 14px;
  border-top: 1px solid #eee7f6;
  color: #5b21b6;
  font-size: 17px;
}

.finalizar {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 9px;
  background: #7c3aed;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.finalizar:hover {
  background: #5b21b6;
}

.nota {
  margin-bottom: 0;
  text-align: center;
}

@media (max-width: 1050px) {
  .carrito {
    position: static;
  }
}
</style>
