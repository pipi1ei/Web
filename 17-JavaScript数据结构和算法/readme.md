<!-- JavaScript数据结构和算法笔记 -->
### 什么是数据结构：
+ 数据结构就是在计算机中，存储和组织数据的方式 

### 什么是算法
+ 算法的定义：
  - 一个有限的指令集，每条指令的描述不依赖于语言
  - 接受一些输入（有些情况下不需要输入）
  - 产生输出
  - 一定在有限步骤之后终止

### 栈结构
+ 栈是一种非常常见的数据结构，并且在程序中应用非常广泛

+ 数组：数组是一种线性结构，并且可以在数组的任意位置插入和删除数据，但有时候，为了实现某些功能，需要对这种任意性加以限制，而栈和队列就是比较常见的*受限的线性结构*

+ 栈是一种受限的线性表，后进先出（LIFO）
  - 其限制是仅允许在 表的一端 进行插入和删除运算。这一端被成为栈顶，相对的，另一端成为栈底。
  - LIFO（last in first out）表示就是后进入的元素，第一个弹出栈空间。
  - 向一个栈插入新元素成为进栈、入栈或压栈。
  - 从一个栈删除元素称为出栈或退栈，它是把栈顶的元素删除，使其相邻的元素成为新的占地元素。

+ 程序中的一些栈实现：
  1. 函数调用：A函数调用B函数，B函数调用C函数，C函数调用D函数。先将A入栈，A没执行完又调用了B函数，依次类推，栈从栈底到栈顶的结构是：A->B->C->D 。所有又函数调用栈的称呼，就来自于他们内部的实现机制

+ 栈结构的实现：
  - 实现栈结构有两种比较常见的方式：
    1. 基于数组的实现
    2. 基于链表的实现
  
  - 栈常见的操作：
    1. push(element)：添加一个新元素到栈顶位置
    2. pop()：移除栈顶的元素，同时返回被移除的元素
    3. peek()：返回栈顶的元素，不对栈做任何修改
    4. isEmpty()：如果栈里没有任何元素就返回true，否则返回 false
    5. size()：返回栈里的元素个数，这个方发和数组的length属性类似
    6. toString()：将栈结构的内容以字符串形式返回
  
  - 基于数组实现：
  ```javascript
    function Stack() {  
      // 栈中的属性
      this._items = [];
      // 入栈方法
      Stack.prototype.push = function(element){
        this._items.push(element);
      }
      // 出栈方法,返回被移除的元素
      Stack.prototype.pop = function(){
        return this._items.pop();
      }
      // 返回栈顶元素
      Stack.prototype.peek = function () { 
        return this._items[this._items.length - 1];
      }
      // 判断栈是否为空
      Stack.prototype.isEmpty = function () { 
        return this._items.length === 0;
      }
      // 返回栈里元素个数
      Stack.prototype.size = function () { 
        return this._items.length;
      }
      // 将栈结构的内容以字符串形式返回
      Stack.prototype.toString = function () { 
        var resultString = "";
        for(var i in this._items){
          resultString += this._items[i] + " ";
        }
        return resultString.substring(0, resultString.length - 1);
      }
    }
  ```

+ 十进制转二进制
  - 要把十进制转化成二进制，可以将十进制数字和 2 整除，直到结果为0 为止
   100 转二进制：结果是 1100100
    1. 计算100/2，余数：0
    2. 计算50/2，余数：0
    3. 计算25/2，余数：1
    4. 计算12/2，余数：0
    5. 计算6/2，余数：0
    6. 计算3/2，余数：1
    7. 计算1/2，余数：1

  - 代码实现：
  ```javascript
    function dec2bin(decNumber){
      var s = new Stack();
      while(decNumber > 0){
        s.push(decNumber % 2);
        decNumber = Math.floor(decNumber / 2);
      }

      var binaryStr = "";
      while(!s.isEmpty()){
        binaryStr += s.pop();
      }
      return Number(binaryStr);
    }
  ```

### 队列结构
+ 队列也是一种受限的线性表，队列是一种先进先出（FIFO）的结构
  - 受限之处在于它只允许在表的前端（front ）进行删除操作
  - 而在表的后端（rear）进行插入操作

+ 队列的应用
  - 打印队列
  - 线程队列

+ 队列的实现
  - 基于数组实现
  - 基于链表实现

  - 队列常见的操作
    1. enqueue(element)：向队列尾部添加一个（或多个）新的元素
    2. dequeue()：移除队列的第一（即排在队列最前面的）项，并返回被移除的元素
    3. front()：返回队列中第一个元素，队列不做任何变动
    4. isEmpty()：如果队列中不包含任何元素，返回true，否则返回 false
    5. size()：返回队列包含元素的个数，与数组的length属性类似
    6. toString()：将队列中的内容，转成字符串形式

  - 数组实现：
    ```javascript
      function Queue() {  
      this._items = [];
      // 将一个或多个元素插入到队列中
      Queue.prototype.enqueue = function(...elements){
        this._items.push(...elements);
      }
      //删除队列第一个元素并返回
      Queue.prototype.dequeue = function(){
        return this._items.shift();
      }
      // 返回队列第一个元素
      Queue.prototype.front = function () {  
        return this._items[0];
      }
      // 判断队列是否为空
      Queue.prototype.isEmpty = function(){
        return this._items.length === 0;
      }
      // 返回队列包含元素的个数
      Queue.prototype.size = function () {  
        return this._items.length;
      }
      // 将队列中的内容，转成字符串形式
      Queue.prototype.toString = function () {  
        var resultStr = "";
        for(var i in this._items){
          resultStr += this._items[i] + " ";
        }
        return resultStr.substring(0, resultStr.length - 1);
      }
    }
    ```

+ 击鼓传花：  
  - 几个人一起玩游戏，围成一圈开始数数，数到某个数字的人自动淘汰，最后剩下的人获得胜利
  - 封装一个基于队列的函数
    1. 参数：所有参与人的姓名，基于的数字
    2. 结果：最终剩下的一人姓名
  - 代码实现：
    ```javascript
      function passGame(nameList, num) {  
        var _queue = new Queue();
        for(var i in nameList){
          _queue.enqueue(nameList[i]);
        }
        
        while(_queue.size() > 1){
          for (var j = 1; j < num; j++) {
            _queue.enqueue(_queue.dequeue());
          }
          _queue.dequeue();
        }
        return _queue.front();
      }
    ```


+ 优先级队列
  - 优先级队列的特点：
    1. 普通的队列插入一个元素，数据会被放在后端，并且需要前面的所有元素都处理完成之后才会处理前面的数据，但是优先级队列在插入一个元素的时候会考虑该*数据的优先级*
    2. 在插入数据时会和其他数据的优先级进行比较，比较完成之后，可以得出这个元素在队列中*正确的位置*
    3. 其他处理方式和基本的队列处理方式一样
  - 优先级队列主要考虑的问题：
    1. 每个元素不再只是一个数据，还要包含数据的优先级
    2. 在添加方式中，根据优先级放入正确的位置
  - 代码实现：
    ```javascript
    function PriorityQueue() {
      // 可以理解成内部类
      function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
      }

      this._items = [];

      // 有序队列插入方法
      PriorityQueue.prototype.enqueue = function (element, priority) {
        // 根据传过来的数据创建优先级队列中的 item
        var queueElement = new QueueElement(element, priority);
        // 判断当前队列是否为空，是：直接插入，不是：比较优先级
        if (this._items.length === 0) {
          this._items.push(queueElement);
        } else {
          var added = false;  // 记录元素是否被插入过
          for (let i in this._items) {
            if (queueElement.priority < this._items[i].priority) {
              this._items.splice(i, 0, queueElement);
              added = true;
              break;
            }
          }
          if (!added) {  // 说明元素的优先级最大，直接插入队列的最后
            this._items.push(queueElement);
          }
        }
      }

      PriorityQueue.prototype.dequeue = Queue.prototype.dequeue;
      PriorityQueue.prototype.front = Queue.prototype.front;
      PriorityQueue.prototype.isEmpty = Queue.prototype.isEmpty;
      PriorityQueue.prototype.size = Queue.prototype.size;
      PriorityQueue.prototype.toString = function(){
        var resultStr = "";
        for (var i in this._items) {
          resultStr += this._items[i].element + "-" + this._items[i].priority + " ";
        }
        return resultStr.substring(0, resultStr.length - 1);
      }
    }
    ```

