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
  - 几个人一起玩游戏，围城一圈开始数数，数到某个数字的人自动淘汰，最后剩下的人获得胜利
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
  - 数组的创建需要申请*一段连续的内存空间*（一整块的内存），并且大小是固定的（大部分编程语言的数组都是固定的，但JS的数组可以自动扩容），所有当当前数组不能满足容量需求时，需要*扩容*（一般情况下是申请一个更大的数组，比如原数组的2倍，然后将原数组中的数据复制过去）
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
      <!-- 保存链表里的每个节点数据和它的下一个节点 -->
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
  
  - *注意*：对象不能被 for of 遍历，因为能够被for of 正常遍历的，都需要实现一个迭代器 Iterator，而Object对象没有实现这个接口，使得它无法被 for of 遍历，而数组，字符串，Set，Map 结构已经内置了 Iterator，所有可以被 for of 遍历。

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
      + 方案二：幂的连乘shi
        - 通过一种算法，让单词转成的数字不那么普通。通过幂的连乘
        - 什么是幂的连乘：平时我们使用大于10的数字，可以用这种方式表示
          7654 = 7* 10^3 + 6* 10^2 + 5*10 + 4
          cats = 3* 27^3 + 1* 27^2 + 20* 27 + 17 = 60337
        - 这样得到的数字即可基本保证它的唯一性，不会和别的单词重复
        - 问题：如果一个单词是 zzzzzzzzzz，那么得到的数字就会超过700000000000，数组可以表示这么大的下标值吗？即使可以创建这么大的数组，实际上由很多是无效的单词，创建这么大的数组是没有意义的
      + 两种方案总结：
        - 第一种方案产生的数组下标太少
        - 第二种发难产生的数组下标又太多
      + 需要哈希化
+ 认识哈希化
  - 现在需要一种压缩方法，把幂的连乘方案系统种得到的巨大整数范围压缩到可接受的数组范围中
  - 对应英文词典，多大的数组才合适呢？
    1. 如果只有50000个单词，可能会定义一个长度为50000的数组，但实际情况种，往往需要更大的空间来存储这些单词，因为我们不能保证每个单词都会映射到每一个位置
    2. 所以需要对数组扩容，比如两倍的大小 100000
  - 如何压缩呢？
    1. 现在需要找到一种方法，把 0 到 超过 700000000000 的范围，压缩为 从 0 到 100000
    2. 有一种简单的方法就是使用 *取余操作符*，它的作用是得到一个数被另一个数整除后的余数
      + 取余操作的实现：为了方便，先把一个小一点的数字范围压缩到一个小点的空间种
        - 假设把从 0~199 的数字，比如使用 largeNumber 代表，压缩到 0~99 的数字，比如使用 smallRange 代表
        - 下标值的结果：index = largeNumber % smallNumber; 比如 13/10 = 3， 157/10 = 7
        - 当然，中间还会有重复，不过重复的数量明显变小了，因为我们的数组是 100000 ，而只有 50000 个单词。就好比再 0-199 种选取5个数字放在这个长度为10 的数字种，也会重复，但是重复的概率非常小

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
    1. 链地址法i
    2. 开放地址法

+ 链地址法：
  - 链地址法是一种比较常见的解决冲突的方案（也称拉链法）
  - 数组中的每一个位置存放的不在是单独的元素，而是一个数组或链表，当有元素放入这个位置时，就把这个元素放到这个位置对应的数组/链表中，如果有下标值相同的元素，只需要将这个元素再放入到这个下标值对应的数组/链表中，就不会覆盖之前的元素。然后取这个元素的时候，先找到其对应的下标值，然后再遍历对应下标值的数组/链表，取出对应元素的信息
  - 那么是选数组还是链表呢？
    1. 数组或链表在这里都可以，效率上也差不多。因为根据哈希化的index 找出这个数组或链表是，通常就会使用线性查找，这个时候数组和链表的效率是差不多的
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
        - 所以删除一个数据是，*不要将其对应下标的内容设置为 null*，可以对它进行特殊处理（比如设置-1）
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
      + 为了消除线性探测和二次探测中无论步长+1还是步长+平方种存在的问题，还有一种最常用的解决方案：再哈希法
      + 再哈希法：
        - 二次探测的算法产生的探测序列步长是固定的：1，4，9，16，依次类推
        - 现在需要一种方法：产生一种*依赖关键字的探测序列*，而不是每个关键字都一样
        - 那么，*不同的关键字*即使映射到*相同的数组下标*，也可以使用不同的探测序列
        - 再哈希法的做法就是：把关键字用在另外一个哈希函数，*再做一次哈希化*，用这次哈希化的*结果作为步长*
        - 对应*指定的关键字*，步长在整个探测种是*不变*的，不过*不同的关键字使用不同的步长*
      + 第二次哈希化需要具备以下特点：
        - 和第一个哈希函数不同（不要使用上一次的哈希函数了，不然结果还是原来的位置）
        - 不能输出为0（否则，将没有步长，每次探测都原地踏步，算法就进入了死循环）
      + 计算机专家已经设计出一种工作很好的哈希函数：
        - strpSize = constant - (key % constant)
        - 其中 constant 是质数，且小于数组的容量
        - 例如： stepSize = 5 - (key % 5),满足需求，并且结果不可能为0

+ 哈希化的效率
  - 哈希表中执行插入和搜索操作效率是非常高的
    1. 如果没有产生冲突，那么效率会更高
    2. 如果发生冲突，存取实际就依赖后来的探测长度
    3. 平均探测长度以及平均存取实际，取决于*填装因子*，随着填装因子变大，探测长度也越来越长
    4. 随着填装因子变大，效率下降的情况，在不同开发地址法方案中比链地址法更严重，所以我们来对比以下他们的效率，再决定我们选取的方案
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
  - 多项式的优化：*霍纳法则*，解决这类求值问题的高效算法之一就是霍纳法则，在中国，也被称为秦九韶算法。
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
    2. N次幂的底数(之前的例子使用的时27)
  - 为什么使用质数，会让哈希表分布更加均匀呢
