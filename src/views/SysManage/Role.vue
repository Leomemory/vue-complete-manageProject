<template>
  <!-- Role Page -->
  <div class="role">
     <el-form :inline="true" :model="editForm" ref="editForm">
          <el-form-item label="类型">
        		<el-select v-model="editForm.repayTypeList" multiple placeholder="请选择">
                    <el-option
                        v-for="item in intentionRepayTypes"
                        :label="item.chName"
                        :value="item.enName"
                        :key="item.enName">
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item v-if="editForm.repayTypeList.indexOf('installmentForMonth')!==-1" label="方式">
              <el-select v-model="editForm.repayTypeListName" placeholder="请选择">
                  <el-option
                        v-for="item in RepayLists"
                        :label="item.chName"
                        :value="item.enName"
                        :key="item.enName">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item v-if="editForm.repayTypeList.indexOf('installmentForMonth')!==-1 && editForm.repayTypeListName=='periodFixed'" label="固定">
          		<el-input v-model="editForm.repayTypePeriodsDesc" placeholder="输入：6,9"></el-input>
          </el-form-item>
          <el-form-item v-if="editForm.repayTypeList.indexOf('installmentForMonth')!==-1 && editForm.repayTypeListName=='periodSelec'" label="可选">
          		<el-input v-model="editForm.repayTypePeriodsDesct" placeholder="输入：3~6"></el-input>
          </el-form-item>
          <el-form-item>
          	<el-button type="primary" @click="search">查询</el-button>
          </el-form-item>  
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
      return {
      	editForm:{
      		repayTypeList:['anyTimeLoanAndRepay','installmentForMonth'],
      		repayTypePeriodsDesc:'',
          repayTypePeriodsDesct:'',
          repayTypeListName:'',
      	},
      	intentionRepayTypes:[{
      		'chName': "随时",
          'enName': "anyTimeLoanAndRepay"
      	},{
      		'chName': "分期",
          'enName': "installmentForMonth"
      	}],
        RepayLists:[{
          'chName': "固定",
          'enName': "periodFixed"
        },{
          'chName': "可选",
          'enName': "periodSelec"
        }]
      }
    },
    methods:{
      search(){
        console.log(this.editForm)
      }
    },
    mounted(){
      this.editForm.repayTypeListName = this.RepayLists ? this.RepayLists[0].enName : ""
    }
  };
</script>

<style lang="scss" scoped>

</style>
