<template>
    <span class="header">Log In</span><br><br>
    <span class="title">Welcome back! Log In to continue!</span><br><br>
    <v-container >
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-form 
                    ref="form"
                    v-model="valid"
                    @submit.prevent="onLogin"
                >
                    <v-text-field
                      v-model="emailOrUsername"
                      label=" Email or Username"
                      :rules="[rules.required , rules.emailOrUsername]"
                      outlined
                      dense
                      @focus="clearErrorMessage"
                    />
                    <small 
                        class="error-text" 
                        v-if="errorMessage && inputField === 'emailOrUsername'"
                    >{{ errorMessage }}</small>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        :rules="[rules.required]" 
                        :type="showPassword ?  'text': 'password'"
                        outlined
                        dense
                        @focus="clearErrorMessage"
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
                        v-if="errorMessage && inputField === 'password'"
                        >{{ errorMessage }}</small>
                    <v-btn
                        :disabled="!valid"
                        type="submit"
                        color="blue"
                        block
                    >Log In</v-btn>
                    <v-divider class="my-4"></v-divider>
                        <v-row justify="center">
                            <p class="mt-4">
                                Don't have an account?<router-link to="/register">Register Here!</router-link>
                            </p>
                        </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default {
        data(){
            return{
                valid : false,
                emailOrUsername : "",
                password : "",
                errorMessage : "",
                showPassword : false ,
                inputField : "",
                rules : {
                    required: (value) => !!value || "This field is required" ,
                    emailOrUsername: (value) => /..+@.+\..+/.test(value) || value.length > 3 || "Enter the valid Email or Username",
                },
            };
        },
        methods :{
            onLogin(){
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const user = users.find(
                    (u) => (u.email === this.emailOrUsername || u.username === this.emailOrUsername)
                );
                if (!user) {
                    if (this.emailOrUsername && this.password) {
                        alert("Invalid credentials. Please Register Here!");
                        this.$router.push("/register");
                    } else {
                        this.errorMessage = "Invalid username or email";
                        this.inputField = "emailOrUsername";
                    }
                    return;
                    }
                if(user.password !== this.password){
                    this.errorMessage = "Incorrect Password";
                    this.inputField = "password";
                    return;
                }
                    this.errorMessage = "";
                    this.inputField = "";
                    alert('Login successful!');
                    this.$router.push("/homepage");
            },
            clearErrorMessage(){
                this.errorMessage = "";
                this.inputField = "";
            },
            tooglePasswordVisibility(){
                this.showPassword = !this.showPassword;
            },
        },
    };
</script>
<style scoped>
    .header{
        font-family: 'Times New Roman', Times, serif;
        font-size: 30px;
        font-weight: 500;
    }
    .title{
        font-family: 'Times New Roman', Times, serif;
        font-size: 22px;
        color: blue;
    }
    .v-form{
        max-width : 400px;
        margin : 0 auto;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .error-text {
    color: red;
    font-size: 0.9rem;
    margin-top: -10px;
    margin-bottom: 10px;
    display: block;
    }
</style>
