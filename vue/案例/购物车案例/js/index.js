const app = new Vue({
  el: '#app',
  data:{
    books: [
      {
        id: 1, 
        name: "算法导论",
        date: '2006-9',
        price: 85.00,
        number: 1
      },
      {
        id: 2, 
        name: "UNIX编程艺术",
        date: '2006-2',
        price: 59.00,
        number: 1
      },
      {
        id: 3, 
        name: "编程珠玑",
        date: '2008-10',
        price: 39.00,
        number: 1
      },
      {
        id: 4, 
        name: "代码大全",
        date: '2006-3',
        price: 128.00,
        number: 1
      }
    ],
    isShow: true
  },
  /* 过滤器 */
  filters: {
    finalPrice(price){
      return '$' + price.toFixed(2);
    }
  },
  methods:{
    add(index){
      this.books[index].number++;
    },
    sub(index){
      this.books[index].number--;
    },
    remove(index){
      this.books.splice(index,1);
      for(let i in this.books){
        if(i >= index){
          this.books[i].id--;
        }
      }
      if(this.books.length <= 0){
        this.isShow = false;
      }
    }
  },
  computed:{
    totalPrice(){
      var result = 0;
      // for (let i in this.books) {
      //   result += this.books[i].price * this.books[i].number
      // }

      // return this.books.reduce(function(total,book){
      //   console.log(total);
      //   return total + (book.number * book.price);
      // },0)

      /* 箭头函数写法 */
      return this.books.reduce((total, book) => {
        return total + (book.price * book.number)
      }, 0)
      
    }
  }
})