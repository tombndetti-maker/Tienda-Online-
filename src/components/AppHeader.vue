
<script setup>
defineProps({
  totalUnidades: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <header class="cabecera">
    <a class="marca" href="#" @click.prevent="$emit('inicio')">
      <span class="logo">T</span>
      <span>TECH <strong>STORE</strong></span>
    </a>

    <div class="indicador-carrito">
      <span class="icono">🛒</span>
      <span>Carrito</span>
      <span class="contador">{{ totalUnidades }}</span>
    </div>
  </header>
</template>

<style scoped>
.cabecera {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px 28px;
  background: white;
  border-bottom: 1px solid #eee5f8;
}

.marca {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #2c2040;
  text-decoration: none;
  font-size: 20px;
  font-weight: 800;
}

.marca strong {
  color: #7c3aed;
}

.logo {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #7c3aed;
  color: white;
}

.indicador-carrito {
  display: flex;
  align-items: center;
  gap: 9px;
  font-weight: 700;
}

.icono {
  font-size: 20px;
}

.contador {
  display: grid;
  place-items: center;
  min-width: 27px;
  height: 27px;
  padding: 0 7px;
  border-radius: 20px;
  background: #7c3aed;
  color: white;
}

@media (max-width: 450px) {
  .cabecera {
    padding: 14px;
  }

  .marca {
    font-size: 16px;
  }

  .indicador-carrito {
    gap: 5px;
    font-size: 13px;
  }
}
</style>
