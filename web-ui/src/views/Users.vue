<!--
  Copyright © 2019 STJV <contact@stjv.fr>

  This work is free. You can redistribute it and/or modify it under the terms
  of the Do What The Fuck You Want To Public License, Version 2, as published
  by the comrade Sam Hocevar.

  See the COPYING file for more details.
-->
<template>
  <v-container fluid>
    <v-layout row>
      <v-flex md2>
        <v-card class="mr-3">
          <v-card-text>
            <v-list dense>
              <v-list-item v-for="(it, id) in users"
                :key="id"
                @click="selectedUser = it">
                  <v-list-item-avatar >
                    <v-img :src="it.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{it.username}}</v-list-item-title>
                    <v-list-item-subtitle>{{it.email}}</v-list-item-subtitle>
                  </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md10>
        <v-card>
          <v-tabs>
            <v-tab>
              User Informations
            </v-tab>
            <v-tab>
              Permissions
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-title>
                  Profile
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-layout wrap>
                      <v-flex xs12 sm6>
                        <v-text-field label="Username">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field label="Username">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field label="Username">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field label="Username">
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              Permissions
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Users',
  data: () => ({
    users: {},
    selectedUser: {},
    loading: false,
    myValue: {
        name: 'Jumo',
        password: '123456',
        email: 'base@mail.com',
        checkbox: true,
        select: 'Jobs',
      },   
      mySchema: {
        name: { type: 'text', label: 'Name' },
        password: { type: 'password', label: 'Password' },
        email: { type: 'email', label: 'Email' },
        checkbox: { type: 'checkbox', label: 'Checkbox' },
        select: { type: 'select', label: 'Select', items: ['Tesla', 'Jobs', 'Taleb'] }
      }
  }),
  mounted () {
    api.get('users').then(response =>
      this.users = response.data
    )
  }
}
</script>
