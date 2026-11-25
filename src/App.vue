
<script setup>
import { useTiendaStore } from './stores/useTiendaStore'

import AppHeader from './components/AppHeader.vue'
import ListaProductos from './components/ListaProductos.vue'
import CarritoCompra from './components/CarritoCompra.vue'
import MetodoPago from './components/MetodoPago.vue'
import FacturaCompra from './components/FacturaCompra.vue'
import AppFooter from './components/AppFooter.vue'

// Conexión con Pinia
const tienda = useTiendaStore()

// Navegar al proceso de pago
function irAlPago() {
  const puedeContinuar = tienda.irAlPago()

  if (puedeContinuar) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Confirmar pago simulado
function confirmarPago(metodo) {
  tienda.confirmarPago(metodo)

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Iniciar una nueva compra
function nuevaCompra() {
  tienda.nuevaCompra()

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Volver a la tienda
function volverATienda() {
  tienda.volverAlCarrito()

  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="aplicacion">

    <!-- ENCABEZADO -->
    <AppHeader :total-unidades="tienda.totalUnidades" />

    <!-- NOTIFICACIONES -->
    <Transition name="aviso">
      <div
        v-if="tienda.mensaje"
        class="notificacion"
        role="status"
      >
        <span class="notificacion-icono">✓</span>
        <span>{{ tienda.mensaje }}</span>
      </div>
    </Transition>

    <main class="principal">

      <!-- ========================= -->
      <!-- PANTALLA PRINCIPAL -->
      <!-- ========================= -->

      <template v-if="tienda.pantalla === 'tienda'">

        <!-- PORTADA -->
        <section class="hero">

          <div class="hero-contenido">

            <div class="hero-etiqueta">
              <span class="punto-activo"></span>
              TU ESPACIO TECNOLÓGICO
            </div>

            <h1>
              La tecnología
              <br />
              que mueve tu
              <span>mundo.</span>
            </h1>

            <p class="hero-descripcion">
              Descubre accesorios, dispositivos y productos
              tecnológicos diseñados para acompañarte en
              cada momento.
            </p>

            <div class="hero-acciones">
              <a href="#catalogo" class="boton-explorar">
                Explorar productos
                <span>↗</span>
              </a>

              <div class="hero-confianza">
                <span class="confianza-icono">✦</span>
                <span>Experiencia de compra sencilla</span>
              </div>
            </div>

          </div>

          <!-- ELEMENTO DECORATIVO -->
          <div class="hero-visual">

            <div class="circulo-fondo"></div>

            <div class="tarjeta-flotante tarjeta-superior">
              <span class="tarjeta-icono">✦</span>
              <div>
                <strong>TECH STORE</strong>
                <small>Tu mundo tecnológico</small>
              </div>
            </div>

            <div class="figura-tecnologica">
              <div class="figura-circulo">
                <span>⌘</span>
              </div>

              <div class="figura-texto">
                <span>TECNOLOGÍA</span>
                <strong>Sin límites.</strong>
              </div>
            </div>

            <div class="tarjeta-flotante tarjeta-inferior">
              <span class="estrella">✧</span>
              <div>
                <strong>Descubre algo nuevo</strong>
                <small>Encuentra tu próximo favorito</small>
              </div>
            </div>

          </div>

          <div class="hero-numero">
            <span>01</span>
            <span class="linea-numero"></span>
            <span>TECH STORE</span>
          </div>

        </section>

        <!-- FRANJA INFORMATIVA -->
        <section class="franja-informativa">

          <div class="dato-informativo">
            <span class="dato-icono">◈</span>
            <div>
              <strong>Catálogo tecnológico</strong>
              <small>Productos seleccionados</small>
            </div>
          </div>

          <div class="separador-dato"></div>

          <div class="dato-informativo">
            <span class="dato-icono">◇</span>
            <div>
              <strong>Compra organizada</strong>
              <small>Controla tu carrito</small>
            </div>
          </div>

          <div class="separador-dato"></div>

          <div class="dato-informativo">
            <span class="dato-icono">✧</span>
            <div>
              <strong>Pago de demostración</strong>
              <small>Proceso académico seguro</small>
            </div>
          </div>

        </section>

        <!-- CATÁLOGO Y CARRITO -->
        <section id="catalogo" class="seccion-tienda">

          <div class="titulo-seccion">

            <div>
              <span class="subtitulo-seccion">
                DESCUBRE NUESTRA COLECCIÓN
              </span>

              <h2>
                Encuentra lo que
                <span>necesitas.</span>
              </h2>

              <p>
                Explora nuestro catálogo y elige tus productos favoritos.
              </p>
            </div>

            <div class="contador-productos">
              <span class="contador-icono">▦</span>
              <span>08 productos disponibles</span>
            </div>

          </div>

          <div class="contenido-tienda">

            <!-- LISTA DE PRODUCTOS -->
            <ListaProductos
              @agregar-al-carrito="tienda.agregarAlCarrito"
            />

            <!-- CARRITO -->
            <CarritoCompra
              :carrito="tienda.carrito"
              :subtotal="tienda.subtotal"
              :descuento-total="tienda.descuentoTotal"
              :iva="tienda.iva"
              :total="tienda.total"
              @incrementar="tienda.incrementarCantidad"
              @decrementar="tienda.decrementarCantidad"
              @eliminar="tienda.eliminarProducto"
              @finalizar-compra="irAlPago"
            />

          </div>

        </section>

        <!-- MENSAJE INFERIOR -->
        <section class="mensaje-final">

          <div class="mensaje-final-icono">✦</div>

          <div>
            <strong>La tecnología está en tus manos.</strong>
            <p>
              Explora, compara y encuentra los accesorios
              que complementan tu día a día.
            </p>
          </div>

        </section>

      </template>

      <!-- ========================= -->
      <!-- PANTALLA DE PAGO -->
      <!-- ========================= -->

      <section
        v-else-if="tienda.pantalla === 'pago'"
        class="pantalla-transaccion"
      >

        <div class="encabezado-transaccion">
          <span class="subtitulo-seccion">PASO FINAL</span>
          <h1>Completa tu <span>compra.</span></h1>
          <p>
            Selecciona tu método de pago para finalizar
            el proceso de demostración.
          </p>
        </div>

        <MetodoPago
          :total="tienda.total"
          @pago-confirmado="confirmarPago"
          @cancelar="volverATienda"
        />

      </section>

      <!-- ========================= -->
      <!-- PANTALLA DE FACTURA -->
      <!-- ========================= -->

      <section
        v-else-if="tienda.pantalla === 'factura'"
        class="pantalla-transaccion"
      >

        <div class="encabezado-transaccion">
          <span class="subtitulo-seccion">COMPRA FINALIZADA</span>
          <h1>¡Gracias por <span>elegirnos!</span></h1>
          <p>
            Aquí puedes consultar el resumen de tu compra.
          </p>
        </div>

        <FacturaCompra
          :numero-factura="tienda.numeroFactura"
          :fecha="tienda.fechaFactura"
          :carrito="tienda.carrito"
          :subtotal="tienda.subtotal"
          :descuento-total="tienda.descuentoTotal"
          :iva="tienda.iva"
          :total="tienda.total"
          :metodo-pago="tienda.metodoPago"
          :estado-pago="tienda.estadoPago"
          @nueva-compra="nuevaCompra"
        />

      </section>

    </main>

    <!-- PIE DE PÁGINA -->
    <AppFooter />

  </div>
</template>

<style>
/* ==========================================
   CONFIGURACIÓN GENERAL
========================================== */

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');

:root {
  font-family: 'DM Sans', sans-serif;
  color: #29213d;
  background: #f8f7fc;

  --morado: #7951dc;
  --morado-oscuro: #5732b5;
  --morado-claro: #eee8ff;
  --texto: #29213d;
  --texto-suave: #817b91;
  --blanco: #ffffff;
  --borde: #eae6f2;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background: #f8f7fc;
  color: var(--texto);
}

button,
input {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

a {
  color: inherit;
}

.aplicacion {
  min-height: 100vh;
  overflow: hidden;
}

/* ==========================================
   CONTENIDO PRINCIPAL
========================================== */

.principal {
  width: min(1480px, 100%);
  min-height: 72vh;
  margin: 0 auto;
  padding: 28px 36px 55px;
}

/* ==========================================
   PORTADA HERO
========================================== */

.hero {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  min-height: 430px;
  padding: 55px 65px;
  overflow: hidden;
  border: 1px solid #e9e2f8;
  border-radius: 28px;
  background:
    radial-gradient(
      circle at 85% 20%,
      #e8ddff 0,
      transparent 35%
    ),
    linear-gradient(115deg, #ffffff 5%, #f5f0ff 100%);
  box-shadow: 0 15px 45px #3b24610b;
}

.hero-contenido {
  position: relative;
  z-index: 2;
  max-width: 620px;
}

.hero-etiqueta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 15px;
  border: 1px solid #e3d9fa;
  border-radius: 50px;
  background: #ffffffb8;
  color: #7049c8;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.8px;
}

.punto-activo {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #8a62e5;
  box-shadow: 0 0 0 4px #8a62e51e;
}

.hero h1 {
  margin: 24px 0 18px;
  color: #29213d;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(38px, 5vw, 65px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -3px;
}

.hero h1 span {
  color: var(--morado);
}

.hero-descripcion {
  max-width: 470px;
  color: #797287;
  font-size: 15px;
  line-height: 1.9;
}

.hero-acciones {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 22px;
  margin-top: 30px;
}

.boton-explorar {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  padding: 15px 22px;
  border-radius: 12px;
  background: linear-gradient(135deg, #8963e7, #653cc4);
  color: white;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 8px 20px #7951dc35;
  transition: transform 0.25s, box-shadow 0.25s;
}

.boton-explorar:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px #7951dc45;
}

.boton-explorar span {
  font-size: 18px;
}

.hero-confianza {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #777087;
  font-size: 11px;
  font-weight: 600;
}

.confianza-icono {
  color: var(--morado);
  font-size: 18px;
}

/* ==========================================
   ELEMENTO VISUAL DE PORTADA
========================================== */

.hero-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 320px;
}

.circulo-fondo {
  position: absolute;
  width: 290px;
  height: 290px;
  border: 1px solid #d7c9f6;
  border-radius: 50%;
  background: linear-gradient(145deg, #e7dcff, #f8f4ff);
  box-shadow:
    inset 0 0 35px #ffffff,
    0 20px 55px #6940b51a;
}

.circulo-fondo::before,
.circulo-fondo::after {
  position: absolute;
  content: '';
  border: 1px solid #cfc0f1;
  border-radius: 50%;
}

.circulo-fondo::before {
  inset: 22px;
}

.circulo-fondo::after {
  inset: 45px;
}

.figura-tecnologica {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.figura-circulo {
  display: grid;
  place-items: center;
  width: 145px;
  height: 145px;
  border: 7px solid #ffffff;
  border-radius: 38px;
  background: linear-gradient(145deg, #9975ed, #6741c4);
  color: white;
  font-family: 'Manrope', sans-serif;
  font-size: 90px;
  font-weight: 800;
  box-shadow: 0 20px 35px #5732b53a;
  transform: rotate(-8deg);
}

.figura-texto {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.figura-texto span {
  color: #8063c5;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 3px;
}

.figura-texto strong {
  color: #3b2b5a;
  font-family: 'Manrope', sans-serif;
  font-size: 25px;
}

.tarjeta-flotante {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 13px 16px;
  border: 1px solid #ffffff;
  border-radius: 14px;
  background: #ffffffeb;
  box-shadow: 0 10px 30px #37215c17;
  backdrop-filter: blur(10px);
}

.tarjeta-flotante strong,
.tarjeta-flotante small {
  display: block;
}

.tarjeta-flotante strong {
  color: #403451;
  font-size: 11px;
}

.tarjeta-flotante small {
  margin-top: 4px;
  color: #938ba0;
  font-size: 9px;
}

.tarjeta-superior {
  top: 25px;
  right: 0;
}

.tarjeta-inferior {
  bottom: 25px;
  left: 0;
}

.tarjeta-icono {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #eee8ff;
  color: #7951dc;
  font-size: 19px;
}

.estrella {
  color: #8a62e5;
  font-size: 25px;
}

.hero-numero {
  position: absolute;
  right: 30px;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 9px;
  color: #a197b6;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.linea-numero {
  width: 35px;
  height: 1px;
  background: #c9b9e8;
}

/* ==========================================
   FRANJA INFORMATIVA
========================================== */

.franja-informativa {
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr;
  align-items: center;
  gap: 25px;
  margin: 25px 0 60px;
  padding: 21px 30px;
  border: 1px solid var(--borde);
  border-radius: 17px;
  background: white;
}

.dato-informativo {
  display: flex;
  align-items: center;
  gap: 13px;
}

.dato-icono {
  display: grid;
  place-items: center;
  width: 43px;
  height: 43px;
  border-radius: 13px;
  background: #f1ecff;
  color: #7951dc;
  font-size: 22px;
}

.dato-informativo strong,
.dato-informativo small {
  display: block;
}

.dato-informativo strong {
  color: #403650;
  font-size: 12px;
}

.dato-informativo small {
  margin-top: 5px;
  color: #938ba0;
  font-size: 10px;
}

.separador-dato {
  height: 38px;
  background: #eeeaf4;
}

/* ==========================================
   ENCABEZADO DEL CATÁLOGO
========================================== */

.seccion-tienda {
  scroll-margin-top: 25px;
}

.titulo-seccion {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  margin-bottom: 27px;
}

.subtitulo-seccion {
  color: #8565cb;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
}

.titulo-seccion h2 {
  margin: 10px 0 7px;
  color: #302642;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(25px, 3vw, 36px);
  font-weight: 800;
  letter-spacing: -1.2px;
}

.titulo-seccion h2 span {
  color: var(--morado);
}

.titulo-seccion p {
  margin: 0;
  color: #898294;
  font-size: 13px;
  line-height: 1.7;
}

.contador-productos {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 15px;
  border: 1px solid #e9e3f4;
  border-radius: 10px;
  background: white;
  color: #786c91;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.contador-icono {
  color: var(--morado);
  font-size: 17px;
}

/* ==========================================
   DISTRIBUCIÓN DE CATÁLOGO Y CARRITO
========================================== */

.contenido-tienda {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 28px;
  align-items: start;
}

/* ==========================================
   MENSAJE FINAL
========================================== */

.mensaje-final {
  display: flex;
  align-items: center;
  gap: 17px;
  margin-top: 55px;
  padding: 23px 27px;
  border: 1px solid #e6def5;
  border-radius: 17px;
  background: linear-gradient(100deg, #f0eaff, #ffffff);
}

.mensaje-final-icono {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 43px;
  height: 43px;
  border-radius: 13px;
  background: white;
  color: #8057db;
  font-size: 24px;
  box-shadow: 0 4px 12px #51309b13;
}

.mensaje-final strong {
  color: #48365f;
  font-size: 13px;
}

.mensaje-final p {
  margin: 5px 0 0;
  color: #898095;
  font-size: 11px;
  line-height: 1.6;
}

/* ==========================================
   NOTIFICACIONES
========================================== */

.notificacion {
  position: fixed;
  z-index: 1000;
  top: 90px;
  right: 25px;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: min(390px, calc(100% - 30px));
  padding: 16px 21px;
  border: 1px solid #a78be8;
  border-radius: 14px;
  background: #6843bd;
  color: white;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  box-shadow: 0 12px 35px #3c216c35;
}

.notificacion-icono {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #ffffff25;
  font-weight: 800;
}

/* Animación de notificaciones */

.aviso-enter-active,
.aviso-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.aviso-enter-from,
.aviso-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* ==========================================
   PANTALLAS DE PAGO Y FACTURA
========================================== */

.pantalla-transaccion {
  max-width: 1100px;
  margin: 25px auto;
}

.encabezado-transaccion {
  margin-bottom: 28px;
  text-align: center;
}

.encabezado-transaccion h1 {
  margin: 12px 0;
  color: #302642;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(29px, 4vw, 43px);
  font-weight: 800;
  letter-spacing: -1.5px;
}

.encabezado-transaccion h1 span {
  color: var(--morado);
}

.encabezado-transaccion p {
  color: #898294;
  font-size: 13px;
  line-height: 1.7;
}

/* ==========================================
   RESPONSIVE - TABLET
========================================== */

@media (max-width: 1100px) {
  .principal {
    padding: 24px;
  }

  .hero {
    padding: 45px;
  }

  .contenido-tienda {
    grid-template-columns: minmax(0, 1fr) 310px;
    gap: 18px;
  }

  .franja-informativa {
    gap: 15px;
    padding: 20px;
  }
}

/* ==========================================
   RESPONSIVE - PANTALLAS MEDIANAS
========================================== */

@media (max-width: 850px) {
  .hero {
    grid-template-columns: 1fr 0.8fr;
    padding: 38px 30px;
  }

  .hero-visual {
    transform: scale(0.85);
  }

  .hero h1 {
    font-size: 43px;
  }

  .contenido-tienda {
    grid-template-columns: 1fr;
  }

  .franja-informativa {
    grid-template-columns: 1fr;
    gap: 17px;
  }

  .separador-dato {
    width: 100%;
    height: 1px;
  }
}

/* ==========================================
   RESPONSIVE - CELULARES
========================================== */

@media (max-width: 600px) {
  .principal {
    padding: 15px 13px 35px;
  }

  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 32px 22px 25px;
    border-radius: 20px;
  }

  .hero h1 {
    margin-top: 20px;
    font-size: clamp(37px, 11vw, 49px);
    letter-spacing: -2px;
  }

  .hero-descripcion {
    font-size: 13px;
  }

  .hero-acciones {
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
  }

  .hero-visual {
    min-height: 280px;
    margin-top: 15px;
    transform: scale(0.9);
  }

  .circulo-fondo {
    width: 245px;
    height: 245px;
  }

  .figura-circulo {
    width: 125px;
    height: 125px;
    font-size: 75px;
  }

  .tarjeta-superior {
    right: -5px;
  }

  .tarjeta-inferior {
    left: -5px;
  }

  .hero-numero {
    right: 15px;
    bottom: 12px;
    font-size: 8px;
  }

  .franja-informativa {
    margin: 18px 0 43px;
    padding: 20px;
  }

  .titulo-seccion {
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
  }

  .titulo-seccion h2 {
    font-size: 27px;
  }

  .contador-productos {
    font-size: 10px;
  }

  .mensaje-final {
    align-items: flex-start;
    padding: 19px;
  }

  .notificacion {
    top: 80px;
    right: 15px;
    font-size: 12px;
  }

  .pantalla-transaccion {
    margin: 15px auto;
  }
}

/* ==========================================
   RESPONSIVE - CELULARES PEQUEÑOS
========================================== */

@media (max-width: 380px) {
  .hero {
    padding: 25px 17px;
  }

  .hero h1 {
    font-size: 35px;
  }

  .hero-visual {
    transform: scale(0.78);
  }

  .hero-confianza {
    font-size: 10px;
  }

  .principal {
    padding-right: 10px;
    padding-left: 10px;
  }
}
</style>
