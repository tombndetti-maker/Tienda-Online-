
<script setup>
import ProductoCard from './ProductoCard.vue'

const emit = defineEmits(['agregar-al-carrito'])

const productos = [
  {
    id: 1,
    nombre: 'Audífonos inalámbricos',
    categoria: 'Audio',
    precio: 120000,
    descuento: 15,
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'
  },
  {
    id: 2,
    nombre: 'Mouse gamer RGB',
    categoria: 'Accesorios',
    precio: 95000,
    descuento: 10,
    imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600'
  },
  {
    id: 3,
    nombre: 'Teclado mecánico',
    categoria: 'Accesorios',
    precio: 220000,
    descuento: 20,
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600'
  },
  {
    id: 4,
    nombre: 'Parlante Bluetooth',
    categoria: 'Audio',
    precio: 160000,
    descuento: 0,
    imagen: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600'
  },
  {
    id: 5,
    nombre: 'Smartwatch deportivo',
    categoria: 'Wearables',
    precio: 280000,
    descuento: 12,
    imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'
  },
  {
    id: 6,
    nombre: 'Webcam HD',
    categoria: 'Accesorios',
    precio: 135000,
    descuento: 0,
    imagen: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600'
  },
  {
    id: 7,
    nombre: 'Control inalámbrico',
    categoria: 'Gaming',
    precio: 190000,
    descuento: 8,
    imagen: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600'
  },
  {
    id: 8,
    nombre: 'Cargador rápido',
    categoria: 'Energía',
    precio: 75000,
    descuento: 0,
    imagen: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600'
  }
]
</script>

<template>
  <section class="catalogo">
    <div class="encabezado">
      <h2>Nuestros productos</h2>
      <p>Explora nuestro catálogo de tecnología.</p>
    </div>

    <div class="rejilla">
      <ProductoCard
        v-for="producto in productos"
        :key="producto.id"
        :producto="producto"
        @agregar-al-carrito="emit('agregar-al-carrito', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
.catalogo {
  min-width: 0;
}

.encabezado {
  margin-bottom: 20px;
}

.encabezado h2 {
  margin: 0 0 8px;
  color: #302044;
  font-size: 25px;
}

.encabezado p {
  margin: 0;
  color: #766c83;
}

.rejilla {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

@media (min-width: 1350px) {
  .rejilla {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .rejilla {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
}

@media (max-width: 400px) {
  .rejilla {
    grid-template-columns: 1fr;
  }
}
</style>
