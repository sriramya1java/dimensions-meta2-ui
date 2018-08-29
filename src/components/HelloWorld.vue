<template>
  <v-container fluid>
    <v-alert :value="showalert">Please select atleast one option!!</v-alert>
    <v-layout row wrap align-center>
      <v-flex xs5>
        <div>
          <label>Dimensions:</label><br>
          <select id="dimensionsList" v-model="dimensionsSelected" multiple="multiple" style="min-height: 600px;background:#f8f8f8; min-width:400px;">
            <option v-for="dimensions in dimensionsList" v-bind:value="dimensions" >{{ dimensions.label }}</option>
          </select>
        </div>
      </v-flex>
      <v-flex xs7>
        <v-layout row wrap align-center>
          <div>
            <v-btn slot="activator" color="grey" dark icon v-on:click="multiselect_rightSelected(dimensionsSelected, dimensionsList, verticalDimensionsList, 'vertical')">
              <v-icon>chevron_right</v-icon>
            </v-btn><br>
            <v-btn slot="activator" color="grey" dark icon v-on:click="multiselect_leftSelected(verticalDimensionsSelected, verticalDimensionsList, dimensionsList, 'vertical')">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </div>
          <div>
            <label>Vertical Dimensions:</label><br>
            <select id="verticalDimensionsList" v-model="verticalDimensionsSelected" multiple="multiple" style="min-height: 200px;background:#f8f8f8; min-width:300px;">
              <option v-for="verticalDimensions in verticalDimensionsList" v-bind:value="verticalDimensions" >{{ verticalDimensions.label }}</option>
            </select>
          </div>
          <div>
            <v-btn slot="activator" color="grey" dark icon v-on:click="moveVerticalAxisElement(-1)">
              <v-icon>expand_less</v-icon>
            </v-btn><br>
            <v-btn slot="activator" color="grey" dark icon v-on:click="moveVerticalAxisElement(1)">
              <v-icon>expand_more</v-icon>
            </v-btn>
          </div>
        </v-layout>
        <v-layout row wrap align-center>
          <div>
            <v-btn slot="activator" color="grey" dark icon v-on:click="multiselect_rightSelected(dimensionsSelected, dimensionsList, horizontalDimensionsList, 'horizontal')">
              <v-icon>chevron_right</v-icon>
            </v-btn><br>
            <v-btn slot="activator" color="grey" dark icon v-on:click="multiselect_leftSelected(horizontalDimensionsSelected, horizontalDimensionsList, dimensionsList, 'horizontal')">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </div>
          <div>
            <label>horizontal Dimensions:</label><br>
            <select id="horizontalDimensionsList" v-model="horizontalDimensionsSelected" multiple="multiple" style="min-height: 200px;background:#f8f8f8; min-width:300px;">
              <option v-for="horizontalDimensions in horizontalDimensionsList" v-bind:value="horizontalDimensions" >{{ horizontalDimensions.label }}</option>
            </select>
          </div>
          <div>
            <v-btn slot="activator" color="grey" dark icon v-on:click="moveHorizontalAxisElement(-1)">
              <v-icon>expand_less</v-icon>
            </v-btn><br>
            <v-btn slot="activator" color="grey" dark icon v-on:click="moveHorizontalAxisElement(1)">
              <v-icon>expand_more</v-icon>
            </v-btn>
          </div>
        </v-layout>
        <v-layout row wrap align-center>
          <div>
            <v-btn slot="activator" color="grey" dark icon v-on:click="multiselect_rightSelected(dimensionsSelected, dimensionsList, outsideDimensionsList, 'outside')">
              <v-icon>chevron_right</v-icon>
            </v-btn><br>
            <v-btn slot="activator" color="grey" dark icon v-on:click="multiselect_leftSelected(outsideDimensionsSelected, outsideDimensionsList, dimensionsList, 'vertical')">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </div>
          <div>
            <label>outside Dimensions:</label><br>
            <select id="outsideDimensionsList" v-model="outsideDimensionsSelected" multiple="multiple" style="min-height: 200px;background:#f8f8f8; min-width:300px;">
              <option v-for="outsideDimensions in outsideDimensionsList" v-bind:value="outsideDimensions" >{{ outsideDimensions.label }}</option>
            </select>
          </div>
          <div>
            <v-btn slot="activator" color="grey" dark icon v-on:click="moveOutsideAxisElement(-1)">
              <v-icon>expand_less</v-icon>
            </v-btn><br>
            <v-btn slot="activator" color="grey" dark icon v-on:click="moveOutsideAxisElement(1)">
              <v-icon>expand_more</v-icon>
            </v-btn>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        showalert: false,
        dimensionsSelected: [],
        verticalDimensionsSelected: [],
        outsideDimensionsSelected: [],
        horizontalDimensionsSelected: []
      }
    },
    computed: {
      dimensionsList: {
        get () {
          return this.$store.state.dimensions.dimensionsList
        },
        set (dimensionsList) {
          this.$store.commit('dimensions/SET_DIMENSIONS', dimensionsList)
        }
      },
      verticalDimensionsList: {
        get () {
          return this.$store.state.dimensions.verticalDimensionsList
        },
        set (verticalDimensionsList) {
          this.$store.dispatch('dimensions/updateVerticalDimensionsList', verticalDimensionsList)
        }
      },
      horizontalDimensionsList: {
        get () {
          return this.$store.state.dimensions.horizontalDimensionsList
        },
        set (horizontalDimensionsList) {
          this.$store.dispatch('dimensions/updateHorizontalDimensionsList', horizontalDimensionsList)
        }
      },
      outsideDimensionsList: {
        get () {
          return this.$store.state.dimensions.outsideDimensionsList
        },
        set (outsideDimensionsList) {
          this.$store.dispatch('dimensions/updateOutsideDimensionsList', outsideDimensionsList)
        }
      }
    },
    methods: {
      // methods to move selected dimensions from dimensions list into respective axes list
      multiselect_rightSelected: function (dimensionsSelected, dimensionsList, axesDimensionsList, axes) {
        // console.log(dimensionsSelected)
        this.showalert = dimensionsSelected.length === 0
        dimensionsSelected.forEach(x => {
          const leftIndex = dimensionsList.findIndex(y => y === x)
          dimensionsList.splice(leftIndex, 1)
          const rightIndex = axesDimensionsList.findIndex(z => z === x)
          if (!(rightIndex > -1)) {
            axesDimensionsList.push(x)
          }
        })
        if (axes === 'vertical') {
          this.$store.dispatch('dimensions/updateVerticalDimensionsList', axesDimensionsList)
        } else if (axes === 'horizontal') {
          this.$store.dispatch('dimensions/updateHorizontalDimensionsList', axesDimensionsList)
        } else if (axes === 'outside') {
          this.$store.dispatch('dimensions/updateOutsideDimensionsList', axesDimensionsList)
        }
      },
      // methods to move selected axes dimensions from dimensions list dimensions list
      multiselect_leftSelected: function (axesDimensionsSelected, axesDimensionsList, dimensionsList, axes) {
        this.showalert = axesDimensionsSelected.length === 0
        axesDimensionsSelected.forEach(x => {
          const rightIndex = axesDimensionsList.findIndex(y => y === x)
          axesDimensionsList.splice(rightIndex, 1)
          const leftIndex = dimensionsList.findIndex(z => z === x)
          if (!(leftIndex > -1)) {
            dimensionsList.push(x)
          }
        })
        if (axes === 'vertical') {
          // console.log(axesDimensionsList)
          this.$store.dispatch('dimensions/updateVerticalDimensionsList', axesDimensionsList)
          this.$store.commit('dimensions/SET_DIMENSIONS', dimensionsList)
        } else if (axes === 'horizontal') {
          // console.log(axesDimensionsList)
          this.$store.dispatch('dimensions/updateHorizontalDimensionsList', axesDimensionsList)
          this.$store.commit('dimensions/SET_DIMENSIONS', dimensionsList)
        } else if (axes === 'outside') {
          // console.log(axesDimensionsList)
          this.$store.dispatch('dimensions/updateOutsideDimensionsList', axesDimensionsList)
          this.$store.commit('dimensions/SET_DIMENSIONS', dimensionsList)
        }
      },
      moveVerticalAxisElement: function (positionChange) {
        if (this.verticalDimensionsSelected.length > 1) {
          alert('please select only one dimension')
        } else {
          let oldIndex = this.verticalDimensionsList.findIndex(y => y.label === this.verticalDimensionsSelected[0].label)
          if (oldIndex > -1) {
            let newIndex = (oldIndex + positionChange)
            if (newIndex < 0) {
              newIndex = 0
            } else if (newIndex >= this.verticalDimensionsList.length) {
              newIndex = this.verticalDimensionsList.length
            }
            let arrayClone = this.verticalDimensionsList.slice()
            arrayClone.splice(oldIndex, 1)
            arrayClone.splice(newIndex, 0, this.verticalDimensionsSelected[0])
            this.verticalDimensionsList = arrayClone
            return this.verticalDimensionsList
          }
          console.log(this.verticalDimensionsList)
          this.$store.dispatch('dimensions/updateVerticalDimensionsList', this.verticalDimensionsList)
          return this.verticalDimensionsList
        }
      },
      moveHorizontalAxisElement: function (positionChange) {
        if (this.horizontalDimensionsSelected.length > 1) {
          alert('please select only one dimension')
        } else {
          let oldIndex = this.horizontalDimensionsList.findIndex(y => y.label === this.horizontalDimensionsSelected[0].label)
          if (oldIndex > -1) {
            let newIndex = (oldIndex + positionChange)
            if (newIndex < 0) {
              newIndex = 0
            } else if (newIndex >= this.horizontalDimensionsList.length) {
              newIndex = this.horizontalDimensionsList.length
            }
            let arrayClone = this.horizontalDimensionsList.slice()
            arrayClone.splice(oldIndex, 1)
            arrayClone.splice(newIndex, 0, this.horizontalDimensionsSelected[0])
            this.horizontalDimensionsList = arrayClone
            return this.horizontalDimensionsList
          }
          console.log(this.horizontalDimensionsList)
          this.$store.dispatch('dimensions/updateHorizontalDimensionsList', this.horizontalDimensionsList)
          return this.horizontalDimensionsList
        }
      },
      moveOutsideAxisElement: function (positionChange) {
        if (this.outsideDimensionsSelected.length > 1) {
          alert('please select only one dimension')
        } else {
          let oldIndex = this.outsideDimensionsList.findIndex(y => y.label === this.outsideDimensionsSelected[0].label)
          if (oldIndex > -1) {
            let newIndex = (oldIndex + positionChange)
            if (newIndex < 0) {
              newIndex = 0
            } else if (newIndex >= this.outsideDimensionsList.length) {
              newIndex = this.outsideDimensionsList.length
            }
            let arrayClone = this.outsideDimensionsList.slice()
            arrayClone.splice(oldIndex, 1)
            arrayClone.splice(newIndex, 0, this.outsideDimensionsSelected[0])
            this.outsideDimensionsList = arrayClone
            return this.outsideDimensionsList
          }
          console.log(this.outsideDimensionsList)
          this.$store.dispatch('dimensions/updateOutsideDimensionsList', this.outsideDimensionsList)
          return this.outsideDimensionsList
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  select {
    border: 1px solid;
  }
</style>
