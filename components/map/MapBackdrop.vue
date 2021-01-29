<template>
  <Backdrop v-model="model">
    <template #collapsed>
      <v-toolbar dark color="#6217ee" :dense="dense">
        <v-btn icon @click="model = true">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Step 1</v-toolbar-title>
        <v-btn icon @click="subheader = !subheader">
          <v-icon>mdi-checkbox</v-icon>
        </v-btn>
        <v-btn icon @click="dense = !dense">
          <v-icon>mdi-arrow-collapse-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </template>

    <template #back>
      <v-sheet color="#6217ee">
        <v-toolbar :dense="dense" flat dark color="#6217ee">
          <v-btn icon @click="model = false"><v-icon>mdi-close</v-icon></v-btn>
          <v-toolbar-title>Step 1</v-toolbar-title>
          <v-btn icon @click="subheader = !subheader">
            <v-icon>mdi-checkbook</v-icon>
          </v-btn>
          <v-btn icon @click="dense = !dense">
            <v-icon>mdi-arrow-collapse-vertical</v-icon>
          </v-btn>
        </v-toolbar>
        Steps:
        <v-slider v-model="steps" min="0" max="20"></v-slider>
        <v-stepper vertical dark>
          <v-stepper-step v-for="x in steps" :key="x" :step="x">
            Step {{ x }}
          </v-stepper-step>
        </v-stepper>
      </v-sheet>
    </template>

    <template v-if="subheader" #subheader>
      <v-toolbar :dense="!dense" flat>
        <v-toolbar-title>Payment</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-btn v-if="model" icon @click="model = false">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider />
    </template>

    <v-sheet class="pa-3">
      <v-text-field outlined label="First name"></v-text-field>
      <v-text-field outlined label="Last name"></v-text-field>
      <v-text-field outlined label="Phone"></v-text-field>
      <v-text-field outlined label="Street"></v-text-field>
      <v-text-field outlined label="City"></v-text-field>
      <v-text-field outlined label="Zip"></v-text-field>
      <v-text-field outlined label="First name"></v-text-field>
      <v-text-field outlined label="Last name"></v-text-field>
      <v-text-field outlined label="Phone"></v-text-field>
      <v-text-field outlined label="Street"></v-text-field>
      <v-text-field outlined label="City"></v-text-field>
      <v-text-field outlined label="Zip"></v-text-field>
      <v-text-field outlined label="First name"></v-text-field>
      <v-text-field outlined label="Last name"></v-text-field>
      <v-text-field outlined label="Phone"></v-text-field>
      <v-text-field outlined label="Street"></v-text-field>
      <v-text-field outlined label="City"></v-text-field>
      <v-text-field outlined label="Zip"></v-text-field>
    </v-sheet>
  </Backdrop>
</template>

<script>
import Backdrop from '../Backdrop.vue'
export default {
  components: { Backdrop },
  data: () => ({
    model: false,
    steps: 3,
    subheader: true,
    dense: false,
  }),
}
</script>