### 链表结构
+ 链表和数组一样，可以用于存储一系列元素，但是链表和数组的实现机制完全不同
+ 数组的缺点：
  - 数组的创建需要申请*一段连续的内存空间*（一整块的内存），并且大小是固定的（大部分编程语言的数组都是固定的，但JS的数组可以自动扩容），所以当前数组不能满足容量需求时，需要*扩容*（一般情况下是申请一个更大的数组，比如原数组的2倍，然后将原数组中的数据复制过去）
  - 而且在数组的开头或中间位置/删除插入数据的成本太高，需要进行大量元素的位移
  - 尽管 JavaScript 中的Array 类方法可以帮我们做这些事，但背后的原理依然是这样

+ 链表的优势：
  - 不同于数组，链表中的元素在内存中不必是连续的空间
  - 链表的每个元素由一个 *存储元素本身的节点* 和一个 *指向下一个元素的引用* （有些语言称为指针或链接）组成
+ 相对数组，链表的一些优点：
  - 内存空间不需要必须是连续的，可以充分利用计算机的内存、实现灵活的*内存动态管理*
  - 链表*不必在创建的时候就确定大小*，并且大小可以*无限的延伸*下去
  - 链表在*插入和删除*数据时，时间复杂度可以达到O(1)，相对数组效率高很多
+ 相对于数组，链表也有一些缺点：
  - 链表访问任何一个位置的元素时，无法通过下班直接访问元素，都需要从头开始访问（无法跳过第一个元素访问任何一个元素）

+ 单向链表的实现：
  - 单向链表常见的操作：
    1. append(element)：向链表尾部添加一个新的项
    2. insert(position, data)：向链表的特定位置插入一个新的项
    3. get(position)：获取对应位置的元素
    4. indexOf(element)：返回元素在链表中的索引。如果没有返回 -1
    5. update(position,data)：修改某个位置的元素
    6. removeAt(position)：从链表的特定位置移除一项，返回移除的数据
    7. remove(element)：从链表中移除该项，如果链表中有这个数据返回 true，没有返回 false
    8. isEmpty()：如果链表不包含任何元素，返回true，如果链表的长度大于 0 返回 false
    9. size()：放回链表包含元素的个数
    10. toString()：由于链表使用了Node类，就需要重写继承自Javascript对象默认的toString方法，让其只输入元素的值

  - 代码实现：
    ```javascript
    function LinkedList() {  
      // 保存链表里的每个节点数据和它的下一个节点
      function Node(data){
        this.data = data;
        this.next = null;
      }

      this.head = null; // 链表的头
      this.length = 0; // 记录链表的节点数

      // 向链表尾部添加一个新的项
      LinkedList.prototype.append = function(data){
        //1. 创建节点
        var newNode = Node(data);
        // 2.判断该节点是否是第一个节点，是：让 head 指向它，不是：找到之前的最后一个节点，让最后一个节点的 next 指向 newNode
        if(this.length === 0){
          this.head = newNode;
        }else{
          // 找到最后一个节点
          var current = this.head;
          while(current.next){
            current = current.next;
          }
          current.next = newNode;
        }
        // 链表的长度加1
        this.length++;
      }

      // 向链表的特定位置插入一个新的项
      LinkedList.prototype.insert = function (position, data) { 
        // position 合法性校验
        if(position < 0 || position > this.length) return false;
        var newNode = new Node(data);
        // 如果往最前面插入元素：position 为 0 的情况
        if(position === 0){
          newNode.next = this.head;
          this.head = newNode;
        }else{  // 在任意位置插入元素
          var index = 0;
          var current = this.head;  // 用于找到原先在 position 位置的节点
          var previous = null;      // 用于找到原先在 position 位置的节点的前一个节点
          while(index++ < position){
            previous = current;
            current = current.next;
          }
          newNode.next = current;
          previous.next = newNode;
        }
        this.length++;
        return true;
      }

      // 获取对应位置的元素
      LinkedList.prototype.get = function (position) {  
        // 1. 越界判断
        if(position < 0 || position >= this.length) return false;
        var index = 0;
        var current = this.head;
        while(index++ < position){
          current = current.next;
        }
        return current.data;
      }

      //返回元素在链表中的索引。如果没有返回 -1
      LinkedList.prototype.indexOf = function(element){
        var current = this.head;
        var index = 0;
        while(index < this.length){
          if(current.data === element){
            return index;
          }
          current = current.next;
          index++;
        }
        return -1;
      }

      // update(position)：修改某个位置的元素，修改成功返回true，position值不对返回false
      LinkedList.prototype.update = function (position, data) {  
        // 1. 越界判断
        if (position < 0 || position >= this.length) return false;
        var index = 0;
        var current = this.head;
        while(index++ < position){
          current = current.next;
        }
        current.data = data;
        return true;
      }

      // removeAt(position)：从链表的特定位置移除一项，返回倍移除的数据，如果位置不对返回 false
      LinkedList.prototype.removeAt = function (position) {
        // 1. 越界判断
        if (position < 0 || position >= this.length) return false;
        let data = null;
        if (position === 0) {
          data = this.head.data;
          this.head = this.head.next;
        } else {
          var index = 0;
          var current = this.head;  // 用于找到对应位置的元素
          var previous = null;      // 用于找到对应位置的前一个元素
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          data = current.data;
          previous.next = current.next;  // 让position前一个元素指向对应元素的后一个元素
          current.next = null;          // 对应元素的next 赋空,可以不写，该对象会被回收
        }

        this.length--;                // 删除后链表长度减一
        return data;                  // 返回对应元素的数据
      }

      // remove(element)：从链表中移除该项
      LinkedList.prototype.remove = function (data) {
        var index = 0;
        var current = this.head;
        var previous = null;
        while(index++ < this.length){
          if(current.data === data){
            previous.next = current.next;
            current.next = null;
            this.length--;
            return true;
          }
          previous = current;
          current = current.next;
        }
        return false;
      }

      //如果链表不包含任何元素，返回true，如果链表的长度大于 0 返回 false
      LinkedList.prototype.isEmpty = function () {
        return this.length === 0;
      }

      // 返回链表包含元素的个数
      LinkedList.prototype.size = function () {
        return this.length;
      }

      LinkedList.prototype.toString = function () {  
        var current = this.head;
        var listString = "";
        while(current){
          listString += current.data + " ";
          current = current.next;
        }
        return listString.substring(0, listString.length-1)
      }
    }
    ```

### 双向链表
+ 单向链表：
  - 只能从 *头遍历到尾* 或者从尾遍历到头（一般从头到尾），也就是链表相连的过程是单向的
  - 实现的原理是上一个节点中有一个指向下一个的引用
+ 单向链表有个比较明显的缺点：
  - 我们可以轻松的到达下一个节点，但是回到上一个节点是很难的，但是，在实际开发中，经常会遇到需要回到上一个节点的情况。如果想回到上一个节点还需再从头开始

+ 双向链表：
  - 既可以从头遍历到尾，又可以从尾遍历到头
  - 双向链表的实现原理是既有一个*向前连接的引用*，也有一个*向后连接的引用*
  - 双向链表可以有效解决单向链表中提到的问题

+ 双向链表的缺点：
  - 每次在插入或删除某个节点时，需要处理四个引用，*实现困难*
  - 相对于单向链表，*占用内存空间更大*
  - 但这些缺点和我们使用起来的方便程度相比，是微不足道的

+ 双向链表的特点：
  - 可以使用一个 head 和 一个 tail 分别指向头部和尾部
  - 每个节点都由三部分组成：指向前一个节点的指针（prev），保存的数据（data），指向后一个节点的指针（next）
  - 双向链表第一个节点的 prev 是 null
  - 双向链表最后一个节点的 next 是 null

+ 双向链表的操作：
  1. append(element)：向链表尾部添加一个新的项
  2. insert(position, data)：向链表的特定位置插入一个新的项
  3. get(position)：获取对应位置的元素
  4. indexOf(element)：返回元素在链表中的索引。如果没有返回 -1
  5. update(position,data)：修改某个位置的元素
  6. removeAt(position)：从链表的特定位置移除一项，返回移除的数据
  7. remove(element)：从链表中移除该项，如果链表中有这个数据返回 true，没有返回 false
  8. isEmpty()：如果链表不包含任何元素，返回true，如果链表的长度大于 0 返回 false
  9. size()：返回链表包含元素的个数
  10. toString()：由于链表使用了Node类，就需要重写继承自Javascript对象默认的toString方法，让其只输入元素的值
  11. forwardString()：返回正向遍历的节点字符串形式
  12. backwardString(): 返回反向遍历的节点字符串形式

