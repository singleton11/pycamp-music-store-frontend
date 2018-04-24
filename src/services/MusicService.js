import { musicResource } from '@/http/resources'

export default {
  getTracks () {
    return musicResource.getTracks().then((response) => {
      return response.body
    }, (error) => {
      alert(error.bodyText)
    })
  },
  getAlbums () {
    return musicResource.getAlbums().then((response) => {
      return response.body
    }, (error) => {
      alert(error.bodyText)
    })
  }
}
