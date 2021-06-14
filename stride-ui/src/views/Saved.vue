<template>
	<div class="saved-courses">
	<h1> My Courses</h1>
	<table>
     <thead class="row-head">
       <tr class="row-master">
        <!-- <th>ID</th> -->
        <th @click="sortByKey('uni_name')" >University</th>
        <th class="course-name" @click="sortByKey('name')">Course</th>
        <th @click="sortByKey('debt_to_earnings')">D/E Ratio</th>
        <th @click="sortByKey('credential_level_readable')">Education Level</th>
        
        <!-- <th @click="sortByKey('state')" >Location</th> -->
        <th @click="sortByKey('mean_earnings')">Mean Annual Earnings</th>
        
        <th></th>


      </tr>
      </thead> 
      <tr class="rows-data-template" v-for="course in savedCourseGetter" :key="course.name + course.uni_name + course.id.toString()">
        <!-- <td> {{ course.id }} </td> -->
        <td class="uni-name"> {{ course.uni_name.charAt(0).toUpperCase() + course.uni_name.toLowerCase().slice(1) }} </td>
        <td class="course-name"> {{ course.name }} </td>
        <td class="de-col"> <div class="de-rating" :style="{'background-color': decideColor(course.debt_to_earnings)}"></div> {{ course.debt_to_earnings }} </td>
        <td> {{ course.credential_level_readable }} </td>
        
        <!-- <td> {{ course.city.charAt(0).toUpperCase() + course.city.toLowerCase().slice(1) }}, {{ course.state}} </td> -->
        <td class="mean-earnings"> $ {{ numberWithCommas(course.mean_earnings) }}.00 </td>
              </tr>
    </table>
	</div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex';
export default {
	name: "Saved",
	computed: mapGetters(['savedCourseGetter']),
	methods: {
		...mapActions(['getSavedCourses', 'onSortByKeySaved']),
	decideColor (de) {
      if (de < 1.15) {
        return '#15A028'
      } else if (de <= 1.15) {
        return '#1CD535'
      } else if (de <= 1.5) {
        return '#C7E400'
      } else if (de <= 2.5 ) {
        return '#FFE016'
      } else if (de <= 5) {
        return '#FF9400'
      } else if (de <= 10) {
        return '#FF0A00'
      }
      else {
        return '#FF6340'
      }
    },
    numberWithCommas(x) {
      // copy pasted from stack overflow!
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    sortByKey (sortKey) {
          this.onSortByKeySaved(sortKey)
         
   	 	}
	},
	created () {
		this.getSavedCourses()

	}
}
</script>

<style type="text/css">
	.row-master th {
  padding:20px;
  background-color: #1D5EEF;
  color: white;
}

table {
  width: 100%;
  text-align: left;

}
 tr,table {
   border: 4px solid #F6F7FB;
   border-left: transparent;
   border-right: transparent;
   border-top: transparent;
   border-radius: 5px;
   border-collapse: collapse;
}
.uni-name:hover {
  text-decoration: underline;
}

.mean-earnings {
  padding-left: 20px;
  /*text-align: right;*/
  width: 15%;
}
.rows-data-template td {
  padding: 20px;
}
.de-rating {
  border-radius: 50%;
  height: 1rem;
  width: 1rem;
  /*margin-left: 15%;*/
  margin-bottom: -0.1em;
  display: inline-flex;
  margin-right: 10%;
}
tr:hover {
  box-shadow: 1px 1px 20px 1px #DCDDE0;
}
.de-col {
  width: 15%;
}
.uni-name {
  width: 18%;
  font-weight: lighter;
}
.course-name {
  text-align: center;
  
}
.add-course-btn {
  background-color: transparent;
  border-color: transparent;
  font-size: 1.5rem;
  border-radius: 5px;
  width: 110%;
}

.add-course-btn:hover {
  /*background-color: #DCDDE0;*/
  font-weight: bolder;

  background-color: #1D5EEF;
  color: white;

}
</style>