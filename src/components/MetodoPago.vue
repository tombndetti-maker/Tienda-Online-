
<script setup>
import { ref } from 'vue'

defineProps({
  total: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['pago-confirmado', 'cancelar'])

const metodo = ref('transferencia')
const procesando = ref(false)

function formatoCOP(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor)
}

function simularPago() {
  if (procesando.value) return

  procesando.value = true

  // Demora visual de demostración. No se realiza ningún cobro.
  window.setTimeout(() => {
    procesando.value = false
    emit('pago-confirmado', metodo.value)
  }, 1000)
}
</script>

<template>
  <section class="pagina-pago">
    <button class="volver" @click="emit('cancelar')">
      ← Volver al carrito
    </button>

    <div class="panel-pago">
      <div class="icono-seguridad">🔒</div>
      <span class="etiqueta">FINALIZAR COMPRA</span>
      <h1>Selecciona tu método de pago</h1>
      <p class="descripcion">
        Escoge una opción para continuar con la demostración.
      </p>

      <div class="total-pago">
        <span>Total de la compra</span>
        <strong>{{ formatoCOP(total) }}</strong>
      </div>

      <div class="opciones">
        <label
          class="opcion"
          :class="{ seleccionada: metodo === 'transferencia' }"
        >
          <input
            v-model="metodo"
            type="radio"
            value="transferencia"
          />
          <span class="icono-opcion">🏦</span>
          <span class="texto-opcion">
            <strong>Transferencia simulada</strong>
            <small>Pago electrónico de demostración</small>
          </span>
        </label>

        <label
          class="opcion"
          :class="{ seleccionada: metodo === 'tarjeta' }"
        >
          <input
            v-model="metodo"
            type="radio"
            value="tarjeta"
          />
          <span class="icono-opcion">💳</span>
          <span class="texto-opcion">
            <strong>Tarjeta de demostración</strong>
            <small>No necesitas introducir datos bancarios</small>
          </span>
        </label>

        <label
          class="opcion"
          :class="{ seleccionada: metodo === 'contraentrega' }"
        >
          <input
            v-model="metodo"
            type="radio"
            value="contraentrega"
          />
          <span class="icono-opcion">📦</span>
          <span class="texto-opcion">
            <strong>Pago contra entrega</strong>
            <small>Simulación del pago al recibir</small>
          </span>
        </label>
      </div>

      <div class="aviso-academico">
        <strong>Modo académico</strong>
        <p>
          Esta operación es ficticia. No se conecta con entidades bancarias,
          no solicita información financiera y no mueve dinero.
        </p>
      </div>

      <button
        class="boton-confirmar"
        :disabled="procesando"
        @click="simularPago"
      >
        {{ procesando ? 'Procesando simulación...' : 'Confirmar pago simulado' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.pagina-pago {
  max-width: 680px;
  margin: 12px auto 40px;
}

.volver {
  margin-bottom: 16px;
  border: none;
  background: transparent;
  color: #6d28d9;
  font-weight: bold;
  cursor: pointer;
}

.panel-pago {
  padding: 30px;
  border: 1px solid #e9e2f5;
  border-radius: 18px;
  background: white;
  box-shadow: 0 8px 28px #24104410;
}

.icono-seguridad {
  margin-bottom: 10px;
  font-size: 32px;
}

.etiqueta {
  color: #7c3aed;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

h1 {
  margin: 10px 0;
  color: #302044;
  font-size: clamp(24px, 4vw, 32px);
}

.descripcion {
  color: #766c83;
  line-height: 1.6;
}

.total-pago {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin: 24px 0;
  padding: 18px;
  border-radius: 12px;
  background: #f5f0fc;
}

.total-pago strong {
  color: #5b21b6;
  font-size: 22px;
}

.opciones {
  display: grid;
  gap: 12px;
}

.opcion {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 16px;
  border: 1px solid #e1d8ed;
  border-radius: 12px;
  cursor: pointer;
}

.opcion.seleccionada {
  border: 2px solid #7c3aed;
  background: #faf7ff;
}

.opcion input {
  accent-color: #7c3aed;
}

.icono-opcion {
  font-size: 24px;
}

.texto-opcion {
  display: grid;
  gap: 5px;
}

.texto-opcion strong {
  color: #302044;
}

.texto-opcion small {
  color: #766c83;
  line-height: 1.4;
}

.aviso-academico {
  margin: 20px 0;
  padding: 14px;
  border-radius: 10px;
  background: #fff7e5;
  color: #77551b;
  font-size: 13px;
  line-height: 1.6;
}

.aviso-academico p {
  margin: 5px 0 0;
}

.boton-confirmar {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: #7c3aed;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.boton-confirmar:hover {
  background: #5b21b6;
}

.boton-confirmar:disabled {
  cursor: wait;
  opacity: 0.7;
}

@media (max-width: 500px) {
  .panel-pago {
    padding: 20px;
  }

  .total-pago {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
