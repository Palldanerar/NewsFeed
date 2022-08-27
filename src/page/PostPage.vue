<template>
  <div>
    <h1>Страница со статьями</h1>

    <div class="app__btn">
      <my-button
          @click="showDialog"
      >Добавить статью</my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      ></my-select>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      ></post-form>
    </my-dialog>

    <my-input
        v-model="searchQuery"
        placeholder="Поиск по заголовку статьи..."
    ></my-input>

    <br>
    <br>

    <post-list
        :posts="selectAndSearchedPosts"
        :heading="heading"
        @editor="editorPost"
        @remove="removePost"
        v-if="!isPostLoading"
    ></post-list>

    <div  v-else id="loader"></div>

    <div
        class="observer"
        ref="observer"
    ></div>

  </div>

</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import MyDialog from "@/components/UI/MyDialog";
import axios from 'axios';



export default {
  components: {MyDialog, MyButton, PostForm, PostList},

  data() {
    return {
      posts: [],
      heading: 'Список статей',
      dialogVisible: false,
      editorVisible: false,
      isPostLoading: false,
      page: 1,
      limit: 10,
      totalPages: 0,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},

        {value: 'body', name: 'По содержимому'}
      ],
      searchQuery: '',
    }
  },
  methods: {
    createPost(post) {
      this.posts.unshift(post)
      if (this.posts.length !== 0) {
        this.heading = 'Список статей'
      }
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
      if (this.posts.length === 0) {
        this.heading = 'Список статей пуст'
      }
    },
    showDialog() {
      this.dialogVisible = true
    },


    async fetchPosts() {
      try {
        this.isPostLoading = true
        const responce = await axios.get('https://jsonplaceholder.typicode.com/posts',  {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limit)
        this.posts = responce.data
      } catch (e) {
        alert('Ошибка')
      } finally {
        this.isPostLoading = false
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1
        const responce = await axios.get('https://jsonplaceholder.typicode.com/posts',  {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...responce.data]
      } catch (e) {
        alert('Ошибка')
      }
    }
  },
  mounted() {
    this.fetchPosts()
    console.log(this.$refs.observer)
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }

    const callback = (entries) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPost() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    selectAndSearchedPosts() {
      return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // pade() {
    //   this.fetchPosts()
    // }
  }

}
</script>

<style scoped>
.app__btn {
  display: flex;
  justify-content: space-between;
  margin-top: 15px
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
}

#loader {
  animation: spin 1s linear infinite;
  height: 10px;
  width: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -5px;
}

