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
