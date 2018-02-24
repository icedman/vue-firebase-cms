<template>
 <section class="hero is-fullheight is-dark is-bold" style="height:100%">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">
            <h1 class="title">
              Sign in
            </h1>
            <div class="box">
            <!-- <form method="POST" action="/login2"> -->
              <!-- <label class="label">Phone</label> -->
              <input style="display:none">
              <input name="authenticity_token" type="password" style="display:none">
              <!--
              <p class="control">
                <input _autocomplete='off' class="input" type="number"
                v-model="username" placeholder="ex. 9088776655">
              </p>
            -->
              <label class="label">Email</label>
              <p class="control">
                <input class="input" type="email" v-model="email" placeholder="jsmith@example.org">
              </p>
              <label class="label">Password</label>
              <p class="control">
                <input autocomplete='off' class="input" type="password"
                  v-model="password" placeholder="●●●●●●●">
              </p>

              <hr>
              <p class="control">
                <button class="button is-primary" @click="login()">Login</button>
                <a href="/" class="button is-secondary">
                  Continue as Guest
                </a>
                <button class="button is-info" @click="fblogin()" style="margin-top:10px">
                  <i class="fa fa-facebook" style="padding-right:10px"></i>
                  Login with Facebook</button>
                <button class="button is-danger" @click="gglogin()" style="margin-top:10px">
                  <i class="fa fa-google" style="padding-right:10px"></i>
                  Login with Google</button>
              </p>
            <!-- </form> -->

    <section>
        <b-message class="is-danger" title="" :active.sync="isActive">
            {{loginMessage}}
        </b-message>
    </section>

            </div>
            <p class="has-text-centered">
              <router-link class="is-inverted" to="/register" :exact="true" :aria-expanded="false">
                Register
              </router-link>
                  |
              <router-link class="is-inverted" to="/forget" :exact="true" :aria-expanded="false">
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
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      isActive: false,
      loginMessage: '',
      email: '',
      password: '',
    };
  },

  computed: Object.assign({
  },
  mapGetters('ui', ['fullpage']),
  ),

  mounted() {
    this.$store.commit('ui/SHOW_FULLPAGE', true);
    this.$store.commit('ui/SHOW_LEVELBAR', false);
  },

  methods: Object.assign({

    logout() {
      this.$firebase.auth().signOut();
    },

    login() {
      if (this.email.length < 4) {
        this.$snackbar.open({ type: 'is-danger', message: 'Please enter an email address.' });
        return;
      }
      if (this.password.length < 4) {
        this.$snackbar.open({ type: 'is-danger', message: 'Please enter a password.' });
        return;
      }
      this.$firebase.auth().setPersistence(this.$firebase.auth.Auth.Persistence.LOCAL)
        .then(() => this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password))
        .then(() => {
          this.$snackbar.open({ type: 'is-success', message: 'Login successful.' });
          this.$router.push('/');
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

    gglogin(_provider) {
      let provider = _provider;
      if (!provider) {
        provider = new this.$firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      }
      this.$firebase.auth().setPersistence(this.$firebase.auth.Auth.Persistence.LOCAL)
        .then(() => this.$firebase.auth().signInWithPopup(provider))
        .then(() => {
          // var token = result.credential.accessToken
          this.$snackbar.open({ type: 'is-success', message: 'Login successful.' });
          this.$router.push('/');
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

    fblogin() {
      const provider = new this.$firebase.auth.FacebookAuthProvider();
      this.gglogin(provider);
    },
  },
  mapActions('ui', ['setFullPage']),
  ),
};
</script>

<style lang="scss" scoped>
</style>
