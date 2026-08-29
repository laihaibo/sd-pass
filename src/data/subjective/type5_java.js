// 下午卷主观题例题 —— 题型五：Java面向对象程序设计（代码填空，贴近软考真题风格）
export default [
  {
    id: 'sub_java_01',
    type: 'java',
    typeName: 'Java面向对象程序设计',
    title: '员工工资系统——抽象类、继承与多态',
    stem: '【说明】某公司开发工资子系统：员工分为“销售人员”与“经理”两类。销售人员月薪 = 基本工资 + 销售提成；经理月薪 = 基本工资 + 岗位津贴。因为“员工”是抽象概念、不能直接创建员工对象，所以 Employee 声明为抽象类，并把“计算月薪”声明为抽象方法，由子类给出具体算法；主程序把两类员工放进同一个 Employee 数组，用循环统一调用 getSalary() 与 toString()——这就是“一个引用变量，根据所指向对象的不同自动调用各自实现”的多态机制。\n类结构：Employee（抽象父类）——SalesEmployee、ManagerEmployee（两个子类）；Payroll 为测试类。\n\n【Java代码】\n___(1)___ class Employee {\n    private String name;\n    private double baseSalary;\n    public Employee(String name, double baseSalary) {\n        this.name = name;\n        this.baseSalary = baseSalary;\n    }\n    public double getBaseSalary() { return baseSalary; }\n    public ___(2)___ double getSalary();\n    public String toString() {\n        return "姓名:" + name + ", 月薪:" + getSalary();\n    }\n}\n\nclass SalesEmployee ___(3)___ Employee {\n    private double commission;\n    public SalesEmployee(String name, double baseSalary, double commission) {\n        ___(4)___(name, baseSalary);\n        this.commission = commission;\n    }\n    public double getSalary() {\n        return ___(5)___ + commission;\n    }\n}\n\nclass ManagerEmployee extends Employee {\n    private double allowance;\n    public ManagerEmployee(String name, double baseSalary, double allowance) {\n        super(name, baseSalary);\n        this.allowance = allowance;\n    }\n    public double getSalary() {\n        return getBaseSalary() + allowance;\n    }\n}\n\npublic class Payroll {\n    public static void main(String[] args) {\n        Employee[] staff = new Employee[2];\n        staff[0] = new SalesEmployee("小王", 3000, 2500);\n        staff[1] = new ManagerEmployee("小李", 6000, 1000);\n        double total = 0;\n        for (int i = 0; i < staff.length; i++) {\n            total += staff[i].getSalary();\n        }\n        System.out.println("团队月薪总额:" + total);\n        for (Employee e : staff) {\n            System.out.println(e.toString());\n        }\n    }\n}\n\n【问题】请补全代码中的空缺 (1)~(5)。\n（本题共15分，每空3分）\n程序运行输出（供核对）：团队月薪总额:12500.0 / 姓名:小王, 月薪:5500.0 / 姓名:小李, 月薪:7000.0',
    diagram: {
      type: 'svg',
      caption: '员工工资系统类结构（泛化关系：子类指向父类）',
      spec: {
        viewBox: '0 0 560 250',
        content: '<rect x="180" y="20" width="200" height="96" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<line x1="180" y1="46" x2="380" y2="46" stroke="#2563eb" stroke-width="1.5" />' +
          '<line x1="180" y1="76" x2="380" y2="76" stroke="#2563eb" stroke-width="1.5" />' +
          '<text x="280" y="39" font-size="14" font-weight="bold" fill="#2563eb" text-anchor="middle">Employee（抽象类）</text>' +
          '<text x="186" y="62" font-size="12" fill="#1e293b">-name: String  -baseSalary: double</text>' +
          '<text x="186" y="92" font-size="12" font-style="italic" fill="#1e293b">+getSalary(): double（抽象方法）</text>' +
          '<text x="186" y="110" font-size="12" fill="#1e293b">+getBaseSalary(): double</text>' +
          '<polygon points="280,116 272,132 288,132" fill="#ffffff" stroke="#16a34a" stroke-width="2" />' +
          '<line x1="120" y1="200" x2="120" y2="132" stroke="#16a34a" stroke-width="2" />' +
          '<line x1="440" y1="200" x2="440" y2="132" stroke="#16a34a" stroke-width="2" />' +
          '<line x1="120" y1="132" x2="440" y2="132" stroke="#16a34a" stroke-width="2" />' +
          '<polygon points="280,116 272,132 288,132" fill="#eff6ff" stroke="#16a34a" stroke-width="2" />' +
          '<rect x="40" y="200" width="160" height="44" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />' +
          '<text x="120" y="219" font-size="13" font-weight="bold" fill="#16a34a" text-anchor="middle">SalesEmployee</text>' +
          '<text x="120" y="237" font-size="12" fill="#1e293b" text-anchor="middle">+getSalary() 重写</text>' +
          '<rect x="360" y="200" width="160" height="44" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />' +
          '<text x="440" y="219" font-size="13" font-weight="bold" fill="#16a34a" text-anchor="middle">ManagerEmployee</text>' +
          '<text x="440" y="237" font-size="12" fill="#1e293b" text-anchor="middle">+getSalary() 重写</text>' +
          '<text x="310" y="160" font-size="12" fill="#dc2626" text-anchor="middle">extends（泛化/继承），空心三角指向父类</text>'
      }
    },
    approach: 'Java 面向对象填空按“看修饰、看父子、看谁调谁”三步走：\n(1) 看后文：Employee 里出现了没有方法体的 getSalary()，且说明写“不能直接创建员工对象”——带抽象方法或不允许实例化的类必须加 abstract，填 abstract。\n(2) 抽象方法的声明格式 = 访问修饰 + abstract + 返回类型 + 方法名 + 参数 + 分号，没有大括号。已有 public 与 double getSalary();，缺的正是 abstract，填 abstract。\n(3) 类与父类的关系关键词：SalesEmployee“是一种”Employee，Java 单继承用 extends（implements 只用于接口），填 extends。\n(4) 子类构造器里初始化从父类继承来的 name、baseSalary：private 字段子类碰不到，必须调用父类构造器，语法是 super(实参列表) 且必须是子类构造器第一条语句，填 super。\n(5) 算销售月薪 = 基本工资 + 提成。基本工资 baseSalary 是父类 private，子类不能直接引用，只能走父类提供的 public 方法 getBaseSalary()，填 getBaseSalary()。\n最后拿输出核对：staff[0].getSalary() = 3000+2500 = 5500，staff[1] = 6000+1000 = 7000，total = 12500.0，与题目提示一致。注意数组元素声明类型是 Employee，运行时指向子类对象，Java 动态绑定自动各调各的 getSalary()——这就是多态。',
    scorePoints: [
      '(1) abstract 得3分（拼写必须完整，答 abstractly/不填不得分）',
      '(2) abstract 得3分——抽象方法“有声明无方法体”，与 {} 空方法体是两回事',
      '(3) extends 得3分（答 implements 不得分：Employee 是类不是接口）',
      '(4) super 得3分（完整写 super(name, baseSalary) 也给分；答案须体现“用父类构造器初始化继承字段”）',
      '(5) getBaseSalary() 得3分（写 this.baseSalary 不得分——baseSalary 是父类 private，子类不可见）',
      '多态概念配套问：能答出“父类引用指向子类对象，调用方法时运行时绑定到子类重写版本”即可拿下同类真题的概念小问'
    ],
    referenceAnswer: '(1) abstract\n(2) abstract\n(3) extends\n(4) super（即调用父类构造器 super(name, baseSalary);）\n(5) getBaseSalary()\n\n完整关键片段：\nabstract class Employee {\n    private String name;\n    private double baseSalary;\n    public Employee(String name, double baseSalary) { this.name = name; this.baseSalary = baseSalary; }\n    public double getBaseSalary() { return baseSalary; }\n    public abstract double getSalary();\n    public String toString() { return "姓名:" + name + ", 月薪:" + getSalary(); }\n}\nclass SalesEmployee extends Employee {\n    private double commission;\n    public SalesEmployee(String name, double baseSalary, double commission) {\n        super(name, baseSalary);\n        this.commission = commission;\n    }\n    public double getSalary() { return getBaseSalary() + commission; }\n}\n\n解析要点：①含抽象方法的类必须声明为抽象类，抽象类不能被 new；②抽象方法以分号结尾、无方法体，子类必须重写（除非子类也是抽象类）；③super(...) 调用父类构造器且必须位于子类构造器第一行；④父类 private 字段对子类不可见，需通过 public 的 getter 访问；⑤Employee[] 数组配合动态绑定，staff[i].getSalary() 按实际对象类型分别执行 SalesEmployee 或 ManagerEmployee 的重写版本（多态）。程序输出：团队月薪总额:12500.0、姓名:小王, 月薪:5500.0、姓名:小李, 月薪:7000.0。',
    quickScoringTip: 'Java 继承类填空固定四件套：abstract（类/方法）、extends（类继承类）、implements（类实现接口）、super(参数)（子类构造器首行调父类）。判断口诀：见“无方法体的方法”前面缺词→abstract；见“class X ___ Y”且 Y 是类→extends；见子类构造器里初始化父类字段的一行→super(...)；见访问父类私有数据→只能调父类的 getXxx() 公开方法。填完拿 main 里 new 的实参代入输出验算一遍，5 分变 15 分的把握。'
  },
  {
    id: 'sub_java_02',
    type: 'java',
    typeName: 'Java面向对象程序设计',
    title: '在线支付——接口与策略模式（运行时切换支付算法）',
    stem: '【说明】某电商购物车支持多种支付方式：微信支付打 95 折；银行卡支付按 0.6% 收手续费、单笔手续费封顶 50 元。为便于以后增加新支付方式而不改动购物车代码，采用策略模式：把每种支付方式抽象成接口 PayStrategy（含方法 pay，参数为订单金额，返回实际支付总额），各支付方式是实现类，购物车 ShoppingCart 只面向接口编程，内部持有一个策略引用，可在运行时通过 setStrategy 随时切换。\n\n【Java代码】\ninterface PayStrategy {\n    ___(1)___;\n}\n\nclass WechatPay implements PayStrategy {\n    public double pay(double amount) {\n        System.out.println("微信支付，可享九五折");\n        return amount * 0.95;\n    }\n}\n\nclass BankCardPay ___(2)___ PayStrategy {\n    public double pay(double amount) {\n        double fee = amount * 0.006;\n        if (fee > 50)\n            ___(3)___;\n        System.out.println("银行卡收取手续费:" + fee);\n        return amount + fee;\n    }\n}\n\nclass ShoppingCart {\n    private PayStrategy strategy;\n    public void setStrategy(PayStrategy strategy) {\n        ___(4)___;\n    }\n    public double payOrder(double amount) {\n        return strategy.___(5)___(amount);\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        ShoppingCart cart = new ShoppingCart();\n        cart.setStrategy(new WechatPay());\n        System.out.println("支付:" + cart.payOrder(100));\n        cart.___(6)___(new BankCardPay());\n        System.out.println("支付:" + cart.payOrder(100));\n    }\n}\n\n【问题】请补全代码中的空缺 (1)~(6)。\n（本题共15分，每空约2.5分）\n程序运行输出（供核对）：\n微信支付，可享九五折 → 支付:95.0\n银行卡收取手续费:0.6 → 支付:100.6',
    diagram: {
      type: 'svg',
      caption: '支付策略模式结构（购物车依赖接口，运行时注入具体策略）',
      spec: {
        viewBox: '0 0 560 250',
        content: '<rect x="190" y="24" width="180" height="52" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<text x="280" y="44" font-size="14" font-weight="bold" fill="#2563eb" text-anchor="middle">&lt;&lt;interface&gt;&gt;</text>' +
          '<text x="280" y="64" font-size="13" fill="#1e293b" text-anchor="middle">PayStrategy：pay(amount): double</text>' +
          '<rect x="30" y="170" width="150" height="56" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />' +
          '<text x="105" y="192" font-size="13" font-weight="bold" fill="#16a34a" text-anchor="middle">WechatPay</text>' +
          '<text x="105" y="212" font-size="12" fill="#1e293b" text-anchor="middle">九五折</text>' +
          '<rect x="200" y="170" width="150" height="56" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />' +
          '<text x="275" y="192" font-size="13" font-weight="bold" fill="#16a34a" text-anchor="middle">BankCardPay</text>' +
          '<text x="275" y="212" font-size="12" fill="#1e293b" text-anchor="middle">手续费0.6%，封顶50</text>' +
          '<line x1="105" y1="170" x2="245" y2="80" stroke="#16a34a" stroke-width="2" />' +
          '<polygon points="248,76 235,79 243,88" fill="#ffffff" stroke="#16a34a" stroke-width="2" />' +
          '<line x1="275" y1="170" x2="275" y2="82" stroke="#16a34a" stroke-width="2" />' +
          '<polygon points="275,76 269,88 281,88" fill="#ffffff" stroke="#16a34a" stroke-width="2" />' +
          '<text x="150" y="122" font-size="12" fill="#dc2626">implements</text>' +
          '<rect x="390" y="150" width="150" height="76" fill="#fffbeb" stroke="#f59e0b" stroke-width="2" />' +
          '<text x="465" y="172" font-size="13" font-weight="bold" fill="#b45309" text-anchor="middle">ShoppingCart</text>' +
          '<text x="465" y="192" font-size="12" fill="#1e293b" text-anchor="middle">-strategy: PayStrategy</text>' +
          '<text x="465" y="210" font-size="12" fill="#1e293b" text-anchor="middle">+setStrategy / +payOrder</text>' +
          '<line x1="390" y1="172" x2="352" y2="66" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<polygon points="348,60 352,72 361,66" fill="#ffffff" stroke="#f59e0b" stroke-width="1.5" />' +
          '<text x="400" y="106" font-size="12" fill="#f59e0b">依赖（面向接口持有引用）</text>'
      }
    },
    approach: '策略模式题在软考里是“换皮题”，骨架永远是：接口（算法族）+ 若干实现类 + 上下文类。逐空拆：\n(1) 接口里声明抽象方法：两个实现类的不约而同就是 pay(double amount) 返回实际支付额（double），接口中方法默认 public abstract，可省略修饰，直接写“返回类型 方法名(参数)”，填 double pay(double amount)。注意接口方法以分号结尾、无方法体。\n(2) 类实现接口用 implements（PayStrategy 前有 interface 关键字，绝非类），填 implements。\n(3) “封顶 50”即手续费超过 50 就按 50 收，赋值语句 fee = 50。\n(4) setter 中形参名与字段名都叫 strategy，区分“成员字段”必须用 this：this.strategy = strategy;。这是 Java 填空出镜率最高的一句。\n(5) 上下文对接口发消息：购物车不知道具体是微信还是银行卡，只调用接口声明的方法 strategy.pay(amount)，空缺只缺方法名，填 pay。\n(6) 运行时切换策略 = 再调一次 setStrategy 换对象，主程序前一行就是同样写法，照抄方法名 setStrategy。\n核对输出：WechatPay.pay(100)=95.0；BankCardPay：fee=100*0.006=0.6 不超 50，100+0.6=100.6。与提示一致。若订单金额 10000，fee=60>50 触发封顶，返回 10050.0——封顶分支就是空(3)的作用。',
    scorePoints: [
      '(1) double pay(double amount) 得2.5分——签名三要素（返回类型、方法名、参数类型）齐且以分号结尾无方法体',
      '(2) implements 得2.5分（答 extends 不得分）',
      '(3) fee = 50 得2.5分（体现“手续费封顶按50元计”，写 fee=50.0 亦可）',
      '(4) this.strategy = strategy 得2.5分（漏 this 变成自赋值不得分——最高频扣分点）',
      '(5) pay 得2.5分（上下文通过接口引用调用抽象方法，体现“面向接口编程”）',
      '(6) setStrategy 得2.5分；配套概念问：答出“策略模式/运行时替换算法、开闭原则（新增支付方式不需改 ShoppingCart）”可拿简答分'
    ],
    referenceAnswer: '(1) double pay(double amount)（完整可写 public abstract double pay(double amount);，接口中两种写法等价）\n(2) implements\n(3) fee = 50（或 fee = 50.0;）\n(4) this.strategy = strategy;\n(5) pay\n(6) setStrategy\n\n解析：PayStrategy 接口定义统一的支付算法入口 pay；WechatPay、BankCardPay 分别实现（各自重写 pay 的算法）；ShoppingCart 是上下文，只持有接口类型引用 strategy，通过 setStrategy 注入具体策略，payOrder 中通过接口调用——这就是策略模式：“定义算法族、逐一封装、让它们可互相替换”，新增“云闪付”只需再加一个 implements PayStrategy 的类，购物车代码零改动（开闭原则）。main 中两次 setStrategy 分别注入微信与银行卡策略，输出 95.0 与 100.6。\n另若追问：接口方法默认 public abstract，接口字段默认 public static final；类实现接口必须重写全部抽象方法，否则该类须声明为 abstract。',
    quickScoringTip: 'Java 接口/策略模式填空模板：①接口里的方法签名 = 从实现类里“抄”——哪个 public 方法在所有实现类中都出现，就把它去掉修饰抄进接口；②看见 interface 名跟在 class 后面，中间动词必是 implements，看见普通类跟在后面才考虑 extends；③构造器/setter 里“同名字段赋值”一律 this.字段 = 参数;；④上下文调用永远写“接口变量.方法名()”。把“接口—实现—上下文”三角色在草稿上画三个框连线，6 个空各归各位，平均两分钟一空。'
  },
  {
    id: 'sub_java_03',
    type: 'java',
    typeName: 'Java面向对象程序设计',
    title: '天气推送——接口与观察者模式（一对多的通知机制）',
    stem: '【说明】气象站一旦更新天气信息，就要立即推送给所有已订阅的手机屏幕。为避免气象站认识每一块屏幕（耦合过紧），采用观察者模式：定义观察者接口 Observer（含 update 方法，接收 String 消息）与被观察者接口 Subject（含 attach 注册、detach 注销、notifyObservers 通知三个方法）；WeatherStation 实现 Subject，内部用 List 集合保存全部订阅者，setWeatherInfo 更新信息后必须触发一次通知；notifyObservers 遍历集合，对每个观察者调用其 update。PhoneDisplay 实现 Observer 并负责打印收到的推送。\n主程序运行流程：创建气象站与两块手机屏 A、B 并都 attach；setWeatherInfo("晴 26℃") 后 A、B 都收到推送；随后 detach 掉 B，再 setWeatherInfo("小雨 18℃")，只有 A 收到推送。\n\n【Java代码】\nimport java.util.ArrayList;\nimport java.util.List;\n\ninterface Observer {\n    ___(1)___;\n}\n\ninterface Subject {\n    void attach(Observer o);\n    void detach(Observer o);\n    void notifyObservers();\n}\n\nclass WeatherStation implements Subject {\n    private List<Observer> observers = ___(2)___;\n    private String weatherInfo;\n\n    public void setWeatherInfo(String info) {\n        weatherInfo = info;\n        ___(3)___;\n    }\n    public void attach(Observer o) {\n        ___(4)___;\n    }\n    public void detach(Observer o) {\n        observers.remove(o);\n    }\n    public void notifyObservers() {\n        for (Observer o : observers) {\n            o.___(5)___(weatherInfo);\n        }\n    }\n}\n\nclass PhoneDisplay implements Observer {\n    private String name;\n    public PhoneDisplay(String name) {\n        this.name = name;\n    }\n    public void update(String message) {\n        System.out.println(name + " 收到天气推送:" + message);\n    }\n}\n\npublic class WeatherApp {\n    public static void main(String[] args) {\n        WeatherStation station = new WeatherStation();\n        Observer a = new PhoneDisplay("手机A");\n        Observer b = new PhoneDisplay("手机B");\n        station.attach(a);\n        station.attach(b);\n        station.setWeatherInfo("晴 26C");\n        station.detach(b);\n        station.setWeatherInfo("小雨 18C");\n    }\n}\n\n【问题】请补全代码中的空缺 (1)~(5)。\n（本题共15分，每空3分）\n程序运行输出（供核对）：\n手机A 收到天气推送:晴 26C\n手机B 收到天气推送:晴 26C\n手机A 收到天气推送:小雨 18C',
    diagram: {
      type: 'svg',
      caption: '观察者模式结构（主题持有观察者列表，逐个回调 update）',
      spec: {
        viewBox: '0 0 560 250',
        content: '<rect x="40" y="30" width="180" height="60" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<text x="130" y="50" font-size="13" font-weight="bold" fill="#2563eb" text-anchor="middle">&lt;&lt;interface&gt;&gt; Subject</text>' +
          '<text x="130" y="72" font-size="12" fill="#1e293b" text-anchor="middle">attach / detach / notifyObservers</text>' +
          '<rect x="340" y="30" width="170" height="60" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<text x="425" y="50" font-size="13" font-weight="bold" fill="#2563eb" text-anchor="middle">&lt;&lt;interface&gt;&gt; Observer</text>' +
          '<text x="425" y="72" font-size="12" fill="#1e293b" text-anchor="middle">update(String message)</text>' +
          '<rect x="40" y="160" width="180" height="60" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />' +
          '<text x="130" y="182" font-size="13" font-weight="bold" fill="#16a34a" text-anchor="middle">WeatherStation</text>' +
          '<text x="130" y="202" font-size="12" fill="#1e293b" text-anchor="middle">observers: List&lt;Observer&gt;</text>' +
          '<rect x="340" y="160" width="170" height="60" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />' +
          '<text x="425" y="182" font-size="13" font-weight="bold" fill="#16a34a" text-anchor="middle">PhoneDisplay</text>' +
          '<text x="425" y="202" font-size="12" fill="#1e293b" text-anchor="middle">update: 打印推送消息</text>' +
          '<line x1="130" y1="160" x2="130" y2="94" stroke="#16a34a" stroke-width="2" />' +
          '<polygon points="130,88 123,100 137,100" fill="#ffffff" stroke="#16a34a" stroke-width="2" />' +
          '<text x="138" y="130" font-size="12" fill="#dc2626">implements</text>' +
          '<line x1="425" y1="160" x2="425" y2="94" stroke="#16a34a" stroke-width="2" />' +
          '<polygon points="425,88 418,100 432,100" fill="#ffffff" stroke="#16a34a" stroke-width="2" />' +
          '<text x="433" y="130" font-size="12" fill="#dc2626">implements</text>' +
          '<line x1="220" y1="185" x2="336" y2="66" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<polygon points="340,60 330,66 337,73" fill="#ffffff" stroke="#f59e0b" stroke-width="1.5" />' +
          '<text x="250" y="140" font-size="12" fill="#f59e0b">聚合观察者列表；通知时逐个回调 update</text>'
      }
    },
    approach: '观察者模式代码的骨架就两句话：“主题维护一个 List 观察者，状态一变就 for 循环挨个回调 update”。按空推：\n(1) 接口方法签名从实现类反推：PhoneDisplay 里唯一的 public 方法 update(String message) 且无返回值（只打印），它实现的正是 Observer 接口，故接口声明为 void update(String message)。三要素：返回类型 void、方法名 update、参数 String message。\n(2) 字段声明左侧是 List<Observer>，右侧必须 new 一个可实例化的实现类：ArrayList，且泛型跟上 new ArrayList<Observer>()。注意 List 是接口不能 new（写 new List<Observer>() 是零分卷）。\n(3) 说明写“setWeatherInfo 更新信息后必须触发一次通知”，对应 Subject 中的通知方法名 notifyObservers，调用它：notifyObservers()。漏掉这句，推送就永远不会发生——流程上最关键的一空。\n(4) attach 的语义是“把订阅者加入列表”：observers.add(o)。\n(5) 通知循环里对接口引用 o 调用的方法只能是接口声明的那一个：update。\n核对输出：前两次 attach 后 A、B 都在列表，第一次推送两人各打印一行；detach(b) 把 B 移出列表，第二次只有 A 打印。三行输出与题目提示完全一致。',
    scorePoints: [
      '(1) void update(String message) 得3分——必须 void（无返回值）且参数类型 String 写全，只写 update(String) 可给1分',
      '(2) new ArrayList<Observer>() 得3分（写 new ArrayList() 得1~2分视阅卷；new List<Observer>() 不得分）',
      '(3) notifyObservers() 得3分（漏掉则整个通知流程断裂，是本题灵魂空）',
      '(4) observers.add(o) 得3分（体现“注册即加入集合”）',
      '(5) update 得3分（通过接口引用回调观察者，动态绑定到各自实现）',
      '配套简答分：观察者模式适用场景“一个对象状态改变需联动通知多个对象，且不想相互紧耦合”；attach/detach 对应订阅/退订'
    ],
    referenceAnswer: '(1) void update(String message)（等价：public abstract void update(String message)）\n(2) new ArrayList<Observer>()\n(3) notifyObservers()（完整语句 notifyObservers();）\n(4) observers.add(o)（完整语句 observers.add(o);）\n(5) update\n\n解析：Observer 接口规定“收到通知后做什么”，具体打印行为由 PhoneDisplay 实现；Subject 接口规定注册表三件套。WeatherStation 用 ArrayList 保存观察者（面向 List 接口编程，便于以后换集合）；setWeatherInfo 是“主题状态改变”的入口，改变后必须调用 notifyObservers()，后者用增强 for 遍历集合，通过接口引用 o.update(weatherInfo) 逐一推送——Java 运行时按 o 实际指向的 PhoneDisplay 对象执行重写方法（多态）。main 中 detach(b) 后再推送，B 已不在列表，故仅 A 打印，输出共三行：手机A/手机B 收到天气推送:晴 26C、手机A 收到天气推送:小雨 18C。\n设计意图：主题与具体屏幕解耦，新增“手表屏”只需再实现 Observer，无需改 WeatherStation——与第2题的策略模式并称为软考 Java 题最高频的两大模式。',
    quickScoringTip: 'Java 设计模式填空万能两步：第一步“从实现类倒推接口签名”——实现类里那个被多个类共同重写的 public 方法，就是接口要填的声明（照抄返回类型+方法名+参数）；第二步“认集合三连”——声明 List<T> 字段 → 初始化 new ArrayList<T>() → 增删查用 add/remove/遍历。再背模式台词：策略=“换算法”（setStrategy），观察者=“发通知”（notifyObservers 里 for 循环调 update）。见到空在“状态赋值之后”的位置，十有八九填“触发通知/刷新”那一句。'
  }
]
