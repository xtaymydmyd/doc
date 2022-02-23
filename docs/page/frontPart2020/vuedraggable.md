# vue-draggable

```html
<div id="app">
  <h4>Try dragging several "Drag me 1" items down to the below "Drag Here" text. Each time you drag an item, it will clone it. You will see the same key gets generated for each item.
  </h4>
  <h4>Click a cloned item to try to delete it.</h4>

  <draggable v-model="availableItems" :options="availableItemOptions" :clone="handleClone">
    <div v-for="item in availableItems" :key="uuid(item)">
      {{item.name}} - key is: {{item.uid}}
    </div>
  </draggable>

  <div style="height:50px;"></div>
  
  <draggable v-model="clonedItems" :options="clonedItemOptions" style="border: 1px solid blue;">
    <h4 v-for="(item, index) in clonedItems" :key="uuid(item)" @click="deleteItem(index)" class="clickable">
      {{item.name}} - click to delete - key is: {{item.uid}}
    </h4>
  </draggable>
</div>

<script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue.js"></script>
<script src="//cdn.jsdelivr.net/npm/sortablejs@1.7.0/Sortable.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.16.0/vuedraggable.min.js"></script>
```


```js
new Vue({
  el: "#app",

  data() {
    return {
      clonedItems: [
        {
          name: "Drag here"
        }
      ],

      availableItems: [
        {
          name: "Drag me 1"
        },
        {
          name: "Drag me 2"
        }
      ],

      clonedItemOptions: {
        group: "items"
      },

      availableItemOptions: {
        group: {
          name: "items",
          pull: "clone",
          put: false
        },
        sort: false
      }
    };
  },

  methods: {
    handleClone (item) {
      // Create a fresh copy of item
      let cloneMe = JSON.parse(JSON.stringify(item));
      
      this.$delete(cloneMe, 'uid');

      return cloneMe;
    },
    
    deleteItem(index) {
      this.clonedItems.splice(index, 1);
    },

    uuid(e) {
      if (e.uid) return e.uid;

      const key = Math.random()
        .toString(16)
        .slice(2);

      this.$set(e, "uid", key);
      
      return e.uid;
    }
  }
});

```