+ 代码实现：
```javascript
  function DoublyLinkedList(){
    function Node(data) {  
      this.data = data;
      this.prev = null;
      this.next = null;
    }

    // 属性
    this.head = null;  // 指向链表的头部
    this.tail = null;  // 指向链表的尾部
    this.length = 0;   // 链表节点个数

    //方法
    /* 向链表尾部添加一个新的项 */
    DoublyLinkedList.prototype.append = function (data) {  
      // 1. 创建新节点
      let newNode = new Node(data);
      // 如果插入的是第一个节点
      if(this.length === 0){
        this.head = newNode;  // head 指向这个节点
        this.tail = newNode;  // tail 指向这个节点
      }else{    // 不是第一个节点
        this.tail.next = newNode;   // 原先最后一个节点的 next 指向 newNode
        newNode.prev = this.tail;    // newNode 的 prev 指向原先的最后一个节点
        this.tail = newNode;        // tail 指向 newNode
      }
      this.length++;  // 链表节点个数加1
    }

    /* 向链表的特定位置插入一个新的项 */
    DoublyLinkedList.prototype.insert = function (position, data) {  
      // 1. 越界判断
      if(position < 0 || position > this.length) return false;

      // 2. 找到对应位置，插入 data
      let newNode = new Node(data);
      // 原链表是空的
      if(this.length === 0){
          this.head = newNode;  // head 指向这个节点
        this.tail = newNode;  // tail 指向这个节点
      }else{
        if (position === 0) {  //在最前面插入
          newNode.next = this.head;  // 要插入的节点的next指向原先第一个节点
          this.head.prev = newNode;  // 原先第一个节点的prev 指向要插入的节点
          this.head = newNode;       // head 指向要插入的节点
        } else if (position === this.length) {  // 在最后插入
          this.tail.next = newNode;   // 原先最后一个节点的 next 指向 newNode
          newNode.prev = this.tail;   // newNode 的 prev 指向原先的最后一个节点
          this.tail = newNode;        // tail 指向 newNode
        } else {
          // 在中间插入
          if (this.length - position > this.length / 2) {
            // 从前找
            let index = 0;
            let current = this.head;
            while (index++ < position) {
              current = current.next;
            }
            current.prev.next = newNode;  // position 前面的节点的 next 指向 newNode
            newNode.prev = current.prev;  // newNode 的prev 指向position 前面的节点
            newNode.next = current;       // newNode 的nex 指向 position位置的节点
            current.prev = newNode;       // position位置的节点的 prev 指向newNode
          } else {
            // 从后找
            let index = this.length - 1;
            let current = this.tail;
            while (index-- > position) {
              current = current.prev;
            }
            current.prev.next = newNode;  // position 前面的节点的 next 指向 newNode
            newNode.prev = current.prev;  // newNode 的prev 指向position 前面的节点
            newNode.next = current;       // newNode 的nex 指向 position位置的节点
            current.prev = newNode;       // position位置的节点的 prev 指向newNode
          }
        }
      }

      this.length++;
      return true;
    }

    /* 获取对应位置的元素 */
    DoublyLinkedList.prototype.get = function (position) {  
      // 1. 越界判断
      if(position < 0 || position >= this.length) return null;
      // 2.找到对应位置
      let index = 0;
      let current = this.head;
      while(index++ < position){
        current = current.next;
      }
      // 3.取出对应位置的值并返回
      return current.data;
    }

    /* 返回元素在链表中的索引。如果没有返回 - 1 */
    DoublyLinkedList.prototype.indexOf = function (data) {  
      let index = 0;
      let current = this.head;
      while(current){
        if(current.data === data){
          return index;
        }
        current = current.next;
        index++
      }
      return -1;
    }

    /* 修改某个位置的元素 */
    DoublyLinkedList.prototype.update = function (position, newData) {  
      // 1.越界判断
      if(position < 0 || position >= this.length) return false;
      // 2. 找出对应位置的元素
      let index = 0;
      let current = this.head;
      while(index++ < position){
        current = current.next;
      }
      // 3. 改变对应位置的元素
      current.data = newData;
      return true;
    }

    /* 从链表的特定位置移除一项，返回移除的数据 */
    DoublyLinkedList.prototype.removeAt = function (position) {  
      // 1. 越界判断
      if(position < 0 || position >= this.length) return null;
      let data = null; // 要返回的数据
      // 2. 找到对应位置的元素
      if(this.length === 1){  // 链表只有一个元素
        data = this.head.data;
        this.head = null;
        this.tail = null;
      }else{
        if (position === 0) {   // 2.1 如果是删除第 0 个位置的元素
          data = this.head.data;
          this.head.next.prev = null;  // 第二个节点的 prev 为空
          this.head = this.head.next;   // head 指向原先的第二个节点
        } else if (position === this.length - 1) {  // 2.2 如果删除最后一个元素
          data = this.tail.data;
          this.tail.prev.next = null;  // 倒数第二个节点的 next 为空
          this.tail = this.tail.prev;   // tail 指向倒数第二个节点
        } else {    // 其他情况
          let index = 0;
          let current = this.head;
          while (index++ < position) {
            current = current.next;
          }
          data = current.data;
          current.prev.next = current.next;  // 对应位置的上一个节点的 next 指向对应位置的下一个节点
          current.next.prev = current.prev;  // 对应位置的下一个节点的 prev 指向对应位置的上一个节点
        }
      }
      this.length--;
      return data;
    }

    /* 从链表中移除该项，如果链表中有这个数据返回 true，没有返回 false */
    DoublyLinkedList.prototype.remove = function (data) {  
      // 1. 找到data 所在的位置
      let index = 0;
      let current = this.head;
      while(current){
        if(current.data === data){
          // 2.找到对应元素并删除
          if(index === 0){  // 2.1 如果是删除第一元素
            this.head.next.prev = null;  // 第二个节点的 prev 为空
            this.head = this.head.next;   // head 指向原先的第二个节点
          }else if(index === this.length-1){  // 2.2 如果是删除最后一个
            this.tail.prev.next = null;  // 倒数第二个节点的 next 为空
            this.tail = this.tail.prev;   // tail 指向倒数第二个节点
          }else{  // 其他情况
            var temp = current;
            current.prev.next = current.next;  // 对应位置的上一个节点的 next 指向对应位置的下一个节点
            current.next.prev = current.prev;  // 对应位置的下一个节点的 prev 指向对应位置的上一个节点
          }
          // 3. 链表长度减一
          this.length--;
          return true;
        }
        current = current.next;
        index++;
      }
      // 没找到 data 返回 false
      return false;
    }

    /* 如果链表不包含任何元素，返回true，如果链表的长度大于 0 返回 false */
    DoublyLinkedList.prototype.isEmpty = function () {  
      return this.length === 0;
    }

    /* 返回链表包含元素的个数 */
    DoublyLinkedList.prototype.size = function () {  
      return this.length;
    }

    /* 返回正向遍历的节点字符串形式 */
    DoublyLinkedList.prototype.forwardString = function () {  
      let index = 0;
      let current = this.head;
      let resultString = "";
      while (index++ < this.length) {
        resultString += current.data + " ";
        current = current.next;
      }
      return resultString.substring(0, resultString.length - 1);
    }

    /* 返回反向遍历的节点字符串形式 */
    DoublyLinkedList.prototype.backwardString = function () {  
      let index = this.length;
      let current = this.tail;
      let resultString = "";
      while(index-- > 0){
        resultString += current.data + " ";
        current = current.prev;
      }
      return resultString.substring(0, resultString.length - 1);
    }

    /* 由于链表使用了Node类，就需要重写继承自Javascript对象默认的toString方法，让其只输入元素的值 */
    DoublyLinkedList.prototype.toString = DoublyLinkedList.prototype.forwardString; 
  }
```


