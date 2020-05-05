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
// O(n^2)
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
// O(n^2)
function insertSort(arr) {
  checkArr(arr)
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
      swapItem(arr, j, j + 1)
    }
  }
  return arr
}
