<template>
  <div class="filter-group">
    
    <select :name="groupName">
    <optgroup>
    <option v-for="filter in filterOptions" :key="filter">{{ filter }}</option>
    </optgroup>
</select>
<!-- <label class="group-title"> {{ groupName }} </label> -->
  </div>
</template>

<script>
export default {
  name: "FilterButton",
  props: ['groupName', 'filterOptions'],
};
</script>

<style type="text/css">
.filter-group {
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 0em;
}
.group-title, optgroup {
    display: block;
    padding-left: 8px;

}
.group-title {
    text-align: left;
    font-size: 0.9rem;
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

