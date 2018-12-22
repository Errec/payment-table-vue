<template>
  <div class="login">
    <div class="login__panel">
      <div class="login__title">Login</div>
      <div class="login__form">
        <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
      </div>
    </div>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator";

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
                  placeholder: "User's e-mail address",
                  validator: VueFormGenerator.validators.email
              },{
                  type: "input",
                  inputType: "password",
                  label: "Password",
                  model: "password",
                  min: 6,
                  required: true,
                  hint: "Minimum 6 characters",
                  validator: VueFormGenerator.validators.string
              },{
                  type: "submit",
                  label: "",
                  buttonText: "Login",
                  validateBeforeSubmit: true,
                  onSubmit: this.onSignin
              }]
          },

          formOptions: {
              validateAfterLoad: true,
              validateAfterChanged: true
          }
        };
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

<style scoped lang="sass">
.login
  background-color: pink
  border-radius: 5px
  margin: 40px
</style>
