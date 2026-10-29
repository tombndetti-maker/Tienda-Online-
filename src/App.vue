
<script setup>
import { ref, computed } from 'vue'

import AppHeader from './components/AppHeader.vue'
import ListaProductos from './components/ListaProductos.vue'
import CarritoCompra from './components/CarritoCompra.vue'
import MetodoPago from './components/MetodoPago.vue'
import FacturaCompra from './components/FacturaCompra.vue'
import AppFooter from './components/AppFooter.vue'

const carrito = ref([])
const mensaje = ref('')
const pantalla = ref('tienda')
const numeroFactura = ref(1)
const fechaFactura = ref('')
const metodoPago = ref('')
const estadoPago = ref('')

let temporizador

const totalUnidades = computed(() =>
  carrito.value.reduce((suma, producto) => suma + producto.cantidad, 0)
)

const subtotal = computed(() =>
  carrito.value.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0
  )
)

const descuentoTotal = computed(() =>
  carrito.value.reduce(
    (suma, producto) =>
      suma +
      producto.precio *
      (producto.descuento / 100) *
      producto.cantidad,
    0
  )
)

const baseImponible = computed(() => subtotal.value - descuentoTotal.value)
const iva = computed(() => Math.round(baseImponible.value * 0.19))
const total = computed(() => baseImponible.value + iva.value)

function notificar(texto) {
  mensaje.value = texto
  window.clearTimeout(temporizador)

  temporizador = window.setTimeout(() => {
    mensaje.value = ''
  }, 2800)
}

function agregarAlCarrito(producto) {
  const existente = carrito.value.find(item => item.id === producto.id)

  if (existente) {
    existente.cantidad++
  } else {
    carrito.value.push({
      ...producto,
      cantidad: 1
    })
  }

  notificar(`${producto.nombre} agregado al carrito`)
}

function incrementarCantidad(id) {
  const producto = carrito.value.find(item => item.id === id)

  if (producto) {
    producto.cantidad++
    notificar(`Cantidad actualizada: ${producto.nombre}`)
  }
}

function decrementarCantidad(id) {
  const producto = carrito.value.find(item => item.id === id)

  if (!producto) return

  if (producto.cantidad > 1) {
    producto.cantidad--
    notificar(`Cantidad actualizada: ${producto.nombre}`)
  } else {
    eliminarProducto(id)
  }
}

function eliminarProducto(id) {
  const producto = carrito.value.find(item => item.id === id)

  if (!producto) return

  carrito.value = carrito.value.filter(item => item.id !== id)
  notificar(`${producto.nombre} eliminado del carrito`)
}

function irAlPago() {
  if (carrito.value.length === 0) {
    notificar('Agrega al menos un producto antes de continuar')
    return
  }

  pantalla.value = 'pago'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function confirmarPago(metodo) {
  metodoPago.value = metodo
  estadoPago.value = 'Aprobado (simulación académica)'
  fechaFactura.value = new Date().toLocaleString('es-CO')
  pantalla.value = 'factura'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function volverAlCarrito() {
  pantalla.value = 'tienda'
}

function nuevaCompra() {
  carrito.value = []
  metodoPago.value = ''
  estadoPago.value = ''
  fechaFactura.value = ''
  numeroFactura.value++
  pantalla.value = 'tienda'

  notificar('Nueva compra lista. ¡Explora nuestros productos!')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="aplicacion">
    <AppHeader :total-unidades="totalUnidades" />

    <Transition name="aviso">
      <div v-if="mensaje" class="notificacion" role="status">
        <span>✓</span> {{ mensaje }}
      </div>
    </Transition>

    <main class="principal">
      <template v-if="pantalla === 'tienda'">
        <section class="bienvenida">
          <span class="etiqueta">TECNOLOGÍA PARA TI</span>
          <h1>Bienvenido a <span>TECH STORE</span></h1>
          <p>Encuentra tus accesorios tecnológicos favoritos.</p>
        </section>

        <div class="contenido-tienda">
          <ListaProductos @agregar-al-carrito="agregarAlCarrito" />

          <CarritoCompra
            :carrito="carrito"
            :subtotal="subtotal"
            :descuento-total="descuentoTotal"
            :iva="iva"
            :total="total"
            @incrementar="incrementarCantidad"
            @decrementar="decrementarCantidad"
            @eliminar="eliminarProducto"
            @finalizar-compra="irAlPago"
          />
        </div>
      </template>

      <MetodoPago
        v-else-if="pantalla === 'pago'"
        :total="total"
        @pago-confirmado="confirmarPago"
        @cancelar="volverAlCarrito"
      />

      <FacturaCompra
        v-else-if="pantalla === 'factura'"
        :numero-factura="numeroFactura"
        :fecha="fechaFactura"
        :carrito="carrito"
        :subtotal="subtotal"
        :descuento-total="descuentoTotal"
        :iva="iva"
        :total="total"
        :metodo-pago="metodoPago"
        :estado-pago="estadoPago"
        @nueva-compra="nuevaCompra"
      />
    </main>

    <AppFooter />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  color: #2c2040;
  background: #faf8fd;
}

button {
  font: inherit;
}

.principal {
  width: min(1450px, 100%);
  min-height: 72vh;
  margin: 0 auto;
  padding: 28px;
}

.bienvenida {
  padding: 18px 0 30px;
}

.etiqueta {
  color: #7c3aed;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
}

.bienvenida h1 {
  margin: 12px 0;
  font-size: clamp(28px, 4vw, 43px);
}

.bienvenida h1 span {
  color: #7c3aed;
}

.bienvenida p {
  color: #766c83;
}

.contenido-tienda {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 26px;
  align-items: start;
}

.notificacion {
  position: fixed;
  z-index: 1000;
  top: 90px;
  right: 20px;
  max-width: calc(100% - 40px);
  padding: 15px 20px;
  border-radius: 12px;
  background: #6d28d9;
  color: white;
  box-shadow: 0 8px 25px #24104430;
}

.notificacion span {
  margin-right: 8px;
  font-weight: bold;
}

.aviso-enter-active,
.aviso-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.aviso-enter-from,
.aviso-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1050px) {
  .contenido-tienda {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .principal {
    padding: 16px;
  }
}
</style>
