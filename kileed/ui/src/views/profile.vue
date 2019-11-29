<!--
  Copyright © 2019 STJV <contact@stjv.fr>

  This work is free. You can redistribute it and/or modify it under the terms
  of the Do What The Fuck You Want To Public License, Version 2, as published
  by the comrade Sam Hocevar.

  See the COPYING file for more details.
-->
<template>
  <v-container fluid>
    <v-layout>
      <v-flex class="ma-1" xs2>
        <v-card>
          <v-card-title>
            {{ $t('User profile') }}
          </v-card-title>
          <v-card-text>
            <v-list-item :to="{name :'profile' }">
              <v-list-item-content>
                <v-list-item-title>Profile Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <router-view />
      </v-flex>
    </v-layout>
  </v-container>
</template>
