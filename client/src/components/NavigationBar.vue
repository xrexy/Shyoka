<template>
  <div>
    <header class="level">
      <a href="#" class="level-item"><img src="../assets/logo.png" alt="SHYOKA" class="logo"/></a>
      <nav class="level-item">
        <ul class="nav__links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Schools</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <div class="level-item">
        <a href="#"><button>Login</button></a>
        <a href="#"><button class="is-danger">Register</button></a>
      </div>
    </header>
  </div>
</template>

<style scoped>
li,
a,
button {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: #edf0f1;
  text-decoration: none;
}

header {
  align-items: center;
  background-color: #24252a;
  padding: 15px;
}

.logo {
  cursor: pointer;
}

.nav__links {
  list-style: none;
}

.nav__links li {
  display: inline-block;
  margin-left: 20px;
}

.nav__links li a {
  transition: all 0.2s ease 0s;
}

.nav__links li a:hover {
  color: rgb(103, 63, 143);
}

button:first-child {
  margin-left: 10px;
}

button {
  padding: 9px 25px;
  background-color: rgba(103, 63, 143, 1);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease 0s;
}

button:hover {
  background-color: rgba(103, 63, 143, 0.8);
}
</style>
