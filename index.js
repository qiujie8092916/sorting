let sortingSequence = [4, 2, 5, 1, 6, 3, 7, 9, 0, 8, -1]
const { floor, random } = Math

let sort = new Sort(sortingSequence)
console.log(sort.getArr())
sort.mergeSort(sortingSequence)
console.log(sort.getArr())
console.log('cycleCount: ' + sort.cycleCount)
console.log('optCount: ' + sort.optCount)

function Sort(_arr) {
  this.cycleCount = 0
  this.optCount = 0
  this.arr = _arr

  let arr = this.arr

  this.clear = function() {
    this.cycleCount = this.optCount = 0
  }
  this.getArr = function() {
    return this.arr
  }
   /** 冒泡排序
       平均时间复杂度O(n^2)
    **/
  this.bubbleSort = function () {
    for(let i = 0; i < arr.length; i++) {
      for(let j = 1; j < arr.length - i; j++) {
        this.cycleCount++
        if(arr[j - 1] > arr[j]) {
          this.optCount++
          [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
        }
      }
    }
  }
   /** 选择排序
       平均时间复杂度O(n^2)
    **/
  this.selectionSort = function() {
    for(let i = 0; i < arr.length; i++) {
      let minIndex = i
      for(let j = i; j < arr.length; j++) {
        this.cycleCount++
        if(arr[j] < arr[minIndex]) {
          this.optCount++
          minIndex = j
        }
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
   /** 插入排序
       平均时间复杂度O(n^2)
    **/
  this.insertionSort = function() {
    for(let i = 1; i < arr.length; i++) {
      let target = arr[i]
      let j = i
      for(; j > 0; j--) {
        this.cycleCount++
        if(arr[j - 1] > target) {
          this.optCount++
          arr[j] = arr[j - 1]
        } else {
          break
        }
      } 
      this.optCount++
      arr[j] = target
    }
  }
   /** 插入排序
       平均时间复杂度O(nlogn)
    **/
  this.shellSort = function() {
    for(let gap = floor(arr.length / 2); gap > 0; gap = floor(gap / 2)) {
      for(let i = gap; i < arr.length; i++) {
        for(let j = i; j > 0; j -= gap) {
          this.cycleCount++
          if(arr[j - gap] > arr[j]) {
            this.optCount++
            [arr[j - gap], arr[j]] = [arr[j], arr[j - gap]]
          } else{
            break
          }
        }
      }
    }
  }
   /** 快速排序
       平均时间复杂度O(nlogn)
    **/
  this.quickSort = function() {
    function adjustArray(arr, i, j) {
      if(i >= j) return
      let base = arr[i]
      while(i < j) {
        while(i < j && arr[j] >= base) {
          this.cycleCount++
          j--
        }
        arr[i] = arr[j]
        while(i < j && arr[i] <= base) {
          this.cycleCount++
          i++
        }
        arr[j] = arr[i]
      }
      this.optCount++
      arr[i] = base
      return i
    }
    function qs(arr, left, right) {
      if(left < right) {
        let center = adjustArray.call(this, arr, left, right)
        qs.call(this, arr, left, center)
        qs.call(this, arr, center + 1, right)
      }
    }
    qs.call(this, arr, 0, arr.length - 1)
  }
   /** 堆排序
       平均时间复杂度O(nlogn)
    **/
  this.heapSort = function() {
    function buildMaxHeap(arr, p, len) {
      this.cycleCount++
      let childNode = 2 * p + 1
      if(arr[childNode] < arr[childNode + 1] && childNode < len - 1) {
        childNode++
      }
      if(arr[p] < arr[childNode]) {
        this.optCount++
        [arr[p], arr[childNode]] = [arr[childNode], arr[p]]
      }
    }
    function parentNode(arr, len) {
      for(let i = floor(len / 2 - 1); i >= 0; i--) {
        buildMaxHeap.call(this, arr, i, len)
      }
      [arr[0], arr[len - 1]] = [arr[len - 1], arr[0]]
    }
    let len = arr.length
    while(len > 0) {
      parentNode.call(this, arr, len--)
    }
  }
   /** 归并排序
       平均时间复杂度O(nlogn)
    **/
  this.mergeSort = function() {
    function divide(arr, start, last) {
      if(start < last) {
        let mid = floor((start + last) / 2)
        this.cycleCount++
        divide.call(this, arr, start, mid)
        this.cycleCount++
        divide.call(this, arr, mid + 1, last)
        merge.call(this, arr, start, mid, last)
      }
    }
    function merge(arr, start, mid, last) {
      let temp = []
      let left = start
      let right = mid + 1
      let index = start
      let _index = index
      while(left <= mid && right <= last){
        if(arr[left] < arr[right]) {
          temp[index++] = arr[left++]
        } else {
          temp[index++] = arr[right++]
        }
      }
      while(left <= mid) {
        temp[index++] = arr[left++]
      }
      while(right <= last) {
        temp[index++] = arr[right++]
      }
      while(_index <= last) {
        this.optCount++
        arr[_index] = temp[_index++]
      }
    }
    divide.call(this, arr, 0, arr.length - 1)
  }
}
