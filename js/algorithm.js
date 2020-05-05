function sum(a, b) {
  if (a === 0) return b
  if (b === 0) return a
  const A = a ^ b
  const B = (a & b) << 1
  return sum(A, B)
}
// console.log(sum(8, 8));

function randomArr() {
  return Array.from({ length: 10 }, () => Math.round(Math.random() * 10))
}
function checkArr(arr) {
  if (!arr || arr.length === 1) return
}
function swapItem(arr, left, right) {
  const temp = arr[right]
  arr[right] = arr[left]
  arr[left] = temp
}
// 冒泡排序
function bubbleSort(arr) {
  checkArr(arr)
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) swapItem(arr, j, j + 1)
    }
  }
  return arr
}
// console.log(bubbleSort(randomArr()))
// 选择排序
function selectSort(arr) {
  checkArr(arr)
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      minIndex = arr[j] < arr[j + 1] ? j : minIndex
    }
    swapItem(arr, i, minIndex)
  }
  return arr
}
// console.log(selectSort(randomArr()))
// 插入排序
function insertSort(arr) {
  checkArr(arr)
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[j + 1]) swapItem(arr, j, j + 1)
    }
  }
  return arr
}
// console.log(insertSort(randomArr()))
// 归并排序
function mergeSort(array) {
  checkArr(array)
  const sort = (arr, left, right) => {
    console.log(arr, left, right)
    if (left === right) return
    // 位运算获取中间索引
    let mid = parseInt(left + ((right - left) >> 1))
    sort(arr, left, mid)
    sort(arr, mid + 1, right)

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
  return sort(array, 0, array.length - 1)
}
// console.log(mergeSort(randomArr()))
// 快速排序
function quickSort(array) {
  checkArr(array)
  function part(arr, left, right) {
    let less = left - 1
    let more = right
    while (left < more) {
      if (arr[left] < arr[right]) {
        ++less
        ++left
      } else if (arr[left] > arr[right]) {
        // 当前值比基准值大，将当前值和右边的值交换
        // 并且不改变 `left`，因为当前换过来的值还没有判断过大小
        swapItem(arr, --more, left)
      } else {
        // 和基准值相同，只移动下标
        ++left
      }
    }
    swapItem(arr, right, more)
    return [less, more]
  }
  function sort(arr, left, right) {
    if (left < right) {
      // swapItem(arr, left, right)
      let [less, more] = part(arr, parseInt(left + ((right - left) >> 1)), right)
      sort(arr, left, less)
      sort(arr, more + 1, right)
    }
  }
  sort(array, 0, array.length - 1)
  return array
}
console.log(quickSort(randomArr()))
