import config from './config'

export default (url, ...rest) =>
  fetch(config.host + url, ...rest)
    .then(res => {
      if (res.ok) {
        return res.json()
      }

      throw new Error('Connection error')
    })
