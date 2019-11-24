<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Email input field
-->
<template>
  <v-text-field
    v-model="childValue"
    :error-messages="errorMessages"
    prepend-icon="mail"
    type="text"
    error-count="3"
    v-bind="field"
  />
</template>

<script>
import FieldMixin from '@/mixins/api/field'

export default {
  mixins: [FieldMixin]
}
</script>
