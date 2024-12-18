<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
          <span class="title">Register!</span><br><br>
          <span class="sub-title">Create a new account to get started.</span><br><br>
          <v-form 
              ref="form"
              v-model="valid"
              @submit.prevent="onRegister">
              <v-text-field
                v-model="email"
                label="Email"
                @focus="clearErrorMessage('email')"
                :rules="[rules.required, rules.email, rules.uniqueEmail]"
                outlined
              />
              <small 
                class="error-text"
                v-if="errorField === 'email'"
              >{{ errorMessage }}</small>

              <v-text-field
                v-model="username"
                label="Username"
                @focus="clearErrorMessage('username')"
                :rules="[rules.required, rules.username, rules.uniqueUsername]"
                outlined
              />
              <small
                class="error-text"
                v-if="errorField === 'username'"
              >{{ errorMessage }}</small>

              <v-text-field
                v-model="password"
                label="Password"
                @focus="clearErrorMessage('password')"
                :type="showPassword ?  'text': 'password'"
                :rules="[rules.required , rules.password]"
                outlined
              >
                <template #append-inner>
                  <v-icon
                    @click="tooglePasswordVisibility"
                    color="#000"
                    class="cursor-pointer"
                >{{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                </template>
              </v-text-field>
              <small
                class="error-text"
                v-if="errorField === 'password'"
              >{{ errorMessage }}</small>

              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                @focus="clearErrorMessage('confirmPassword')"
                :type="showConfirmPassword ? 'text' : 'password'"
                :rules="[rules.required, rules.passwordMatch]"
                outlined
              >
              <template #append-inner>
                <v-icon
                  @click="toogleConfirmPasswordVisibility"
                  color="#000"
                  class="cursor-pointer"
                >{{ showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
              </template>
              </v-text-field>
              <small
                class="error-text"
                v-if="errorField === 'confirmPassword'"
              >{{ errorMessage }}</small>
              
              <v-btn
                :disabled="!valid"
                type="submit"
                color="brown"
                block
              >Register</v-btn>
          </v-form>
          <v-divider class="my-4"></v-divider>
            <v-row justify="center">
              <p class="mt-4">
                Already have an account? <router-link to="/login">Login Here!</router-link>
              </p>
            </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default{
    data(){
      return{
        valid : false ,
        email : "",
        username : "",
        password : "",
        confirmPassword : "",
        showPassword : false,
        showConfirmPassword : false,
        errorMessage : "",
        errorField : "",
        rules : {
          required : (value) => !!value || "This field is required!",
          email : (value) => /..+@.+\..+/.test(value) || "Enter Valid Email Address!",
          passwordMatch : (value) => value === this.password || "Password must be matched!",
          uniqueEmail : (value) => !this.isEmailExists(value) || "Email already exists",
          uniqueUsername : (value) => !this.isUsernameExists(value) || "Username already exists",
        },
      };
    },
    methods : {
      onRegister(){
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const emailExists = users.some((user) => user.email === this.email);
        const usernameExists = users.some((user) => user.username === this.username);

        if(emailExists){
          this.errorMessage = "Email already exists";
          this.errorField = "email";
          return ;
        }

        if(usernameExists){
          this.errorMessage = "Username already exists";
          this.errorField = "username";
          return;
        }

        if(this.password !== this.confirmPassword){
          this.errorMessage = "Password must match";
          this.errorField = "confirmPassword";
          return;
        }
        
        this.errorMessage = "";
        this.errorField = "";
        users.push({
          email : this.email , 
          username : this.username , 
          password : this.password,
        });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful!");
        this.$router.push("/login");
      },
      tooglePasswordVisibility(){
        this.showPassword = !this.showPassword;
      },
      toogleConfirmPasswordVisibility(){
        this.showConfirmPassword = !this.showConfirmPassword;
      },
      isEmailExists(email) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        return users.some((user) => user.email === email);
      },
      isUsernameExists(username) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        return users.some((user) => user.username === username);
      },
      clearErrorMessage(field) {
        if (this.errorField === field) {
          this.errorMessage = "";
          this.errorField = "";
      }
    },
    },
  };
</script>
<style scoped>
.title{
  font-family: 'Times New Roman', Times, serif;
  font-size: 30px;
  font-weight: bold;
}
.sub-title{
  font-family: 'Times New Roman', Times, serif;
  font-size: 24px;
  color:brown;
}
.cursor-pointer {
  cursor: pointer;
}
.error-text {
  color: red;
  font-size: 0.9rem;
  margin-top: -5px;
  margin-bottom: 10px;
  display: block;
}
</style>
