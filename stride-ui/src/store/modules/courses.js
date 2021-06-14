
import axios from "axios";



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

const state =  {
  	courseData: [],
    nextUrl: ''
  }
const getters =  {
  	courseDataResults: state => state.courseData,
    getNextUrl: state => state.nextUrl
  }

const actions =  {
  	async fetchResults ({ commit }) {
        const response = await axios.get('http://127.0.0.1:8000/courses/')
        let results = response.data.results
        commit('setCourseData', results)
        commit('setNextUrl', response.data.next)
    },
    onSortByKey ({commit},sortKey) {
    	commit('sortByKey', sortKey)

    }, 
    async fetchMoreCourses({ state, commit }) {
      console.log(state.nextUrl)
      const response = await axios.get(state.nextUrl)
      commit('addNewCourses', response.data.results)
      commit('setNextUrl', response.data.next)
    }


  }

const mutations =  {
  	setCourseData: (state, courses) => (state.courseData = courses),
    setNextUrl: (state, url) => (state.nextUrl = url),
    addNewCourses: (state, newResults) => { 
      
      for (let i = 0; i < newResults.length; i++) {
        if (newResults[i] !== undefined) {
            state.courseData.push(newResults[i])
        }
        
      }

    },
  	sortByKey: (state, sortKey) => {
  		let copy = [...state.courseData]
          
          if (typeof copy[0][sortKey] !== 'string') {

            copy.sort(function(a,b) {
              return a[sortKey] - b[sortKey]
            })

          } else {
            copy.sort(function(a,b) {
              return a[sortKey] < b[sortKey] ? -1 : 1
            })
          }

          if(areEqual(copy, state.courseData)) {
            state.courseData.reverse()
          } 
          else {
            state.courseData = copy

          }
  	}
  }

export default {
  state,
  getters,
  actions,
  mutations
}
