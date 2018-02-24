<template>
<section class="hero is-fullheight is-dark is-bold" style="height:100%">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">
            <h1 class="title">Register an Account</h1>

            <div class="box">
              <label class="label">Email</label>
              <p class="control">
                <input class="input" type="email" v-model="email" placeholder="jsmith@example.org"/>
              </p>
              <!--
              <label class="label">Phone</label>
              <p class="control">
                <input class="input" type="number" v-model="phone" placeholder="ex. 908877665"/>
              </p>
              <label class="label">First Name</label>
              <p class="control">
                <input class="input" type="text" v-model="first_name" placeholder="John"/>
              </p>
              <label class="label">Last Name</label>
              <p class="control">
                <input class="input" type="text" v-model="last_name" placeholder="Smith"/>
              </p>
              <hr>
              -->
              <label class="label">Password</label>
              <p class="control">
                <input class="input" type="password" v-model="password" placeholder="●●●●●●●">
              </p>
              <label class="label">Confirm Password</label>
              <p class="control">
                <input class="input" type="password" v-model="password_confirm" placeholder="●●●●●●●">
              </p>
              <hr>
              <p class="control">
                <button class="button is-primary" @click="register()">Register</button>
                <router-link to="/" :exact="true" :aria-expanded="false" class="button is-secondary">
                  Cancel
                </router-link>
              </p>
            </div>

            <p class="has-text-centered">
              <router-link to="/login" :exact="true" :aria-expanded="false">
                Login
              </router-link>
                  |
              <router-link to="/forget" :exact="true" :aria-expanded="false">
                Forgot password
              </router-link>
                  |
              <router-link class="is-inverted" to="/" :exact="true" :aria-expanded="false">
                Need help?
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
</section>
</template>

<script>
export default {

  data() {
    return {
      phone: '',
      first_name: '',
      last_name: '',
      email: '',
      verify: '',
      password: '',
      password_confirm: '',
    };
  },

  mounted() {
    this.$store.commit('ui/SHOW_FULLPAGE', true);
  },

  methods: {

    /*
    promptVerificationCode() {
      this.verify = '';
      this.$dialog.prompt({
        title: 'Verify phone number ownership',
        message: 'Please enter the code we sent through SMS.',
        inputAttrs: {
          placeholder: '',
          maxlength: 12,
        },
        onConfirm: (value) => {
          this.verify = value;
          this.register();
        },
      });
    },
    */

    register() {
      if (this.email.length < 4) {
        this.$snackbar.open({ type: 'is-danger', message: 'Please enter an email address.' });
        return;
      }
      if (this.password.length < 4) {
        this.$snackbar.open({ type: 'is-danger', message: 'Please enter a password.' });
        return;
      }

      if (this.password !== this.password_confirm) {
        this.$snackbar.open({ type: 'is-danger', message: 'Please enter a password.' });
        return;
      }

      this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          //
          this.$snackbar.open({ type: 'is-success', message: 'Registration successful.' });
          this.$router.push('/login');
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            this.$snackbar.open({ type: 'is-danger', message: 'Wrong password.' });
          } else {
            this.$snackbar.open({ type: 'is-danger', message: errorMessage });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
