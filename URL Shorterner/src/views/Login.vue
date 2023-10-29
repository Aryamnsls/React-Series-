<template>
  <div>
    <h1>Login</h1>
    <form onSubmit="return false">
      <div class="flex">
        <u-input v-model="email" rules="required|email" name="email" label="Email" :icon="['far', 'envelope']"></u-input>
      </div>
      <div class="flex">
        <u-input v-model="password" rules="required" name="password" type="password" label="Password" :icon="['far', 'lock']"></u-input>
      </div>
      <div class="flex">
        <div class="layout">
          <div class="flex">
            <p>
              <router-link :to="{ name: 'register', query: { ...this.$route.query } }">New here?</router-link>
            </p>
          </div>
          <div class="flex">
            <p>
              <u-button @click="login" :disabled="!valid" :loading="loading" color="blue">Login</u-button>
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  mounted () {
    this.$store.commit('isLoading', false)
  },
  data () {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  computed: {
    valid () {
      return !!this.email && !!this.password && this.errors.items.length <= 0
    }
  },
  methods: {
    login () {
      if (this.valid) {
        this.loading = true
        this.axios.post('/signin', {
          email: this.email,
          password: this.password
        }).then(result => {
          this.$router.push(this.$route.query.nextUrl || '/')
        }).catch(err => {
          if (err) {
            this.$store.dispatch('notify', {
              type: 'error',
              title: 'Oh no!',
              text: 'An error occured. Please try again.',
              time: 5000
            })
          }
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>
