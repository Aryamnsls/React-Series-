export default function (self) {
  return function (error) {
    if (error.response.status === 403) {
      self.$router.push({
        name: 'login',
        query: { nextUrl: self.$route.path }
      })
    }
  }
}