### 集合
+ 几乎每种编程语言中，都有集合结构。集合比较常见的实现方式是 *哈希表* 
+ 集合通常是由一组*无序的，不能重复*的元素构成。ES6 中已经包含了 Set 类
+ 封装集合类：
  - 集合中的常见操作：
    1. add(value)：向集合中添加一个新的项
    2. remove(value)：从集合中移除一个值
    3. has(value)：如果值存在集合中，返回true，否则返回false
    4. clear()：移除集合中的所有项
    5. size()：返回集合所包含元素的数量，与数组的length属性类似
    6. values()：返回一个包含集合中所有值的数组
  
  - *注意*：对象不能被 for of 遍历，因为能够被for of 正常遍历的，都需要实现一个迭代器 Iterator，而Object对象没有实现这个接口，使得它无法被 for of 遍历，而数组，字符串，Set，Map 结构已经内置了 Iterator，所以可以被 for of 遍历。

  - 代码实现：
    ```javascript
    function Set(){
      this._items = {};

      /* 向集合中添加一个新的项 */
      Set.prototype.add = function (value) {  
        // 1. 先判断集合中有没有这个值，有的话返回 false，表示未添加成功
        if(this.has(value)){
          return false;
        }
        // 2. 往集合中添加一个值
        this._items[value] = value;
        return true;
      }

      /* ：从集合中移除一个值 */
      Set.prototype.remove = function(value){
        if(this.has(value)){
          delete this._items[value];
          return true;
        }
        return false;
      }

      /* 判断集合中是否存在该值 */
      Set.prototype.has = function (value) {  
        return this._items.hasOwnProperty(value);
      }

      /* 移除集合中的所有项 */
      Set.prototype.clear = function () {  
        this._items = {}
        return true;
      }

      /* 返回集合所包含元素的数量 */
      Set.prototype.size = function () {  
        return Object.keys(this._items).length;
      }

      /* 返回一个包含集合中所有值的数组 */
      Set.prototype.values = function () {
        return Object.keys(this._items);
      }
    }
    ```

+ 集合间的操作：
  - 并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合
  - 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合
  - 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
  - 子集：验证一个给定集合是否是另一个集合的子集

  - 并集：
    1. 实现思路：
      + 先创建一个新集合，代表两个给定集合的并集
      + 遍历集合1 和 集合2 中的所有值，添加到新集合中
      + 返回新集合

    2. 代码实现：
    ```javascript
      Set.prototype.union = function (otherSet) {
        const newSet = new Set();

        const set1Values = this.values();
        const set2Values = otherSet.values();

        for (let value of set1Values) {
          newSet.add(value);
        }
        for (let value of set2Values) {
          newSet.add(value);
        }
        return newSet;
      }
    ```
  - 交集
    1. 实现思路：
      + 创建一个新的集合，代表两个集合的交集
      + 遍历集合1中的所有元素，判断改元素是否在集合2中
      + 如果集合1中的元素也在集合2中，将其添加到新集合中
      + 返回新的集合

    2. 代码实现：
    ```javascript
      Set.prototype.intersection = function (otherSet) {  
        const newSet = new Set();
        for(let value of this.values()){
          if(otherSet.has(value)){
            newSet.add(value);
          }
        }
        return newSet;
      }
    ```
  - 差集：
    1. 实现思路： 
      + 创建一个新的集合，代表两个集合的差集
      + 遍历集合1中的所有元素，判断改元素是否在集合2中
      + 如果集合1中的元素不存在于集合2中，将其添加到新集合中
      + 返回新的集合

    2. 代码实现：
    ```javascript
      Set.prototype.difference = function (otherSet) {  
        const newSet = new Set();
        for(let value of this.values()){
          if(!otherSet.has(value)){
            newSet.add(value);
          }
        }
        return newSet;
      }
    ```

  - 子集：
    1. 实现思路：
      + 遍历集合1中的所有元素，并判断是否也存在于集合2中
      + 如果集合1中存在元素不在集合2中，返回false
      + 否则返回true

    2. 代码实现：
    ```javascript
    /* 判断一个集合是否是另一个集合的子集 */
    Set.prototype.isChild = function(otherSet){
      for(let value of this.values()){
        if(!otherSet.has(value)){
          return false;
        }
      }
      return true;
    }
    ```

### 字典
+ 数组-集合-字典 几乎是所有编程语言都会默认提供的数据类型
  - 在 JavaScript 中默认提供了数组，ES6中增加了集合和字典
+ 字典的特点：
  - 字典的主要特点是 *一一对应* 关系
  - 比如保存一个人的信息，在合适的情况下取出这些信息
    1. 使用数组：[18, 'pipilei', 188]
    2. 使用字典的方式： {'age':18, 'name': 'pipilei', 'height': 188}。可以通过 key 取出 value
  - 字典中的 key 是不可以重复的，而 value 是可以重复的，并且字典中的 key 是无序的

+ 字典和映射的关系：
  - 有些编程语言中称这种映射关系为字典，但有些编程语言中称这种映射关系为 Map
+ 字典和数组：
  - 字典和数组想对比的话，字典可以非常方便的通过key来搜索对应的 value，key可以包含特殊的含义，也更容易被人们记住
+ 字典和对象：
  - 在很多编程语言中，对象通常是一种在编译期就确定下来的结构，不可以动态的添加或删除属性。而字典通常会使用类似于哈希表的数据结构去实现一种可以动态的添加数据的结构。
  - 但是在 JavaScript 中，对象似乎本身就是一种字典，所以早期的 JavaScript 中没有字典这种数据类型，因此完全可以用对象去代替字典


### 哈希表
+ 哈希表通常是基于数组进行实现的，但是相对于数组，它有很多的优势：
  - 他可以提供非常快速的插入-删除-查找操作
  - 无论多少数据，插入和删除值需要接近常量的时间：即O(1)的时间级，实际上，只需要几个机器指令即可完成
  - 哈希表的速度比树还要快，基本可以瞬间查找到想要的元素
  - 哈希表相对于树来说编码要容易很多
+ 哈希表相对于数组的一些不足：
  - 哈希表中的数据是没有顺序的，所以不能以一种固定的方式（比如从小到大）来遍历其中的元素
  - 通常情况下，哈希表中的key是不允许重复的，不能放置相同的key，用于保存不同的元素

+ 哈希表到底是什么呢？
  - 哈希表不好理解的地方：不像数组和链表，甚至是树一样直接画出你就知道它的结构，甚至是原理了
  - 哈希表的结构就是数组，但是它神奇的地方在于对 *下标值的一种变换* ，这种变换我们可以称之为 *哈希函数* ，通过哈希函数可以获取到 *hashCode*

+ 通过三个案例，案例需要挑选某种数据结构，而你会发现最好的选择就是哈希表
  - 案例一：公司使用一种数据结构来保存所有员工
  - 案例二：设计一个数据结构，保存联系人和电话
  - 案例三：使用一种数据结构存储单词信息，比如有 50000 个单词，找到单词后每个单词有自己的翻译、读音、应用等待。

+ 上面所有的案例中最好的实现方法都是数组，但是基于数组中的内容去数组中查找效率是很低的。那么就需要将对应和内容转成下标值，然后通过下标值去访问，这时效率就很高了。
  - 如何将一个字符串转成数组的下标值呢？
    1. 单词/字符串转下标值，其实就是 *字母/文字转数字*

  - 现在需要设计一种方案，可以将单词转成适当的下标。计算机中有很多 *编码方案* 就是用数字代替单词的字符，就是字符编码。常见的字符编码：
    1. ASCII编码：a是97，b是98，依次类推，122代表z
    2. 我们也可以设计一个自己的编码系统，比如a是1，b是2，c是3 。。。空格可以用 0 代替，这样就是27个字符
    3. 但一个单词如何转成数字呢？
      + 方案一：数字相加
        - 一种简单的方案就是把单词对应的每个字符的编码求和，然后把和作为数组对应的下标
        - 但这种方案存在一个问题：很多单词的下标会相同，那么后存入的数据会覆盖之前存入的数据
      + 方案二：幂的连乘
        - 通过一种算法，让单词转成的数字不那么普通。通过幂的连乘
        - 什么是幂的连乘：平时我们使用大于10的数字，可以用这种方式表示
          7654 = 7* 10^3 + 6* 10^2 + 5*10 + 4
          cats = 3* 27^3 + 1* 27^2 + 20* 27 + 17 = 60337
        - 这样得到的数字即可基本保证它的唯一性，不会和别的单词重复
        - 问题：如果一个单词是 zzzzzzzzzz，那么得到的数字就会超过700000000000，数组可以表示这么大的下标值吗？即使可以创建这么大的数组，实际上有很多是无效的单词，创建这么大的数组是没有意义的
      + 两种方案总结：
        - 第一种方案产生的数组下标太少
        - 第二种方案产生的数组下标又太多
      + 需要哈希化
