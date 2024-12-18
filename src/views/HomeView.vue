<template>
<v-row>
  <v-col cols="12" md="8">
    <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Calories
        </th>
        <th class="text-left">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item,index) in userList"
        :key="index"

      >
        <td>{{ item.name }}</td>
        <td>{{ item.phone }}</td>
        <td>
          <!-- <v-icon @click="userDelete(item,index)">mdi-pencil-outline</v-icon> -->
          <v-icon @click="userDelete(item,index)">mdi-trash-can</v-icon>
        </td>
      </tr>
    </tbody>
  </v-table>
  </v-col>
<v-col cols="12" md="4">
<v-row>
  <v-col cols="12" md="12">
    <v-text-field v-model="userone.name"  label="Name"/>
  </v-col>
  <v-col cols="12" md="12">
    <v-text-field v-model="userone.phone" label="Phone"/>
</v-col>
<v-col cols="12" md="12">
  <v-btn @click="saveUser()">Save</v-btn>
</v-col>
</v-row>
</v-col>
<v-col cols="12" md="12">
  <v-dialog max-width="500" v-model="deleteUserDialog">
    <v-card title="Dialog">
      <v-card-text>
        Delete
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Cancel"
          @click=" deleteUserDialog= false"
        ></v-btn>
        <v-btn
          text="Delete"
          @click="deleteUserObj()"
        ></v-btn>
      </v-card-actions>
    </v-card>
</v-dialog>
</v-col>
</v-row>
  </template>

<script>
export default {
  data () {
    return {
      userList: [],
      userone:{},
      deleteUserDialog:false,
      position:0,
    }
  },
  mounted:function(){
    this.userList.push(...this.$store.state.dataList);
  },
  methods: {
    saveUser:function(){
      this.$store.commit("updateUser", this.userone);
      this.userList.push(this.userone);  
      this.userone={};
    },
    deleteUserObj:function(){
      this.deleteUserDialog = false;
      this.userList.splice(this.position, 1);
      this.$store.commit("deleteUserPosition",this.position);
    },
    userDelete:function(item,position){
      this.position = position;
      this.deleteUserDialog = true;
      //this.userList.splice([position], 1);
    }
  },
  watch:{
  },
}
</script>
<style scoped>

</style>