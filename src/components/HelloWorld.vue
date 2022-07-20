<template>
  <div class="topo-wrapper">
    <div class="flex-box topo-top">
      <div class="btn-group-left">
        <el-button type="primary" size="mini" @click="add">新增元素</el-button>
        <el-button type="primary" size="mini" @click="addCombo">新增组</el-button>
        <el-button type="primary" size="mini" @click="addText">新增文本</el-button>
      </div>
      <div class="btn-group-right">
        <el-button type="danger" size="mini" @click="cancel">取消编辑</el-button>
        <el-button type="primary" size="mini" @click="save" :disabled="saveBtnDisabled">保存</el-button>
      </div>
    </div>
    <div class="topo-main">
      <div class="canvas-box" :id="id"></div>
      <el-aside class="aside">
        <div class="setting-wrapper" v-if="selectItem">
          <div v-if="selectItem.getType() === 'node' && selectItem.getModel().type == 'custom-image'">
            <div class="aside-title">
              节点配置
            </div>
            <el-form label-width="80px" :model="selectItemDataNode" class="item-form">
              <el-form-item label="关联资产" v-if="showBindAsset.includes(selectItem.getModel().kindName)">
                <el-select size="mini" v-model="selectItemDataNode.assetsId" placeholder="关联资产">
                  <el-option v-for="item in assetsList" :key="item.id" :label="item.assetName" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标签名称">
                <el-input size="mini" v-model="selectItemDataNode.label" placeholder="请输入标签名称"></el-input>
              </el-form-item>
              <el-form-item label="标签颜色">
                <el-color-picker size="mini" v-model="selectItemDataNode.labelCfg.style.fill" show-alpha>
                </el-color-picker>
              </el-form-item>
              <el-form-item label="标签大小">
                <el-input size="mini" v-model.number="selectItemDataNode.labelCfg.style.fontSize" placeholder="请输入标签大小">
                </el-input>
              </el-form-item>
              <el-form-item label="宽度">
                <el-input size="mini" v-model.number="selectItemDataNode.size[0]" placeholder="请输入宽度"></el-input>
              </el-form-item>
              <el-form-item label="高度">
                <el-input size="mini" v-model.number="selectItemDataNode.size[1]" placeholder="请输入高度"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload :with-credentials="true" :headers="headers"  class="icon-uploader" :action="uploadUrl" :show-file-list="false"
                  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="selectItemDataNode.img" :src="selectItemDataNode.img" class="icon">
                  <i v-else class="el-icon-plus icon-uploader-icon"></i>
                </el-upload>

              </el-form-item>
            </el-form>
          </div>
          <div v-if="selectItem.getType() === 'node' && selectItem.getModel().type == 'rect'">
            <div class="aside-title">
              文本配置
            </div>
            <el-form label-width="80px" :model="selectItemDataText" class="item-form">
              <el-form-item label="文本内容">
                <el-input size="mini" v-model="selectItemDataText.label" placeholder="请输入标签名称"></el-input>
              </el-form-item>
              <el-form-item label="文本颜色">
                <el-color-picker size="mini" v-model="selectItemDataText.labelCfg.style.fill" show-alpha>
                </el-color-picker>
              </el-form-item>
              <el-form-item label="字体大小">
                <el-input size="mini" v-model.number="selectItemDataText.labelCfg.style.fontSize" placeholder="请输入字体大小">
                </el-input>
              </el-form-item>
              <el-form-item label="宽度">
                <el-input size="mini" v-model.number="selectItemDataText.size[0]" placeholder="请输入宽度"></el-input>
              </el-form-item>
              <el-form-item label="高度">
                <el-input size="mini" v-model.number="selectItemDataText.size[1]" placeholder="请输入高度"></el-input>
              </el-form-item>
              <el-form-item label="描边宽度">
                <el-input size="mini" v-model.number="selectItemDataText.style.lineWidth" placeholder="请输入描边宽度">
                </el-input>
              </el-form-item>
              <el-form-item label="描边颜色">
                <el-color-picker size="mini" v-model="selectItemDataText.style.stroke" show-alpha></el-color-picker>
              </el-form-item>
              <el-form-item label="背景">
                <el-color-picker size="mini" v-model="selectItemDataText.style.fill" show-alpha></el-color-picker>
              </el-form-item>
            </el-form>
          </div>
          <div v-else-if="selectItem.getType() === 'edge'">
            <div class="aside-title">
              边配置
            </div>
            <el-form label-width="80px" :model="selectItemDataEdge" class="item-form">
              <el-form-item label="标签名称">
                <el-input size="mini" v-model="selectItemDataEdge.label" placeholder="请输入标签名称"></el-input>
              </el-form-item>
              <el-form-item label="标签颜色">
                <el-color-picker size="mini" v-model="selectItemDataEdge.labelCfg.style.fill" show-alpha>
                </el-color-picker>
              </el-form-item>
              <el-form-item label="标签大小">
                <el-input size="mini" v-model.number="selectItemDataEdge.labelCfg.style.fontSize" placeholder="请输入标签大小">
                </el-input>
              </el-form-item>
              <el-form-item label="线条样式">
                <el-select size="mini" v-model="selectItemDataEdge.type" placeholder="连线">
                  <el-option v-for="item in lineTypeList" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="线条宽度">
                <el-input size="mini" v-model.number="selectItemDataEdge.lineWidth" placeholder="请输入线条宽度"></el-input>
              </el-form-item>
              <el-form-item label="线条颜色">
                <el-color-picker size="mini" v-model="selectItemDataEdge.stroke" show-alpha></el-color-picker>
              </el-form-item>
            </el-form>
          </div>
          <div v-else-if="selectItem.getType() === 'combo'">
            <div class="aside-title">
              组配置
            </div>
            <el-form label-width="80px" :model="selectItemDataCombo" class="item-form">
              <el-form-item label="标签名称">
                <el-input size="mini" v-model="selectItemDataCombo.label" placeholder="请输入标签名称"></el-input>
              </el-form-item>
              <el-form-item label="标签颜色">
                <el-color-picker size="mini" v-model="selectItemDataCombo.labelCfg.style.fill" show-alpha>
                </el-color-picker>
              </el-form-item>
              <el-form-item label="标签大小">
                <el-input size="mini" v-model.number="selectItemDataCombo.labelCfg.style.fontSize"
                  placeholder="请输入标签大小"></el-input>
              </el-form-item>
              <el-form-item label="描边样式">
                <el-select size="mini" v-model="selectItemDataCombo.type" placeholder="描边">
                  <el-option v-for="item in comboTypeList" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描边宽度">
                <el-input size="mini" v-model.number="selectItemDataCombo.style.lineWidth" placeholder="请输入描边宽度">
                </el-input>
              </el-form-item>
              <el-form-item label="描边颜色">
                <el-color-picker size="mini" v-model="selectItemDataCombo.style.stroke" show-alpha></el-color-picker>
              </el-form-item>
              <el-form-item label="背景">
                <el-color-picker size="mini" v-model="selectItemDataCombo.style.fill" show-alpha></el-color-picker>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-else>
          <div class="aside-title">
            全局配置
          </div>
          <el-form label-width="80px" :model="canvasSetting" class="item-form">
            <el-collapse v-model="settingActiveNames">
              <el-collapse-item title="画布" name="1">
                <el-form-item label="背景">
                  <el-upload :with-credentials="true" :headers="headers" class="icon-uploader" :action="uploadUrl" :show-file-list="false"
                    :on-success="handleAvatarSuccessBg" :before-upload="beforeAvatarUpload">
                    <img v-if="canvasSetting.image" :src="canvasSetting.image" class="icon">
                    <i v-else class="el-icon-plus icon-uploader-icon"></i>
                    <svg v-if="canvasSetting.image" @click.stop="removeImg" t="1654075202501" class="icon"
                      viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22556" width="20"
                      height="20">
                      <path
                        d="M512 909.061224c-218.906122 0-397.061224-178.155102-397.061224-397.061224s178.155102-397.061224 397.061224-397.061224 397.061224 178.155102 397.061224 397.061224-178.155102 397.061224-397.061224 397.061224z"
                        fill="#E5404F" p-id="22557"></path>
                      <path
                        d="M363.102041 680.75102c-5.22449 0-9.926531-2.089796-14.106123-5.746938-7.836735-7.836735-7.836735-20.37551 0-28.212245l297.795919-297.795919c7.836735-7.836735 20.37551-7.836735 28.212245 0 7.836735 7.836735 7.836735 20.37551 0 28.212245l-297.795919 297.795919c-4.179592 3.657143-8.881633 5.746939-14.106122 5.746938z"
                        fill="#FFEEF0" p-id="22558"></path>
                      <path
                        d="M660.897959 680.75102c-5.22449 0-9.926531-2.089796-14.106122-5.746938l-297.795919-297.795919c-7.836735-7.836735-7.836735-20.37551 0-28.212245 7.836735-7.836735 20.37551-7.836735 28.212245 0l297.795919 297.795919c7.836735 7.836735 7.836735 20.37551 0 28.212245-4.179592 3.657143-8.881633 5.746939-14.106123 5.746938z"
                        fill="#FFEEF0" p-id="22559"></path>
                    </svg>

                  </el-upload>
                </el-form-item>
              </el-collapse-item>
              <el-collapse-item title="节点" name="4">
                <el-form-item label="节点类型">
                  <el-select size="mini" @change="changeNodeType" v-model="canvasSetting.node.type" placeholder="节点类型">
                    <el-option v-for="item in nodeTypeList" :key="item.icon" :label="item.name" :value="item.icon">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="宽度">
                  <el-input size="mini" v-model.number="canvasSetting.node.size[0]" placeholder="请输入宽度"></el-input>
                </el-form-item>
                <el-form-item label="高度">
                  <el-input size="mini" v-model.number="canvasSetting.node.size[1]" placeholder="请输入高度"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload class="icon-uploader" :headers="headers" :with-credentials="true" :action="uploadUrl" :limit="1" :show-file-list="false"
                    :on-success="handleAvatarSuccessCanvasSetting" :before-upload="beforeAvatarUpload">
                    <img v-if="canvasSetting.node.img" :src="canvasSetting.node.img" class="icon">
                    <i v-else class="el-icon-plus icon-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-collapse-item>
              <el-collapse-item title="标签" name="2">
                <el-form-item label="字体大小">
                  <el-input size="mini" v-model.number="canvasSetting.label.fontSize" placeholder="请输入字体大小"></el-input>
                </el-form-item>
                <el-form-item label="颜色">
                  <el-color-picker size="mini" v-model="canvasSetting.label.fill" show-alpha></el-color-picker>
                </el-form-item>
              </el-collapse-item>
              <el-collapse-item title="连线" name="3">
                <el-form-item label="样式">
                  <el-select size="mini" v-model="canvasSetting.edge.type" placeholder="连线">
                    <el-option v-for="item in lineTypeList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="宽度">
                  <el-input size="mini" v-model.number="canvasSetting.edge.lineWidth" placeholder="请输入线条宽度"></el-input>
                </el-form-item>
                <el-form-item label="颜色">
                  <el-color-picker size="mini" v-model="canvasSetting.edge.stroke" show-alpha></el-color-picker>
                </el-form-item>
              </el-collapse-item>
              <el-collapse-item title="组" name="5">
                <el-form-item label="样式">
                  <el-select size="mini" v-model="canvasSetting.combo.type" placeholder="样式">
                    <el-option v-for="item in comboTypeList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="描边宽度">
                  <el-input size="mini" v-model.number="canvasSetting.combo.lineWidth" placeholder="请输入描边宽度"></el-input>
                </el-form-item>
                <el-form-item label="边框颜色">
                  <el-color-picker size="mini" v-model="canvasSetting.combo.stroke" show-alpha></el-color-picker>
                </el-form-item>
                <el-form-item label="背景颜色">
                  <el-color-picker size="mini" v-model="canvasSetting.combo.fill" show-alpha></el-color-picker>
                </el-form-item>
              </el-collapse-item>
            </el-collapse>
          </el-form>
        </div>
      </el-aside>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import insertCss from 'insert-css';
