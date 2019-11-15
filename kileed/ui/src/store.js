/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/store/api'
import auth from '@/store/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    api,
    auth
  }
})

