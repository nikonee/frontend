// 位运算求和
function sum(a, b) {
  if (a === 0) return b
  if (b === 0) return a
  const A = a ^ b
  const B = (a & b) << 1
  return sum(A, B)
}
// console.log(sum(8, 8));

// 排序算法
function randomArray(len) {
  return Array.from({ length: len }, () => Math.round(Math.random() * 50))
}
const randomArr = randomArray(100)
function swapItem(arr, left, right) {
  // [arr[left], arr[right]] = [arr[right], arr[left]]
  const temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp
}
// 冒泡排序
function bubbleSort1(arr) {
  console.time('bubbleSort1')
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swapItem(arr, j, j + 1)
      }
    }
  }
  console.timeEnd('bubbleSort1')
  // console.log(arr)
  return arr
}
function bubbleSort2(arr) {
  console.time('bubbleSort2')
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swapItem(arr, j, j + 1)
      }
    }
  }
  console.timeEnd('bubbleSort2')
  // console.log(arr)
  return arr
}
function bubbleSort3(arr) {
  console.time('bubbleSort3')
  let i = arr.length - 1
  while (i > 0) {
    let pos = 0
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swapItem(arr, j, j + 1)
        pos = j // 记录交换的位置
      }
    }
    i = pos
  }
  console.timeEnd('bubbleSort3')
  // console.log(arr)
  return arr
}
function bubbleSort4(arr) {
  console.time('bubbleSort4')
  let min = 0
  let max = arr.length - 1
  let j
  while (min < max) {
    for (j = min; j < max; j++) {
      if (arr[j] > arr[j + 1]) {
        swapItem(arr, j, j + 1)
      }
    }
    max--
    for (j = max; j > min; j--) {
      if (arr[j] < arr[j - 1]) {
        swapItem(arr, j, j - 1)
      }
    }
    min++
  }
  console.timeEnd('bubbleSort4')
  // console.log(arr)
  return arr
}
bubbleSort1([...randomArr])
bubbleSort2([...randomArr])
bubbleSort3([...randomArr])
bubbleSort4([...randomArr])
// 选择排序
function selectSort(arr) {
  console.time('selectSort')
  let min
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    min = i
    for (let j = i + 1; j < len; j++) {
      // min = arr[j] < arr[j + 1] ? j : min
      if (arr[j] < arr[min]) min = j
    }
    swapItem(arr, i, min)
  }
  console.timeEnd('selectSort')
  // console.log(arr)
  return arr
}
selectSort([...randomArr])
// 插入排序
function insertSort1(arr) {
  console.time('insertSort1')
  for (let i = 1, len = arr.length; i < len; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[j + 1]) swapItem(arr, j, j + 1)
    }
  }
  console.timeEnd('insertSort1')
  // console.log(arr)
  return arr
}
function insertSort2(arr) {
  console.time('insertSort2')
  for (let i = 1, len = arr.length; i < len; i++) {
    let left = 0,
      right = i - 1,
      temp = arr[i]
    while (left <= right) {
      let mid = (left + right) >> 1
      if (arr[mid] > temp) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j]
    }
    arr[left] = temp
  }
  console.timeEnd('insertSort2')
  // console.log(arr)
  return arr
}
insertSort1([...randomArr])
insertSort2([...randomArr])
// 希尔排序
function shellSort(arr) {
  console.time('shellSort')
  let len = arr.length,
    gap = 1,
    temp
  while (gap < len / 5) {
    gap = gap * 5 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 5)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i]
      let j = i - gap
      for (; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  console.timeEnd('shellSort')
  // console.log(arr)
  return arr
}
shellSort([...randomArr])
// 归并排序
function mergeSort1(array) {
  console.time('mergeSort1')
  const mergeSort = function (arr, left, right) {
    if (left === right) return
    // 位运算获取中间索引
    let mid = parseInt(left + ((right - left) >> 1))
    mergeSort(arr, left, mid)
    mergeSort(arr, mid + 1, right)

    let tempArr = [],
      index = 0,
      leftIndex = left,
      midIndex = mid + 1
    while (leftIndex <= mid && midIndex <= right) {
      tempArr[index++] = arr[leftIndex] < arr[midIndex] ? arr[leftIndex++] : arr[midIndex++]
    }
    while (leftIndex <= mid) {
      tempArr[index++] = arr[leftIndex++]
    }
    while (midIndex <= right) {
      tempArr[index++] = arr[midIndex++]
    }
    for (let i = 0; i < tempArr.length; i++) {
      arr[left + i] = tempArr[i]
    }
    return arr
  }
  mergeSort(array, 0, array.length - 1)
  console.timeEnd('mergeSort1')
  // console.log(array)
  return array
  // return mergeSort(array, 0, array.length - 1)
}
function mergeSort2(array) {
  // console.time('mergeSort2')
  let len = array.length
  if (len <= 1) return array
  let mid = len >> 1,
    leftArr = array.slice(0, mid),
    rightArr = array.slice(mid)
  const mergeSort = function (left, right) {
    let result = []
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        result.push(left.shift())
      } else {
        result.push(right.shift())
      }
    }
    while (left.length) {
      result.push(left.shift())
    }
    while (right.length) {
      result.push(right.shift())
    }

    return result
  }
  // console.timeEnd('mergeSort2')
  // console.log(array)
  return mergeSort(mergeSort2(leftArr), mergeSort2(rightArr))
}
mergeSort1([...randomArr])
mergeSort2([...randomArr])
// 快速排序
function quickSort1(array) {
  console.time('quickSort1')
  const quickSort = function (arr, left, right) {
    if (left < right) {
      let i = left - 1
      for (let j = left; j <= right; j++) {
        if (arr[j] <= arr[right]) {
          i++
          swapItem(arr, i, j)
        }
      }
      quickSort(arr, left, i - 1)
      quickSort(arr, i + 1, right)
    }
    return arr
  }
  quickSort(array, 0, array.length - 1)
  console.timeEnd('quickSort1')
  // console.log(array)
  return array
}
function quickSort2(array) {
  console.time('quickSort2')
  const quickSort = function (arr) {
    if (arr.length <= 1) return arr
    let mid = parseInt(arr.length / 2)
    let center = arr.splice(mid, 1)[0]
    let leftArr = [],
      rightArr = []
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i] < center) {
        leftArr.push(arr[i])
      } else {
        rightArr.push(arr[i])
      }
    }
    return quickSort(leftArr).concat([center], quickSort(rightArr))
  }
  quickSort(array)
  console.timeEnd('quickSort2')
  // console.log(array)
  return array
}
quickSort1([...randomArr])
quickSort2([...randomArr])
// 堆排序
function heapSort1(array) {
  console.time('heapSort1')
  const heapify = function (arr, index, size) {
    let left = index * 2 + 1
    while (left < size) {
      let larger = left + 1 < size && arr[left] < arr[left + 1] ? left + 1 : left
      larger = arr[index] < arr[larger] ? larger : index
      if (larger === index) break
      swapItem(arr, index, larger)
      index = larger
      left = index * 2 + 1
    }
  }
  const heapInsert = function (arr, index) {
    const parentIndex = (index - 1) >> 1
    while (arr[index] > arr[parentIndex]) {
      swapItem(arr, index, parentIndex)
      index = parentIndex
    }
  }
  let len = array.length
  for (let i = 0; i < len; i++) {
    heapInsert(array, i)
  }
  swapItem(array, 0, --len)
  while (len > 0) {
    heapify(array, 0, len)
    swapItem(array, 0, --len)
  }
  console.timeEnd('heapSort1')
  // console.log(array)
  return array
}
function heapSort2(array) {
  console.time('heapSort2')
  const heapify = function (arr, index, size) {
    var left = 2 * index + 1,
      right = 2 * index + 2,
      larger = index
    if (left < size && arr[left] > arr[larger]) {
      larger = left
    }
    if (right < size && arr[right] > arr[larger]) {
      larger = right
    }
    if (larger != index) {
      swapItem(arr, index, larger)
      heapify(arr, larger, size)
    }
  }
  let len = array.length
  for (let i = parseInt(len / 2) - 1; i >= 0; i--) {
    heapify(array, i, len)
  }
  for (let j = len - 1; j >= 1; j--) {
    swapItem(array, 0, j)
    heapify(array, 0, --len)
  }
  console.timeEnd('heapSort2')
  // console.log(array);
  return array
}
heapSort1([...randomArr])
heapSort2([...randomArr])

