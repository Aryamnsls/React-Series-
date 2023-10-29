<template>
  <div>
    <h1>Shorts</h1>
    <table class="shorts" cellspacing="0">
      <thead>
        <tr>
          <th>Short</th>
          <th>Url</th>
          <th>Created at</th>
          <th>Calls</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="short of shortsInOrder" :key="short._id">
          <td class="icon-cell">
            <a :href="getShortUrl(short)" target="_blank">{{ short.hash }}</a>
            <fa-icon v-clipboard="getShortUrl(short)" class="icon-cell-icon" :icon="['far', 'copy']" fixed-width></fa-icon>
          </td>
          <td>
            <a :href="short.url" target="_blank">{{ short.url }}</a>
          </td>
          <td>{{ dateFormatted(short.createdAt) }}</td>
          <td>{{ totalCalls(short) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import globalErrorHandler from '../utils/globalErrorHandler'

export default {
  name: 'urls',
  mounted () {
    this.$store.commit('isLoading', true)
    this.$store.dispatch('fetchShorts').catch(globalErrorHandler(this)).finally(() => {
      this.$store.commit('isLoading', false)
    })
  },
  computed: {
    ...mapGetters(['shortsInOrder'])
  },
  methods: {
    dateFormatted (utcTimestamp) {
      let date = new Date(utcTimestamp)
      let now = new Date()
      if (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      ) {
        if (date.getHours() === now.getHours()) {
          let diff = now - date
          return `${Math.floor(diff / 1000 / 60)} minutes ago`
        } else {
          return `${date.getHours()}:${date.getMinutes()}`
        }
      }
      return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    },
    totalCalls (short) {
      let callsBrowser = short.stats.browser.reduce((prev, curr) => prev + curr.calls, 0)
      let callsOs = short.stats.os.reduce((prev, curr) => prev + curr.calls, 0)
      let callsDevices = short.stats.devices.reduce((prev, curr) => prev + curr.calls, 0)
      return callsBrowser + callsOs + callsDevices
    },
    getShortUrl (short) {
      return `${window.location.origin}/${short.hash}`
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin cell-color ($color: #eee) {
  background-color: $color;

  &:hover {
    background-color: lighten($color, 5%);
  }
}

table.shorts {
  color: black;

  tr {
    th, td {
      text-align: left;
      padding: 4px 12px;

      &.icon-cell {
        position: relative;
        padding-right: calc(12px + 22.5px + 12px);

        .icon-cell-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);

          border-radius: 50%;
          padding: 5px;

          cursor: pointer;

          background-color: none;
          transition: background-color .1s ease-in-out;

          &:hover, &:focus {
            background-color: #eee;
          }
        }
      }

      border: solid 3px #eee;

      &:not(:last-child) {
        border-right: none;
      }
    }
  }

  thead tr, tbody tr:not(:last-child) {
    th, td {
      border-bottom: none;
    }
  }

  thead tr:first-child {
    th:first-child {
      border-top-left-radius: 24px;
    }
    th:last-child {
      border-top-right-radius: 24px;
    }
  }
  tbody tr:last-child {
    td:first-child {
      border-bottom-left-radius: 24px;
    }
    td:last-child {
      border-bottom-right-radius: 24px;
    }
  }

  thead tr, tbody tr:nth-child(even) {
    @include cell-color(#eee);
  }
  tbody tr:nth-child(odd) {
    @include cell-color(#f6f6f6);
  }
}
</style>
