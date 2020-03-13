
/* 栈结构 */
function Stack() {
  // 栈中的属性
  this._items = [];
  // 入栈方法
  Stack.prototype.push = function (element) {
    this._items.push(element);
  }
  // 出栈方法,返回被移除的元素
  Stack.prototype.pop = function () {
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
    for (var i in this._items) {
      resultString += this._items[i] + " ";
    }
    return resultString.substring(0, resultString.length - 1);
  }
}

/* 利用栈结构封装 十进制转二进制 的方法 */
function dec2bin(decNumber) {
  var s = new Stack();
  while (decNumber > 0) {
    s.push(decNumber % 2);
    decNumber = Math.floor(decNumber / 2);
  }

  var binaryStr = "";
  while (!s.isEmpty()) {
    binaryStr += s.pop();
  }
  return Number(binaryStr);
}

/* 基于数组实现队列结构 */
function Queue() {
  this._items = [];
  // 将一个或多个元素插入到队列中
  Queue.prototype.enqueue = function (...elements) {
    this._items.push(...elements);
  }
  //删除队列第一个元素并返回
  Queue.prototype.dequeue = function () {
    return this._items.shift();
  }
  // 返回队列第一个元素
  Queue.prototype.front = function () {
    return this._items[0];
  }
  // 判断队列是否为空
  Queue.prototype.isEmpty = function () {
    return this._items.length === 0;
  }
  // 返回队列包含元素的个数
  Queue.prototype.size = function () {
    return this._items.length;
  }
  // 将队列中的内容，转成字符串形式
  Queue.prototype.toString = function () {
    var resultStr = "";
    for (var i in this._items) {
      resultStr += this._items[i] + " ";
    }
    return resultStr.substring(0, resultStr.length - 1);
  }
}

/* 利用队列实现击鼓传花 */
function passGame(nameList, num) {
  var _queue = new Queue();
  for (var i in nameList) {
    _queue.enqueue(nameList[i]);
  }

  while (_queue.size() > 1) {
    for (var j = 1; j < num; j++) {
      _queue.enqueue(_queue.dequeue());
    }
    _queue.dequeue();
  }
  return _queue.front();
}

