/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms
 * of the Do What The Fuck You Want To Public License, Version 2, as published
 * by the comrade Sam Hocevar.
 *
 * See the COPYING file for more details.
*/
import axios from 'axios'

export default {
  post (url, data) {
    url = 'http://localhost:8000/api/' + url
    return axios.post(url, data)
  },
  get (url) {
    url = 'http://localhost:8000/api/' + url
    return axios.get(url)
  }
}
