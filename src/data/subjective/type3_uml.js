// 下午卷主观题例题 —— 题型三：UML建模（类图 / 用例图 / 顺序图，各1题，图类型互不相同）
export default [
  {
    id: 'sub_uml_01',
    type: 'uml',
    typeName: 'UML建模',
    title: '图书馆管理系统——补全类图（属性、方法、关系与多重度）',
    stem: '【说明】某高校图书馆欲开发管理系统，需求如下：\n（1）每位注册读者都有 cardNumber（借书证号）与 name（姓名），并能进行“借阅图书 borrowBook()”与“归还图书”两种操作，“归还图书”方法的完整形式是图1中的空(2)（无返回值）；\n（2）每次借阅产生一条借阅记录 BorrowRecord，记录 borrowDate（借出日期）与 returnDate（归还日期）；该类还需提供计算滞纳金的方法 getOverdueFee()，返回值类型为 double、无参数，其在类图中的完整书写形式是图1中的空(1)；\n（3）一位读者可以产生多条借阅记录，每条借阅记录只对应一位读者；每条借阅记录只对应一本书，一本书可出现在多条借阅记录中。请据此补全图1中（a）、（b）两处多重度；\n（4）读者分为教职工（Faculty）与学生（CollegeStudent）两类，它们与 Reader 之间的关系在图1中标为 (c)。\n\n【问题1】（4分）根据说明，写出类图中方法空缺的完整形式：(1)______；(2)______（须按 UML 的“方法名(参数): 返回类型”格式书写）。\n【问题2】（4分）补全关联关系上的多重度：(a)______；(b)______。\n【问题3】（4分）(c) 表示什么 UML 关系？空心三角箭头应指向哪个类？该关系在 Java/C++ 语言中通常被称为什么？\n【问题4】（3分）简述聚合与组合的区别，并各举一个例子。\n（本题共15分）',
    diagram: {
      type: 'svg',
      caption: '图1 图书馆管理系统部分类图（含待补全空缺）',
      spec: {
        viewBox: '0 0 560 260',
        content: '<rect x="25" y="25" width="150" height="110" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<line x1="25" y1="50" x2="175" y2="50" stroke="#2563eb" stroke-width="1.5" />' +
          '<line x1="25" y1="88" x2="175" y2="88" stroke="#2563eb" stroke-width="1.5" />' +
          '<text x="100" y="43" font-size="14" font-weight="bold" fill="#2563eb" text-anchor="middle">Reader</text>' +
          '<text x="31" y="67" font-size="12" fill="#1e293b">cardNumber: String</text>' +
          '<text x="31" y="83" font-size="12" fill="#1e293b">name: String</text>' +
          '<text x="31" y="104" font-size="12" fill="#1e293b">borrowBook(): void</text>' +
          '<text x="31" y="122" font-size="12" fill="#f59e0b">(2): ______</text>' +
          '<rect x="205" y="25" width="170" height="110" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />' +
          '<line x1="205" y1="50" x2="375" y2="50" stroke="#16a34a" stroke-width="1.5" />' +
          '<line x1="205" y1="88" x2="375" y2="88" stroke="#16a34a" stroke-width="1.5" />' +
          '<text x="290" y="43" font-size="14" font-weight="bold" fill="#16a34a" text-anchor="middle">BorrowRecord</text>' +
          '<text x="211" y="67" font-size="12" fill="#1e293b">borrowDate: Date</text>' +
          '<text x="211" y="83" font-size="12" fill="#1e293b">returnDate: Date</text>' +
          '<text x="211" y="112" font-size="12" fill="#f59e0b">(1): ______</text>' +
          '<rect x="405" y="25" width="140" height="110" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<line x1="405" y1="50" x2="545" y2="50" stroke="#2563eb" stroke-width="1.5" />' +
          '<line x1="405" y1="88" x2="545" y2="88" stroke="#2563eb" stroke-width="1.5" />' +
          '<text x="475" y="43" font-size="14" font-weight="bold" fill="#2563eb" text-anchor="middle">Book</text>' +
          '<text x="411" y="67" font-size="12" fill="#1e293b">ISBN: String</text>' +
          '<text x="411" y="83" font-size="12" fill="#1e293b">bookName: String</text>' +
          '<text x="411" y="104" font-size="12" fill="#1e293b">searchInfo(): String</text>' +
          '<line x1="175" y1="80" x2="205" y2="80" stroke="#1e293b" stroke-width="2" />' +
          '<text x="177" y="72" font-size="12" font-weight="bold" fill="#dc2626">1</text>' +
          '<text x="190" y="96" font-size="12" font-weight="bold" fill="#f59e0b">(a)</text>' +
          '<line x1="375" y1="80" x2="405" y2="80" stroke="#1e293b" stroke-width="2" />' +
          '<text x="377" y="72" font-size="12" font-weight="bold" fill="#dc2626">*</text>' +
          '<text x="392" y="96" font-size="12" font-weight="bold" fill="#f59e0b">(b)</text>' +
          '<rect x="25" y="200" width="120" height="36" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />' +
          '<text x="85" y="223" font-size="13" fill="#16a34a" text-anchor="middle">CollegeStudent</text>' +
          '<rect x="170" y="200" width="120" height="36" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />' +
          '<text x="230" y="223" font-size="13" fill="#16a34a" text-anchor="middle">Faculty</text>' +
          '<line x1="85" y1="200" x2="85" y2="152" stroke="#16a34a" stroke-width="2" />' +
          '<line x1="230" y1="200" x2="230" y2="152" stroke="#16a34a" stroke-width="2" />' +
          '<line x1="85" y1="152" x2="230" y2="152" stroke="#16a34a" stroke-width="2" />' +
          '<polygon points="100,135 92,152 108,152" fill="#ffffff" stroke="#16a34a" stroke-width="2" />' +
          '<text x="140" y="149" font-size="12" font-weight="bold" fill="#f59e0b">(c)</text>'
      }
    },
    approach: '类图题只需三步，零基础也能照做：\n第一步“找名词填类”：说明中出现的“读者、借阅记录、书”这些名词就是类；名词后面的“借书证号、姓名、日期”等就是属性；“记录在类图第三栏（最下一栏）”的位置一定写方法。\n第二步“对着动词抄方法”：UML 中方法的标准格式是 方法名(参数列表): 返回值类型。说明（1）说“归还图书，无返回值”，无返回值在 UML 里写 void，所以 (2) 就是 returnBook(): void；说明（2）说方法名已定为 getOverdueFee、返回 double、无参数，所以 (1) 就是 getOverdueFee(): double。注意：冒号、括号、空格都算格式分，别写成程序代码的 int getOverdueFee()。\n第三步“数个数填多重度”：多重度写在关联线两端，表示“一端的 1 个对象对应另一端的几个对象”。(a) 在 Reader 与 BorrowRecord 连线上靠近 Reader 的一端？看图：1 已标在 Reader 端，(a) 标在 BorrowRecord 端——“一位读者可产生多条借阅记录”，故 (a)=0..*（写 * 也对）。(b) 在 Book 端——“每条借阅记录只对应一本书”，故 (b)=1。\n最后看 (c)：带空心三角箭头的线是泛化（一般/特殊）关系，三角永远指向“父类/一般概念”，即 Reader；学生、教职工“是一种”读者，这就是 Java 里的继承（extends）。',
    scorePoints: [
      '问题1：(1) 写出 getOverdueFee(): double 得2分（格式必须为“方法名(): 返回类型”）；(2) 写出 returnBook(): void 得2分',
      '问题2：(a) 答 0..* 或 * 得2分；(b) 答 1 得2分——写反位置不得分，看清标注在哪一端',
      '问题3：答出“泛化关系（一般与特殊）”得2分；说明空心三角箭头指向父类 Reader 得1分；答出对应 Java/C++ 的“继承”得1分',
      '问题4：答出“组合是强整体-部分，整体消亡部分也消亡，聚合是弱拥有关系，部分可独立存在”得2分；各举一例（如：公司-部门是组合；班级-学生是聚合）得1分',
      '格式分意识：属性写成 名字: 类型，方法写成 名字(参数): 返回类型，与图中已有栏位保持一致即不丢冤枉分'
    ],
    referenceAnswer: '问题1：(1) getOverdueFee(): double；(2) returnBook(): void。\n问题2：(a) 0..*（或 *）；(b) 1。\n问题3：(c) 是泛化（Generalization，一般/特殊）关系；空心三角箭头指向超类（父类）Reader；在 Java/C++ 中即继承关系（Faculty、CollegeStudent 是 Reader 的子类，可用 extends 实现）。\n问题4：聚合表示“拥有”关系（has-a），部分是独立的对象，整体销毁部分依然存在，如“班级聚合学生”（学生退班仍存在）；组合表示“组成”关系（contains-a，强聚合），部分依附于整体而存在，生命周期一致，如“公司由部门组成”，公司注销则部门随之撤销。组合在类图中用实心菱形（◆画在整体端）表示，聚合用空心菱形（◇）表示。',
    quickScoringTip: '类图填空口诀：“名词变类、属性冒号、方法带括号、无返回写 void；多重度看两端，1 对多端写 *；三角指父类，实心菱形是组合”。答题时把图中已给出的栏位格式原样模仿（名字: 类型），永远不要写成 C/Java 代码的顺序（类型在前），这一个细节就是 2 分。'
  },
  {
    id: 'sub_uml_02',
    type: 'uml',
    typeName: 'UML建模',
    title: '在线点餐系统——用例图补全与 include/extend 关系判断',
    stem: '【说明】某外卖平台开发在线点餐系统，需求调查结果如下：\n（1）注册会员可以提交订单，也可以在“提交订单”后进入“支付”；支付成功后 24 小时内，会员可对已支付订单发起“申请退款”（是否退款完全由用户决定，不是每次支付都会发生）；\n（2）“提交订单”生效之前，系统必须核查库存，缺库存则订单不成立——即每次提交订单都隐含执行“检查库存”；\n（3）执行“支付”时系统必须校验支付密码——每次支付都隐含“检验 Password”（即“验证密码”）；\n(4) 当支付因余额不足而失败时，系统会引导用户改用第三方支付（该行为只在“余额不足”这一条件下、且并非每次支付都会发生）。\n图2 是该系统的用例图（不完整），其中椭圆表示用例，火柴人表示参与者，虚线箭头表示用例间的依赖关系，(1) 为一个待定名的用例，(2) 为待定的关系标记。\n\n【问题1】（4分）按说明写出用例 (1) 的名称；再指出说明中隐含但图2 未画出的一条用例（供会员使用）。\n【问题2】（4分）(2) 处应填的关系标记是什么？该虚线箭头的方向是从哪个用例指向哪个用例？“验证密码”与“支付”之间是什么关系？\n【问题3】（4分）针对“引导再次支付（余额不足时）”，它应作为“支付”的 include 还是 extend？箭头方向如何？说明理由。\n【问题4】（3分）用一句话分别概括 include 与 extend 的核心区别。\n（本题共15分）',
    diagram: {
      type: 'svg',
      caption: '图2 在线点餐系统用例图（含待定空缺 (1)(2)）',
      spec: {
        viewBox: '0 0 560 340',
        content: '<rect x="150" y="18" width="395" height="305" fill="none" stroke="#2563eb" stroke-width="2" />' +
          '<text x="347" y="40" font-size="14" font-weight="bold" fill="#2563eb" text-anchor="middle">在线点餐系统</text>' +
          '<circle cx="70" cy="140" r="11" fill="none" stroke="#16a34a" stroke-width="2" />' +
          '<line x1="70" y1="151" x2="70" y2="182" stroke="#16a34a" stroke-width="2" />' +
          '<line x1="52" y1="162" x2="88" y2="162" stroke="#16a34a" stroke-width="2" />' +
          '<line x1="70" y1="182" x2="58" y2="204" stroke="#16a34a" stroke-width="2" />' +
          '<line x1="70" y1="182" x2="82" y2="204" stroke="#16a34a" stroke-width="2" />' +
          '<text x="70" y="222" font-size="13" fill="#16a34a" text-anchor="middle">注册会员</text>' +
          '<circle cx="95" cy="247" r="10" fill="none" stroke="#dc2626" stroke-width="2" />' +
          '<line x1="95" y1="257" x2="95" y2="282" stroke="#dc2626" stroke-width="2" />' +
          '<line x1="78" y1="266" x2="112" y2="266" stroke="#dc2626" stroke-width="2" />' +
          '<line x1="95" y1="282" x2="85" y2="302" stroke="#dc2626" stroke-width="2" />' +
          '<line x1="95" y1="282" x2="105" y2="302" stroke="#dc2626" stroke-width="2" />' +
          '<text x="72" y="322" font-size="12" fill="#dc2626">第三方支付平台</text>' +
          '<line x1="80" y1="155" x2="208" y2="95" stroke="#64748b" stroke-width="1.5" />' +
          '<line x1="80" y1="168" x2="207" y2="172" stroke="#64748b" stroke-width="1.5" />' +
          '<line x1="78" y1="185" x2="207" y2="252" stroke="#64748b" stroke-width="1.5" />' +
          '<line x1="112" y1="258" x2="215" y2="190" stroke="#64748b" stroke-width="1.5" />' +
          '<ellipse cx="265" cy="88" rx="58" ry="24" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<text x="265" y="93" font-size="13" fill="#1e293b" text-anchor="middle">提交订单</text>' +
          '<ellipse cx="265" cy="172" rx="58" ry="24" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<text x="265" y="177" font-size="13" fill="#1e293b" text-anchor="middle">支付</text>' +
          '<ellipse cx="265" cy="258" rx="58" ry="24" fill="#fffbeb" stroke="#f59e0b" stroke-width="2" />' +
          '<text x="265" y="263" font-size="13" fill="#f59e0b" text-anchor="middle">(1) ______</text>' +
          '<ellipse cx="458" cy="88" rx="54" ry="22" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<text x="458" y="93" font-size="13" fill="#1e293b" text-anchor="middle">检查库存</text>' +
          '<ellipse cx="458" cy="172" rx="54" ry="22" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<text x="458" y="177" font-size="13" fill="#1e293b" text-anchor="middle">验证密码</text>' +
          '<line x1="323" y1="88" x2="400" y2="88" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<polygon points="404,88 394,84 394,92" fill="#dc2626" />' +
          '<text x="364" y="80" font-size="12" fill="#dc2626" text-anchor="middle">&lt;&lt;include&gt;&gt;</text>' +
          '<line x1="323" y1="172" x2="400" y2="172" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<polygon points="404,172 394,168 394,176" fill="#dc2626" />' +
          '<text x="364" y="164" font-size="12" fill="#dc2626" text-anchor="middle">&lt;&lt;include&gt;&gt;</text>' +
          '<line x1="265" y1="234" x2="265" y2="204" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<polygon points="265,200 261,210 269,210" fill="#dc2626" />' +
          '<text x="272" y="222" font-size="12" fill="#f59e0b">(2): ______</text>'
      }
    },
    approach: '用例图题的胜负点只有一个：include 还是 extend，以及箭头方向。手把手判断法：\n第一步：把每个用例问一句“它每次都发生吗？”——每次都必定执行的公共步骤是 include（包含），只在特定条件下、由用户或系统决定是否触发的是 extend（扩展）。本题“检查库存”“验证密码”每次都做 → include（图上已标出）；“申请退款”不是每次支付都发生 → extend。\n第二步：背死两个方向规则：include 的虚线箭头从“基础用例”指向“被包含用例”（提交订单 → 检查库存）；extend 的虚线箭头从“扩展用例”指向“被扩展（基础）用例”（申请退款 → 支付）。两个箭头方向正好相反，这是最常考的坑。\n第三步：定 (1) 的名称——说明（1）最后一句“会员可发起申请退款”，且图中 (1) 由注册会员直接触发、又指向“支付”，所以 (1)=申请退款。图中未画出的用例可从说明里找动词：会员显然要“浏览菜品/查询菜单、登录”，任写其一即可。\n第四步：(2) 处填关系标记：申请退款是“支付”的可选后续行为，所以填 <<extend>>。\n问题4 用一句话模板作答：“include 是把多个用例共用的功能抽取出来、必然执行；extend 是在基础用例的某条件下可选地增加行为。”',
    scorePoints: [
      '问题1：(1) 答“申请退款”得2分；再补一条合理用例（登录 / 浏览菜品 / 查询订单等）得2分——必须是会员发起的行为，答“检查库存”不得分',
      '问题2：(2) 填 <<extend>> 得1分；方向“由扩展用例（申请退款）指向基础用例（支付）”得2分；“验证密码”与“支付”是 include（包含）关系得1分',
      '问题3：判定为 extend 得1分；箭头“引导再次支付 → 支付”得1分；理由含“仅在余额不足条件下发生、可选非必选”得2分',
      '问题4：include“必选、复用公共功能，基础→被包含”、extend“可选、附加扩展，扩展→基础”各答出核心词得1.5分',
      '规范分：关系标记必须带双尖括号写成 <<include>>/<<extend>>，参与者与用例之间用实线、用例之间用虚线箭头'
    ],
    referenceAnswer: '问题1：(1) 为“申请退款”。图中隐含但未画出的用例，如：“登录”（或“浏览菜品”“查询订单状态”，合理即可）。\n问题2：(2) 应填 <<extend>>（扩展关系）。虚线箭头从扩展用例“申请退款”指向被扩展的基础用例“支付”。每次支付都必须验证密码，“验证密码”是“支付”的包含用例，即 include 关系（箭头从“支付”指向“验证密码”，图中已画出）。\n问题3：应作为“支付”的 extend 扩展；虚线箭头从“引导再次支付”（扩展用例）指向“支付”（基础用例）。理由：它只在“余额不足导致支付失败”这一特定条件下才发生，属于可选行为，不是每次支付都执行，因此是扩展而非包含。\n问题4：include（包含）：基础用例在执行时必然调用被包含用例，用于抽取多个用例的公共功能，方向为“基础 → 被包含”；extend（扩展）：在满足特定条件时才把附加行为插入基础用例，是可选的，方向为“扩展 → 基础”。',
    quickScoringTip: '用例图口诀：“每次必做是 include，有条件选做是 extend；include 箭头指被含，extend 箭头指回去（扩展指向基础）”。判断犹豫时就问自己：去掉该步骤主用例还能完整执行吗？能→extend，不能→include。书写时尖括号 << >>、虚线、箭头方向三样齐全才能拿满分。'
  },
  {
    id: 'sub_uml_03',
    type: 'uml',
    typeName: 'UML建模',
    title: 'ATM取现——顺序图（时序图）的消息、生命线与时序理解',
    stem: '【说明】图3 是 ATM 取款业务的顺序图。涉及的对象（生命线）从左到右为：顾客、ATM终端、银行主机、出钞装置。交互过程：\n① 顾客向 ATM 终端“插入银行卡”；\n② ATM 终端把卡号与密码组成的验证请求发给“银行主机”；\n③ 银行主机校验后将“返回验证结果”送回 ATM 终端（消息本身不带数据变化，只回送结果，用虚线箭头）；\n④ 验证通过后，ATM 终端向“出钞装置”发出编号④的消息（其名称为空(1)）；\n⑤ 出钞装置完成出钞后向 ATM 终端虚线回送“返回出钞完成”；\n⑥ 最后 ATM 终端向顾客发出编号⑥的消息（其内容为空(2)：交还银行卡并打印凭条）。\n图中生命线顶部的竖直细长矩形为“激活条”。\n\n【问题1】（4分）按说明补全消息：(1)______；(2)______（动词开头，与图中其他消息风格一致，如“dispenseCash()”或“发出钞票”均可）。\n【问题2】（4分）图中实线箭头（如①②④）与虚线箭头（如③⑤⑥）分别表示什么消息？虚线箭头消息通常发生在紧随其后的哪个时机？\n【问题3】（4分）顺序图的竖直方向表示什么？生命线（竖虚线）与激活条（细长矩形）各表示什么含义？\n【问题4】（3分）顺序图与通信图（协作图）都描述对象交互，顺序图特别强调的是什么？\n（本题共15分）',
    diagram: {
      type: 'svg',
      caption: '图3 ATM取款业务顺序图（(1)(2)为待补全消息）',
      spec: {
        viewBox: '0 0 560 340',
        content: '<rect x="22" y="18" width="96" height="28" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<text x="70" y="37" font-size="13" font-weight="bold" fill="#2563eb" text-anchor="middle">顾客</text>' +
          '<rect x="157" y="18" width="96" height="28" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<text x="205" y="37" font-size="13" font-weight="bold" fill="#2563eb" text-anchor="middle">ATM终端</text>' +
          '<rect x="297" y="18" width="96" height="28" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />' +
          '<text x="345" y="37" font-size="13" font-weight="bold" fill="#16a34a" text-anchor="middle">银行主机</text>' +
          '<rect x="437" y="18" width="96" height="28" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />' +
          '<text x="485" y="37" font-size="13" font-weight="bold" fill="#f59e0b" text-anchor="middle">出钞装置</text>' +
          '<line x1="70" y1="46" x2="70" y2="330" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<line x1="205" y1="46" x2="205" y2="330" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<line x1="345" y1="46" x2="345" y2="330" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<line x1="485" y1="46" x2="485" y2="330" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<rect x="201" y="76" width="8" height="200" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />' +
          '<rect x="341" y="110" width="8" height="40" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />' +
          '<rect x="481" y="188" width="8" height="42" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />' +
          '<line x1="70" y1="80" x2="197" y2="80" stroke="#2563eb" stroke-width="1.5" />' +
          '<polygon points="201,80 191,76 191,84" fill="#2563eb" />' +
          '<text x="136" y="72" font-size="12" fill="#1e293b" text-anchor="middle">① insertBankCard() 插卡</text>' +
          '<line x1="209" y1="115" x2="337" y2="115" stroke="#2563eb" stroke-width="1.5" />' +
          '<polygon points="341,115 331,111 331,119" fill="#2563eb" />' +
          '<text x="275" y="107" font-size="12" fill="#1e293b" text-anchor="middle">② 密码验证请求</text>' +
          '<line x1="341" y1="150" x2="213" y2="150" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<polygon points="209,150 219,146 219,154" fill="#16a34a" />' +
          '<text x="275" y="142" font-size="12" fill="#1e293b" text-anchor="middle">③ 返回验证结果</text>' +
          '<line x1="209" y1="192" x2="477" y2="192" stroke="#2563eb" stroke-width="1.5" />' +
          '<polygon points="481,192 471,188 471,196" fill="#2563eb" />' +
          '<text x="345" y="184" font-size="12" fill="#f59e0b" text-anchor="middle">④ (1): ______</text>' +
          '<line x1="481" y1="228" x2="213" y2="228" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<polygon points="209,228 219,224 219,232" fill="#16a34a" />' +
          '<text x="345" y="220" font-size="12" fill="#1e293b" text-anchor="middle">⑤ 返回出钞完成</text>' +
          '<line x1="201" y1="268" x2="78" y2="268" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<polygon points="74,268 84,264 84,272" fill="#16a34a" />' +
          '<text x="137" y="260" font-size="12" fill="#f59e0b" text-anchor="middle">⑥ (2): ______</text>'
      }
    },
    approach: '顺序图=“把对话按时间拍扁成竖排聊天记录”，读图与补图各三步：\n第一步认元素：顶部方框是对象，向下的竖虚线是生命线（对象存在的时间轴），越往下时间越晚；箭头水平、箭尾在哪条线就是哪个对象发出，箭头碰到哪条线就是发给哪个对象。\n第二步补消息（问题1）：照“动词+宾语”模板抄说明——步骤④说明写明“ATM 向出钞装置发出(1)”，其后一步是“完成出钞”，所以 (1) 是“命令出钞/发出钞票 dispenseCash()”；步骤⑥面向顾客且业务结束，说明已给出“交还银行卡并打印凭条”，照抄成一条消息名即可。一条线只能写一个消息名，别把两句并成一句。\n第三步认线型（问题2）：实线箭头=调用消息（请求），虚线箭头=返回消息；返回消息总是紧跟在它应答的那次调用之后（③紧跟②）。考试送分句：“实线调用、虚线返回”。\n问题3、4 是默写型概念：竖直方向=时间；激活条=对象执行操作的活跃期/控制焦点；顺序图的招牌词=“按时间顺序”，通信图招牌词=“对象连接关系”。凡记不全，写出“时间顺序”四个字就有分。',
    scorePoints: [
      '问题1：(1) 答出 dispenseCash()/命令出钞/发出钞票 等表示“通知出钞装置出钞”的消息得2分；(2) 答出“交还银行卡并打印凭条”（returnCardAndReceipt）得2分',
      '问题2：实线=调用（请求/接收对象收到的消息）得1.5分；虚线=返回（响应）消息得1.5分；指出“返回消息紧跟对应调用之后发生”得1分',
      '问题3：竖直方向表示时间（自上而下时间递增）得1分；生命线=对象存在的生命周期得1分；激活条=对象执行动作的活跃期（控制焦点）得2分',
      '问题4：答出顺序图强调“消息发送的时间先后顺序”得2分；点出与通信图“强调对象间空间连接关系”相对照得1分',
      '作答规范：消息名后带括号、一行只写一条消息、箭头起止生命线写对，可避免非知识性丢分'
    ],
    referenceAnswer: '问题1：(1) dispenseCash()（“命令出钞/发出钞票”，与说明一致即可）；(2) returnCardAndReceipt()（“交还银行卡并打印凭条”）。\n问题2：实线箭头表示对象之间发送的调用（请求）消息，即发送者同步地要求接收者完成某动作；虚线箭头表示返回（响应）消息，即调用执行完毕后回送给调用者的结果。返回消息发生在紧随其后的、对它所应答的那次调用消息做出响应之时（如③在②之后、⑤在④之后）。\n问题3：竖直方向表示时间，自上而下时间递增；每个对象下方的竖直虚线是该对象的生命线，表示对象在一段时间内的存在；生命线顶端的细长矩形是激活条（执行说明），表示该对象正在执行某个操作、处于活跃（控制焦点）的时间段，如 ATM 终端从插卡到退卡一直处于激活状态。\n问题4：顺序图特别强调对象之间消息交互的时间先后顺序（沿竖直方向按时间排列消息），而通信图同样描述交互但强调的是参与交互对象之间的连接（空间协作）关系。',
    quickScoringTip: '顺序图口诀：“从上到下是时间，谁发线尾指谁，实线调用虚线回，细条是干活期（激活条）”。补消息时不自己造词，直接抄说明中的“动词+宾语”；概念问用固定三句话模板（生命线=存在时间、激活条=执行期、返回消息=紧跟调用之后），这三句在历年真题里反复出现，背一次赚多次。'
  }
]
