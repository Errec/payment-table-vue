<template>
  <div class="login">
    <div class="login__panel">
      <h3 class="login__title">Login</h3>
      <div class="login__form">
        <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
      </div>
    </div>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator"

export default {
  name: 'Home',
  data() {
        return {
          pageSize: 10,
          model: {
              password: "britecore",
              email: "britecore@britecore.com",
              status: true
          },
          schema: {
              fields: [{
                  type: "input",
                  inputType: "email",
                  label: "E-mail",
                  model: "email",
                  placeholder: "User's e-mail address"
              },{
                  type: "input",
                  inputType: "password",
                  label: "Password",
                  model: "password",
                  min: 6,
                  required: true,
                  hint: "Minimum 6 characters"
              },{
                  type: "submit",
                  label: "",
                  buttonText: "Enter",
                  validateBeforeSubmit: true,
                  onSubmit: this.onSignin
              }]
          },

          formOptions: {
              validateAfterLoad: true,
              validateAfterChanged: true
          }
        }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push({ name: 'table', params: {pageSize: this.pageSize }})
      }
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', {email: this.model.email, password: this.model.password})
    }
  }
}

</script>

<style lang="sass">
@import "../styles/variables/colors"

.login
  margin: 0 auto
  width: 100%
  padding: 0
  margin-top: 36px
  display: flex
  align-items: center
  justify-content: center

.login__panel
  margin: 0 auto
  max-width: 500px
  width: 90%
  position: relative

.login__title
  position: absolute
  color: $white-duck
  font-family: 'Ranchers'
  text-shadow: $black-duck -3px 3px
  font-size: 1.4rem
  left: 12px
  top: 6px
  text-transform: uppercase

.login__form
  height: 270px
  border: solid 4px $black-duck
  border-radius: 4px
  background:
    image: url('../assets/img/pattern.jpg')
    repeat: repeat
    size: 12px

  .vue-form-generator
    position: relative
    margin-top: 32px
    margin-left: 16px
    fieldset
      border: none
    .field-input
      margin: 12px 0
    label
      color: white
      text-shadow: $black-duck -2px 2px
      font:
        size: 1.2rem
        weight: bold
      text-transform: uppercase
    .form-control
      min-width: 140px
      width: 80%
      margin-top: 2px
      height: 28px
      border-radius: 4px
      padding-left: 12px
      font-size: 1rem
    .hint 
      font-size: 0.85rem
      margin-left: 2px
      font-weight: bold

    .field-submit .field-wrap
      position: relative
      input
        width: 80px
        height: 36px
        background-color: $yellow-duck
        text-transform: uppercase
        font-weight: bold
        font-size: 0.9rem
        border: solid $black-duck 2px
        border-radius: 3px
        &:hover
          transition: 0.3s ease-in-out
          cursor: pointer
          background-color: #f5ea55

</style>
