<template>
  <div>
    <div style="margin: 20px 0;">
      <el-tag type="warning">警告</el-tag>
      牢固树立科学世界观，自觉抵制各种迷信
    </div>

    <div>
      <el-card>
        <el-tag slot="header">年</el-tag>

        <div>
          <el-radio-group v-model="bxAnimal">
            <el-radio-button v-for="item of bcAnimal" :key="item" :label="item" />
          </el-radio-group>
        </div>

        <div style="margin-top: 20px;">
          <el-radio-group v-model="bxCYear">
            <el-radio-button v-for="item of bcCYear" :key="item" :label="item" />
          </el-radio-group>
        </div>
      </el-card>

      <el-card>
        <el-tag slot="header">月</el-tag>

        <div>
          <el-radio-group v-model="bxCMonth">
            <el-radio-button v-for="item of bcCMonth" :key="item" :label="item" />
          </el-radio-group>
        </div>
      </el-card>

      <el-card>
        <el-tag slot="header">日</el-tag>

        <div>
          <el-radio-group v-model="bxCDay">
            <el-radio-button v-for="item of bcCDay" :key="item" :label="item" />
          </el-radio-group>
        </div>
      </el-card>

      <el-card>
        <el-tag slot="header">时</el-tag>

        <div>
          <el-radio-group v-model="bxCHour">
            <el-radio-button v-for="item of bcCHour" :key="item" :label="item" />
          </el-radio-group>
        </div>
      </el-card>
    </div>

    <div style="margin-top: 20px;">
      <el-button type="warning" @click="bfButtonOnClick">计算</el-button>
      <el-button type="info" @click="bfButtonOnReset">重置</el-button>
    </div>

    <div style="margin-top: 20px;">
      结果：
      <p>{{ bxResult.weight }}</p>
      <p>{{ bxResult.summary }}</p>
      <p>{{ bxResult.detail }}</p>

      <div>
        <template v-for="(item, index) of bxResult.annotation">
          <p :key="index">{{ item }}</p>
        </template>
      </div>
    </div>

    <router-link to="/">
      <el-button type="primary">返回首页</el-button>
    </router-link>
  </div>
</template>

<script>
import { CZHI, CZODIAC, CYEAR, CMONTH, CDAY } from './util.js'
import { weightOfCYear, weightOfCMonth, weightOfCDay, weightOfCHour, detailOfFortune } from './data.js'

export default {
  name: 'SaidBoneFortuneTelling',

  data() {
    return {
      bxAnimal: '',
      bxCYear: '',
      bxCMonth: '',
      bxCDay: '',
      bxCHour: '',

      bxResult: {}

    }
  },

  computed: {
    bcAnimal() {
      return CZODIAC
    },

    bcCYear() {
      const index = CZODIAC.indexOf(this.bxAnimal)

      const arr = []
      CYEAR.map(it => {
        if (it[1] === CZHI[index]) {
          arr.push(it)
        }
      })
      return arr
    },

    bcCMonth() {
      return CMONTH
    },

    bcCDay() {
      return CDAY
    },

    bcCHour() {
      return CZHI
    }
  },

  methods: {
    bfButtonOnClick() {
      const year = weightOfCYear[this.bxCYear]
      const month = weightOfCMonth[this.bxCMonth]
      const day = weightOfCDay[this.bxCDay]
      const hour = weightOfCHour[this.bxCHour]

      const weight = year + month + day + hour

      this.bxResult = detailOfFortune[weight]
    },

    bfButtonOnReset() {

    }
  }
}
</script>
