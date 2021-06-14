import axios from 'axios'


function areEqual (a1,a2) {
      if (a1.length === a2.length) {
        for(let i=0; i < a1.length/2; i++) {
          if (a1[i].name !== a2[i].name) {
            return false
          }
        }
        return true
      }
    }

const state = {
	userDetails: {
		name: '',
		email: '',
		token: '',
		id: ''
	},
	loggedIn: false,
	savedCourses: []

}

const getters = {
	getUserDetails: state => state.userDetails,
	savedCourseGetter: state => state.savedCourses
}

const actions = { 
	async login ({ commit }, formData) {
		
		const response = await axios.post('http://127.0.0.1:8000' + '/sign-in/', formData)
	    if (response.status === 200) {
	      commit('setUserDetails', response.data)
	    }
	},
	async signUp ({ commit }, formData) {
		const res = await axios.post('http://127.0.0.1:8000' + '/sign-up/', formData)
		commit('setUserDetails', res.data)
 	},
 	async addCourse({ state }, courseId) {
 	  let formData = {}
      formData.course = courseId
      formData.user = state.userDetails.id
      const headers = { headers: { Authorization: 'Token ' + state.userDetails.token } }
      await axios.post('http://127.0.0.1:8000/saved/', formData, headers)

 	},
 	async getSavedCourses({ commit }) {
 		const headers = { headers: { Authorization: 'Token ' + state.userDetails.token } }
      	const r = await axios.get('http://127.0.0.1:8000/saved/', headers)
      	commit('setSavedCourses', r.data)
 	},
 	onSortByKeySaved({commit},sortKey) {
    	commit('sortByKeySaved', sortKey)

    },
  async deleteSaved({ state, commit }, id) {
    const headers = { headers: { Authorization: 'Token ' + state.userDetails.token } }
    axios.delete('http://127.0.0.1:8000/saved/' + id, headers)
    commit('removeSavedCourse', id)
  }
}

const mutations = {
	setUserDetails: (state, data) => {
		state.userDetails.name = data.first_name
		state.userDetails.id = data.id
		state.userDetails.email = data.email
		state.userDetails.token = data.token
		state.loggedIn = true
	},
  removeSavedCourse: (state, id) => {
    for(let i = 0; i < state.savedCourses.length; i++) {
      if (state.savedCourses[i] !== undefined) {
        if (state.savedCourses[i].id === id) {
          state.savedCourses.splice(i,1)
          break
        }
      }
    }
  },
	setSavedCourses: (state, data) => {
		state.savedCourses = data
	},
	sortByKeySaved: (state, sortKey) => {
  		let copy = [...state.savedCourses]
          
          if (typeof copy[0][sortKey] !== 'string') {

            copy.sort(function(a,b) {
              return a[sortKey] - b[sortKey]
            })

          } else {
            copy.sort(function(a,b) {
              return a[sortKey] < b[sortKey] ? -1 : 1
            })
          }

          if(areEqual(copy, state.savedCourses)) {
            state.savedCourses.reverse()
          } 
          else {
            state.savedCourses = copy

          }
  	}

}

export default {
  state,
  getters,
  actions,
  mutations
}