+ 认识哈希化
  - 现在需要一种压缩方法，把幂的连乘方案系统种得到的巨大整数范围压缩到可接受的数组范围中
  - 对于英文词典，多大的数组才合适呢？
    1. 如果只有50000个单词，可能会定义一个长度为50000的数组，但实际情况种，往往需要更大的空间来存储这些单词，因为我们不能保证每个单词都会映射到每一个位置
    2. 所以需要对数组扩容，比如两倍的大小 100000
  - 如何压缩呢？
    1. 现在需要找到一种方法，把 0 到 超过 700000000000 的范围，压缩为 从 0 到 100000
    2. 有一种简单的方法就是使用 *取余操作符*，它的作用是得到一个数被另一个数整除后的余数
      + 取余操作的实现：为了方便，先把一个小一点的数字范围压缩到一个小点的空间种
        - 假设把从 0~199 的数字，比如使用 largeNumber 代表，压缩到 0~99 的数字，比如使用 smallRange 代表
        - 下标值的结果：index = largeNumber % smallNumber; 比如 13/10 = 3， 157/10 = 7
        - 当然，中间还会有重复，不过重复的数量明显变小了，因为我们的数组是 100000 ，而只有 50000 个单词。就好比再 0-199 种选取5个数字放在这个长度为10 的数组中，也会重复，但是重复的概率非常小

+ 哈希表的一些概念：
  - 哈希化：将大数字转化成数组范围内下标的过程，我们就称之为哈希化
  - 哈希函数：通常我们会将单词转成大数字，大数字进行哈希化的代码实现放在一个函数种，这个函数称为哈希函数
  - 哈希表：最终将数据插入到这个数组，对整个结构的封装，我们就称之为是一个哈希表

  - 但是，还有些问题需要解决：
    1. 虽然我们在一个 100000 的数组中，放 50000 个单词已经足够，但通过哈希化后的下标值依然可能会重复，如何解决这种重复的问题？

+ 冲突
  - 尽管 50000 个单词，我们使用 10000 个位置来存储，并且通过一种相对比较好的哈希函数来完成，但依然有可能会发生冲突
  - 比如 melioration 这个单词，通过哈希函数得到它数组的下标值后，发现那个位置上已经存在一个单词 demstify。因为经过哈希化后和 melioration 得到的下标值相同
  - 这种情况称为 *冲突*，所以需要解决这种冲突
  - 就像之前 0~199 的数字中选取 5 个放在长度为10的单元格中，如果随机选择的是 33，82，11，45，90，那么他们的位置会是 3-2-1-5-0，没有发生冲突。但如果其中一个33，还有一个73，那么还是会发生冲突
  - 我们需要针对这种冲突提出一些解决方案，即使冲突的可能性比较小，但依然要考虑这种情况，以便方式冲突的时候能够进行对应的处理代码
  - 解决这种冲突通常由两种方案：
    1. 链地址法
    2. 开放地址法

+ 链地址法：
  - 链地址法是一种比较常见的解决冲突的方案（也称拉链法）
  - 数组中的每一个位置存放的不在是单独的元素，而是一个数组或链表，当有元素放入这个位置时，就把这个元素放到这个位置对应的数组/链表中，如果有下标值相同的元素，只需要将这个元素再放入到这个下标值对应的数组/链表中，就不会覆盖之前的元素。然后取这个元素的时候，先找到其对应的下标值，然后再遍历对应下标值的数组/链表，取出对应元素的信息
  - 那么是选数组还是链表呢？
    1. 数组或链表在这里都可以，效率上也差不多。因为根据哈希化的index 找出这个数组或链表时，通常就会使用线性查找，这个时候数组和链表的效率是差不多的
    2. 在某些情况中，会将新插入的元素放在数组或链表的最前面，因为觉得新插入的元素用于取出的可能性更大，这种情况最好选用链表，效率比数组高。
    3. 实际上选择数组或链表也看业务需求

+ 开放地址法：
  - 开发地址法的主要工作方式是寻找空白的单元格来添加重复的数据
  - 比如现在数组中的数据是 [,21,82, ,144, ,96,127,198, ]。这时候想要新插入一个数据 32，由于2位置的已经存放的82这个数据，这时发现在3，5，9的位置是没有任何数据的，这时候就可以寻找对应的空白位置来存放这个数据了，但到底使用哪一个位置呢？这里又需要分一些情况
  - 开放地址法其实就是要 *寻找空白的位置* 来放置冲突的数据项，但是探索这个位置的方式不同，有3种方法
    1. 线性探测：线性的查找空白单元。
      + 拿上面的例子，这时想插入 32，但是2的位置已经有了数据82，线性探测就是从 index+1 的位置开始一点点查找空白的位置来放32。
      + 那么如何查询32呢？和插入32比较相似
        - 先找到32对应的 index 为2，发现2的数据不是82，这时从 index+1 的位置依次往下找，直到找到32。
        - 但这里有个情况：如果32的位置我们之前没有插入32，是否将整个哈希表查询一遍确定32存不存在呢？
        - 查询的过程种有个约定，如果查询到空位置，就停止。因为32不可能跳过这个空位置去其他的位置
      + 如果想删除32呢？
        - 先查找到32的位置，但这时不能将32对应下标的内容设置为 null，因为如果有62在32的后面插入，那么找62 的时候发现原先 32 的位置为 null，这时就不会去再往下查找了，实际上62是存在的。
        - 所以删除一个数据时，*不要将其对应下标的内容设置为 null*，可以对它进行特殊处理（比如设置-1）
        - 当我们之后看到-1的数据是，就直到要继续查询，但是这个位置*可以插入数据*
      + 线性探测的问题：
        - 线性探测有一个比较严重的问题就是 *聚集*，什么是聚集？
        - 比如我在没有任何数据时插入的是 22-23-24-25-26 。那么意味着下标值 2-3-4-5-6的位置都有数据，这种*一连串填充单元*就叫做聚集
        - 聚集会 *影响哈希表的性能* ，无论是插入，查询，删除都会影响（需要线性查找）
        - 比如我们想插入32，会发现 *连续的单元都不允许我们放置数据*，并且在这个过程种我们需要探索多次
        - 二次探测可以解决一部分这个问题

    2. 二次探测
      + 二次探测主要优化的是 *探测时的步长*，什么意思呢？
        - 线性探测我们可以看成是步长为1的探测，比如从下标值x开始，那么线性探测就是 x+1, x+2 ... 依次探测
        - 二次探测，对步长做了优化，比如从下标值x开始，x+1^2, x+2^2, x+3^2
        - 这样就可以一次性探测比较长的距离，避免聚集带来的影响
      + 二次探测带来的问题：
        - 比如我们连续插入的是32-12-82-2-192, 那它们依次累加的时候步长是相同的，也就是这种情况下会造成 *步长不一的一种聚集*，还是会影响效率（当然这种可能性相对于连续的数字会小一些）
        - 怎么解决这个问题呢？*让每个数据的步长不一样*，通过再哈希法

    3. 再哈希法
      + 为了消除线性探测和二次探测中无论步长+1还是步长+平方中存在的问题，还有一种最常用的解决方案：再哈希法
      + 再哈希法：
        - 二次探测的算法产生的探测序列步长是固定的：1，4，9，16，依次类推
        - 现在需要一种方法：产生一种*依赖关键字的探测序列*，而不是每个关键字都一样
        - 那么，*不同的关键字*即使映射到*相同的数组下标*，也可以使用不同的探测序列
        - 再哈希法的做法就是：把关键字用在另外一个哈希函数，*再做一次哈希化*，用这次哈希化的*结果作为步长*
        - 对应*指定的关键字*，步长在整个探测中是*不变*的，不过*不同的关键字使用不同的步长*
      + 第二次哈希化需要具备以下特点：
        - 和第一个哈希函数不同（不要使用上一次的哈希函数了，不然结果还是原来的位置）
        - 不能输出为0（否则，将没有步长，每次探测都原地踏步，算法就进入了死循环）
      + 计算机专家已经设计出一种工作很好的哈希函数：
        - stepSize = constant - (key % constant)
        - 其中 constant 是质数，且小于数组的容量
        - 例如： stepSize = 5 - (key % 5),满足需求，并且结果不可能为0

