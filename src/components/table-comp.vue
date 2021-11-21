<template>
  <el-container>
    <el-header height="48px">
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-row>
          <el-col v-for="comp of gaComp.form" :key="comp" :span="4">
            <el-form-item v-if="comp === 'name'" label="姓名：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item v-if="comp === 'hobby'" label="爱好：">
              <el-select
                v-model="form.hobby"
                placeholder="请选择"
                :clearable="true"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item>
              <el-button type="primary" round @click="search">查询</el-button>
              <el-button round @click="resetSearch">重置</el-button>

              <div
                v-for="comp of gaComp.root"
                is="el-button"
                class="pull-right"
                :key="comp.key"
                round
                @click="comp.click"
              >
                {{ comp.name }}
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-header>
    <el-main>
      <el-table
        :data="tableDatas"
        style="width: 100%"
        max-height="100%"
        :fit="true"
        @cell-mouse-enter="tableMouseEnter"
      >
        <el-table-column
          v-for="col of gaComp.tableColumns"
          :key="col.name"
          :prop="col.prop"
          :label="col.label"
          :min-width="col.minWidth"
          :formatter="col.formatter ? col.formatter : void 0"
        >
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import Ga from "./../utils/ga.js";

export default {
  name: "TableComp",
  data() {
    return {
      form: {
        name: "",
        hobby: "",
      },
      gaComp: {
        root: [
          {
            key: "exportFile",
            name: "导出",
            click: this.exportFile,
          },
          {
            key: "importFile",
            name: "导入",
            click: this.importFile,
          },
        ],
        form: ["name", "hobby"],
        tableColumns: [
          {
            prop: "date",
            label: "日期",
            minwidth: 150,
          },
          {
            prop: "name",
            label: "姓名",
            minwidth: 120,
          },
          {
            prop: "age",
            label: "年龄",
            minwidth: 120,
            formatter: (row, col, value) => {
              return value + "岁";
            },
          },
          {
            prop: "hobby",
            label: "爱好",
            minwidth: 120,
            formatter: (row, col, value) => {
              let rtn = "";
              switch (value) {
                case 0:
                  rtn = "唱跳";
                  break;
                case 1:
                  rtn = "Rap";
                  break;
                case 2:
                  rtn = "篮球";
                  break;
                default:
                  void 0;
              }
              return rtn;
            },
          },
          {
            prop: "address",
            label: "地址",
            minwidth: 300,
          },
        ],
      },
      options: [
        {
          label: "唱跳",
          value: 0,
        },
        {
          label: "Rap",
          value: 1,
        },
        {
          label: "篮球",
          value: 2,
        },
      ],
      tableDatas: [
        {
          date: "2021-11-06",
          name: "张三",
          age: 18,
          hobby: 0,
          address: "山东省济南市历城区",
        },
        {
          date: "2021-11-06",
          name: "李四",
          age: 18,
          hobby: 1,
          address: "山东省济南市历城区",
        },
      ],
      tableData: [
        {
          date: "2021-11-06",
          name: "张三",
          age: 18,
          hobby: 0,
          address: "山东省济南市历城区",
        },
        {
          date: "2021-11-06",
          name: "李四",
          age: 18,
          hobby: 1,
          address: "山东省济南市历城区",
        },
      ],
      ga: null,
    };
  },
  created() {
    this.ga = new Ga(this.$router.currentRoute.fullPath);

    if (this.$route.params && this.$route.params.type === "button") {
      console.log(
        `%c获取姓名、爱好埋点值并进行重排...`,
        `color:red;font-weight:700;`
      );
      console.log(
        `姓名、爱好初始顺序为：`,
        this.gaComp.form.map((item) => {
          return item;
        })
      );
      const gaForm = this.ga.getAnchor("form");
      console.log(
        `%c获取姓名、爱好的埋点顺序为：`,
        `color:orange;font-weight:700;`,
        this.ga.getAnchorSort("form")
      );

      this.gaComp.form = this.gaComp.form
        .sort((a, b) => {
          return gaForm[b] || 0 - gaForm[a] || 0;
        });
      console.log(
        `%c姓名、爱好埋点值进行重排结果为：`,
        `color:green;font-weight:700;`,
        this.gaComp.form.map((item) => {
          return item;
        })
      );

      console.log(
        `\n%c获取导入、导出埋点值并进行重排...`,
        `color:red;font-weight:700;`
      );
      console.log(
        `导入、导出初始顺序为：`,
        this.gaComp.root.map((item) => {
          return item.key;
        })
      );
      this.gaComp.root = this.gaComp.root.sort((a, b) => {
        const numA =
          typeof this.ga.getAnchor(a.key) !== "object"
            ? this.ga.getAnchor(a.key)
            : 0;
        console.log(
          `%c获取${a.key}的埋点值，统计结果数为：${numA}`,
          `color:orange;`
        );
        const numB =
          typeof this.ga.getAnchor(b.key) !== "object"
            ? this.ga.getAnchor(b.key)
            : 0;
        console.log(
          `%c获取${b.key}的埋点值，统计结果数为：${numB}`,
          `color:orange;`
        );

        return numA - numB;
      });
      console.log(
        `%c导入、导出埋点值排序结果为：`,
        `color:green;font-weight:700;`,
        this.gaComp.root.map((item) => {
          return item.key;
        })
      );
    } else if (this.$route.params && this.$route.params.type === "table") {
      console.log(
        `%c获取表格埋点值并进行重排...`,
        `color:red;font-weight:700;`
      );
      console.log(
        `表格初始顺序为：`,
        this.gaComp.tableColumns.map((item) => {
          return item.prop;
        })
      );
      const gaTable = this.ga.getAnchor("table");
      this.gaComp.tableColumns = this.gaComp.tableColumns.sort((a, b) => {
        const numA = gaTable[a.prop] ? gaTable[a.prop] : 0;
        const numB = gaTable[b.prop] ? gaTable[b.prop] : 0;

        return numB - numA;
      });
      console.log(
        `%c获取table的埋点顺序为：`,
        `color:orange;font-weight:700;`,
        this.ga.getAnchorSort("table")
      );

      console.log(
        `%ctable埋点值进行重排结果为：`,
        `color:green;font-weight:700;`,
        this.gaComp.tableColumns.map((item) => {
          return item.prop;
        })
      );
    } else {
      void 0;
    }
  },
  methods: {
    search() {
      if (this.$route.params && this.$route.params.type === "button") {
        const arr = [];
        !!this.form.name && arr.push("form.name") && this.ga.add("form.name");
        this.form.hobby !== "" &&
          arr.push("form.hobby") &&
          this.ga.add("form.hobby");
      }
      this.tableDatas = this.tableData.filter((data) => {
        return (
          (!this.form.name ||
            data.name.toLowerCase().includes(this.form.name.toLowerCase())) &&
          (this.form.hobby === "" || data.hobby == this.form.hobby)
        );
      });
    },
    resetSearch() {},
    importFile() {
      if (this.$route.params && this.$route.params.type === "button") {
        this.ga.add("importFile");
      }
    },
    exportFile() {
      if (this.$route.params && this.$route.params.type === "button") {
        this.ga.add("exportFile");
      }
    },
    tableMouseEnter(row, column) {
      this.$router &&
        this.$route.params &&
        this.$route.params.type === "table" &&
        this.ga.add(`table.${column.property}`);
    },
  },
};
</script>

<style scoped>
.el-header {
  padding: 7px 0;
  border-bottom: 1px solid #ebeef5;
}

.el-main {
  padding-top: 0;
}

.pull-right {
  float: right;
}
</style>