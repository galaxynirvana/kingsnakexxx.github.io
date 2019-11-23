<template>
  <div>
    <div class="board">
      <ul v-for="row of constData" :key="row">
        <li v-for="col of constData" :key="col">
          <el-input-number v-model="data[row][col]" :min="1" :max="9" step-strictly style="width: 50px;" :controls="false" />
        </li>
      </ul>
    </div>

    <div>平均递归100000000+次，JavaScript伤不起</div>

    <div>
      <el-button v-loading.fullscreen.lock="loading" type="primary" @click="bfButtonOnExecute">计算</el-button>
      <el-button type="info" @click="bfButtonOnRecover">还原</el-button>
      <el-button type="warning" @click="bfButtonOnReset">重置</el-button>
    </div>

    <router-link to="/">
      <el-button type="primary">返回首页</el-button>
    </router-link>
  </div>
</template>

<script>

const SudokuNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const SudokuCheckBox = (data, row) => {
  for (let k = 0; k < 3; ++k) {
    const v = []
    for (let i = row - 3; i < row; ++i) {
      for (let j = 3 * k; j < 3 * k + 3; ++j) {
        if (v.includes(data[i][j])) {
          return false
        } else {
          v.push(data[i][j])
        }
      }
    }
  }
  return true
}

const SudokuCheckLine = (data, row, col, value) => {
  return !SudokuNumber.some(i => data[row][i] === value || data[i][col] === value)

  // for (let i = 0; i < 9; ++i) {
  //   if (data[row][i] === value) {
  //     return false
  //   }

  //   if (data[i][col] === value) {
  //     return false
  //   }
  // }

  // return true
}

const SudokuAnalyze = (data, row, col, ref) => {
  if (row >= 9) {
    ref.finished = true
    console.log('end')
    return
  }

  if (col === 0 && (row === 3 || row === 6 || row === 9)) {
    if (!SudokuCheckBox(data, row)) {
      return
    }
  }

  if (col >= 9) {
    SudokuAnalyze(data, row + 1, 0, ref)
    return
  }

  if (typeof data[row][col] === 'undefined') {
    for (let v = 1; v <= 9; ++v) {
      if (SudokuCheckLine(data, row, col, v)) {
        data[row][col] = v
        SudokuAnalyze(data, row, col + 1, ref)
        if (ref.finished) {
          return
        }
        data[row][col] = undefined
      }
    }
  } else {
    SudokuAnalyze(data, row, col + 1, ref)
  }
}

export default {
  name: 'Sudoku',

  data() {
    return {
      constData: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      data: undefined,
      lockData: undefined,
      loading: false
    }
  },

  created() {
    this.data = this.bfInitData2()
    this.lockData = this.bfInitData()
  },

  methods: {
    bfInitData2() {
      return [
        [4, undefined, undefined, 8, undefined, 5, undefined, undefined, undefined],
        [undefined, undefined, undefined, 9, 3, undefined, undefined, 5, undefined],
        [undefined, undefined, undefined, undefined, undefined, 7, undefined, undefined, undefined],
        [undefined, 2, undefined, undefined, undefined, undefined, 2, undefined, undefined],
        [undefined, undefined, 6, undefined, undefined, undefined, undefined, undefined, 7],
        [8, undefined, undefined, undefined, 9, undefined, undefined, 3, undefined],
        [undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, 1],
        [undefined, undefined, 7, undefined, undefined, undefined, 6, undefined, undefined],
        [5, undefined, undefined, 4, undefined, undefined, undefined, 9, undefined]
      ]
    },

    bfInitData() {
      const data = []
      for (let row = 0; row < 9; ++row) {
        const subData = []
        for (let col = 0; col < 9; ++col) {
          subData.push(undefined)
        }
        data.push(subData)
      }
      return data
    },

    bfSudokuExecute() {
      this.loading = true

      return new Promise((resolve, reject) => {
        const ref = { finished: false }

        console.log('begin')
        SudokuAnalyze(this.data, 0, 0, ref)
        this.loading = false
        resolve()
      })
    },

    bfButtonOnExecute() {
      this.$message('暂未实现')

      for (let row = 0; row < 9; ++row) {
        for (let col = 0; col < 9; ++col) {
          if (typeof this.data[row][col] !== 'undefined') {
            this.lockData[row][col] = true
          }
        }
      }

      // this.bfSudokuExecute()
    },

    bfButtonOnRecover() {
      this.$message('暂未实现')
    },

    bfButtonOnReset() {
      this.$message('暂未实现')
    }
  }
}
</script>

<style>
ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

ul {
  zoom: 1;
}

ul:after {
  content: '';
  display: block;
  clear: both;
}

.board {
  border: 1px solid darkgrey;
  display: inline-block;
}

.board ul:nth-of-type(3),
.board ul:nth-of-type(6) {
  border-bottom: 1px solid #ff9800;
}

.board ul li:nth-of-type(3),
.board ul li:nth-of-type(6) {
  border-right: 1px solid #ff9800;
}

.board li {
  float: left;
}
</style>