+ 哈希化的效率
  - 哈希表中执行插入和搜索操作效率是非常高的
    1. 如果没有产生冲突，那么效率会更高
    2. 如果发生冲突，存取实际就依赖后来的探测长度
    3. 平均探测长度以及平均存取时间，取决于*填装因子*，随着填装因子变大，探测长度也越来越长
    4. 随着填装因子变大，效率下降的情况，在不同开放地址法方案中比链地址法更严重，所以我们来对比以下他们的效率，再决定我们选取的方案
  - 在分析效率之前，我们先了解一个概念：装填因子
    1. 装填因子表示当前哈希表中已经 *包含的数据项* 和 *整个哈希表长度* 的比值
    2. 装填因子 = 总数据项 / 哈希表长度
    3. 开放地址法的装填因子最大值是1，因为它必须找到空白的单元才能将元素放入
    4. 链地址法的装填因子可以大于1，因为拉链法可以无限的延伸下去，但效率会变低
  - 链地址法的效率比开放地址法的效率高，所以开发中采用连地址法来实现哈希表

+ 优秀的哈希函数
  - 哈希表的主要优点是它的*速度*，如果速度上不能满足，那么就达不到设计的目的了
  - 提高速度的一个办法就是让哈希函数中 *尽量少的乘法和除法*，因为它们的性能是比较低的
  - 设计好的哈希函数应该具备哪些优点呢？
    1. *快速的计算*：哈希表的优势在于效率，所以快速获取到对应的 hashCode 非常重要。我们需要通过快速的计算来获取到元素对应的hashCode
    2. *均匀的分布*：哈希表中，无论是链地址法还是开放地址法，当多个元素映射到同一个位置时，都会影响效率，所以，优秀的哈希函数应该尽可能将元素映射到不同的位置，让元素在哈希表中均匀分布

+ 快速的计算：霍纳法则
  - 在前面，我们计算哈希值的时候使用的方式：`cats = 3* 27^3 + 1* 27^2 + 20* 27 + 17 = 60337`
  - 这种方式是*直观的计算结果*，那么这种计算方式会进行几次乘法几次加法呢？
    - 当然，我们可能不止4项，可能有更多项。我们抽象以下，这个表达式其实是一个多项式：`a(n)x^n + a(n-1)x^(n-1) + ... + a(1)x + a(0)`
  - 现在问题就变成了多项式*有多少次乘法和加法*
    - 乘法次数：`n + (n-1) + ... + 1 = n(n+2)/2`
    - 加法次数：n次
  - 多项式的优化：*霍纳法则*，解决这类求值问题的高效算法之一就是霍纳法则，在中国，也被称为*秦九韶算法*。
  - 通过如下变换我们可以得到一种快得多的算法，即
    `Pn(x) = anx^n + a(n-1)x^(n-1) + ... + a1x + a0 = ((...(((anx + an -1)x + an-2)x + an -3)...)x + a1)x + a0`
  - 这种求值的安排我们称为霍纳法则
  - 变换后需要的乘法次数和加法次数：
    - 乘法次数：N次
    - 加法次数：N次
  - 如果使用大O表示时间复杂度的化，我们直接从 O(N^2) 降到 O(N)

+ 均匀的分布：
  - 在设计哈希表时，我们已经有办法处理映射到相同下标值的情况：链地址法或开发地址法
  - 但无论哪种方案，为了提升效率，最好的情况还是让数据在哈希表中均匀分布，因此，我们*需要在使用常量的地方*，尽量使用*质数*

  - 质数的使用：
    1. 哈希表的长度
    2. N次幂的底数(之前的例子使用的是27)
  - 为什么使用质数，会让哈希表分布更加均匀呢
    1. *再哈希法* 种质数的重要性：
      - 假设表的容量不是质数，例如表的长度为15，下标值0~14。有一个特定的关键字映射到0，步长为5，探测序列就是 0-5-10-0-5-10 无限循环下去，这样算法只尝试这三个单元，如果这三个单元已经有了数据，呢么会一直循环下去直到程序崩溃
      - 如果表的长度是一个质数，比如13，上面的例子的探测序列就是：0-5-10-2-7-12-4-9-1-6-11-3 一直这样下去，不仅不会产生循环，而且可以让数据在哈希表中更加均匀分布
    2. 链地址法中质数没有那么重要，甚至在Java中故意是2的n次幂
    3. Java中的HashMap
      - Java中的哈希表采用的是链地址法
      - HashMap的初始长度是 *16*，每次自动扩展，长度必须是2的n次幂，这是为了*服务于从key映射到index*的算法
      - HashMap 中为了提高效率，采用了 *位运算* 的方式：
        1. HashMap 中 index 的计算公式：`index = HashCode(key) & (length-1)`
        2. 比如计算 book 的 hashCode 结果为十进制的 3029737，二进制表示为：10 1110 0011 1010 1110 1001
        3. 假定HashMap的长度默认是16，计算length-1的值为十进制的15，二进制表示为：1111
        4. 把上面两个结果做 *与运算*：10 1110 0011 1010 1110 1001 & 1111 = 1001，十进制表示为9，所以index 是9。就把 book 放到index=9 的位置
        5. 这样的方式相对取余来说性能是高的，因为计算机进行二进制运算时更快


+ 哈希表的封装：
  - 哈希表中常见的操作：
    1. hashFunc(str, size)：哈希函数，通过给定的 str 和 size，将str转成对应的index
    2. put(key,value)：往哈希表中存取数据,如果对应key已经存在，就修改数据
    3. get(key)：根据key取出对应的值，如果key不存在返回 null
    4. remove(key)：根据key删除对应的数据，删除成功返回key对应的value，如果key不存在返回false
    5. isEmpty()：判断哈希表是否为空
    6. size()：获取哈希表中元素的个数
    7. resize(newLimit)：哈希表扩容/缩容为指定的大小
  
  - 代码实现：
    ```javascript
      function HashTable(){
        // 属性
        this.storage = [];  // 用于存储数据
        this.count = 0;     // 已经存放了几个数据
        this.limit = 7;     // 哈希表的容量

        // 方法
        // 哈希函数
        HashTable.prototype.hashFunc = function(str, size){
          // 1. 定义 hashCode 变量
          let hashCode = 0;

          // 2.霍纳算法，来计算hashCode 的值
          // cats -> Unicode 编码
          for(let strIndex = 0; strIndex < str.length; strIndex++){
            // string.charCodeAt 方法返回一个给定索引处（String中的index索引）字符的 UTF-16 代码单元值的数字，如果索引超出范围，返回 NaN
            hashCode = 37 * hashCode + str.charCodeAt(strIndex);
          }

          // 3. 取余操作
          const index = hashCode % size;
          return index;
        }

        /* 判断某个数字是否是质数 */
        HashTable.prototype.isPrime = function (num) {
          // 1. 获取 num 的平方根
          let temp = parseInt(Math.sqrt(num));
          // 2.循环判断
          for (let i = 2; i <= temp; i++) {
            if (num % i == 0) {
              return false;
            }
          }
          return true;
        }

        /* 获取质数 */
        HashTable.prototype.getPrime = function (num) {
          while (!this.isPrime(num)) {
            num++;
          }
          return num;
        }

        /* 插入&修改操作 */
        HashTable.prototype.put = function (key, value) {
          // 1.根据key获取对应的index
          let index = this.hashFunc(key, this.limit);

          // 2.根据index取出对应的 bucket
          var bucket = this.storage[index];

          // 3.判断该bucket是否为null
          if(bucket == null){
            bucket = []
            this.storage[index] = bucket;
          }

          // 4.判断是否是修改数据
          for(let i = 0; i < bucket.length; i++){
            let tuple = bucket[i];
            if(tuple[0] == key){
              tuple[1] = value;
              return;
            }
          }

          // 5.进行添加操作
          bucket.push([key,value])
          this.count++;

          // 6.判断是否需要扩容
          if(this.count > this.limit*0.75){
            let newSize = this.getPrime(this.limit*2)
            this.resize(newSize)
          }
        }

        /* 获取操作 */
        HashTable.prototype.get = function (key) {  
          // 1.获取key对应的index
          const index = this.hashFunc(key, this.limit);

          // 2.取出index位置的 bucket
          let bucket = this.storage[index];

          // 判断bucket 是否为空
          if(bucket == null){
            return null;
          }

          // 3.不为空，遍历 bucket
          for(let value of bucket){
            if(key === value[0]){
              return value[1];
            }
          }

          // 没有找到返回 null
          return null;
        }

        /* 删除操作 */
        HashTable.prototype.remove = function (key) {  
          // 1.根据key取出index
          const index = this.hashFunc(key, this.limit);
          // 2.根据index取出对应的 bucket
          let bucket = this.storage[index]
          // 3.判断 bucket 是否为空
          if(bucket == null){
            return false;
          }

          // 4. 有bucket，遍历bucket，找到对应的数据并删除
          for(let i in bucket){
            let value = bucket[i];
            if(key === value[0]){
              bucket.splice(i,1);
              this.count--;

              // 缩小容量
              if(this.limit > 7 && this.count < this.limit * 0.25){
                let newSize = this.getPrime(Math.floor(this.limit/2));
                this.resize(newSize);
              }

              // 返回被删除的数据的值
              return value[1];
            }
          }

          // 5.没有找到返回false
          return false;
        }

        /* 判断哈希表是否为空 */
        HashTable.prototype.isEmpty = function () {  
          return this.count === 0;
        }

        /* 获取哈希表中元素的个数 */
        HashTable.prototype.size = function () {  
          return this.count;
        }

        /* 扩容/缩容 */
        HashTable.prototype.resize = function(newLimit){
          // 1.保存旧的数组内容
          var oldStorage = this.storage;
          // 2.重置所有属性
          this.storage = [];
          this.count = 0;
          this.limit = newLimit;

          // 3.遍历oldStorage 中所有的bucket
          for(let i = 0; i < oldStorage.length; i++){
            // 3.1 取出对应的 bucket
            let bucket = oldStorage[i];
            // 3.2 判断bucket是否为空
            if(bucket == null){
              continue;
            }
            // 3.3 bucket中有数据，那么取出数据，重新插入
            for(let j = 0; j < bucket.length; j++){
              let tuple = bucket[j];
              this.put(tuple[0],tuple[1])
            }
          }
        }

      }
    ```


