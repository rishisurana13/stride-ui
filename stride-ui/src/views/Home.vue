<template>
  <div v-if="this.$store.state.user.loggedIn === true" class="home">
    <h1 class="title-home"> Stride Funding Course Browser </h1>
    <p id="subtitle"> Find a Course that suits your needs. </p>

   <div  class="search-filter-bar">

    <form id="search-bar" @submit="onSearch(queryText)">
        <input type="text" id="search-bar-input" placeholder="Search Courses" v-model="queryText" autocomplete="off">
        <button id="search-btn"> Search </button>
    </form>

    <div class="filter-btns">

    <FilterButton groupName="Debt To Earnings" :filterOptions="debtEarningsOptions"/>
    <FilterButton groupName="Annual Earnings" :filterOptions="meanEarningsOptions"/>
    <FilterButton groupName="State" :filterOptions="['State','MA', 'CA', 'NY', 'TX']"/>

    <select  @change="onChange($event)" name="Education Level">
    <optgroup>
    <option v-for="filter in educationLevelOptions" :key="filter">{{ filter }}</option>
    </optgroup>
    </select>

    </div>

    </div>

    <ResultsDisplay class="results-display-container"/>
  </div>
  <div v-else > Please Log in to access this feature.</div>
</template>

<script>
// @ is an alias to /src
import FilterButton from "@/components/FilterButton.vue";
import ResultsDisplay from "@/components/ResultsDisplay.vue";
// import axios from 'axios'
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  computed: mapGetters(['loggedIn']),
  data () {
    return {
        queryText: '',
        educationLevelOptions: ['Education Level','Undergraduate Certificate', 'Associate\'s Degree', 'Post Baccalaureate Certificate', 'Master\'s Degree','Doctoral Degree', 'First Professional Degree', 'Graduate Certificate'],
        debtEarningsOptions: ['Debt Risk','Highest to Lowest','Lowest to Highest'],
        meanEarningsOptions: ['Annual Earnings','<$50,000', '$50,000 - $100,000', '$100,000 - $250,000', '$250,000 -'],
        educationLevel: ''
        
    }
  },
  methods: {
    onSearch (queryText) {
        event.preventDefault()
        console.log(this.educationLevel)
        console.log(queryText)
    },
    onChange(event) {
        this.educationLevel = event.target.value
    }
    
  },
  components: {
    FilterButton,
    ResultsDisplay
  },
};
</script>

<style type="text/css">

.subtitle-home {
    font-weight: light;
}

input:focus {
    outline:none;
}

#search-bar {
    margin-top: 1em;
    display: inline-flex;
    margin-left: 2%;
}
input:placeholder {
    margin-left: 2%;
}
#search-bar-input {
    
    height: 2em;
    font-size: 1rem;
    font-weight: light;
    padding-left: 10px;
    width: 20rem;
    min-width: 6em;

    border-radius: 5px;
    border-color: transparent;
    border-width: 1px;
    background-color: #F6F7FB;

}
.search-filter-bar {
    display: inline-flex;
    width: 80%;
    height: 100%;
    background-color: white;
    border-radius: 15px;
    padding: 20px;
    filter: drop-shadow(5px 5px 5px #DCDDE0);
}
.filter-btns {
    display: inline-flex;
    margin-top: 0.75em;
    margin-left: 5%;
    margin-bottom: 0.75em;
}
#search-btn {
    background-color: #1D5EEF;
    height: 2.5em;
    border-color: transparent;
    color: white;
    border-radius: 2.5px;
    margin-left: 2%;
}
#search-btn:hover {
    background-color: #174DC4;

}
.results-display-container {
    margin-top: 2em;
    margin-left: 8.5%;
    display: block;
    height: 100%;
    min-height: 20em;
    filter: drop-shadow(0px 10px 10px #DCDDE0);
}

select {
    /*min-width: 7em;*/
    width: 9rem;
    background-color: #F6F7FB;
    border-color: transparent;
    height: 3em;
    border-radius: 5px;
    font-weight: lighter;
    padding: 5px;
    font-size: 0.8rem;
}
optgroup {
    border-radius: 15px;
}
</style>
