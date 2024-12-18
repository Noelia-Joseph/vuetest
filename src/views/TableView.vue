<template> 
<v-row>
        <v-col cols="12" md="8" class="pl-1 pt-1 pb-1 ">
      <v-table
        fixed-header
        height="98vh"
        density="compact"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
                <th class="text-center white--text bg-primary">Name</th>
                <th class="text-center white--text bg-primary">Phone</th>
              <th class="text-center white--text bg-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in userList" :key="index" @click="selectedOne = item" :style="{
              backgroundColor:
                item.name == selectedOne.name
                  ? '#def3ff'
                  : 'transparent',
            }">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-left">{{ item.name}}</td>
              <td class="text-left">{{ item.phone }}</td>
              <td class="text-center">
                <v-btn density="compact" icon color="red" @click="clickDelete(item)">
                  <v-icon size="small">mdi-delete</v-icon></v-btn>
              </td>
            </tr>
            <v-divider />
          </tbody>
        </template>
      </v-table>
    </v-col>
    <v-col cols="12" md="4">
        <v-row class="align-center login-full">
            <v-col  cols="12" md="12">
                <v-text-field v-model="user.name" label="Name"></v-text-field>
            </v-col>
            <v-col  cols="12" md="12">
                <v-text-field v-model="user.phone" label="Phone"></v-text-field>
            </v-col>
            <v-col  cols="12" md="12">
                <v-btn @click="saveUser()">{{ saveOrupdate }}</v-btn>
            </v-col>
        </v-row>
</v-col>
</v-row>
</template>
<script>
export default {
  data: () => ({
    selectedOne:{},
    user:{},
    saveOrupdate:"SAVE",
    userList:[],
  }),
   props: {},
  mounted: function() {},
  methods: {
    saveUser:function(){
        this.userList.push(this.user);
        this.user={};
    }
  },
  watch: {},
  components: {}
};
</script>
<style scoped>
.login-full {
  height: 98vh;
}
table,
th,
td {
  border: 1px solid rgb(215, 215, 215);
  border-collapse: collapse;
  padding: 0 1px !important;
}
</style>