### 树
+ 真实的树的特点：
  - 树通常有一个根，连接着根的是树干
  - 树干到上面之后会进行分叉分成树枝，树枝还会分叉成更小的树枝
  - 在树枝的最后是叶子

+ 树的抽象：树可以模拟生活中的很多场景，比如公司组织架构。再将里面的数据移除，仅仅抽象出来*结构*，就得到了树结构

+ 树结构的优点：
  - 树结构和数组、链表、哈希表的对比
    1. 数组：主要优点是下标访问效率高，但基于内容查找效率低，比较好的方法是现队数组进行排序，再进行二分查找。在进行插入、删除数据时需要进行大量的位移操作，效率很低
    2. 链表：主要优点是插入、删除效率高。但查找元素效率低，必须从头/尾开始查找；而且即使插入和删除的效率很高，但是如果要插入和删除中间位置的数据，还是需要从头先找到对应的数据
    3. 哈希表：哈希表的插入、查询、删除效率都是非常高的，但是也有很多缺点：1.空间利用率不高，底层使用的是数组，并且某些单元是没有被利用的；2.哈希表中的元素是无序的，不能按照固定的顺来遍历哈希表中的元素；3.不能快速的找出哈希表中的最大值或最小值这些特殊的值
    4. 树结构：
      + 我们不能说树结构比其他结构都要好，因为每种数据结构都有自己特定的应用场景
      + 但是树结构也综合了上面的数据结构的优点（当然优点不足于盖过其他数据结构，比如效率一般情况下没有哈希表高）
      + 弥补了上面数据结构的缺点
      + 为了模拟某些场景，使用数结构更加方便。因为树结构是*非线性*的，可以表示一对多的关系，比如文件的目录结构

+ 树结构的相关术语
  - 树：n(n>=0)个节点构成的有限集合，当 n=0 时，称为*空树*
  - 对应任意一棵非空树（n>0）,他具备以下性质：
    1. 树种有一个被称为 *根* 的特殊节点，用 r 表示
    2. 其余节点可分为m(m>0)个互不相交的有限集T1，T2，...，Tm，而其中每个集合本身又是一棵树，称为原来树的 *子树*
  - 节点的度：节点的子树个数
  - 树的度：树中所有节点中最大的度数
  - 叶子节点：*度为0的节点*
  - 父节点：有子树的节点是其子树的根节点的父节点
  - 子节点：若A节点是B节点的父节点，则称B节点是A节点的子节点，子节点也称孩子节点
  - 兄弟节点：具有同一父节点的各节点彼此是兄弟节点
  - 路径和路径长度：从节点 n1 到 nk 的路径为一个节点序列 n1,n2,...,nk ; ni 是 ni+1 的父节点.路径所包含边的个数为路径的长度
  - 节点的层次: 规定根节点在第一层,其它任一节点的层数是其 *父节点的层数加1*
  - 数的深度: 数中所有节点中*最大层次*是这棵树的深度

+ 二叉树
  - 如果树中每个节点最多只能有两个子节点，那么这样的树称为 *二叉树*
  - 所有的树本质上都可以使用二叉树模拟出来
  - 二叉树的定义：
    1. 二叉树可以为空
    2. 若不为空，则它是由根节点和称为其左子树TL和右子树TR的两个不相交的二叉树组成
  - 二叉树有几个比较重要的特性，在笔试题中比较常见：
    1. 一个二叉树第 i 层的最大节点数为：`2^(i-1) , i >=1`
    2. 深度为k的二叉树具有最大节点数为：`2^k - 1, k >= 1`
    3. 对任何非空二叉树 T，若n0表示叶节点的个数，n2是度为2的非叶节点数，那么两者的关系满足：`n0 = n2 + 1`

  - 完美二叉树（满二叉树）：在二叉树中，除了最下一层的叶节点外，每层节点都有2个子节点，就构成了完美二叉树
  - 完全二叉树：除二叉树最后一层外，其他各层的节点数都达到最大个数，但最后一层从左向右的叶节点连续存在，只缺右侧若干节点。完美二叉树是特殊的完全二叉树

  - 二叉树的存储： 
    1. 二叉树的存储常见的方式是数组和链表。
      + 使用数组：
        - 完全二叉树：节点按从上至下、从左到右顺序依次存储在数组中
        - 非完全二叉树：非完全二叉树要转成完全二叉树才可以按照上面的方案存储，但会造成*很大的空间浪费*
      + 使用链表：二叉树最常见的方式还是使用链表存储
        - 每个节点封装成 Node，Node中包含存储的数据，左子节点的引用，右子节点的引用
    
