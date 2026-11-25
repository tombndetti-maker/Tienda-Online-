
import { defineStore } from 'pinia'

// Controla el temporizador de las notificaciones
let temporizador

export const useTiendaStore = defineStore('tienda', {
  // 1. STATE: datos principales de la aplicación
  state: () => ({
    carrito: [],
    mensaje: '',
    pantalla: 'tienda',
    numeroFactura: 1,
    fechaFactura: '',
    metodoPago: '',
    estadoPago: ''
  }),

  // 2. GETTERS: cálculos y datos derivados
  getters: {
    totalUnidades: (state) =>
      state.carrito.reduce(
        (suma, producto) => suma + producto.cantidad,
        0
      ),

    subtotal: (state) =>
      state.carrito.reduce(
        (suma, producto) =>
          suma + producto.precio * producto.cantidad,
        0
      ),

    descuentoTotal: (state) =>
      state.carrito.reduce(
        (suma, producto) =>
          suma +
          producto.precio *
          (producto.descuento / 100) *
          producto.cantidad,
        0
      ),

    baseImponible() {
      return this.subtotal - this.descuentoTotal
    },

    iva() {
      return Math.round(this.baseImponible * 0.19)
    },

    total() {
      return this.baseImponible + this.iva
    }
  },

  // 3. ACTIONS: funciones que modifican el estado
  actions: {
    notificar(texto) {
      this.mensaje = texto

      clearTimeout(temporizador)

      temporizador = setTimeout(() => {
        this.mensaje = ''
      }, 2800)
    },

    agregarAlCarrito(producto) {
      const existente = this.carrito.find(
        item => item.id === producto.id
      )

      if (existente) {
        existente.cantidad++
      } else {
        this.carrito.push({
          ...producto,
          cantidad: 1
        })
      }

      this.notificar(`${producto.nombre} agregado al carrito`)
    },

    incrementarCantidad(id) {
      const producto = this.carrito.find(
        item => item.id === id
      )

      if (producto) {
        producto.cantidad++
        this.notificar(`Cantidad actualizada: ${producto.nombre}`)
      }
    },

    decrementarCantidad(id) {
      const producto = this.carrito.find(
        item => item.id === id
      )

      if (!producto) return

      if (producto.cantidad > 1) {
        producto.cantidad--
        this.notificar(`Cantidad actualizada: ${producto.nombre}`)
      } else {
        this.eliminarProducto(id)
      }
    },

    eliminarProducto(id) {
      const producto = this.carrito.find(
        item => item.id === id
      )

      if (!producto) return

      this.carrito = this.carrito.filter(
        item => item.id !== id
      )

      this.notificar(`${producto.nombre} eliminado del carrito`)
    },

    irAlPago() {
      if (this.carrito.length === 0) {
        this.notificar(
          'Agrega al menos un producto antes de continuar'
        )
        return false
      }

      this.pantalla = 'pago'
      return true
    },

    confirmarPago(metodo) {
      this.metodoPago = metodo
      this.estadoPago = 'Aprobado (simulación académica)'
      this.fechaFactura = new Date().toLocaleString('es-CO')
      this.pantalla = 'factura'
    },

    volverAlCarrito() {
      this.pantalla = 'tienda'
    },

    nuevaCompra() {
      this.carrito = []
      this.metodoPago = ''
      this.estadoPago = ''
      this.fechaFactura = ''
      this.numeroFactura++
      this.pantalla = 'tienda'

      this.notificar(
        'Nueva compra lista. ¡Explora nuestros productos!'
      )
    }
  }
})
