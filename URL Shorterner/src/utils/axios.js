import axios from 'axios'

if (process.env.NODE_ENV === 'development') {
  const MockAdapter = require('axios-mock-adapter')
  var mock = new MockAdapter(axios, {
    delayResponse: 2000
  })

  let mockedAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbUB0b21kZ20uY2giLCJleHAiOjE1NjAwMzIwNzk1NDYsImlhdCI6MTU1OTQyNzI3OX0.EoJZUt6TyQl6fQBbV0LAXQsCWSgwpJmZczC_y1hh2vQ'

  mock.onPost('/signup').reply(200, {
    message: 'Signup successful'
  })

  mock.onPost('/signin').reply(config => {
    sessionStorage.setItem('AccessToken', mockedAccessToken)

    return [200, {
      message: 'Signin successful'
    }]
  })

  mock.onGet('/shorts').reply(config => {
    if (sessionStorage.getItem('AccessToken')) {
      return [200, [
        {
          stats: {
            _id: '5ce9153dcae8669f97727f82',
            browser: [{
              _id: '5ce91588cae8669f97727f8d',
              family: 'Other',
              major: '0',
              minor: '0',
              patch: '0',
              calls: 4
            }],
            os: [{
              _id: '5ce91588cae8669f97727f8f',
              family: 'Other',
              major: '0',
              minor: '0',
              patch: '0',
              calls: 4
            }],
            devices: [{
              _id: '5ce91588cae8669f97727f91',
              family: 'Other',
              major: '0',
              minor: '0',
              patch: '0',
              calls: 4
            }]
          },
          _id: '5ce91569cae8669f97727f84',
          hash: '10lh79',
          url: 'https://tomdgm.ch',
          createdAt: '2019-05-25T10:14:01.033Z',
          updatedAt: '2019-05-25T10:52:55.212Z',
          __v: 0
        },
        {
          stats: {
            _id: '5ce91628b55dbca016459a02',
            browser: [{
              _id: '5ce931f537b6c0ccdf160f9f',
              family: 'Other',
              major: '0',
              minor: '0',
              patch: '0',
              calls: 601
            }],
            os: [{
              _id: '5ce931f537b6c0ccdf160fa1',
              family: 'Other',
              major: '0',
              minor: '0',
              patch: '0',
              calls: 601
            }],
            devices: [{
              _id: '5ce931f537b6c0ccdf160fa3',
              family: 'Other',
              major: '0',
              minor: '0',
              patch: '0',
              calls: 601
            }]
          },
          _id: '5ce9162bb55dbca016459a03',
          hash: '5mIAkk',
          url: 'https://google.com',
          createdAt: '2019-05-25T10:17:15.311Z',
          updatedAt: '2019-05-25T13:23:39.427Z',
          __v: 0
        }
      ]]
    } else {
      return [403, {
        message: 'Unauthorized'
      }]
    }
  })

  mock.onPost('/shorts').reply(config => {
    if (sessionStorage.getItem('AccessToken')) {
      return [200, 'As5dpF']
    } else {
      return [403, {
        message: 'Unauthorized'
      }]
    }
  })
}

export default axios
