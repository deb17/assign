<template>
  <div id="app">
    <h1 class="text-center my-2">Assign project work</h1>
    <task-textarea @newItem="createItem" />
    <b-container v-drag-and-drop:options="options" class="my-4">
      <b-row>
        <b-col sm="3">
          <h3 class="text-center my-2">Todo</h3>
          <b-list-group data-id="1" id="list1">
            <b-list-group-item
              v-for="item in list1"
              :key="item.id"
              :data-id="item.id"
              ><span class="cont">{{ item.content }}</span
              ><img
                src="./assets/x.svg"
                class="del"
                title="Delete"
                @click="deleteItem"
            /></b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col sm="3">
          <h3 class="text-center my-2">WIP</h3>
          <b-list-group data-id="2" id="list2">
            <b-list-group-item
              v-for="item in list2"
              :key="item.id"
              :data-id="item.id"
              ><span class="cont">{{ item.content }}</span
              ><img
                src="./assets/x.svg"
                class="del"
                title="Delete"
                @click="deleteItem"
            /></b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col sm="3">
          <h3 class="text-center my-2">Testing</h3>
          <b-list-group data-id="3" id="list3">
            <b-list-group-item
              v-for="item in list3"
              :key="item.id"
              :data-id="item.id"
              ><span class="cont">{{ item.content }}</span
              ><img
                src="./assets/x.svg"
                class="del"
                title="Delete"
                @click="deleteItem"
            /></b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col sm="3">
          <h3 class="text-center my-2">Complete</h3>
          <b-list-group data-id="4" id="list4">
            <b-list-group-item
              v-for="item in list4"
              :key="item.id"
              :data-id="item.id"
              ><span class="cont">{{ item.content }}</span
              ><img
                src="./assets/x.svg"
                class="del"
                title="Delete"
                @click="deleteItem"
            /></b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TaskTextarea from '@/components/TaskTextarea'

export default {
  components: {
    TaskTextarea
  },
  data() {
    const that = this
    return {
      options: {
        dropzoneSelector: '.list-group',
        draggableSelector: '.list-group-item',
        // handlerSelector: null,
        // reactivityEnabled: true,
        // multipleDropzonesItemsDraggingEnabled: true,
        // showDropzoneAreas: true,
        onDrop: event => {
          const newList = parseInt(event.droptarget.dataset.id)
          const itemId = event.items[0].dataset.id
          const item = that.items.find(item => item.id === itemId)
          const list = event.droptarget.childNodes
          let prevId = null
          list.forEach((el, index) => {
            if (el.dataset.id === itemId) {
              // Account for the dragzone area
              prevId = index === 1 ? null : list[index - 2].dataset.id
            }
          })
          let prevIndex = null
          if (prevId) {
            prevIndex = that.items.findIndex(item => item.id === prevId)
          } else {
            prevIndex = that.items.findIndex(item => item.list === newList)
            if (prevIndex !== -1) {
              prevIndex -= 1
            } else {
              // since -1 is a valid prevIndex
              prevIndex = null
            }
          }
          if (prevIndex !== null) {
            const index = that.items.findIndex(item => item.id === itemId)
            if (index > prevIndex) {
              prevIndex += 1
            }
            that.items.splice(prevIndex, 0, that.items.splice(index, 1)[0])
          }
          item.list = newList
          that.save()
        },
        onDragstart: event => {
          event.items[0].classList.add('active')
        },
        // onDragenter: function(event) {},
        // onDragover: function(event) {},
        onDragend: event => {
          event.items[0].classList.remove('active')
        }
      },
      items: [
        {
          id: this.$uuid.v4(),
          content: 'item 1',
          list: 1
        },
        {
          id: this.$uuid.v4(),
          content: 'item 2',
          list: 1
        },
        {
          id: this.$uuid.v4(),
          content: 'item 3',
          list: 2
        },
        {
          id: this.$uuid.v4(),
          content: 'item 4',
          list: 2
        },
        {
          id: this.$uuid.v4(),
          content: 'item 5',
          list: 2
        },
        {
          id: this.$uuid.v4(),
          content: 'item 6',
          list: 3
        },
        {
          id: this.$uuid.v4(),
          content: 'item 7',
          list: 3
        },
        {
          id: this.$uuid.v4(),
          content: 'item 8',
          list: 4
        },
        {
          id: this.$uuid.v4(),
          content: 'item 9',
          list: 4
        }
      ]
    }
  },
  computed: {
    list1() {
      return this.items.filter(item => item.list === 1)
    },
    list2() {
      return this.items.filter(item => item.list === 2)
    },
    list3() {
      return this.items.filter(item => item.list === 3)
    },
    list4() {
      return this.items.filter(item => item.list === 4)
    }
  },
  created() {
    let items = localStorage.getItem('items')
    if (items) {
      items = JSON.parse(items)
      this.items = items
    }
  },
  methods: {
    createItem({ text }) {
      const item = {
        id: this.$uuid.v4(),
        content: text,
        list: 1
      }
      this.items.push(item)
      this.save()
    },
    save() {
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    deleteItem(evt) {
      const itemId = evt.target.parentNode.dataset.id
      this.items = this.items.filter(item => item.id !== itemId)
      this.save()
    }
  }
}
</script>

<style>
.list-group {
  padding: 10px 0;
  border: 2px solid lightgray;
}
.list-group-item {
  margin: 10px 0;
  border: 1px solid lightgray !important;
}
@keyframes nodeInserted {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0.8;
  }
}
.item-dropzone-area {
  height: 3rem;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
}
.del {
  float: right;
  width: 18px;
  cursor: pointer;
}
#list1 .list-group-item {
  background-color: #ffe6ea;
}
#list2 .list-group-item {
  background-color: #ffff99;
}
#list3 .list-group-item {
  background-color: lightblue;
}
#list4 .list-group-item {
  background-color: lightgreen;
}
.active {
  background-color: #007bff !important;
  border-color: #007bff !important;
}
.cont {
  display: inline-block;
  width: 90%;
  overflow: auto;
}
</style>