// 单向链表反转
function reverseLinklist(head) {
  if (!head || !head.next) return head
  let prev = (next = null)
  let current = head
  // 判断当前节点是否为空
  // 不为空就先获取当前节点的下一节点
  // 然后把当前节点的 next 设为上一个节点
  // 然后把 current 设为下一个节点，prev 设为当前节点
  while (current) {
    next = current.next
    current.next = prev
    prev = current
    current = next
  }
  return prev
}

// 二叉树遍历
function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}
// 递归遍历
function recursiveTraversal(root) {
  if (root) {
    console.log(root)
    recursiveTraversal(root.left)
    recursiveTraversal(root.right)
  }
}
// 非递归遍历
// 先序遍历
function preTraversal(root) {
  if (root) {
    let stack = []
    stack.push(root)
    while (stack.length > 0) {
      // 弹出栈顶元素
      root = stack.pop()
      console.log(root)
      // 因为先序遍历是先左后右，栈是先进后出结构，所以先 push 右边再 push 左边
      if (root.right) {
        stack.push(root.right)
      }
      if (root.left) {
        stack.push(root.left)
      }
    }
  }
}
// 中序遍历
function midTraversal(root) {
  if (root) {
    let stack = []
    // 中序遍历是先左再根最后右
    // 所以首先应该先把最左边节点遍历到底依次 push 进栈
    // 当左边没有节点时，就打印栈顶元素，然后寻找右节点
    // 对于最左边的叶节点来说，可以把它看成是两个 null 节点的父节点
    // 左边打印不出东西就把父节点拿出来打印，然后再看右节点
    while (stack.length > 0 || root) {
      if (root) {
        stack.push(root)
        root = root.left
      } else {
        root = stack.pop()
        console.log(root)
        root = root.right
      }
    }
  }
}
// 后序遍历
function posTraversal(root) {
  if (root) {
    let stack1 = []
    let stack2 = []
    // 后序遍历是先左再右最后根
    // 所以对于一个栈来说，应该先 push 根节点，然后 push 右节点，最后 push 左节点
    stack1.push(root)
    while (stack1.length > 0) {
      root = stack1.pop()
      stack2.push(root)
      if (root.left) {
        stack1.push(root.left)
      }
      if (root.right) {
        stack1.push(root.right)
      }
    }
    while (stack2.length > 0) {
      console.log(stack2.pop())
    }
  }
}