+ 二叉搜索树
  - 二叉搜索树（BST，Binary Search Tree）也称二叉排序树活二叉查找树
  - 二叉搜索树是一棵二叉树，可以为空
  - 如果不为空，满足一下性质：
    1. 非空左子树的*所有*键值小于其根节点的键值
    2. 非空右子树的*所有*键值大于其根节点的键值
    3. 左、右子树本身也是二叉搜索树
  - 二叉搜索树的特点：
    - 相对较小的值总是保存在左节点上，相对较大的值总是保存在右节点上
    - 查找效率非常高，这也是二叉搜索树中，搜索的来源
  - 二叉搜索树使用二分查找的思想
 
  + 二叉搜索树（BinarySearchTree）的封装：
    - 需要封装一个用于保存每一个节点的类Node，该Node包含三个属性：对应节点的key，指向的左子树，指向的右子树。
    - 对于 BinarySearchTree 来说，只需要保存根节点即可，因为其他节点都可以通过根节点找到。

    - 二叉搜索树常见的操作
      1. insert(key)：向树中插入一个新的键
      2. search：在数中查找一个键，如果存在返回true，不存在返回false
      3. inOrderTraverse：通过中序遍历方式遍历所有节点
      4. preOrderTraverse：通过先序遍历方式遍历所有节点
      5. postOrderTraverse：通过后序遍历方式遍历所有节点
      6. min：返回树中最小的值/键
      7. max：返回树中最大的值/键
      8. remove(key)：从树中移除某个键
    - 遍历二叉搜索树：对所有的二叉树都使用，不仅仅是二叉搜索树
      + 遍历一棵树是指访问树的每个节点（也可以对每个节点进行某些操作）
      + 由于树不是线性结构，不能按照从前到后的顺序遍历
      + 二叉树的遍历常见有三种方式
        1. 先序遍历：
          - 1.先访问根节点，2.先序遍历其左子树，3.现序遍历其右子树 
        2. 中序遍历
          - 1.中序遍历其左子树， 2.访问根节点，3.中序遍历其右子树
        3. 后序遍历
          - 1.后序遍历其左子树，2.后序遍历其右子树，3.访问根节点
    
    - 二叉搜索树的删除：
      + 删除节点要从查找要删的节点开始，找到节点后需要考虑 3 种情况
        1. 该节点是叶子节点（直接删除）
        2. 该节点只有一个子节点
        3. 该节点有两个子节点

    - 代码实现
    ```javascript
    function BinarySearchTree(){
          // 节点类
          function Node(key){
            this.key = key;
            this.left = null;   // 左子树
            this.right = null;  // 右子树
          }
          this.root = null;  // 根节点

          // 方法
          /* 向树中插入一个新的键，对外暴露的方法 */
          BinarySearchTree.prototype.insert = function (key){
            var newNode = new Node(key)
            if(this.root == null){
              this.root = newNode;
              return true;
            }else{
              this.insertNode(this.root, newNode);
            }
          }

          /* 内部递归函数实现插入节点 */
          BinarySearchTree.prototype.insertNode = function (node,newNode) {  
            if(newNode.key == node.key){
              return false;
            }
            if(newNode.key < node.key){  //向左查找
              if(node.left == null){
                node.left = newNode;
                return true;
              }else{
                this.insertNode(node.left, newNode);
              }
            }else{    // 向右查找
              if (node.right == null) {
                node.right = newNode;
              } else {
                this.insertNode(node.right, newNode);
                return true;
              }
            }
          }

          /* 先序遍历,向外暴露 */
          BinarySearchTree.prototype.preOrderTraverse = function () {
            var arr = [];
            this.preOrderTraverseNode(this.root,arr);
            return arr.join(" ");
          }
          /* 先序遍历递归方法，内部调用 */
          BinarySearchTree.prototype.preOrderTraverseNode = function (node,arr) {  
            if(node != null){
              // 处理路过的节点
              arr.push(node.key);
              // 处理经过节点的左子节点
              this.preOrderTraverseNode(node.left, arr)

              // 处理经过节点的右子节点
              this.preOrderTraverseNode(node.right, arr)
            }
          } 

          /* 中序遍历 */
          BinarySearchTree.prototype.inOrderTraverse = function () {
            var arr = []
            this.inOrderTraverseNode(this.root, arr);
            return arr.join(" ");
          }
          /* 中序遍历递归方法，内部调用 */
          BinarySearchTree.prototype.inOrderTraverseNode = function (node, arr) {
            if (node != null) {
              // 处理经过节点的左子节点
              this.inOrderTraverseNode(node.left, arr)
              // 处理路过的节点
              arr.push(node.key);
              // 处理经过节点的右子节点
              this.inOrderTraverseNode(node.right, arr)
            }
          } 

          /* 后序遍历 */
          BinarySearchTree.prototype.postOrderTraverse = function () {
            var arr = []
            this.postOrderTraverseNode(this.root, arr);
            return arr.join(" ");
          }
          /* 后序遍历递归方法，内部调用 */
          BinarySearchTree.prototype.postOrderTraverseNode = function (node, arr) {
            if (node != null) {
              // 处理经过节点的左子节点
              this.postOrderTraverseNode(node.left, arr)
              // 处理经过节点的右子节点
              this.postOrderTraverseNode(node.right, arr)
              // 处理路过的节点
              arr.push(node.key);
            }
          } 

          /* 返回树中最小的值/键 */
          BinarySearchTree.prototype.min = function () {  
            var node = this.root;
            while(node.left){
              node = node.left
            }
            return node.key;
          }

          /* 返回树中最大的值/键 */
          BinarySearchTree.prototype.max = function () {  
            var node = this.root;
            while (node.right) {
              node = node.right
            }
            return node.key;
          }

          /* 搜索特定值 */
          BinarySearchTree.prototype.search = function (key) {  
            // this.searchNode(this.root,key);

            // 循环实现
            var node = this.root;
            while(node){
              if(key < node.key){
                node = node.left;
              }else if(key > node.key){
                node = node.right;
              }else{
                return true;
              }
            }
            return false;
          }
          /* 搜索节点的递归函数 */
          BinarySearchTree.prototype.searchNode = function(node,key){
            if(node == null){
              return false;
            }else{
              if(node.key == key){
                return true;
              }else if(key < node.key){
                this.searchNode(node.left, key)
              }else{
                this.searchNode(node.right, key)
              }
            }
          }

          /* 删除某个节点 */
          BinarySearchTree.prototype.remove = function(key){
            // 1. 查找到要删除的节点
            var current = this.root;
            var parent = null;
            var isLeftChild = true;
            while(current.key != key){
              if(key < current.key){
                parent = current
                current = current.left;
                isLeftChild = true;
              }else{
                parent = current;
                current = current.right;
                isLeftChild = false;
              }

              // 没有找到存在 key 的节点，返回false
              if(current == null){
                return false;
              }
            }

            // 找到了该节点
            if(current.left == null && current.right == null){  // 删除的节点是叶子节点
              if(isLeftChild){
                parent.left = null;
              }else{
                parent.right = null;
              }
            }else if(current.left == null){  // 删除的节点只有右节点
              if (current == this.root) {
                this.root = current.right
              }else if(isLeftChild){
                parent.left = current.right;
              }else{
                parent.right = current.right;
              }
            } else if (current.right == null) { // 删除的节点只有左节点
              if (current == this.root) {
                this.root = current.left
              }else if (isLeftChild) {
                parent.left = current.left;
              } else {
                parent.right = current.left;
              }
            }else{  // 删除的节点既有左节点又有右节点
              // 1.寻找后继节点
              var successor = this.getSuccessor(current)
              // 2.判断是否是根节点
              if(current == this.root){
                this.root = successor;
              }else if(isLeftChild){
                parent.left = successor;
              }else{
                parent.right = current.left;
              }
              // 3. 将删除节点的左子树 = current.left
              successor.left = current.left;
            }
            return true;
          }

          /* 找后继的方法 */
          BinarySearchTree.prototype.getSuccessor = function(delNode){
            // 1.定义变量，保存到后继
            var successor = delNode;
            var current = delNode.right;
            var successorParent = delNode;

            // 2.循环查找
            while(current != null){
              successorParent = successor;
              successor = current;
              current = current.left;
            }

            // 3.判断寻找的后继节点是否直接是 delNode 的 right 节点
            if(successor != delNode.right){
              successorParent.left = successor.right;
              successor.right = delNode.right;
            }
            return successor;
          }

        }
    ```






## 算法
### 如何评判一个算法的好坏：
  + 如果单从执行效率上进行评估，可能会想到这么一种方案：
    - 比较不同算法对同一组输入的执行处理时间，这种方案也叫做 *事后统计法*。这种方法有比较明显的缺点：
      1. 执行时间严重依赖硬件以及各种运行时各种不确定的环境因素
      2. 必须编写相应的测算代码
      3. 测试数据的选择比较难保证公正性
  + 一般从以下维度来评估算法的优劣：
    - 正确性，可读性，健壮性（对不合理输入的反应能力和处理能力）
    - *时间复杂度*：估算程序指令的执行次数（执行时间）
    - *空间复杂度*：估算程序所需占用的存储空间

### 大O表示法：
  + 一般用大O表示法来描述复杂度，它表示的是数据规模 n 对应的复杂度。大O表示法仅仅是一种粗略的分析模型，是一种估算，能帮助我们短时间内了解一个算法的执行效率
  + 忽略常数、系数、低阶
    - 9 >> O(1)
    - 2n + 1 >> O(n)
    - n^2 + 2n + 1 >> O(n^2)
    - 4n^3 + 3n^2 + 22n + 100 >> O(n^3) 
    - 2^n >> O(2^n)
  + 对数阶的细节
    - 对数阶一般省略底数：log2(n) = log2(9) * log9(n)。所以 log2(n)、log2(n) 统称为 logn
    - log5 n >> O(logn)
    - 1 + 3*log2(n) + 2 * nlog2(n) >> O(nlogn) 
  + 排序
    O(1) < O(logn) < O(n) < O(nlogn) < O(n) < O(n^2) < O(n^3) < O(2^n) < O(n!) < O(n^n)
  
  + 算法的优化方向：
    - 用尽量少的存储空间
    - 用尽量少的执行步骤
    - 根据情况可以时间换空间，空间换时间