import { Utils } from '@/utils/topoUtil'
insertCss(`
  .g6-component-toolbar {
    right: 0;
    left: auto;
    background-color: #5e77f9;
    border-color: #5e77f9;
  }
  .g6-component-toolbar li {
    fill: #fff;
  }
`);
export default {
  components: {},
  props: {},
  data() {
    return {
      saveBtnDisabled: false,
      uploadUrl: 'http://192.168.101.2:9778/test/resource/upload',
      // uploadUrl: process.env.VUE_APP_BASE_API + '/test/resource/upload',
      topoId: '',
      settingActiveNames: ['4'],
      canvasSetting: {
        image: '',
        edge: {
          type: 'line',
          lineWidth: 1,
          stroke: '#fff'
        },
        node: {
          type: 'vm',
          label: 'Java虚拟机',
          kindName: 'Java虚拟机',
          size: [128, 128],
          img: require('@/assets/images/topo/vm-normal.png')
        },
        combo: {
          type: 'circle',
          stroke: '#fff',
          fill: '#433b46',
          lineWidth: 1
        },
        label: {
          fontSize: 16,
          fill: '#fff'
        }
      },
      showBindAsset: [
        '服务器',
        '解析节点业务',
        '根节点管理系统业务',
        '全局解析系统业务'
      ],
      nodeTypeList: [
        {
          name: 'Java虚拟机',
          icon: 'vm',
        },
        {
          name: '云图',
          icon: 'cloud'
        },
        {
          name: 'Mysql数据库',
          icon: 'MySQL'
        },
        {
          name: 'Nginx容器',
          icon: 'nginx'
        },
        {
          name: 'Tomcat容器',
          icon: 'TOMCAT'
        },
        {
          name: 'redis服务器',
          icon: 'server'
        },
        {
          name: '交换机',
          icon: 'exchange'
        },
        {
          name: '服务器',
          icon: 'linux',
        },
        {
          name: '解析节点业务',
          icon: 'node'
        },
        {
          name: '根节点管理系统业务',
          icon: 'root'
        },
        {
          name: '全局解析系统业务',
          icon: 'analysis'
        },
      ],
      lineTypeList: [
        {
          name: "直线",
          value: "line"
        },
        {
          name: "折线",
          value: "polyline"
        },
        {
          name: "二阶贝塞尔曲线",
          value: "quadratic"
        },
        {
          name: "三阶贝塞尔曲线",
          value: "cubic"
        }
      ],
      comboTypeList: [
        {
          name: "圆",
          value: "circle"
        },
        {
          name: "方块",
          value: "rect"
        }
      ],
      id: uuidv4(),
      topoData: {},
      chart: null,
      selectItem: null,
      selectItemDataEdge: {
        type: '',
        lineWidth: 1,
        stroke: '',
        label: '',
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 6
          }
        }
      },
      selectItemDataNode: {
        label: '',
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 16
          }
        },
        size: [],
        img: '',
        assetsId: ''
      },
      selectItemDataCombo: {
        label: '',
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 6
          }
        },
        type: 'circle',
        style: {
          fill: '',
          stroke: '',
          lineWidth: 1
        },
      },
      selectItemDataText: {
        label: '',
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 6
          }
        },
        size: [60, 30],
        style: {
          lineWidth: 1,
          stroke: "#fff",
          fill: "none",
        }
      },
      selectType: '',
      assetsListAll: [],
      topoDetail: null
    };
  },
  watch: {
    selectItemDataNode: {
      handler() {
        this.applyEditItem()
      },
      deep: true
    },
    selectItemDataEdge: {
      handler() {
        this.applyEditItem()
      },
      deep: true
    },
    selectItemDataCombo: {
      handler() {
        this.applyEditItem()
      },
      deep: true
    },
    selectItemDataText: {
      handler() {
        this.applyEditItem('text')
      },
      deep: true
    },
  },
  computed: {
    headers() {
      return {
        // elementui headers 配置
      }
    },
    assetsList() {
      if(this.assetsListAll.length && this.selectItem) {
        return this.assetsListAll.filter(item => item.kindName ==  this.selectItem.getModel().kindName)
      } else {
        return []
      }
    }
  },
  methods: {
    changeNodeType(e) {
      this.canvasSetting.node.img = require(`@/assets/images/topo/${e}-normal.png`)
      const name = this.nodeTypeList.filter(item => item.icon == e)[0].name
      this.canvasSetting.node.label = name
      this.canvasSetting.node.kindName = name
      console.log(name)
      if(name == '云图') {
        this.canvasSetting.node.size = [187, 128]
      } else {
      this.canvasSetting.node.size = [128, 128]
      }
    },
    removeImg() {
      this.canvasSetting.image = ''
      const container = document.getElementById(this.id);
      container.style.background = ''

    },
    handleAvatarSuccess(res, file) {
      // this.selectItemDataNode.img = URL.createObjectURL(file.raw);
      this.selectItemDataNode.img = res.msg
    },
    handleAvatarSuccessBg(res, file) {
      // this.canvasSetting.image = URL.createObjectURL(file.raw);
      this.canvasSetting.image = res.msg
      const container = document.getElementById(this.id);
      container.style.background = `url(${this.canvasSetting.image}) center no-repeat`
      container.style.backgroundSize = '100%'
    },
    handleAvatarSuccessCanvasSetting(res, file) {
      // this.canvasSetting.node.img = URL.createObjectURL(file.raw);
      this.canvasSetting.node.img = res.msg
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    addCombo() {
      this.chart.createCombo({
        id: uuidv4(),
        type: this.canvasSetting.combo.type,
        label: '组',
        x: 100,
        y: 200,
        size: 100,
        style: {
          stroke: this.canvasSetting.combo.stroke,
          fill: this.canvasSetting.combo.fill,
          lineWidth: this.canvasSetting.combo.lineWidth,
        }
      }, [])
    },
    cancel() {
      this.$confirm('确定退出编辑？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1)
      }).catch(() => {

      });
    },
    applyEditItem(type) {
      if (this.selectType === 'node') {
        if (type == 'text') {
          this.selectItem.update({
            ...this.selectItemDataText
          });
        } else {
          this.selectItem.update({
            ...this.selectItemDataNode
          });
        }
      } else if (this.selectType === 'edge') {

        this.selectItem.update({
          ...this.selectItemDataEdge,
          style: {
            lineWidth: this.selectItemDataEdge.lineWidth,
            stroke: this.selectItemDataEdge.stroke,
          },
          stateStyles: {
            select: {
              lineWidth: this.selectItemDataEdge.lineWidth + 2,
              shadowBlur: 10,
              shadowColor: "rgb(95, 149, 255)",
              stroke: "rgb(95, 149, 255)",
            }
          }
        });
      } else if (this.selectType === 'combo') {
        //只改样式保存不了样式，可能是个bug，改一次type才能保存，也可能是createcombo后数据没存上，文档未找到
        this.selectItem.update({
          type: this.selectItemDataCombo.type === 'circle' ? 'rect' : 'circle'
        })
        this.selectItem.update({
          ...this.selectItemDataCombo,
          stateStyles: {
            selected: {
              fill: 'none',
              lineWidth: this.selectItemDataCombo.style.lineWidth + 2,
              shadowBlur: 10,
              shadowColor: "rgb(95, 149, 255)",
              stroke: "rgb(95, 149, 255)",
            }
          }
        })
      }
    },
    deleteElement() {
      if (this.selectItem) {
        this.chart.removeItem(this.selectItem, true);
        this.selectItem = null;
      }
    },
    add() {
      const x = 100 + Math.random() * 500
      const y = 100 + Math.random() * 500
      const model = {
        id: uuidv4(),
        label: this.canvasSetting.node.label,
        x: x,
        y: y,
        type: "custom-image",
        size: this.canvasSetting.node.size.slice(0, 2),
        img: this.canvasSetting.node.img,
        nodeType: this.canvasSetting.node.type,
        kindName: this.canvasSetting.node.kindName,
        style: {
          lineWidth: 2,
          stroke: "#fff",
        },
        labelCfg: {
          position: 'bottom',
          style: {
            fill: this.canvasSetting.label.fill,
            fontSize: this.canvasSetting.label.fontSize
          }
        }
      };
      this.chart.addItem("node", model, true);
    },
    addText() {
      const x = 100 + Math.random() * 500
      const y = 100 + Math.random() * 500
      const model = {
        id: uuidv4(),
        label: '文本节点',
        name: 'text',
        x: x,
        y: y,
        type: "rect",
        size: [60, 30],
        style: {
          lineWidth: 1,
          stroke: "#fff",
          fill: "#292b2f",
        },
        labelCfg: {
          position: "center",
          style: {
            fill: '#fff',
            fontSize: 14
          }
        },
        stateStyles: {
          selected: {
            fill: "#292b2f",
            lineWidth: 2,
            shadowBlur: 10,
            shadowColor: "rgb(95, 149, 255)",
            stroke: "rgb(95, 149, 255)",
              position: "center",
            
          }
        }
      };
      this.chart.addItem("node", model, true);
    },
    async save() {
      console.log(this.chart.save())
    },
  },
  async mounted() {
    Utils.registerNode()
    const toolbar = Utils.registerToolbar(this.id, (code) => {
      if (code === 'delete') {
        this.deleteElement();
      }
    })

    this.chart = Utils.generateGraph(this.id, [toolbar], this.canvasSetting.image)
    //不关闭combo的label有拖影
    this.chart.get('canvas').set('localRefresh', false)
    //还原渲染
    if (this.chart) {
      this.chart.data(this.topoData); // 读取 Step 2 中的数据源到图上
      this.chart.render(); // 渲染图
      Utils.registerEvent(this.chart, this.canvasSetting, (data) => {
        this.selectItem = data
        if (data) {
          const type = data.getType()
          this.selectType = type
          const model = data.getModel()
          
          if (type === 'node' && model.type == "custom-image") {
            for (let x in this.selectItemDataNode) {
              this.selectItemDataNode.label = model.label
              this.selectItemDataNode.labelCfg.style.fill = model.labelCfg.style.fill
              this.selectItemDataNode.labelCfg.style.fontSize = model.labelCfg.style.fontSize
              this.selectItemDataNode.size = model.size.slice(0, 2)
              this.selectItemDataNode.img = model.img
              this.selectItemDataNode.assetsId = model.assetsId

            }
          } else if (type === 'node' && model.type == "rect") {
            for (let x in this.selectItemDataText) {
              this.selectItemDataText.label = model.label
              this.selectItemDataText.labelCfg.style.fill = model.labelCfg.style.fill
              this.selectItemDataText.labelCfg.style.fontSize = model.labelCfg.style.fontSize
              this.selectItemDataText.size = model.size
              this.selectItemDataText.style.fill = model.style.fill
              this.selectItemDataText.style.stroke = model.style.stroke
              this.selectItemDataText.style.lineWidth = model.style.lineWidth
            }
          } else if (type === 'edge') {
            this.selectItemDataEdge.type = model.type
            this.selectItemDataEdge.lineWidth = model.style.lineWidth
            this.selectItemDataEdge.stroke = model.style.stroke
            this.selectItemDataEdge.label = model.label
            this.selectItemDataEdge.labelCfg = JSON.parse(JSON.stringify(model.labelCfg))
          } else if (type === 'combo') {
            for (let x in this.selectItemDataCombo) {
              if (model[x]) {
                if (x === 'style') {
                  this.selectItemDataCombo.style.fill = model.style.fill
                  this.selectItemDataCombo.style.stroke = model.style.stroke
                  this.selectItemDataCombo.style.lineWidth = model.style.lineWidth
                } else if (typeof model[x] === 'object') {
                  this.selectItemDataCombo[x] = JSON.parse(JSON.stringify(model[x]))
                } else {
                  this.selectItemDataCombo[x] = model[x]
                }
              }
            }
          }
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.topo-wrapper {
  padding: 20px;

  .topo-top {
    margin-bottom: 20px;
    justify-content: flex-end;
    padding: 10px 20px;
    background: #37393f;
    border-radius: 8px;

    .btn-group-left {
      flex: 1;
    }

    .btn-group-right {
      flex: 0 0 300px;
      text-align: right;
    }
  }

  .canvas-box {
    position: relative;
    height: calc(100vh - 242px);
  }

  :deep(.el-drawer__body) {
    padding: 0 20px 20px 20px;
  }

  .drawer-btn-wrapper {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .topo-main {
    display: flex;
    color: #37393f;

    .canvas-box {
      flex: 1;
      border-radius: 8px;
      min-width: 800px;
      background: #292b2f;
    }

    .aside {
      color: #333333;
      position: relative;
      flex: 0 0 300px;
      margin-left: 20px;
      border-radius: 8px;
      background: #37393f;
      max-width: 300px;
      padding: 20px;
      height: calc(100vh - 242px);

      .aside-title {
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 20px;
        color: #fff;
      }
    }
  }

  .rectlist {
    flex-wrap: wrap;
    justify-content: space-around;

    .rect-item {
      width: 100px;
      height: 100px;
      cursor: pointer;
      border: 1px solid #736969;
      border-radius: 4px;
      padding: 5px;
      box-sizing: border-box;

      &-img {
        width: 100%;
        height: 100%;
      }
    }
  }

  ::v-deep .el-form-item__label {
    color: #b5abab;
  }

  .g6-component-toolbar {
    right: 0;
    left: inherit;
  }

  .el-dropdown .el-dropdown__caret-button {
    padding-bottom: 6px;
  }

  .el-color-picker {
    vertical-align: middle;
  }

  .el-form-item {
    margin-bottom: 10px;
  }
}

.icon-uploader {
  svg {
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    height: 20px;
  }
}

.icon-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.icon-uploader .el-upload:hover {
  border-color: #409EFF;
}

.icon-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

.icon {
  display: block;
  width: 100%;
}

::v-deep .el-collapse-item__header {
  background: transparent;
  color: #fff;
  border-color: #292b2f;
}

::v-deep .el-collapse-item__wrap {
  background: transparent;
  color: #fff;
  border-bottom: 1px solid #292b2f;

  .el-collapse-item__content {
    padding: 10px 0 0;
  }
}

::v-deep .el-collapse {
  border-color: #292b2f;
}
</style>
