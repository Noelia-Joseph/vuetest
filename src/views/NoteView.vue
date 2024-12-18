<template>
    <v-app>
      <v-container>
        <!-- Header -->
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-combobox
              label="Combobox"
              :items="tempNotes"
              v-model="tempNote"
            ></v-combobox>
          </v-col>
          <v-col cols="12" md="12">
            <span> <v-text-field @input="searchMethod()" v-model="txtSearch" label="Search"/></span>
          </v-col>
          <v-col cols="12" md="8">

            <v-card class="pa-4 app-card">
              <v-card-title>
                <span class="title">Notes</span>
              </v-card-title>
  
              <!-- Add or Update Note -->
              <v-card-text>
                <v-form >
                  <v-text-field
                    v-model="noteInput"
                    label="Enter or update a note"
                    outlined
                    dense
                    required
                    @keydown.enter.prevent="handleNoteAction()"
                  ></v-text-field>
                  <v-row class="mt-2">
                    <v-col>
                      <v-btn class="add-btn" @click="addNote()">
                        {{ isEditing ? "Update Note" : "Add Note" }}
                      </v-btn>
                      <v-btn
                        v-if="isEditing"
                        class="cancel-btn"
                        @click="cancelEdit"
                      >
                        Cancel
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
  
              <!-- Notes List -->
              <v-card-text>
                <v-row>
                  <v-col
                    v-for="(note, index) in notes"
                    :key="index"
                    cols="12"
                    md="6"
                  >
                    <v-card outlined class="mb-2 note-card">
                      <v-card-title class="note-text">{{ note }}</v-card-title>
                      <v-card-actions>
                        <v-btn icon class="edit-btn" @click="editNote(index)">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon class="delete-btn" @click="confirmDelete(index)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!--Delete Dailog-->
        <v-dialog
            v-model="deleteDialog"
            max-width="400">
            <v-card class="dialog-card">
                <v-card-title class="dialog-title">
                    Delete Note
                </v-card-title>
                <v-card-text class="dialog-text">
                    Are you sure you want to delete this note?
                </v-card-text>
                <v-card-actions class="dialog-action">
                    <v-btn 
                        class="dialog-cancel-btn"
                        @click="cancelDelete"
                    >
                        Cancel
                    </v-btn>
                    <v-btn 
                        class="dialog-delete-btn"
                        @click="deleteNote"
                    >
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    data: () => ({
      noteInput: "",
      notes: [],
      isEditing: false,
      editIndex: null,
      deleteDialog: false,
      deleteIndex: null,
      txtSearch:"",
      tempNotes:[],
      tempNote:"",
    }),
    mounted() {
      //this.loadFromLocalStorage(); 
      
      this.notes.push(...this.$store.state.noteList);
      this.tempNotes.push(...this.$store.state.noteList);
    },
    methods: {
      changeNote:function(){
        this.notes.splice(0);
          for(let i=0;i<this.tempNotes.length;i++){
          var tempObj = this.tempNotes[i];
          if(tempObj==this.tempNote.trim()){
            this.notes.push(tempObj);
          }
        }
      },
      searchMethod:function(){
        this.notes.splice(0);
        if(this.txtSearch.trim()!=""){
          for(let i=0;i<this.tempNotes.length;i++){
          var tempObj = this.tempNotes[i];
          if(tempObj==this.txtSearch.trim()){
            this.notes.push(tempObj);
          }
        }
        }else{
          this.notes.push(...this.tempNotes);
        }
        
      },
      /*saveToLocalStorage() {
        localStorage.setItem("notes", JSON.stringify(this.notes));
      },

      
      loadFromLocalStorage() {
        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
          this.notes = JSON.parse(storedNotes);
        }
      },*/
      handleNoteAction() {
        if (this.isEditing) {
          this.updateNote();
        } else {
          this.addNote();
        }
      },
      addNote() {
        if (this.noteInput.trim()) {
          this.$store.commit("addNote", this.noteInput);
          this.notes.push(this.noteInput.trim());
          this.tempNotes.push(this.noteInput.trim());
          this.noteInput = "";
          //this.saveToLocalStorage();
        }
      },
      editNote(index) {
        this.noteInput = this.notes[index];
        this.isEditing = true;
        this.editIndex = index;
      },
      updateNote() {
        if (this.noteInput.trim() && this.editIndex !== null) {
          this.$store.commit("updateNote", {
          index: this.editIndex,
          note: this.noteInput,
          });
          this.notes[this.editIndex] = this.noteInput.trim();
          this.cancelEdit();
          //this.saveToLocalStorage();
        }
      },
      cancelEdit() {
        this.noteInput = "";
        this.isEditing = false;
        this.editIndex = null;
      },
      confirmDelete(index){
        this.deleteDialog =true;
        this.deleteIndex = index;
      },
      deleteNote(){
        if(this.deleteIndex !== null){
          this.$store.commit("deleteNote", this.index);
            this.notes.splice(this.deleteIndex,1);
            this.deleteDialog = false;
            this.deleteIndex = null;
            //this.saveToLocalStorage();
        }
      },
      cancelDelete(){
        this.deleteDialog = false;
        this.deleteIndex = null;
      }
    },
    watch:{
      tempNote(){
        console.log(this.tempNote);
        this.changeNote();
      }
    }
  };
  </script>
  
  <style scoped>
    .app-card{
        background: linear-gradient(135deg, #e3cef7,#dae7ff);
        border-radius: 16px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .note-card{
        background: #e6eefc;
        border-radius: 12px;
    }
    .title{
        font-family: "Roboto";
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        color: #333;
    }
    .note-text{
        font-size: 18px;
        color: #4a4a4a;
        font-family: "Roboto";
    }
    .add-btn{
        background: linear-gradient(90deg, #6a11bc,#2575fc);
        color: #ffff;
        border-radius: 8px;
        text-transform: capitalize;
    }
    .cancel-btn{
        background-color: #ffc107;
        color: #fff;
        border-radius: 8px;
        text-transform: capitalize;
    }
    .edit-btn {
    color: #05d30c;
    }

    .delete-btn {
    color: #d13328;
    }
    .v-btn {
    margin-right: 8px;
    }
    .dialog-card{
        border-radius: 12px;
        box-shadow: 0 6px 12px rgba(0,0,0,0.2);
        background: linear-gradient(135deg, #e3cef7,#dae7ff);
        padding: 16px;
    }
    .dialog-title{
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        color:#333;
        margin-bottom: 16px;
    }
    .dialog-text{
        font-size: 20px;
        text-align: center;
        color: #555;
        margin-bottom: 24px;
    }
    .dialog-actions{
        display: flex;
        justify-content: space-between;
        padding:  0 16px;
    }
    .dialog-cancel-btn{
        font-size: 14px;
        font-weight: bold;
        background: #fff;
        color: #555;
        padding: 8px 16px;
        border-radius: 8px;
        text-transform: uppercase;
    }
    .dialog-delete-btn{
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        background: #f44336;
        border-radius: 8px;
        padding: 8px 16px;
        text-transform: uppercase;
    }
  </style>
  