// 动态规划-斐波那契数列
function fib(n) {
  if (n >= 0 && n < 2) return n
  return fib(n - 1) + fib(n - 2)
}
// console.log(fib(10))
function fibDP(n) {
  let arr = new Array(n + 1).fill(null)
  arr[0] = 0
  arr[1] = 1
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }
  return arr[n]
}
// console.log(fibDP(10))

/**
 * 0 - 1 背包问题
 * @param {*} m 物品重量
 * @param {*} v 物品价值
 * @param {*} c 总容量
 */
function knapsack(m, v, c) {
  let length = w.length
  if (length === 0) return 0
  // 对照表格生成的二维数组，第一维代表物品，第二维代表背包剩余容量
  // 第二维中的元素代表背包物品总价值
  let arr = new Array(length).fill(new Array(c + 1).fill(null))
  for (let i = 0; i <= c; i++) {
    // 对照表格第一行， array[0] 代表物品 1，i 代表剩余总容量
    // 当剩余总容量大于物品 1 的重量时，记录下背包物品总价值，否则价值为 0
    arr[0][i] = i >= w[0] ? v[0] : 0
  }
  for (let i = 1; i < length; i++) {
    for (let j = 0; j <= c; j++) {
      // 这里求解子问题，分别为不放当前物品和放当前物品
      // 先求不放当前物品的背包总价值，这里的值也就是对应表格中上一行对应的值
      arr[i][j] = arr[i - 1][j]
      // 判断当前剩余容量是否可以放入当前物品
      if (w[i] <= j) {
        // 判断放入当前物品和不放入当前物品，哪个背包总价值大
        arr[i][j] = Math.max(arr[i][j], v[i] + arr[i - 1][j - w[i]])
      }
    }
  }
  return arr[length - 1][c]
}

// 最长递增子序列
function longestIS(arr) {
  if (arr.length === 0) return 0
  // 创建一个和参数相同大小的数组
  let array = new Array(arr.length).fill(1)
  for (let i = 1; i < arr.length; i++) {
    // 判断索引 i 上的值是否大于之前的值
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        array[i] = Math.max(array[i], array[j] + 1)
      }
    }
  }
  let res = 1
  for (let i = 0; i < array.length; i++) {
    res = Math.max(res, array[i])
  }
  return res
}
// console.log(randomArr(10), longestIS(randomArr(10)))
