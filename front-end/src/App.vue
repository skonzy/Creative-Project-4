<template>
<div id="app">
  <ul>
    <li><a><router-link to="/">Homepage</router-link></a></li>
    <li><a><router-link to="/Avatar-builder">Avatar Creator</router-link></a></li>
  </ul>
  <div class="header">
    <router-link to="/">
    </router-link>
    <div class="title">
      <h1>Avatar Creator</h1>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>


  <footer>
    <div class="part-one">
        <h1><a href="https://github.com/skonzy/Creative-Project-4">GitHub Repository</a></h1>
    </div>
  </footer>
</div>

</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Luminari', fantasy;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}
footer {
  border-top: 3px solid #000000;
  text-align: center;
  margin-top: 50px;
}
#menu {
  list-style-type: none;
  text-align: center;
}

/* Header */
.header {
  display: flex;
  padding: 0px 25px 0px 25px;
}

.title {
  /* margin-top: 5px; */
}

.title h1 {
  font-size: 50px;
}

.content {
    margin: 30px;
}

ul {
  list-style-type: none;
  font-color: white;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  /* background: #e3e3e3; */
  font-size: 20px;
  text-align: right;
}

.footer a {
  /* color: #000; */
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 20px;
}
</style>
