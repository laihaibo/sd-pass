export default {
  id: 'ch09',
  title: '面向对象与UML',
  syllabus: '软考中级软件设计师上午卷的必考重点章，每年约 5~8 分，面向对象基本概念、UML 图分类与类间关系判断几乎是年年出现的送分题，也是下午设计题的读图基础。',
  intro: '这一章我们换一个角度看程序：不再是一行行代码，而是把世界看成一个个"对象"在互相打交道。别担心零基础——我们会用工厂蓝图、亲戚关系、点外卖这些生活例子先把概念讲透，再对上考试里的专业名词和图形符号。学完这章，你就能看懂软考卷子里那些方框、菱形和箭头了。',
  sections: [
    {
      h: '面向对象思维：把世界看成"对象"在打交道',
      p: '先想想你平时怎么用电脑：点一个"订单"，它会自己算钱、扣库存、发通知。在传统"面向过程"的思维里，程序是一串按顺序执行的步骤，像一份菜谱：第一步做什么、第二步做什么。而"面向对象"（Object-Oriented，简称 OO）的思维是：程序是一群各司其职的"对象"在互相发消息合作，像一个餐厅——服务员对象接单、厨师对象做菜、收银对象结账，你不用知道后厨怎么炒的，只要把需求"喊"给对应的对象。\n' +
        '两种思维没有对错，但面向对象的最大好处是：把数据和操作数据的动作打包在一起、划清职责边界，程序就更像真实世界的结构，好维护、好扩展、好复用。软考考查 OO，核心就是考查你能不能说清它的几个基本构件：对象、类，以及三大特性：封装、继承、多态。'
    },
    {
      h: '对象与类：图纸和成品',
      p: '类（Class）是图纸、是模板；对象（Object）是按图纸造出来的一个个成品。比如"手机"是一个类，你手上那台特定型号、特定序列号的手机就是一个对象。类里写了两类东西：属性（数据，如手机的电量、品牌）和方法（行为，如打电话、拍照）。程序运行时，用类"实例化"出对象——就像月饼模具（类）压出一个个月饼（对象），模具只有一个，月饼可以有很多个。\n' +
        '所以考试里常考的表述是：类是具有相同属性和相同方法的一组对象的抽象，对象是类的实例。记住"抽象"和"实例"这对词。另外，每个对象都有三个要素：对象标识（我是谁，即名字/引用）、对象状态（我现在什么样，即属性值）、对象行为（我会干什么，即方法）。'
    },
    {
      h: '三大特性：封装、继承、多态',
      p: '面向对象三大特性是本章最高频的考点，逐个用生活例子理解：\n' +
        '封装（Encapsulation）：把内部细节藏起来，只留一个对外接口。你看电视只用遥控器按键（接口），不用懂电视里电路怎么走线（内部实现）。代码上就是把属性设为私有（private），提供公有（public）的 get/set 方法访问。好处：外部不能乱改内部数据，实现换了也不影响使用者。\n' +
        '继承（Inheritance）：子类自动拥有父类的属性和方法，像孩子继承父母的姓氏和房产，还可以在父类基础上发展自己的本领。它表达"is-a（是一种）"关系：狗是一种动物。继承是代码复用的主要手段。注意：面向对象语言通常支持单继承（一个直接父亲），多继承在很多语言（如 Java 的类）中受限。\n' +
        '多态（Polymorphism）：同样的消息发给不同的对象，得到不同的响应。同样是"叫"，狗发出"汪"、猫发出"喵"、鸭子发出"嘎"；同样是"绘图"，圆形对象画圆、矩形对象画方。多态让调用者不用关心具体是哪个对象，程序扩展性强——新增一种动物，老代码不用改。'
    },
    {
      h: '重载与重写：名字相同，命运不同',
      p: '这两个概念考试特别爱拿来混淆，必须分清：\n' +
        '重载（Overload）：在同一个类里，方法名相同但参数列表不同（个数、类型或顺序不同），编译器根据你传的参数决定调用哪一个。比如一个"求和"方法，传 2 个数就加 2 个、传 3 个数就加 3 个。它属于"编译时多态"（静态多态）——程序还没跑，编译阶段就能定下来调哪个版本。\n' +
        '重写（Override，也叫覆盖）：子类把从父类继承来的同名方法重新实现一遍，方法名和参数列表都要与父类一致（返回类型相同或更窄，访问权限不能更严）。比如父类"动物.叫()"只会"叫"，子类"狗.叫()"重写为"汪汪"。它属于"运行时多态"（动态多态）——到底执行父类版本还是子类版本，要等程序运行、看对象实际类型才知道。\n' +
        '一句话口诀：重载看参数（同类、名同参不同），重写看继承（子类、名参全同）。仅仅返回值不同不能构成重载，这是常设的陷阱选项。'
    },
    {
      h: 'UML 总览：统一建模语言的图分类',
      p: 'UML（Unified Modeling Language，统一建模语言）不是编程语言，而是一套画设计图的标准"图纸语言"——就像建筑界的平面图、电路图有统一符号一样，软件设计图也可以用 UML 统一地画出来。它包含十几种图，考试第一刀考的就是分类：所有图分成两大类——\n' +
        '结构图（静态图）：描述系统"长什么样"，即静态结构，包括类图、对象图、构件图（组件图）、部署图，还有包图、制品图、组合结构图。其中类图最重要、考得最多。\n' +
        '行为图（动态图）：描述系统"怎么动"，即动态行为，包括用例图、活动图、状态机图，以及交互图（交互图又分顺序图/序列图、通信图/协作图、定时图、交互概览图）。注意：用例图在 UML 2.x 规范里归入行为图，这是高频陷阱。\n' +
        '下图是完整分类，务必背下"每个图属于哪一类"。',
      diagram: {
        type: 'tree',
        caption: 'UML 图的分类：结构图（静态）与行为图（动态）',
        spec: {
          label: 'UML 图',
          children: [
            {
              label: '结构图（静态图）',
              note: '描述系统的静态结构"长什么样"',
              children: [
                { label: '类图', note: '最重要：类、接口及其关系' },
                { label: '对象图', note: '某时刻对象实例的快照' },
                { label: '构件图', note: '软件构件（模块）及依赖，也称组件图' },
                { label: '部署图', note: '软件部署到哪些硬件节点上' },
                { label: '包图', note: '模型的分组与包依赖' }
              ]
            },
            {
              label: '行为图（动态图）',
              note: '描述系统的动态行为"怎么动"',
              children: [
                { label: '用例图', note: '角色与功能需求，需求阶段用' },
                { label: '活动图', note: '业务流程/工作流，类似流程图' },
                { label: '状态机图', note: '一个对象生命周期内的状态变迁' },
                {
                  label: '交互图',
                  note: '对象之间如何收发消息',
                  children: [
                    { label: '顺序图', note: '序列图：按时间从上到下排列' },
                    { label: '通信图', note: '协作图：按消息编号表达顺序' }
                  ]
                }
              ]
            }
          ]
        }
      }
    },
    {
      h: '用例图与 include/extend：点餐的必选与加购',
      p: '用例图（Use Case Diagram）站在用户视角回答"系统能干什么"。三个元素：参与者/角色（Actor，小人图标，指系统外与系统交互的人或外部系统）、用例（椭圆，代表一项系统功能，如"提现"）、关系（连线）。角色与用例之间用实线关联，表示"这个角色使用这个功能"。\n' +
        '用例之间的关系考得最多的是两条虚线箭头：\n' +
        '包含关系 include：基础用例的执行"必然"要执行被包含用例，是必选动作。比如"提现"每次都必须"身份验证"。箭头从基础用例指向被包含用例，虚线上标 «include»——记忆：包含者指向被包含者。\n' +
        '扩展关系 extend：满足特定条件时才追加执行扩展用例，是可选动作。比如"下单"只有在有可用优惠券时才"使用优惠券"。箭头从扩展用例指向基础用例，虚线上标 «extend»，常伴随守卫条件（放在方括号里，如 [有可用券]）——记忆：扩展者指向被扩展者。\n' +
        '两条合起来的口诀："包含指向被包含，扩展指向被扩展；include 必选，extend 可选。"',
      diagram: {
        type: 'svg',
        caption: '用例间的包含（include）与扩展（extend）关系',
        spec: {
          viewBox: '0 0 480 240',
          content: '<text x="120" y="20" font-size="14" fill="#2563eb" text-anchor="middle">包含 include（必选）</text><circle cx="30" cy="60" r="8" fill="none" stroke="#f59e0b" stroke-width="2"/><line x1="30" y1="68" x2="30" y2="92" stroke="#f59e0b" stroke-width="2"/><line x1="16" y1="78" x2="44" y2="78" stroke="#f59e0b" stroke-width="2"/><line x1="30" y1="92" x2="20" y2="110" stroke="#f59e0b" stroke-width="2"/><line x1="30" y1="92" x2="40" y2="110" stroke="#f59e0b" stroke-width="2"/><text x="30" y="128" font-size="12" fill="#f59e0b" text-anchor="middle">客户</text><line x1="44" y1="80" x2="97" y2="80" stroke="#2563eb" stroke-width="2"/><ellipse cx="150" cy="80" rx="52" ry="24" fill="#ffffff" stroke="#2563eb" stroke-width="2"/><text x="150" y="85" font-size="14" fill="#2563eb" text-anchor="middle">提现</text><ellipse cx="150" cy="180" rx="60" ry="24" fill="#ffffff" stroke="#2563eb" stroke-width="2"/><text x="150" y="185" font-size="14" fill="#2563eb" text-anchor="middle">身份验证</text><line x1="150" y1="104" x2="150" y2="152" stroke="#16a34a" stroke-width="2" stroke-dasharray="6 4"/><path d="M144 144 L150 154 L156 144" stroke="#16a34a" stroke-width="2" fill="none"/><text x="203" y="132" font-size="12" fill="#16a34a" text-anchor="middle">«include»</text><text x="360" y="20" font-size="14" fill="#2563eb" text-anchor="middle">扩展 extend（可选）</text><ellipse cx="360" cy="80" rx="52" ry="24" fill="#ffffff" stroke="#2563eb" stroke-width="2"/><text x="360" y="85" font-size="14" fill="#2563eb" text-anchor="middle">下单</text><ellipse cx="360" cy="180" rx="62" ry="24" fill="#ffffff" stroke="#2563eb" stroke-width="2"/><text x="360" y="185" font-size="14" fill="#2563eb" text-anchor="middle">使用优惠券</text><line x1="360" y1="156" x2="360" y2="108" stroke="#16a34a" stroke-width="2" stroke-dasharray="6 4"/><path d="M354 116 L360 106 L366 116" stroke="#16a34a" stroke-width="2" fill="none"/><text x="418" y="126" font-size="12" fill="#16a34a" text-anchor="middle">«extend»</text><text x="418" y="142" font-size="12" fill="#dc2626" text-anchor="middle">[有可用券]</text><text x="240" y="228" font-size="12" fill="#64748b" text-anchor="middle">include：基础用例→被包含用例（必选）；extend：扩展用例→基础用例（有条件）</text>'
        }
      }
    },
    {
      h: '类图与六种关系：从"认识"到"生死与共"',
      p: '类图是 UML 里的主角，用三个分格的矩形表示类：上格类名、中格属性、下格方法，前面可加 +/-/# 表示 public/private/protected。考试真正的重头戏是判断类与类之间的六种关系，强度从弱到强：依赖 < 关联 < 聚合 < 组合，另有泛化和实现。\n' +
        '依赖（Dependency，虚线箭头）：一种"临时使用"关系，A 的操作用到了 B，比如"司机"依赖"道路"、方法参数里出现了另一个类。我用你一下，彼此不强绑定。\n' +
        '关联（Association，实线）：长期"持有"的关系，一个类的对象里有另一个类对象的引用，如"学生—老师"、"医生—病人"，可标注多重性：1、*（多）、0..1、1..* 等。\n' +
        '聚合（Aggregation，空心菱形）：弱"拥有"，整体与部分可以各过各的，部分能脱离整体存在。班级和学生：班级解散了，学生还在。菱形端是整体。\n' +
        '组合（Composition，实心菱形）：强"拥有"，整体与部分生死与共。人和心脏：人没了心脏也没了；订单和订单明细：删订单，明细必须一起删。菱形端是整体。\n' +
        '泛化（Generalization，实线+空心三角箭头）：就是一般化/特殊化的继承关系，箭头指向父类，如"动物←狗"。实现（Realization，虚线+空心三角箭头）：类实现接口，箭头指向接口。\n' +
        '看图识关系的诀窍：先看线型（虚线还是实线），再看端点符号（箭头、三角还是菱形、菱形空心还是实心）。',
      diagram: {
        type: 'svg',
        caption: '六种 UML 类间关系的线型与符号对照',
        spec: {
          viewBox: '0 0 480 290',
          content: '<rect x="15" y="28" width="70" height="32" rx="4" fill="#2563eb"/><text x="50" y="49" font-size="13" fill="#ffffff" text-anchor="middle">类A</text><line x1="85" y1="44" x2="155" y2="44" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 4"/><path d="M147 39 L155 44 L147 49" stroke="#dc2626" stroke-width="2" fill="none"/><rect x="155" y="28" width="70" height="32" rx="4" fill="#16a34a"/><text x="190" y="49" font-size="13" fill="#ffffff" text-anchor="middle">类B</text><text x="120" y="86" font-size="13" fill="#f59e0b" text-anchor="middle">依赖：虚线箭头</text><rect x="255" y="28" width="70" height="32" rx="4" fill="#2563eb"/><text x="290" y="49" font-size="13" fill="#ffffff" text-anchor="middle">类A</text><line x1="325" y1="44" x2="395" y2="44" stroke="#dc2626" stroke-width="2"/><rect x="395" y="28" width="70" height="32" rx="4" fill="#16a34a"/><text x="430" y="49" font-size="13" fill="#ffffff" text-anchor="middle">类B</text><text x="360" y="86" font-size="13" fill="#f59e0b" text-anchor="middle">关联：实线</text><rect x="15" y="123" width="70" height="32" rx="4" fill="#2563eb"/><text x="50" y="144" font-size="13" fill="#ffffff" text-anchor="middle">整体</text><path d="M85 139 L97 131 L109 139 L97 147 Z" fill="#ffffff" stroke="#dc2626" stroke-width="2"/><line x1="109" y1="139" x2="155" y2="139" stroke="#dc2626" stroke-width="2"/><rect x="155" y="123" width="70" height="32" rx="4" fill="#16a34a"/><text x="190" y="144" font-size="13" fill="#ffffff" text-anchor="middle">部分</text><text x="120" y="181" font-size="13" fill="#f59e0b" text-anchor="middle">聚合：空心菱形</text><rect x="255" y="123" width="70" height="32" rx="4" fill="#2563eb"/><text x="290" y="144" font-size="13" fill="#ffffff" text-anchor="middle">整体</text><path d="M325 139 L337 131 L349 139 L337 147 Z" fill="#dc2626" stroke="#dc2626" stroke-width="2"/><line x1="349" y1="139" x2="395" y2="139" stroke="#dc2626" stroke-width="2"/><rect x="395" y="123" width="70" height="32" rx="4" fill="#16a34a"/><text x="430" y="144" font-size="13" fill="#ffffff" text-anchor="middle">部分</text><text x="360" y="181" font-size="13" fill="#f59e0b" text-anchor="middle">组合：实心菱形</text><rect x="15" y="218" width="70" height="32" rx="4" fill="#2563eb"/><text x="50" y="239" font-size="13" fill="#ffffff" text-anchor="middle">子类</text><line x1="85" y1="234" x2="155" y2="234" stroke="#dc2626" stroke-width="2"/><path d="M143 227 L155 234 L143 241 Z" fill="#ffffff" stroke="#dc2626" stroke-width="2"/><rect x="155" y="218" width="70" height="32" rx="4" fill="#16a34a"/><text x="190" y="239" font-size="13" fill="#ffffff" text-anchor="middle">父类</text><text x="120" y="276" font-size="13" fill="#f59e0b" text-anchor="middle">泛化：实线+空心三角</text><rect x="255" y="218" width="70" height="32" rx="4" fill="#2563eb"/><text x="290" y="239" font-size="13" fill="#ffffff" text-anchor="middle">类</text><line x1="325" y1="234" x2="395" y2="234" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 4"/><path d="M383 227 L395 234 L383 241 Z" fill="#ffffff" stroke="#dc2626" stroke-width="2"/><rect x="395" y="218" width="70" height="32" rx="4" fill="#16a34a"/><text x="430" y="239" font-size="13" fill="#ffffff" text-anchor="middle">接口</text><text x="360" y="276" font-size="13" fill="#f59e0b" text-anchor="middle">实现：虚线+空心三角</text>'
        }
      }
    },
    {
      h: '顺序图、通信图、状态图与活动图',
      p: '交互类图：顺序图（Sequence Diagram，序列图）和通信图（Communication Diagram，旧版叫协作图）画的是同一件事——对象之间收发消息完成一个场景，但侧重不同。顺序图横向摆对象、纵向画"生命线"（垂直虚线）和细长的"激活条"，消息按时间从上往下排列，强调时间顺序；通信图把对象画成网络节点，消息标"1、2、3…"编号加消息名，强调对象间的组织连接关系。考题爱问"强调时间顺序的是哪个图"——答顺序图。\n' +
        '状态机图（State Diagram）：描述一个对象从生到死经历的所有状态和触发转换的事件。元素：初始伪状态（实心小圆）、状态（圆角矩形）、转换（箭头，可标"事件[条件]/动作"）、终止状态（同心圆）。典型例子：订单的"待支付→已支付→已发货→已完成"。\n' +
        '活动图（Activity Diagram）：像流程图，描述业务或操作的控制流，有开始节点（实心圆）、活动（圆角矩形）、结束节点；比流程图强在支持分支/合并（菱形判断）和分叉/汇合（粗横线，表达并发），还能画泳道（把活动按责任部门/对象分列）。用例的活动流程、工作流建模都用它。'
    }
  ],
  keyPoints: [
    '类是对象的抽象（模板/图纸），对象是类的实例；对象三要素：标识、状态、行为',
    '封装隐藏细节留接口；继承表达 is-a 关系、实现复用；多态=同一消息不同对象不同响应',
    '重载（Overload）：同一类中方法名同、参数列表不同，是编译时（静态）多态；仅返回值不同不构成重载',
    '重写（Override）：子类重定义父类方法，方法名、参数签名一致，是运行时（动态）多态',
    'UML 分类必背：结构图=类图/对象图/构件图/部署图/包图；行为图=用例图/活动图/状态机图/交互图（顺序图+通信图）',
    '类间关系强度：实现/泛化 > 组合 > 聚合 > 关联 > 依赖；符号：虚线箭头=依赖、实线=关联、空心菱形=聚合、实心菱形=组合、实线空心三角=泛化、虚线空心三角=实现',
    '聚合与组合的判据：部分能否脱离整体独立存在（班级-学生=聚合；订单-订单明细、身体-心脏=组合）',
    'include 必选、箭头由基础用例指向被包含用例；extend 条件可选、箭头由扩展用例指向基础用例（带[守卫条件]）',
    '顺序图强调消息时间顺序（生命线竖直），通信图强调对象组织关系（消息编号）；状态图看一个对象的状态变迁，活动图看流程且支持并发（分叉/汇合粗横线）与泳道',
    '多重性记号：1=恰好一个，*=0或多个（0..*），0..1=至多一个，1..*=至少一个'
  ],
  tips: [
    '关系符号口诀："依赖虚箭头、关联一条线、聚空组实菱、泛化三角指爹"——空心菱形聚合、实心菱形组合，记住"实心=一条路走到黑（生死与共）"',
    'include/extend 方向记法："包含指向被包含，扩展指向被扩展"——箭头永远指向"被"字后面那个用例',
    '分不清聚合还是组合就问一句："整体没了，部分还能独立活着吗？"能=聚合，不能=组合',
    '行为图/结构图判断题：凡是"图里有静态方框连关系"的（类、对象、构件、部署）归结构；凡是"演情节、跑流程"的（用例、顺序、通信、状态、活动）归行为',
    '上午卷策略：本章概念题 2~3 分钟拿下，遇到"图中符号表示什么关系"先圈线型（虚/实）再看端点符号，两步出答案'
  ]
}
