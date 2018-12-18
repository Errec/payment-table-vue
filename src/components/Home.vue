<template>
  <div class="login">
    <div class="panel panel-default">
      <div class="panel-heading">Login</div>
      <div class="panel-body">
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
          model: {
              name: "John Doe",
              password: "J0hnD03!x4",
              age: 35,
              skills: ["Javascript", "VueJS"],
              email: "john.doe@gmail.com",
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
              }]
          },

          formOptions: {
              validateAfterLoad: true,
              validateAfterChanged: true
          }
        };
      }
}

</script>

<style scoped lang="scss">

</style>
