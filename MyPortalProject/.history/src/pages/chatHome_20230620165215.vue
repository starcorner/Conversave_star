<template>
  <div height="100%">
    <el-row height="100%">
      <el-col :span="6">
        <el-card class="date-card">
          <span
            style="float: left;font-weight: bold;margin-bottom: 10px;height: 100%;"
          >
            请设置你希望的角色
          </span>
          <el-span class="func-content">
            <el-input
              placeholder="you are a helpful assistent"
              type="textarea"
              :rows="30"
              :autosize="{ minRows: 30, maxRows: 40 }"
              v-model="system"
            >
            </el-input>
          </el-span>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class="date-card">
          <div slot="header">
            <span style="float:right;margin-bottom: 10px;"
              >Conversate 星之所在</span
            >
            <br />
            <!-- <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            > -->
          </div>
          <!-- <div
            v-for="(item, index) in form.dynamicValidateForm"
            :key="index"
            style="height: 30px"
          > -->
          <br />
          <el-form
            v-for="(item, index) in form.dynamicValidateForm"
            :key="index"
            :model="item"
            ref="form"
            label-width="100px"
            class="demo-dynamic"
          >
            <el-row>
              <el-form-item :label="'USER'">
                <el-col :span="'21'">
                  <el-input
                    autosize
                    type="textarea"
                    v-model="item.user"
                  ></el-input>
                </el-col>
                <el-col :span="'1'">
                  <el-tooltip content="Top center" placement="top"></el-tooltip>
                  <el-tooltip

                    effect="light"
                    content="点我可以删除这个问题"
                    placement="top-start"
                  >
                    <el-button
                      @click.prevent="removeDomain(item)"
                      icon="el-icon-remove-outline"
                      type="text"
                    ></el-button>
                  </el-tooltip>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="ASSIASTAN">
                <el-col :span="'21'">
                  <el-input
                    autosize
                    type="textarea"
                    v-model="item.assistant"
                  ></el-input>
                </el-col>
                <el-col :span="'1'">
                  <el-tooltip
                   
                    effect="light"
                    content="点我会有小惊喜呦～"
                    placement="top-start"
                  >
                    <el-button
                      @click.prevent="havetea()"
                      icon="el-icon-ice-cream-round"
                      type="text"
                      size="normal"
                    ></el-button>
                  </el-tooltip>
                </el-col>
              </el-form-item>
              <br />
            </el-row>
          </el-form>

          <el-row>
            <el-col :span="'20'">
              <el-button
                type="primary"
                style="float: left;margin-left: 100px;margin-top: 30px;"
                :loading="loading"
                @click="Startquery()"
                >发送</el-button
              >
            </el-col>
            <el-col :span="'1'">
              <el-button
                style="float: right;"
                @click="addDomain"
                icon="el-icon-circle-plus-outline"
                type="text"
                >添加对话</el-button
              >
            </el-col>
          </el-row>
          <div class="radio-label-star"></div>

          <!-- <span style="padding-top: 700px;"> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { sendMsg } from "@/api/chat";
