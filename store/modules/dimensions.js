// initial state
const state = {
  dimensionsList: [{
    'id': 'AGEGROUP',
    'type': 'SIMPLE',
    'label': 'Age Group',
    'editable': true
  },
  {
    'id': 'DATE_',
    'type': 'SIMPLE',
    'label': 'Date',
    'editable': true
  },
  {
    'id': 'DATE_DESC',
    'type': 'SIMPLE',
    'label': 'Description of DATE values',
    'editable': true
  },
  {
    'id': 'HISP',
    'type': 'SIMPLE',
    'label': 'Hispanic Origin',
    'editable': true
  },
  {
    'id': 'RACE',
    'type': 'SIMPLE',
    'label': 'Race',
    'editable': true
  },
  {
    'id': 'SEX',
    'type': 'SIMPLE',
    'label': 'Sex',
    'editable': true
  },
  {
    'id': 'UNIVERSE',
    'type': 'SIMPLE',
    'label': 'Universe',
    'editable': true
  },
  {
    'id': 'MEASURE',
    'type': 'MEASURE',
    'label': 'Measure',
    'editable': true
  },
  {
    'id': 'GCT',
    'type': 'GCT',
    'label': 'Gct',
    'editable': false
  }],
  verticalDimensionsList: [],
  horizontalDimensionsList: [],
  outsideDimensionsList: []
}
// getters
const getters = {
}
// mutations
const mutations = {
  UPDATE_VERTICAL_DIMENSIONS_LIST (state, verticalDimensionsList) {
    state.verticalDimensionsList = verticalDimensionsList
  },
  UPDATE_HORIZONTAL_DIMENSIONS_LIST (state, horizontalDimensionsList) {
    state.horizontalDimensionsList = horizontalDimensionsList
  },
  UPDATE_OUTSIDE_DIMENSIONS_LIST (state, outsideDimensionsList) {
    state.outsideDimensionsList = outsideDimensionsList
  },
  SET_DIMENSIONS (state, dimensionsList) {
    state.dimensionsList = dimensionsList
  }
}
// actions
const actions = {
  updateVerticalDimensionsList ({commit}, verticalDimensionsList) {
    commit('UPDATE_VERTICAL_DIMENSIONS_LIST', verticalDimensionsList)
  },
  updateHorizontalDimensionsList ({commit}, horizontalDimensionsList) {
    commit('UPDATE_HORIZONTAL_DIMENSIONS_LIST', horizontalDimensionsList)
  },
  updateOutsideDimensionsList ({commit}, outsideDimensionsList) {
    commit('UPDATE_OUTSIDE_DIMENSIONS_LIST', outsideDimensionsList)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions

}
