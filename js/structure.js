// 循环队列
class CycleQueue {
  constructor(len) {
    this.queue = new Array(len + 1)
    // 队头
    this.first = 0
    // 队尾
    this.last = 0
    // 队列大小
    this.size = 0
  }

  enQueue(item) {
    if (this.first === (this.last + 1) % this.queue.length) {
      this.resize(this.getLength() * 2 + 1)
    }
    this.queue[this.last] = item
    this.size++
    this.last = (this.last + 1) % this.queue.length
    console.log(this)
  }
  deQueue() {
    if (this.first === this.last) {
      throw Error('Queue is empty')
    }
    let item = this.queue[this.first]
    this.queue[this.first] = null
    this.first = (this.first + 1) % this.queue.length
    this.size--

    if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
      this.resize(this.getLength() / 2)
    }
    console.log(this)
    return item
  }
  getLength() {
    return this.queue.length - 1
  }
  resize(len) {
    let queue = new Array(len)
    for (let i = 0; i < len; i++) {
      const index = (this.first + i) % this.queue.length
      queue[i] = this.queue[index]
    }
    this.queue = queue
    this.first = 0
    this.last = this.size
  }
}

// 字典树
class TrieNode {
  constructor() {
    this.path = 0
    this.end = 0
    this.next = new Array(26).fill(null)
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  insert(str) {
    if (!str) return
    let node = this.root
    for (let i = 0; i < str.length; i++) {
      const index = this.getIndex(str[i])
      if (!node.next[index]) {
        node.next[index] = new TrieNode()
      }
      node.path++
      node = node.next[index]
    }
    node.end++
  }
  search(str) {
    if (!str) return
    let node = this.root
    for (let i = 0; i < str.length; i++) {
      const index = this.getIndex(str[i])
      if (!node.next[index]) return 0
      node = node.next[index]
    }
    return node.end
  }
  delete(str) {
    if (!this.search(str)) return
    let node = this.root
    for (let i = 0; i < str.length; i++) {
      const index = this.getIndex(str[i])
      if (--node.next[index].path === 0) {
        node.next[index] = null
        return
      }
      node = node.next[index]
    }
    node.end--
  }
  getIndex(char) {
    return char.charCodeAt() - 'a'.charCodeAt()
  }
}

// 并查集
class DisjointSet {
  constructor(count) {
    this.parent = new Array(count)
    this.rank = new Array(count)
    for (let i = 0; i < count; i++) {
      this.parent[i] = i
      this.rank[i] = 1
    }
  }

  find(i) {
    while (i !== this.parent[i]) {
      this.parent[i] = this.parent[this.parent[i]]
      i = this.parent[i]
    }
    return i
  }
  union(i, j) {
    let ip = this.find(i)
    let jp = this.find(j)
    if (ip === jp) return
    if (this.rank[ip] < this.rank[jp]) {
      this.parent[ip] = jp
    } else if (this.rank[ip] > this.rank[jp]) {
      this.parent[jp] = ip
    } else {
      this.parent[ip] = jp
      this.rank[jp] += 1
    }
  }
}

// 二叉堆-大根堆
class MaxHeap {
  constructor() {
    this.heap = []
  }
  size() {
    return this.heap.length
  }
  add(item) {
    this.heap.push(item)
    this._shiftUp(this.size() - 1)
  }
  removeMax() {
    this._shiftDown(0)
  }
  leftIndex(i) {
    return i * 2 + 1
  }
  rightIndex(i) {
    return i * 2 + 2
  }
  parentIndex(i) {
    return parseInt((i - 1) / 2)
  }
  _shiftUp(i) {
    while (this.heap[i] > this.heap[this.parentIndex(i)]) {
      this._swap(i, this.parentIndex(i))
      i = this.parentIndex(i)
    }
  }
  _shiftDown(i) {
    this._swap(i, this.size() - 1)
    this.heap.splice(this.size() - 1, 1)
    while (this.leftIndex(i) < this.size()) {
      let j = this.leftIndex(i)
      if (this.size() > j + 1 && this.heap[j + 1] > this.heap[j]) j++
      if (this.heap[i] > this.heap[j]) break
      this._swap(i, j)
      i = j
    }
  }
  _swap(left, right) {
    const rightVal = this.heap[right]
    this.heap[right] = this.heap[left]
    this.heap[left] = rightVal
  }
}