import { Loading } from "element-ui";
export default {
  name: "HelloWorld",
  data() {
    return {
      myData: [],
      loading: false,
      questionMsg: "",
      asklist: [],
      answerlist: [],
      system: "you are a helpful assistant",
      // role: "",
      form: {
        dynamicValidateForm: [
          {
            user: "",
            assistant: ""
          }
        ]
      },
      // system: "你最忠实的好朋友",
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {
    const myData = JSON.parse(localStorage.getItem("QueryData") || "{}");
    this.myData = myData;
    if (this.myData.length >= 1) {
      console.log("发现了缓存数据", this.myData);
      // this.myData = JSON.parse(this.myData);
      this.form.dynamicValidateForm = this.myData;
    } else {
      console.log("没有发现缓存数据，跳过", myData);
    }
  },
  // mounted() {
  //   if (localStorage.getItem("localStorageData")) {
  //     this.localStorageData = localStorage.getItem("localStorageData");
  //   }
  // },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveData(data) {
      let jsonString = JSON.stringify(data);
      localStorage.setItem("QueryData", jsonString);
    },
    // getData() {
    //   this.localStorageData = localStorage.getItem("QueryData");
    // },
    havetea() {
      this.$message({
        message: "辛苦啦～来跟甜甜的冰激凌吧，🍦",
        type: "success"
      });
    },
    open() {
      this.$alert("请稍等一下，正在查询", "提交成功喽～", {
        confirmButtonText: "确定"
      });
    },

    Startquery() {
      this.open();
      this.loading = true;
      console.log("sendmsg the msg is:", this.form.dynamicValidateForm);
      let roleset = { role: "system", content: this.system };
      let querylist = [];
      let usercontent = "";
      querylist.push(roleset);
      this.form.dynamicValidateForm.forEach(item => {
        usercontent = item.user;
        querylist.push({
          role: "user",
          content: usercontent
        });
      });

      let data = {
        model: "gpt-3.5-turbo",
        messages: querylist
      };

      console.log("data payload is:", data);

      // sendMsg(this.questionMsg)
      let options = {
        target: document.querySelector(".radio-label-star"),
        text: "你的小可爱在努力请求中，再稍等一下...",
        spinner: "el-icon-loading",
        // "fullscreen":true,
        background: "rgba(0, 0, 0, 0.8)"
      };
      let loadingInstance = Loading.service(options);
      // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      loadingInstance.close();
      // });
      sendMsg(data).then(response => {
        // {
        //   "id": "chatcmpl-7SNe2I1phbu4w0XLL4TQFEHuWXIk6",
        //   "object": "chat.completion",
        //   "created": 1686998430,
        //   "model": "gpt-3.5-turbo-0301",
        //   "usage": {
        //     "prompt_tokens": 15,
        //     "completion_tokens": 31,
        //     "total_tokens": 46
        //   },
        //   "choices": [
        //     {
        //       "message": {
        //         "role": "assistant",
        //         "content": "作为AI语言模型，我没有生物体形态，也没有感官，所以不可能是猪。"
        //       },
        //       "finish_reason": "stop",
        //       "index": 0
        //     }
        //   ]
        // }
        // this.answerlist.forEach(item => {
        //   if (item.assistant) {
        //     this.form.dynamicValidateForm.push(item);
        //   }
        // });
        console.log("gbt 响应是:", response.choices);
        loadingInstance.close();
        this.choices = response.choices;
        let askcontent = "";

        if (this.choices) {
          this.loading = false;
          this.choices.forEach((item, index) => {
            console.log("choices", this.choices);
            // let message = item.message;
            if (item.message.content) {
              askcontent = item.message.content;
              console.log("响应结果是:", askcontent);
              this.form.dynamicValidateForm.push({
                user: usercontent,
                assistant: askcontent
              });
            }
            console.log(
              "this.dynamicValidateForm is:",
              this.form.dynamicValidateForm
            );
          });
        }
        this.form.dynamicValidateForm.forEach(item => {
          console.log("当前的数据是", item);
          if (item.assistant && item.assistant.length > 0) {
            console.log("我是有答案的哦", item);
          } else {
            console.log("你好像是个问题哦", item);
            this.removeDomain(item);
          }
        });
        this.saveData(this.form.dynamicValidateForm);
      });

      // this.form.dynamicValidateForm = this.answerlist;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    removeDomain(item) {
      var index = this.form.dynamicValidateForm.indexOf(item);
      if (index !== -1) {
        this.form.dynamicValidateForm.splice(index, 1);
      }
    },

    addDomain() {
      this.form.dynamicValidateForm.push({});
    }
  }
  // watch: {
  //   localStorageData(newValue) {
  //     localStorage.setItem("localStorageData", newValue);
  //   }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html,
body {
  font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif, "宋体";
}
#app,
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}
.container {
  position: relative;
}

.container .el-button {
  position: absolute;
  bottom: 0;
}

.date-card {
  height: 100%;
  /* line-height: 80px; */
  /* overflow-y: auto; */
  margin-bottom: 10px;
  border-radius: 10px;
}
.radio-label-star {
  font-size: 100px;
  color: #5339411e;
  line-height: 40px;
  padding: 0 12px 0 30px;
}

.customer-form {
  height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
}

/**滚动条的宽度*/
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}

.func-content {
  width: 100%;
  height: 800px;
  font-size: 10px;
  margin-left: 10px;
  color: #a9a9a9;
  font-weight: bold;
  text-align: center;

  /* margin-right: 20px; */
}
</style>
