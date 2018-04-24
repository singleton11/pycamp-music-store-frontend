import { musicResource } from '@/http/resources'

export default {
  getTracks () {
    return musicResource.getTracks().then((response) => {
      return response.body
    }, (error) => {
      alert(error.bodyText)
    })
  },
  getBoughtTracks () {
    return musicResource.getBoughtTracks().then((response) => {
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
  },
  buyAlbum (id) {
    return musicResource.buyAlbum({id: id}).then((response) => {
      console.log(response)
      return response.body
    }, (error) => {
      console.log(error)
    })
  },
  getBoughtAlbums () {
    return musicResource.getBoughtAlbums().then((response) => {
      return response.body
    }, (error) => {
      alert(error.bodyText)
    })
  }
}