@keyframes spin {
  0% {
    box-shadow:
        0px -30px #000,
        10px -30px #000,
        20px -20px #000,
        30px -10px #000,
        30px 0px #000,
        30px 10px #000,
        20px 20px #000,
        10px 30px #000,
        0px 30px transparent,
        -10px 30px transparent,
        -20px 20px transparent,
        -30px 10px transparent,
        -30px 0px transparent,
        -30px -10px transparent,
        -20px -20px transparent,
        -10px -30px transparent;
  }
  6.25% {
    box-shadow:
        0px -30px transparent,
        10px -30px #000,
        20px -20px #000,
        30px -10px #000,
        30px 0px #000,
        30px 10px #000,
        20px 20px #000,
        10px 30px #000,
        0px 30px #000,
        -10px 30px transparent,
        -20px 20px transparent,
        -30px 10px transparent,
        -30px 0px transparent,
        -30px -10px transparent,
        -20px -20px transparent,
        -10px -30px transparent;
  }
  12.5% {
    box-shadow:
        0px -30px transparent,
        10px -30px transparent,
        20px -20px #000,
        30px -10px #000,
        30px 0px #000,
        30px 10px #000,
        20px 20px #000,
        10px 30px #000,
        0px 30px #000,
        -10px 30px #000,
        -20px 20px transparent,
        -30px 10px transparent,
        -30px 0px transparent,
        -30px -10px transparent,
        -20px -20px transparent,
        -10px -30px transparent;
  }
  18.75% {
    box-shadow:
        0px -30px transparent,
        10px -30px transparent,
        20px -20px transparent,
        30px -10px #000,
        30px 0px #000,
        30px 10px #000,
        20px 20px #000,
        10px 30px #000,
        0px 30px #000,
        -10px 30px #000,
        -20px 20px #000,
        -30px 10px transparent,
        -30px 0px transparent,
        -30px -10px transparent,
        -20px -20px transparent,
        -10px -30px transparent;
  }
  25% {
    box-shadow:
        0px -30px transparent,
        10px -30px transparent,
        20px -20px transparent,
        30px -10px transparent,
        30px 0px #000,
        30px 10px #000,
        20px 20px #000,
        10px 30px #000,
        0px 30px #000,
        -10px 30px #000,
        -20px 20px #000,
        -30px 10px #000,
        -30px 0px transparent,
        -30px -10px transparent,
        -20px -20px transparent,
        -10px -30px transparent;
  }
  31.25% {
    box-shadow:
        0px -30px transparent,
        10px -30px transparent,
        20px -20px transparent,
        30px -10px transparent,
        30px 0px transparent,
        30px 10px #000,
        20px 20px #000,
        10px 30px #000,
        0px 30px #000,
        -10px 30px #000,
        -20px 20px #000,
        -30px 10px #000,
        -30px 0px #000,
        -30px -10px transparent,
        -20px -20px transparent,
        -10px -30px transparent;
  }
  37.5% {
    box-shadow:
        0px -30px transparent,
        10px -30px transparent,
        20px -20px transparent,
        30px -10px transparent,
        30px 0px transparent,
        30px 10px transparent,
        20px 20px #000,
        10px 30px #000,
        0px 30px #000,
        -10px 30px #000,
        -20px 20px #000,
        -30px 10px #000,
        -30px 0px #000,
        -30px -10px #000,
        -20px -20px transparent,
        -10px -30px transparent;
  }
  43.75% {
    box-shadow:
        0px -30px transparent,
        10px -30px transparent,
        20px -20px transparent,
        30px -10px transparent,
        30px 0px transparent,
        30px 10px transparent,
        20px 20px transparent,
        10px 30px #000,
        0px 30px #000,
        -10px 30px #000,
        -20px 20px #000,
        -30px 10px #000,
        -30px 0px #000,
        -30px -10px #000,
        -20px -20px #000,
        -10px -30px transparent;
  }
  50% {
    box-shadow:
        0px -30px transparent,
        10px -30px transparent,
        20px -20px transparent,
        30px -10px transparent,
        30px 0px transparent,
        30px 10px transparent,
        20px 20px transparent,
        10px 30px transparent,
        0px 30px #000,
        -10px 30px #000,
        -20px 20px #000,
        -30px 10px #000,
        -30px 0px #000,
        -30px -10px #000,
        -20px -20px #000,
        -10px -30px #000;
  }
  56.25% {
    box-shadow:
        0px -30px #000,
        10px -30px transparent,
        20px -20px transparent,
        30px -10px transparent,
        30px 0px transparent,
        30px 10px transparent,
        20px 20px transparent,
        10px 30px transparent,
        0px 30px transparent,
        -10px 30px #000,
        -20px 20px #000,
        -30px 10px #000,
        -30px 0px #000,
        -30px -10px #000,
        -20px -20px #000,
        -10px -30px #000;
  }
  62.5% {
    box-shadow:
        0px -30px #000,
        10px -30px #000,
        20px -20px transparent,
        30px -10px transparent,
        30px 0px transparent,
        30px 10px transparent,
        20px 20px transparent,
        10px 30px transparent,
        0px 30px transparent,
        -10px 30px transparent,
        -20px 20px #000,
        -30px 10px #000,
        -30px 0px #000,
        -30px -10px #000,
        -20px -20px #000,
        -10px -30px #000;
  }
  68.75% {
    box-shadow:
        0px -30px #000,
        10px -30px #000,
        20px -20px #000,
        30px -10px transparent,
        30px 0px transparent,
        30px 10px transparent,
        20px 20px transparent,
        10px 30px transparent,
        0px 30px transparent,
        -10px 30px transparent,
        -20px 20px transparent,
        -30px 10px #000,
        -30px 0px #000,
        -30px -10px #000,
        -20px -20px #000,
        -10px -30px #000;
  }
  75% {
    box-shadow:
        0px -30px #000,
        10px -30px #000,
        20px -20px #000,
        30px -10px #000,
        30px 0px transparent,
        30px 10px transparent,
        20px 20px transparent,
        10px 30px transparent,
        0px 30px transparent,
        -10px 30px transparent,
        -20px 20px transparent,
        -30px 10px transparent,
        -30px 0px #000,
        -30px -10px #000,
        -20px -20px #000,
        -10px -30px #000;
  }
  81.25% {
    box-shadow:
        0px -30px #000,
        10px -30px #000,
        20px -20px #000,
        30px -10px #000,
        30px 0px #000,
        30px 10px transparent,
        20px 20px transparent,
        10px 30px transparent,
        0px 30px transparent,
        -10px 30px transparent,
        -20px 20px transparent,
        -30px 10px transparent,
        -30px 0px transparent,
        -30px -10px #000,
        -20px -20px #000,
        -10px -30px #000;
  }
  87.5% {
    box-shadow:
        0px -30px #000,
        10px -30px #000,
        20px -20px #000,
        30px -10px #000,
        30px 0px #000,
        30px 10px #000,
        20px 20px transparent,
        10px 30px transparent,
        0px 30px transparent,
        -10px 30px transparent,
        -20px 20px transparent,
        -30px 10px transparent,
        -30px 0px transparent,
        -30px -10px transparent,
        -20px -20px #000,
        -10px -30px #000;
  }
  93.75% {
    box-shadow:
        0px -30px #000,
        10px -30px #000,
        20px -20px #000,
        30px -10px #000,
        30px 0px #000,
        30px 10px #000,
        20px 20px #000,
        10px 30px transparent,
        0px 30px transparent,
        -10px 30px transparent,
        -20px 20px transparent,
        -30px 10px transparent,
        -30px 0px transparent,
        -30px -10px transparent,
        -20px -20px transparent,
        -10px -30px #000;
  }
  100% {
    box-shadow:
        0px -30px #000,
        10px -30px #000,
        20px -20px #000,
        30px -10px #000,
        30px 0px #000,
        30px 10px #000,
        20px 20px #000,
        10px 30px #000,
        0px 30px transparent,
        -10px 30px transparent,
        -20px 20px transparent,
        -30px 10px transparent,
        -30px 0px transparent,
        -30px -10px transparent,
        -20px -20px transparent,
        -10px -30px transparent;
  }
}
</style>
