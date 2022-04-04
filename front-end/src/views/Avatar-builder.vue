<template>
  <div class="admin">
        <h1>Create your own Avatar!</h1>
      <div class="heading">
      </div>
      <div class="add">
        <div class="form">
          <h2>1) Enter your bender's name</h2>
          <input v-model="title" placeholder="Name">
          <br>
          <h2>2) Choose your element(s)...</h2>
          <input v-model="element" placeholder="Element">
          <br>
          <h2>3) Where are you from?</h2>
          <input v-model="description" placeholder="Location">
          <br>
          <br>
          <input type="file" name="photo" @change="fileChanged">
          <br>
          <button class="button" @click="upload">Create</button>
        </div>
        <div class="upload" v-if="addItem">
          <h2>{{addItem.title}}</h2>
          <h2>{{addItem.description}}</h2>
          <h2>{{addItem.element}}</h2>
          <img :src="addItem.path" />
        </div>
      </div>

          <div class="heading">
      <h1>Edit/Delete an Item</h1>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title">
        <input v-model="findItem.element">
        <input v-model="findItem.description">
        <p></p>
        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <button class="button" @click="deleteItem(findItem)">Delete</button>
        <button class="button" @click="editItem(findItem)">Confirm Edit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 30px;
}
.image h2 {
  font-style: italic;
  font-size: 1em;
}
.button {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  background-color: black; /* Green */
  color: white;
}

.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  background-color: black; /* Green */
  color: white;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Avatar-Creator',
  data() {
    return {
      title: "",
      description: "",
      file: null,
      addItem: null,
      items: [],
      element: "",
      findTitle: "",
      findItem: null,
      findDescription: "",
      findElement: "",
    }
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      // console.log(this.items[0]);
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      // console.log("suggestions2");

      return items.sort((a, b) => a.title > b.title);
    },
    // elementSuggestions() {
    //   let elementList = this.elements;
    //   return elementList;
    // },
  },
  methods: {
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
      this.findDescription = "";
      this.findElement = "";
    },
    async deleteItem(item) {
      try {
        // console.log(item._id);
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          description: this.description,
          element: this.element,
          path: r1.data.path
        });
        this.addItem = r2.data;
      } catch (error) {
        // console.log(error);
      }
    },
    //edit item implementation
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          element: this.findItem.element,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
  }
}
</script>