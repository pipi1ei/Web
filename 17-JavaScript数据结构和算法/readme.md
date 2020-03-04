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
