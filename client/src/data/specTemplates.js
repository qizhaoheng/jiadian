export const specTemplates = {
  fridge: [
    {
      name: "容量",
      unit: "L",
      importance: "S",
      recommended: "400L以上（三口之家）",
      desc: "决定可储存食物量",
    },
    {
      name: "制冷方式",
      importance: "S",
      recommended: "风冷",
      desc: "风冷不会结霜",
    },
    {
      name: "压缩机",
      importance: "A",
      recommended: "变频",
      desc: "变频更省电更安静",
    },
    {
      name: "能效等级",
      importance: "A",
      recommended: "1级",
      desc: "能耗水平",
    },
    {
      name: "噪音",
      unit: "db",
      importance: "B",
      recommended: "≤38",
      desc: "厨房安静程度",
    },
  ],

  dishwasher: [
    {
      name: "容量",
      unit: "套",
      importance: "S",
      recommended: "≥13",
      desc: "中国家庭餐具较多",
    },
    {
      name: "烘干方式",
      importance: "S",
      recommended: "热风烘干",
      desc: "影响餐具干燥程度",
    },
    {
      name: "噪音",
      unit: "db",
      importance: "A",
      recommended: "≤45",
      desc: "开放式厨房非常重要",
    },
    {
      name: "水效等级",
      importance: "A",
      recommended: "1级",
      desc: "节水能力",
    },
    {
      name: "安装方式",
      importance: "B",
      recommended: "嵌入式",
      desc: "影响厨房整体美观",
    },
  ],

  rangeHood: [
    {
      name: "风量",
      unit: "m³/min",
      importance: "S",
      recommended: "≥20",
      desc: "吸烟能力",
    },
    {
      name: "风压",
      unit: "Pa",
      importance: "S",
      recommended: "≥400",
      desc: "高层住宅关键参数",
    },
    {
      name: "噪音",
      unit: "db",
      importance: "A",
      recommended: "≤65",
      desc: "厨房舒适度",
    },
    {
      name: "油脂分离度",
      unit: "%",
      importance: "A",
      recommended: "≥90",
      desc: "油烟分离能力",
    },
  ],

  gasStove: [
    {
      name: "火力",
      unit: "kW",
      importance: "S",
      recommended: "≥5.0",
      desc: "爆炒能力",
    },
    {
      name: "热效率",
      unit: "%",
      importance: "A",
      recommended: "≥63",
      desc: "燃气利用率",
    },
    {
      name: "面板材质",
      importance: "B",
      recommended: "钢化玻璃",
      desc: "耐用程度",
    },
  ],

  ovenSteam: [
    {
      name: "容量",
      unit: "L",
      importance: "S",
      recommended: "≥60",
      desc: "可烹饪食物量",
    },
    {
      name: "蒸汽类型",
      importance: "A",
      recommended: "直喷蒸汽",
      desc: "蒸汽质量",
    },
    {
      name: "温控精度",
      importance: "A",
      recommended: "±1℃",
      desc: "烘焙稳定性",
    },
  ],

  waterPurifier: [
    {
      name: "过滤技术",
      importance: "S",
      recommended: "RO反渗透",
      desc: "过滤精度",
    },
    {
      name: "过滤精度",
      unit: "μm",
      importance: "S",
      recommended: "0.0001",
      desc: "过滤能力",
    },
    {
      name: "通量",
      unit: "G",
      importance: "A",
      recommended: "≥600G",
      desc: "出水速度",
    },
    {
      name: "废水比",
      importance: "A",
      recommended: "2:1以上",
      desc: "节水能力",
    },
  ],

  garbageDisposal: [
    {
      name: "功率",
      unit: "W",
      importance: "S",
      recommended: "≥560",
      desc: "粉碎能力",
    },
    {
      name: "转速",
      unit: "rpm",
      importance: "A",
      recommended: "≥2600",
      desc: "粉碎效率",
    },
    {
      name: "研磨级数",
      importance: "B",
      recommended: "3级",
      desc: "粉碎细度",
    },
  ],

  washingMachine: [
    {
      name: "容量",
      unit: "kg",
      importance: "S",
      recommended: "≥10",
      desc: "家庭洗衣量",
    },
    {
      name: "电机类型",
      importance: "S",
      recommended: "BLDC直驱",
      desc: "噪音与耐用性",
    },
    {
      name: "洗净比",
      importance: "A",
      recommended: "≥1.08",
      desc: "清洁能力",
    },
    {
      name: "转速",
      unit: "rpm",
      importance: "A",
      recommended: "≥1200",
      desc: "脱水能力",
    },
  ],

  dryer: [
    {
      name: "容量",
      unit: "kg",
      importance: "S",
      recommended: "≥10",
      desc: "烘干衣物量",
    },
    {
      name: "烘干技术",
      importance: "S",
      recommended: "热泵",
      desc: "最省电",
    },
    {
      name: "噪音",
      unit: "db",
      importance: "A",
      recommended: "≤65",
      desc: "使用舒适度",
    },
  ],

  airConditioner: [
    {
      name: "匹数",
      importance: "S",
      recommended: "按房间面积选择",
      desc: "制冷能力",
    },
    {
      name: "能效等级",
      importance: "S",
      recommended: "1级",
      desc: "能耗水平",
    },
    {
      name: "制冷量",
      unit: "W",
      importance: "A",
      recommended: "越高越好",
      desc: "制冷能力",
    },
    {
      name: "噪音",
      unit: "db",
      importance: "A",
      recommended: "≤40",
      desc: "睡眠舒适度",
    },
  ],

  freshAir: [
    {
      name: "风量",
      unit: "m³/h",
      importance: "S",
      recommended: "≥150",
      desc: "换气能力",
    },
    {
      name: "过滤等级",
      importance: "A",
      recommended: "HEPA H13",
      desc: "过滤能力",
    },
    {
      name: "噪音",
      unit: "db",
      importance: "A",
      recommended: "≤40",
      desc: "居住舒适度",
    },
  ],

  airPurifier: [
    {
      name: "CADR",
      unit: "m³/h",
      importance: "S",
      recommended: "≥400",
      desc: "净化速度",
    },
    {
      name: "过滤等级",
      importance: "A",
      recommended: "HEPA",
      desc: "过滤能力",
    },
    {
      name: "噪音",
      unit: "db",
      importance: "A",
      recommended: "≤50",
      desc: "使用舒适度",
    },
  ],

  tv: [
    {
      name: "尺寸",
      unit: "inch",
      importance: "S",
      recommended: "≥75",
      desc: "观影体验",
    },
    {
      name: "分辨率",
      importance: "A",
      recommended: "4K",
      desc: "画质清晰度",
    },
    {
      name: "刷新率",
      unit: "Hz",
      importance: "A",
      recommended: "≥120",
      desc: "运动画面流畅度",
    },
  ],

  robotVacuum: [
    {
      name: "吸力",
      unit: "Pa",
      importance: "S",
      recommended: "≥5000",
      desc: "清洁能力",
    },
    {
      name: "导航",
      importance: "S",
      recommended: "激光导航",
      desc: "路径规划",
    },
    {
      name: "电池容量",
      unit: "mAh",
      importance: "A",
      recommended: "≥5000",
      desc: "续航能力",
    },
  ],

  smartToilet: [
    {
      name: "冲水方式",
      importance: "S",
      recommended: "虹吸",
      desc: "冲洗能力",
    },
    {
      name: "加热方式",
      importance: "A",
      recommended: "即热式",
      desc: "用水舒适度",
    },
    {
      name: "抗菌材质",
      importance: "B",
      recommended: "抗菌座圈",
      desc: "卫生",
    },
  ],
};

export const applianceTypes = [
  { value: "dishwasher", label: "洗碗机" },
  { value: "fridge", label: "冰箱" },
  { value: "rangeHood", label: "油烟机" },
  { value: "gasStove", label: "燃气灶" },
  { value: "ovenSteam", label: "蒸烤一体" },
  { value: "waterPurifier", label: "净水器" },
  { value: "garbageDisposal", label: "垃圾处理器" },
  { value: "washingMachine", label: "洗衣机" },
  { value: "dryer", label: "干衣机" },
  { value: "airConditioner", label: "空调" },
  { value: "freshAir", label: "新风系统" },
  { value: "airPurifier", label: "空气净化器" },
  { value: "tv", label: "电视" },
  { value: "robotVacuum", label: "扫地机器人" },
  { value: "smartToilet", label: "智能马桶" }
];
