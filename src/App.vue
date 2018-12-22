<template>
  <div id="app">
    <h1>DUCK</h1>
    <router-view/>
  </div>
</template>

<style lang="sass">
  @import "styles/variables/colors"
  @import "styles/base/reset"
  @import "styles/base/normalize"
  @import url('https://fonts.googleapis.com/css?family=Peralta|Ranchers')

  html,
  body
    margin: 0
    padding: 0
    height: 100%
    width: 100%

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
    background-color: $yellow-duck
    width: 100%
    height: 100%
    h1
      font-family: 'Ranchers'
      color: $white-duck
</style>