/* 优先级队列封装 */
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
      if (!added) {
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

/* 单向链表 */
function LinkedList() {
  function Node(data) {
    this.data = data;
    this.next = null;
  }

  this.head = null; // 链表的头
  this.length = 0; // 记录链表的节点数

  // 向链表尾部添加一个新的项
  LinkedList.prototype.append = function (data) {
    //1. 创建节点
    var newNode = new Node(data);
    // 2.判断该节点是否是第一个节点，是：让 head 指向它，不是：找到之前的最后一个节点，让最后一个节点的 next 指向 newNode
    if (this.length === 0) {
      this.head = newNode;
    } else {
      // 找到最后一个节点
      var current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    // 链表的长度加1
    this.length++;
  }

  /* 向链表的特定位置插入一个新的项 */
  LinkedList.prototype.insert = function (position, data) {
    // position 合法性校验
    if (position < 0 || position > this.length) return false;
    var newNode = new Node(data);
    // 如果往最前面插入元素：position 为 0 的情况
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {  // 在任意位置插入元素
      var index = 0;
      var current = this.head;  // 用于找到原先在 position 位置的节点
      var previous = null;      // 用于找到原先在 position 位置的节点的前一个节点
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      newNode.next = current;
      previous.next = newNode;
    }
    this.length++;
    return true;
  }

  /* 获取对应位置的元素 */
  LinkedList.prototype.get = function (position) {
    // 1. 越界判断
    if (position < 0 || position >= this.length) return false;
    var index = 0;
    var current = this.head;
    while (index++ < position) {
      current = current.next;
    }
    return current.data;
  }

  /* 返回元素在链表中的索引。如果没有返回 -1 */
  LinkedList.prototype.indexOf = function (element) {
    var current = this.head;  // 记录element 对应节点
    var index = 0;            // 记录element 对应节点的位置
    while (index++ < this.length) {
      if (current.data === element) {
        return index;
      }
      current = current.next;
    }
    return -1;
  }

  /* 修改某个位置的元素，修改成功返回true，position值不对返回false */
  LinkedList.prototype.update = function (position, data) {
    // 1. 越界判断
    if (position < 0 || position >= this.length) return false;
    var index = 0;
    var current = this.head;
    while (index++ < position) {
      current = current.next;
    }
    current.data = data;
    return true;
  }

  /* 从链表的特定位置移除一项，返回倍移除的数据，如果位置不对返回 false */
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
    return data;          // 返回对应元素的数据
  }

  /* 从链表中移除该项 */
  LinkedList.prototype.remove = function (data) {
    var index = 0;
    var current = this.head;
    var previous = null;
    while (index++ < this.length) {
      if (current.data === data) {
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

  /* 如果链表不包含任何元素，返回true，如果链表的长度大于 0 返回 false */
  LinkedList.prototype.isEmpty = function () {
    return this.length === 0;
  }

  /* 放回链表包含元素的个数 */
  LinkedList.prototype.size = function () {
    return this.length;
  }

  LinkedList.prototype.toString = function () {
    var current = this.head;
    var listString = "";
    while (current) {
      listString += current.data + " ";
      current = current.next;
    }
    return listString.substring(0, listString.length - 1)
  }
}


/* 双向链表 */
function DoublyLinkedList() {
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
    if (this.length === 0) {
      this.head = newNode;  // head 指向这个节点
      this.tail = newNode;  // tail 指向这个节点
    } else {    // 不是第一个节点
      this.tail.next = newNode;   // 原先最后一个节点的 next 指向 newNode
      newNode.prev = this.tail;    // newNode 的 prev 指向原先的最后一个节点
      this.tail = newNode;        // tail 指向 newNode
    }
    this.length++;  // 链表节点个数加1
  }

  /* 向链表的特定位置插入一个新的项 */
  DoublyLinkedList.prototype.insert = function (position, data) {
    // 1. 越界判断
    if (position < 0 || position > this.length) return false;

    // 2. 找到对应位置，插入 data
    let newNode = new Node(data);
    // 原链表是空的
    if (this.length === 0) {
      this.head = newNode;  // head 指向这个节点
      this.tail = newNode;  // tail 指向这个节点
    } else {
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
    if (position < 0 || position >= this.length) return null;
    // 2.找到对应位置
    let index = 0;
    let current = this.head;
    while (index++ < position) {
      current = current.next;
    }
    // 3.取出对应位置的值并返回
    return current.data;
  }

  /* 返回元素在链表中的索引。如果没有返回 - 1 */
  DoublyLinkedList.prototype.indexOf = function (data) {
    let index = 0;
    let current = this.head;
    while (current) {
      if (current.data === data) {
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
    if (position < 0 || position >= this.length) return false;
    // 2. 找出对应位置的元素
    let index = 0;
    let current = this.head;
    while (index++ < position) {
      current = current.next;
    }
    // 3. 改变对应位置的元素
    current.data = newData;
    return true;
  }

  /* 从链表的特定位置移除一项，返回移除的数据 */
  DoublyLinkedList.prototype.removeAt = function (position) {
    // 1. 越界判断
    if (position < 0 || position >= this.length) return null;
    let data = null; // 要返回的数据
    // 2. 找到对应位置的元素
    if (this.length === 1) {  // 链表只有一个元素
      data = this.head.data;
      this.head = null;
      this.tail = null;
    } else {
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
        current.prev.next = current.next;  // 对应位置的上一个节点的next指向对应位置的下一个节点
        current.next.prev = current.prev;  // 对应位置的下一个节点的prev指向对应位置的上一个节点
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
    while (current) {
      if (current.data === data) {
        // 2.找到对应元素并删除
        if (index === 0) {  // 2.1 如果是删除第一元素
          this.head.next.prev = null;  // 第二个节点的 prev 为空
          this.head = this.head.next;   // head 指向原先的第二个节点
        } else if (index === this.length - 1) {  // 2.2 如果是删除最后一个
          this.tail.prev.next = null;  // 倒数第二个节点的 next 为空
          this.tail = this.tail.prev;   // tail 指向倒数第二个节点
        } else {  // 其他情况
          var temp = current;
          current.prev.next = current.next;  // 对应位置的上一个节点的next指向对应位置的下一个节点
          current.next.prev = current.prev;  // 对应位置的下一个节点的prev指向对应位置的上一个节点
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
    while (index-- > 0) {
      resultString += current.data + " ";
      current = current.prev;
    }
    return resultString.substring(0, resultString.length - 1);
  }

  /* 由于链表使用了Node类，就需要重写继承自Javascript对象默认的toString方法，让其只输入元素的值 */
  DoublyLinkedList.prototype.toString = DoublyLinkedList.prototype.forwardString;
}


/* 集合 */
function Set() {
  this._items = {};

  /* 向集合中添加一个新的项 */
  Set.prototype.add = function (value) {
    // 1. 先判断集合中有没有这个值，有的话返回 false，表示未添加成功
    if (this.has(value)) {
      return false;
    }
    // 2. 往集合中添加一个值
    this._items[value] = value;
    return true;
  }

  /* ：从集合中移除一个值 */
  Set.prototype.remove = function (value) {
    if (this.has(value)) {
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

  /* 求与另一个集合的并集 */
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

  /* 求与另一个集合的交集 */
  Set.prototype.intersection = function (otherSet) {
    const newSet = new Set();
    for (let value of this.values()) {
      if (otherSet.has(value)) {
        newSet.add(value);
      }
    }
    return newSet;
  }

  /* 求一个集合与另一个集合的差集 */
  Set.prototype.difference = function (otherSet) {
    const newSet = new Set();
    for (let value of this.values()) {
      if (!otherSet.has(value)) {
        newSet.add(value);
      }
    }
    return newSet;
  }

  /* 判断一个集合是否是另一个集合的子集 */
  Set.prototype.isChild = function (otherSet) {
    for (let value of this.values()) {
      if (!otherSet.has(value)) {
        return false;
      }
    }
    return true;
  }
}


/* 哈希表：数组 -> 数组 -> 数组[key,value] */
function HashTable() {
  // 属性
  this.storage = [];  // 用于存储数据
  this.count = 0;     // 已经存放了几个数据
  this.limit = 7;     // 哈希表的容量

  // 方法
  // 哈希函数
  HashTable.prototype.hashFunc = function (str, size) {
    // 1. 定义 hashCode 变量
    let hashCode = 0;

    // 2.霍纳算法，来计算hashCode 的值
    // cats -> Unicode 编码
    for (let strIndex = 0; strIndex < str.length; strIndex++) {
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
    if (bucket == null) {
      bucket = []
      this.storage[index] = bucket;
    }

    // 4.判断是否是修改数据
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] == key) {
        tuple[1] = value;
        return;
      }
    }

    // 5.进行添加操作
    bucket.push([key, value])
    this.count++;

    // 6.判断是否需要扩容
    if (this.count > this.limit * 0.75) {
      let newSize = this.getPrime(this.limit * 2)
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
    if (bucket == null) {
      return null;
    }

    // 3.不为空，遍历 bucket
    for (let value of bucket) {
      if (key === value[0]) {
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
    if (bucket == null) {
      return false;
    }

    // 4. 有bucket，遍历bucket，找到对应的数据并删除
    for (let i in bucket) {
      let value = bucket[i];
      if (key === value[0]) {
        bucket.splice(i, 1);
        this.count--;

        // 缩小容量
        if (this.limit > 7 && this.count < this.limit * 0.25) {
          let newSize = this.getPrime(Math.floor(this.limit / 2));
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
  HashTable.prototype.resize = function (newLimit) {
    // 1.保存旧的数组内容
    var oldStorage = this.storage;
    // 2.重置所有属性
    this.storage = [];
    this.count = 0;
    this.limit = newLimit;

    // 3.遍历oldStorage 中所有的bucket
    for (let i = 0; i < oldStorage.length; i++) {
      // 3.1 取出对应的 bucket
      let bucket = oldStorage[i];
      // 3.2 判断bucket是否为空
      if (bucket == null) {
        continue;
      }
      // 3.3 bucket中有数据，那么取出数据，重新插入
      for (let j = 0; j < bucket.length; j++) {
        let tuple = bucket[j];
        this.put(tuple[0], tuple[1])
      }
    }
  }

}


/* 二叉搜索树 */
