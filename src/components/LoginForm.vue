<template>
  <div class="login-page">
    <transition name="fade">
      <div v-if="!registerActive" class="wallpaper-login"></div>
    </transition>
    <div class="wallpaper-register"></div>

    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
          <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
            <h1>Sign In</h1>
            <form class="form-group">
              <input v-model="emailLogin" type="email" class="form-control" placeholder="Email" required />
              <input v-model="passwordLogin" type="password" class="form-control" placeholder="Password" required />
              <input type="submit" class="btn btn-primary" @click.prevent="doLogin" />
              <p>Don't have an account? <a href="#" @click="(registerActive = !registerActive), (emptyFields = false)">Sign up here</a></p>
              <p><a href="#">Forgot your password?</a></p>
            </form>
          </div>

          <div v-else class="card register" v-bind:class="{ error: emptyFields }">
            <h1>Sign Up</h1>
            <form class="form-group">
              <input v-model="emailReg" type="email" class="form-control" placeholder="Email" required />
              <input v-model="passwordReg" type="password" class="form-control" placeholder="Password" required />
              <input v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required />
              <input type="submit" class="btn btn-primary" @click.prevent="doRegister" />
              <p>Already have an account? <a href="#" @click="(registerActive = !registerActive), (emptyFields = false)">Sign in here</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  el: "#app",
  data() {
    return {
      registerActive: false,
      emailLogin: "",
      passwordLogin: "",
      emailReg: "",
      passwordReg: "",
      confirmReg: "",
      emptyFields: false,
      user_token: {},
      username: "maple1",
      password: "reboot123",
    };
  },
  methods: {
    loginSample() {
      this.axios
        .post("dj-rest-auth/login/", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);
          this.user_token = response.data;
          this.$store.commit("setUsername", this.username);
          this.$router.push("/rec");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
    registerSample() {
      this.axios
        .post("dj-rest-auth/registration/", {
          username: this.username,
          password1: this.password,
          password2: this.password,
          email: "test@reboot.com",
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async doLogin() {
      if (this.emailLogin === "" || this.passwordLogin === "") {
        this.emptyFields = true;
      } else {
        await this.loginSample();
        alert("You are now logged in");
      }
    },
    async doRegister() {
      if (this.emailReg === "" || this.passwordReg === "" || this.confirmReg === "") {
        this.emptyFields = true;
      } else {
        await this.registerSample();
        alert("You are now registered");
      }
    },
  },
};
</script>
<style lang="scss">
p {
  line-height: 1rem;
}

.card {
  padding: 20px;
}

.form-group {
  input {
    margin-bottom: 20px;
  }
}

.login-page {
  align-items: center;
  display: flex;
  height: 100vh;

  .wallpaper-login {
    background: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .wallpaper-register {
    background: url(https://images.pexels.com/photos/533671/pexels-photo-533671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: -1;
  }

  h1 {
    margin-bottom: 1.5rem;
  }
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }
  25% {
    transform: translateX(25px);
  }
  50% {
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
