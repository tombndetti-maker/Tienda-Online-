
<script setup>
defineProps({
  numeroFactura: {
    type: Number,
    required: true
  },
  fecha: {
    type: String,
    default: ''
  },
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
  },
  metodoPago: {
    type: String,
    default: ''
  },
  estadoPago: {
    type: String,
    default: 'Aprobado (simulación académica)'
  }
})

defineEmits(['nueva-compra'])

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

function nombreMetodo(metodo) {
  const nombres = {
    transferencia: 'Transferencia simulada',
    tarjeta: 'Tarjeta de demostración',
    contraentrega: 'Pago contra entrega'
  }

  return nombres[metodo] || 'No especificado'
}
</script>

<template>
  <section class="pagina-factura">
    <div class="factura">
      <header class="encabezado-factura">
        <div class="marca-factura">
          <span class="logo">T</span>
          <div>
            <h1>TECH STORE</h1>
            <p>Tecnología para ti</p>
          </div>
        </div>

        <div class="numero">
          <span>FACTURA DE COMPRA</span>
          <strong>#{{ String(numeroFactura).padStart(4, '0') }}</strong>
        </div>
      </header>

      <div class="estado">
        <span class="check">✓</span>
        <div>
          <h2>Compra registrada</h2>
          <p>{{ estadoPago }}</p>
        </div>
      </div>

      <div class="datos-factura">
        <div>
          <span>Fecha</span>
          <strong>{{ fecha || 'No disponible' }}</strong>
        </div>
        <div>
          <span>Método de pago</span>
          <strong>{{ nombreMetodo(metodoPago) }}</strong>
        </div>
      </div>

      <h3 class="titulo-detalle">Detalle de la compra</h3>

      <div class="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Precio unit.</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="producto in carrito" :key="producto.id">
              <td>
                <div class="producto-factura">
                  <img :src="producto.imagen" :alt="producto.nombre" />
                  <span>{{ producto.nombre }}</span>
                </div>
              </td>
              <td>{{ producto.cantidad }}</td>
              <td>{{ formatoCOP(precioUnitario(producto)) }}</td>
              <td>
                {{ formatoCOP(precioUnitario(producto) * producto.cantidad) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="totales">
        <div>
          <span>Subtotal antes de descuentos</span>
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
        <div class="gran-total">
          <strong>Total pagado (simulado)</strong>
          <strong>{{ formatoCOP(total) }}</strong>
        </div>
      </div>

      <div class="nota-academica">
        <strong>Comprobante académico de demostración</strong>
        <p>
          Este documento representa una compra ficticia para fines educativos.
          No es una factura electrónica fiscal ni acredita un pago real.
        </p>
      </div>

      <button class="nueva-compra" @click="$emit('nueva-compra')">
        Realizar nueva compra
      </button>
    </div>
  </section>
</template>

<style scoped>
.pagina-factura {
  max-width: 950px;
  margin: 12px auto 40px;
}

.factura {
  padding: 32px;
  border: 1px solid #e9e2f5;
  border-radius: 16px;
  background: white;
  box-shadow: 0 8px 28px #24104410;
}

.encabezado-factura {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-bottom: 25px;
  border-bottom: 1px solid #eee7f6;
}

.marca-factura {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #7c3aed;
  color: white;
  font-size: 24px;
  font-weight: 800;
}

.marca-factura h1 {
  margin: 0;
  color: #5b21b6;
  font-size: 22px;
}

.marca-factura p {
  margin: 5px 0 0;
  color: #766c83;
  font-size: 13px;
}

.numero {
  display: grid;
  gap: 8px;
  text-align: right;
}

.numero span,
.datos-factura span {
  color: #766c83;
  font-size: 11px;
  font-weight: 700;
}

.numero strong {
  color: #302044;
  font-size: 21px;
}

.estado {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 24px 0;
  padding: 17px;
  border-radius: 12px;
  background: #edfaf1;
}

.check {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #21864b;
  color: white;
  font-size: 21px;
}

.estado h2 {
  margin: 0 0 5px;
  color: #176b3a;
  font-size: 18px;
}

.estado p {
  margin: 0;
  color: #38724e;
  font-size: 13px;
}

.datos-factura {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 28px;
}

.datos-factura > div {
  display: grid;
  gap: 7px;
}

.datos-factura strong {
  overflow-wrap: anywhere;
  color: #302044;
  font-size: 14px;
}

.titulo-detalle {
  margin-bottom: 14px;
  color: #302044;
}

.tabla-contenedor {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

th,
td {
  padding: 13px 10px;
  border-bottom: 1px solid #eee7f6;
  text-align: left;
  white-space: nowrap;
}

th {
  background: #f7f3fc;
  color: #5b21b6;
}

.producto-factura {
  display: flex;
  align-items: center;
  gap: 9px;
  white-space: normal;
  min-width: 160px;
}

.producto-factura img {
  width: 42px;
  height: 42px;
  border-radius: 7px;
  object-fit: contain;
  background: #f5f1fb;
}

.totales {
  display: grid;
  gap: 13px;
  max-width: 410px;
  margin: 25px 0 25px auto;
}

.totales > div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 13px;
}

.descuento {
  color: #16804a;
}

.gran-total {
  padding-top: 15px;
  border-top: 1px solid #e9e2f5;
  color: #5b21b6;
  font-size: 17px !important;
}

.nota-academica {
  padding: 15px;
  border-radius: 10px;
  background: #fff7e5;
  color: #77551b;
  font-size: 13px;
  line-height: 1.6;
}

.nota-academica p {
  margin: 5px 0 0;
}

.nueva-compra {
  display: block;
  width: 100%;
  margin-top: 22px;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: #7c3aed;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.nueva-compra:hover {
  background: #5b21b6;
}

@media (max-width: 600px) {
  .factura {
    padding: 18px;
  }

  .encabezado-factura {
    align-items: flex-start;
    flex-direction: column;
  }

  .numero {
    text-align: left;
  }

  .datos-factura {
    grid-template-columns: 1fr;
  }

  .totales > div {
    font-size: 12px;
  }

  .gran-total {
    font-size: 14px !important;
  }
}
</style>
