<template>
  <div id="app">
    <h1>uncle scrooge's <br>payroll</h1><br></h1>
    <router-view/>
  </div>
</template>

<style lang="sass">
  @import "styles/variables/colors"
  @import "styles/base/reset"
  @import "styles/base/normalize"
  @import url('https://fonts.googleapis.com/css?family=Ranchers|Roboto')

  html,
  body
    margin: 0
    padding: 0
    height: 100%
    width: 100%
    overflow-x: hidden
    font-family: 'Roboto'
    background:
      image: url("assets/img/bg02.jpg")
      position: 75% 0%
      size: cover
      repeat: no-repeat
      color: $blue-duck

  h1,
  h2,
  h3,
  p,
  li,
  ul,
  input,
  label 
    margin: 0

  #app
    width: 100%
    height: 100%
    h1
      padding-top: 32px
      text-align: center
      font-family: 'Ranchers'
      color: $yellow-duck
      text-shadow: $black-duck -3px 3px
      text-transform: uppercase
      letter-spacing: 0.15rem
</style>
