import G6 from "@antv/g6";

export const Utils = {
  registerNode: () => {
    G6.registerNode('custom-image', {
      afterDraw(cfg, group) {
        const bbox = group.getBBox();
        const back = group.addShape('rect', {
          name: 'image-border',
          attrs: {
            width: cfg.size[0] + 2,
                height: cfg.size[1] + 2,
                x: -cfg.size[0]/2 -1 ,
                y: -cfg.size[1]/2 -1 ,
                stroke: "rgb(95, 149, 255)",
                lineWidth: 0,
          }
        });
        const success = group.addShape('image', {
          name: 'success-icon',
          attrs: {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA8xJREFUWEe1V12IG1UYPedmZyLqm1u6SRYssrCZVFp9kAqKCPqyKyj+rFqqtXW1PlX0tS3YhS2KIAp90fqzWqwtXX9wwe6TFFoFxR9qcTNpu2AfNnezdfsmtpPZzCeTZrJJOpNMujFPSe455zv3uzPf912iy8+AbMypCobgST9E+qt0chmKy14C8yXO5buRZBxwRjYNyoq7lSJjAt7TjkPIL0JOs884WuTZhU76bQ1kyhs3e/BeILAdwG2dxFrWLwtwWEF9VjTn/ojiRhrIOLkxoRzvMmgonMKni8n8dNhiqIFMObtDwKleBA80CNlZNAuftmpeZyDtZPeDfKOXwetaIhM6WdjfqN1kIFW2XiPw7v8SvCYqwOuLpv3eamZq3wbLuS0e5KceB3cBeR/g7kZdBd67YOZ/rr7BwUK6nP0c4LaeGSAWvQpegsi/KsGTzbpyRJuF5+oGBq7mRpSSEz0LDpzWpv2ArzdwJfvg9QYAz+No6ab8bDUD6bJ1CMDLPTIwp037zkArygCAD7Vp7woM+OXTWrMBorTiJO66dOufSzEM2Nq0c0xdsW5nAhfXGpyA6xEPLxr2qUatNhmAVLCBvap4QtmzaBTebN1IOwN+hWSPCs8Zbdp3hwTfoBL8CMBDoRkWmWDKtY5TMLamIxDZppOFLxo1BlesUc/Dd+10hZhmysl9ScqTnQ3IQW0WXk071gUQQ/VKJpgtJu3RRn66bPm7Hu+kKcKv/AxMUrA3CkxiFsI9RTN/JsBkXOuECEaqv43KOs3zy6sFzToG4JlOwf11IQ4wVbaeJ3A4hHCRkImwDuZjq0cH+V0bhbcCbsqxJsnozbTGEGA7B53hTR5V5MAA4hSo3tF9czPtdpVxhp8SqtCeH8VT4m0OClEJwPq2aRO8rc2b94G/uWFPe0LheyHviJP6GmZJm/ZAYOAogGdjkE8rA+MLtC80P3S5KUB2xOA3Qo5p095aM5B7EZCPYwr8WjGMR5Z49pKPv/HpiePazH+y2o6d7LcgH41jQiAnbzFWRv652pdSCf4Vh9OEEZnRycJj/n+rBtzh+yDqh9hiIjNCriewJTanXjy8+7Vx7scmA9V0OtZeISa7FuyCQMG+YtI+UPfSyk271tcQPN6FZnwo8Y027CcaCRFjee4DgeyKr9wZSfBQ0cy/0oqMvJiky129GR0cXHviw0Btr2bXJmVv940Pq3JEQR0MJuCuDQQEf2hlQnbGbdt+m5UKp/yhs9PhxLod143I0DrlGmOCajvuB2sXVsFlAMsE5j3DnS5x/u9OgYP1/wAlf2ppZXliqAAAAABJRU5ErkJggg==',
            size: 32,
            x: bbox.x + cfg.size[0] - 32,
            y: bbox.y ,
            opacity: 0
          }
        });
        const fail = group.addShape('image', {
          name: 'success-icon',
          attrs: {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAlpJREFUWEfNl79v00AUx78vTVwhEBtbY6gExBELC7QTalf2sCBgRALBAnvTHRYQDN0AsZA/oGMrpoYsLCiJQAo43dgQDLmkfujcnCGOz3fNDzmRPOXde5977/z19wgZ/+gk9b+sFNbyhAoT3QBwbvjIFD/lQ8wfB4zalcN+3TavEeDrRZwdiOV7OeLbzFizSUyEesD0Pu/03lz6hl9pa1IBmq5TJeAugFWbwgkxHQbeln1R1a3XAgyLb01YeGQZA9s6iESAtutsMaClngSKgGrJF9vxtWMA8yiuiiZBjADMsu26LsXHEQHI034knM9THDjbyXSWHHFVvR0RQNNdfkTgF7ZZpolj0OOy33spc0QALdf5BOBaamLmfRBJ0akkxRFohzm4DKINA2DD88X1CKC5kt+gXG4vVTAI9dIPsS5jWq4jAT7E4m95vqiF/xcLeyYIDoLN8uFgP+xAq1h4BaIH6YpFOyW/d1/FxCCi4kNACZfYpagG82uv2394DGDT/uOV8UJhEbXzlO4k7S0cgwLoALhgebBGIP5foxmNLu13zxerCuA3gNOWAGOdOOHOVZk/ni/OLAxA5iMwa8A8D2G7WHjGRE/SRQi7XlfcnNVrSMzPS93+0/AMSKu1lKMDkwp63f7mrIToKOB1ad0iKW6fdw5MlktaLWb4WpFh7AJ8yqSCMo9S1cX5GGX+OZazzdSQqAM4T4gkc5poSucBoXPGi2nLY+PI5mKiINTVjMB3jJbtn5I1GPRu6qtZXBlD60ZUAZH0jmOXUzA3mLkmrZbtp914ObVNNGncXx+0ODCyGpyPAAAAAElFTkSuQmCC',
            size: 32,
            x: bbox.x + cfg.size[0] - 32,
            y: bbox.y ,
            opacity: 0
          }
        });
        back.toBack();
      },
      setState(name, value, item) {
        
        const group = item.getContainer();
        const shapes = group.get('children'); // 顺序根据 draw 时确定

        if (name === 'selected') {
          if (value) {
            shapes[0].attr('lineWidth', 2);
          } else {
            shapes[0].attr('lineWidth', 0);
          }
        }
        if(name === 'success') {
          if (value) {
            shapes[3].attr('opacity', 1);
          } else {
            shapes[3].attr('opacity', 0);
          }
        }
        if(name === 'fail') {
          if (value) {
            shapes[4].attr('opacity', 1);
          } else {
            shapes[4].attr('opacity', 0);
          }
        }
      },
      afterUpdate(cfg, node) {
        const shape  = node.getContainer().get('children')[0]
        shape.attr('width', cfg.size[0]);
        shape.attr('height', cfg.size[1]);
        const bbox = node.getContainer().getBBox();
        shape.attr('x', -cfg.size[0]/2 -1);
        shape.attr('y', -cfg.size[1]/2 -1);

      },
    }, 'image');
  },
  // 自定义toolbar
  registerToolbar: (id, cb) => {
    const toolbar =  new G6.ToolBar({
      container: id,
      getContent: graph => {
        return `
                <ul class='g6-component-toolbar'>
                  <li code='redo' title="恢复">
                    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                      <path d="M256 682.666667c0-102.741333 66.730667-213.333333 213.333333-213.333334 107.008 0 190.762667 56.576 230.570667 125.354667L611.968 682.666667H853.333333v-241.365334l-91.562666 91.562667C704.768 448.469333 601.130667 384 469.333333 384c-196.096 0-298.666667 150.229333-298.666666 298.666667h85.333333z" fill="" p-id="2041"></path>
                    </svg>
                  </li>
                  <li code='undo' title="撤销">
                    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                      <path d="M170.666667 682.666667h241.365333l-87.936-87.978667C363.904 525.909333 447.658667 469.333333 554.666667 469.333333c146.602667 0 213.333333 110.592 213.333333 213.333334h85.333333c0-148.437333-102.570667-298.666667-298.666666-298.666667-131.797333 0-235.392 64.469333-292.48 148.821333L170.666667 441.301333V682.666667z" fill="" p-id="2764"></path>
                    </svg>
                  </li>
                  <li code='delete' title="删除">
                    <svg t="1652689635601" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1569" width="24" height="24"><path d="M677.647059 256l0-90.352941c0-37.436235-23.461647-60.235294-61.771294-60.235294L408.094118 105.411765c-38.249412 0-61.741176 22.799059-61.741176 60.235294l0 90.352941-180.705882 0 0 60.235294 60.235294 0 0 512c0 54.272 33.972706 90.352941 90.352941 90.352941l391.529412 0c55.085176 0 90.352941-33.490824 90.352941-90.352941l0-512 60.235294 0 0-60.235294L677.647059 256zM406.588235 165.647059l210.823529 0-1.264941 90.352941L406.588235 256 406.588235 165.647059zM737.882353 858.352941l-451.764706 0 0-542.117647 451.764706 0L737.882353 858.352941zM466.823529 376.470588l-58.729412 0-1.505882 391.529412 60.235294 0L466.823529 376.470588zM617.411765 376.470588l-60.235294 0 0 391.529412 60.235294 0L617.411765 376.470588z" p-id="1570"></path></svg>
                  </li>
                  <li  code='zoomOut' title="放大">
                    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                      <path d="M658.432 428.736a33.216 33.216 0 0 1-33.152 33.152H525.824v99.456a33.216 33.216 0 0 1-66.304 0V461.888H360.064a33.152 33.152 0 0 1 0-66.304H459.52V296.128a33.152 33.152 0 0 1 66.304 0V395.52H625.28c18.24 0 33.152 14.848 33.152 33.152z m299.776 521.792a43.328 43.328 0 0 1-60.864-6.912l-189.248-220.992a362.368 362.368 0 0 1-215.36 70.848 364.8 364.8 0 1 1 364.8-364.736 363.072 363.072 0 0 1-86.912 235.968l192.384 224.64a43.392 43.392 0 0 1-4.8 61.184z m-465.536-223.36a298.816 298.816 0 0 0 298.432-298.432 298.816 298.816 0 0 0-298.432-298.432A298.816 298.816 0 0 0 194.24 428.8a298.816 298.816 0 0 0 298.432 298.432z"></path>
                    </svg>
                  </li>
                  <li code='zoomIn' title="缩小">
                    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                      <path d="M639.936 416a32 32 0 0 1-32 32h-256a32 32 0 0 1 0-64h256a32 32 0 0 1 32 32z m289.28 503.552a41.792 41.792 0 0 1-58.752-6.656l-182.656-213.248A349.76 349.76 0 0 1 480 768 352 352 0 1 1 832 416a350.4 350.4 0 0 1-83.84 227.712l185.664 216.768a41.856 41.856 0 0 1-4.608 59.072zM479.936 704c158.784 0 288-129.216 288-288S638.72 128 479.936 128a288.32 288.32 0 0 0-288 288c0 158.784 129.216 288 288 288z" p-id="3853"></path>
                    </svg>
                  </li>
                  <li code='realZoom' title="真实尺寸">
                    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="24">
                      <path d="M384 320v384H320V320h64z m256 0v384H576V320h64zM512 576v64H448V576h64z m0-192v64H448V384h64z m355.968 576H92.032A28.16 28.16 0 0 1 64 931.968V28.032C64 12.608 76.608 0 95.168 0h610.368L896 192v739.968a28.16 28.16 0 0 1-28.032 28.032zM704 64v128h128l-128-128z m128 192h-190.464V64H128v832h704V256z"></path>
                    </svg>
                  </li>
                  <li code='autoZoom' title="自动尺寸">
                    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="24">
                      <path d="M684.288 305.28l0.128-0.64-0.128-0.64V99.712c0-19.84 15.552-35.904 34.496-35.712a35.072 35.072 0 0 1 34.56 35.776v171.008h170.944c19.648 0 35.84 15.488 35.712 34.432a35.072 35.072 0 0 1-35.84 34.496h-204.16l-0.64-0.128a32.768 32.768 0 0 1-20.864-7.552c-1.344-1.024-2.816-1.664-3.968-2.816-0.384-0.32-0.512-0.768-0.832-1.088a33.472 33.472 0 0 1-9.408-22.848zM305.28 64a35.072 35.072 0 0 0-34.56 35.776v171.008H99.776A35.072 35.072 0 0 0 64 305.216c0 18.944 15.872 34.496 35.84 34.496h204.16l0.64-0.128a32.896 32.896 0 0 0 20.864-7.552c1.344-1.024 2.816-1.664 3.904-2.816 0.384-0.32 0.512-0.768 0.768-1.088a33.024 33.024 0 0 0 9.536-22.848l-0.128-0.64 0.128-0.704V99.712A35.008 35.008 0 0 0 305.216 64z m618.944 620.288h-204.16l-0.64 0.128-0.512-0.128c-7.808 0-14.72 3.2-20.48 7.68-1.28 1.024-2.752 1.664-3.84 2.752-0.384 0.32-0.512 0.768-0.832 1.088a33.664 33.664 0 0 0-9.408 22.912l0.128 0.64-0.128 0.704v204.288c0 19.712 15.552 35.904 34.496 35.712a35.072 35.072 0 0 0 34.56-35.776V753.28h170.944c19.648 0 35.84-15.488 35.712-34.432a35.072 35.072 0 0 0-35.84-34.496z m-593.92 11.52c-0.256-0.32-0.384-0.768-0.768-1.088-1.088-1.088-2.56-1.728-3.84-2.688a33.088 33.088 0 0 0-20.48-7.68l-0.512 0.064-0.64-0.128H99.84a35.072 35.072 0 0 0-35.84 34.496 35.072 35.072 0 0 0 35.712 34.432H270.72v171.008c0 19.84 15.552 35.84 34.56 35.776a35.008 35.008 0 0 0 34.432-35.712V720l-0.128-0.64 0.128-0.704a33.344 33.344 0 0 0-9.472-22.848zM512 374.144a137.92 137.92 0 1 0 0.128 275.84A137.92 137.92 0 0 0 512 374.08z"></path>
                    </svg>
                  </li>
                  <li code='download' title="导出图片">
                    <svg t="1654065649072" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9675" width="20" height="20"><path d="M968.96 268.373333a42.666667 42.666667 0 0 0-60.586667 0L853.333333 323.84V85.333333a42.666667 42.666667 0 0 0-85.333333 0v238.506667l-55.04-55.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l128 128a42.666667 42.666667 0 0 0 14.08 8.96 40.106667 40.106667 0 0 0 32.426667 0 42.666667 42.666667 0 0 0 14.08-8.96l128-128a42.666667 42.666667 0 0 0 0-60.586667zM810.666667 554.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v16.213334l-63.146667-63.146667a119.04 119.04 0 0 0-167.68 0l-29.866666 29.866667-105.813334-105.813334a121.6 121.6 0 0 0-167.68 0L170.666667 537.6V298.666667a42.666667 42.666667 0 0 1 42.666666-42.666667h341.333334a42.666667 42.666667 0 0 0 0-85.333333H213.333333a128 128 0 0 0-128 128v512a128 128 0 0 0 128 128h512a128 128 0 0 0 128-128v-213.333334a42.666667 42.666667 0 0 0-42.666666-42.666666zM213.333333 853.333333a42.666667 42.666667 0 0 1-42.666666-42.666666v-152.32l123.733333-123.733334a33.706667 33.706667 0 0 1 46.506667 0l135.253333 135.253334 183.466667 183.466666z m554.666667-42.666666a37.973333 37.973333 0 0 1-7.68 22.613333L567.893333 640l29.866667-29.866667a32.853333 32.853333 0 0 1 46.933333 0L768 734.293333z" p-id="9676"></path></svg>
                  </li>
                </ul>
              `;
      },
      handleClick: (code, graph) => {
        const currentZoom = graph.getZoom();
        const DELTA = 0.05;
        switch (code) {
          case "redo":
            toolbar.redo();
            break;
          case "undo":
            toolbar.undo();
            break;
          case "zoomOut": {
            const ratioOut = 1 / (1 - DELTA * toolbar.get("zoomSensitivity"));
            const maxZoom = toolbar.get("maxZoom") || graph.get("maxZoom");
            if (ratioOut * currentZoom > maxZoom) {
              return;
            }
            graph.zoomTo(currentZoom * ratioOut);
            break;
          }
          case "zoomIn": {
            const ratioIn = 1 - DELTA * toolbar.get("zoomSensitivity");
            const minZoom = toolbar.get("minZoom") || graph.get("minZoom");
            if (ratioIn * currentZoom < minZoom) {
              return;
            }
            graph.zoomTo(currentZoom * ratioIn);
            break;
          }
          case "realZoom":
            graph.zoomTo(1);
            break;
          case "autoZoom":
            graph.fitView([20, 20]);
            break;
          case "delete":
            cb && cb('delete')
            break;
          case "download":
            graph.downloadFullImage('deit-topo', 'image/png', {
              backgroundColor: '#352f38',
              padding: 30
            })
            break;
          default:
        }
      }
    });
    return toolbar
  },
  // init graph
  generateGraph: (id, plugins, bg) => {
    const container = document.getElementById(id);
    const width = container.clientWidth 
    const height = container.clientHeight 
    if(bg) {
      container.style.background = `url(${bg}) center no-repeat`
      container.style.backgroundSize = '100%'
    }
    container.style.textAlign = 'center';
    return new G6.Graph({
      container: id, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: width, // Number，必须，图的宽度
      height: height, // Number，必须，图的高度
      // fitView: true,
      animate: true,
      linkCenter: false,
      enabledStack: true,
      plugins: plugins,
      groupByTypes: false,
      modes: {
        default: [
          "drag-canvas",
          "zoom-canvas",
          {
            type: "drag-node",
            shouldBegin: e => {
              if (!e.item.hasState('selected')) return false;
              return true;
            }
          },
          {
            type: "click-select",
            multiple: false,
          },
          {
            type: "create-edge",
            trigger: 'drag',
            shouldBegin: e => {
              if(!e.item) return false
              if (e.item.hasState('selected')) return false;
              if(e.item.getModel().name == 'text') return false
              if(e.item.getType() == 'combo') return false
              return true;
            },
            shouldEnd: e => {
              if(!e.item) return false
              if(e.item.getType() == 'combo') return false
              if(e.item.getModel().name == 'text') return false
              return true;
            },
          },
          {
            type: 'drag-combo',
            shouldUpdate: e => {
              if (!e.item.hasState('selected')) return false;
              return true;
            }
          },
        ],
        view: [
          "drag-canvas",
          "zoom-canvas"
        ]
      },
      fitViewPadding: [20, 40, 50, 20],
      defaultNode: {
        type: "custom-image",
        size: 30,
        style: {
          // fill: "rgb(223, 234, 255)",
          lineWidth: 1,
          stroke: "#4572d9"
        },
        labelCfg: {
          // position: "bottom",
          style: {
            fill: '#fff',
            opacity: 1,
            fontSize: 16
          }
        },
      },
      defaultEdge: {
        type: "line",
        style: {
          stroke: '#fff',
          lineWidth: 1
        },
        labelCfg: {
          autoRotate: true,
          style: {
            fill: '#fff',
            opacity: 1,
            fontSize: 20,
          }
        }
      },
      // 边不同状态下的样式集合
      edgeStateStyles: {
        // 鼠标点击边，即 click 状态为 true 时的样式
        select: {
          lineWidth: 2,
          shadowBlur: 10,
          shadowColor: "rgb(95, 149, 255)",
          stroke: "rgb(95, 149, 255)",
        }
      },
      nodeStateStyles: {
        // 鼠标点击边，即 click 状态为 true 时的样式
        select: {
          fill: "none",
          lineWidth: 2,
          shadowBlur: 10,
          shadowColor: "rgb(95, 149, 255)",
          stroke: "rgb(95, 149, 255)",
        }
      },
      defaultCombo: {
        type: 'combo',
        /* style for the keyShape */
        style: {
          fill: '#433b46',
          lineWidth: 1,
          stroke: "#fff",
        },
        labelCfg: {
          /* label's offset to the keyShape */
          // refY: 10,
          /* label's position, options: center, top, bottom, left, right */
          position: 'top',
          /* label's style */
          style: {
            fontSize: 16,
            fill: '#fff'
          },
        },
      },
      // /* styles for different states, there are built-in styles for states: active, inactive, selected, highlight, disable */
      // /* you can extend it or override it as you want */
      comboStateStyles: {
          selected: {
            fill: '#433b46',
            shadowBlur: 1,
            shadowColor: "rgb(95, 149, 255)",
            stroke: "rgb(95, 149, 255)",
          }
      },
      // 布局
      layout: {
        type: "force",
        linkDistance: 200,
        preventOverlap: true,
        nodeStrength: -30,
        edgeStrength: 0.1
      }
    });
  },
  // init event
  registerEvent: (chart, canvasSetting, cb) => {
    chart.on('aftercreateedge', (e) => {
      e.edge.update({
        type: canvasSetting.edge.type,
        style: {
          stroke: canvasSetting.edge.stroke,
          lineWidth: canvasSetting.edge.lineWidth,
        },
        stateStyles: {
          select: {
            lineWidth: canvasSetting.edge.lineWidth,
            shadowBlur: 10,
              shadowColor: "rgb(95, 149, 255)",
              stroke: "rgb(95, 149, 255)",
          }
        }
      })
    })
    chart.on('nodeselectchange', (e) => {
      if(e.target) {
        const type = e.target.getType()
        const data = type === 'node'? e.selectedItems.nodes[0]: e.selectedItems.combos[0]
        const edges = chart.getEdges();
        edges.forEach(item => {
          chart.clearItemStates(item, 'select');
        });
        if(e.select) {
          cb && cb(data)
        } else {
          cb && cb(null)
        }
      }
    });
    chart.on("canvas:click", e => {
      const edges = chart.getEdges();
      edges.forEach(item => {
        chart.clearItemStates(item, 'select');
      });
      cb && cb(null)
    });
    chart.on("edge:click", e => {
      const edges = chart.getEdges();
      const nodes = chart.getNodes();
      const flag = e.item.getStates().includes("select");
      cb && cb(null)
      edges.forEach(item => {
        chart.clearItemStates(item, 'select');
      });
      nodes.forEach(item => {
        chart.clearItemStates(item, 'select');
      });
      if (!flag) {
        chart.setItemState(e.item, "select", true);
        cb && cb(e.item)
      }
    });
  }
}