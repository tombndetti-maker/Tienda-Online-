
<template>
  <footer class="pie">
    <div class="marca">
      <span class="logo">T</span>
      <strong>TECH STORE</strong>
    </div>

    <p>Proyecto académico de tecnología e informática.</p>
    <p class="copyright">© {{ new Date().getFullYear() }} TECH STORE · Demo educativa</p>
  </footer>
</template>

<style scoped>
.pie {
  padding: 28px 20px;
  border-top: 1px solid #e9e2f5;
  background: white;
  text-align: center;
}

.marca {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  color: #5b21b6;
}

.logo {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: #7c3aed;
  color: white;
  font-weight: bold;
}

.pie p {
  color: #766c83;
  font-size: 13px;
}

.pie .copyright {
  font-size: 11px;
}
</style>
