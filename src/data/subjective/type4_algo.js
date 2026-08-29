// 下午卷主观题例题 —— 题型四：算法与数据结构应用（C语言函数填空，贴近软考真题风格）
export default [
  {
    id: 'sub_algo_01',
    type: 'algo',
    typeName: '算法与数据结构应用',
    title: '查找书架——二分查找变体：统计有序数组中给定元素的出现次数',
    stem: '【说明】图书馆书架上的图书按编号升序排列，查找自然想到二分查找：每次取中间元素与目标比较，把查找区间减半。普通二分找到目标就返回，但数组中可能存在多个重复元素，图书管理员需要统计“编号恰好为 key 的书有多少本”。\n下面的算法用两次二分实现：函数 FirstOccur 用“找到后继续向左收缩区间”的技巧，返回第一个等于 key 的元素下标（不存在返回 -1）；函数 CountKey 先调用 FirstOccur，若找到，再从该位置出发向右做第二次二分，找到最后一个等于 key 的下标 pos，出现次数 = pos - first + 1。\n注意：代码中一律使用 mid = low + (high - low) / 2 计算中点，以避免 (low + high) 相加可能发生的整数溢出——这是真题常考的细节。\n\n【C代码】\nint FirstOccur(int a[], int n, int key) {\n    int low = 0, high = n - 1, pos = -1;\n    while (___(1)___) {\n        int mid = low + (high - low) / 2;\n        if (a[mid] == key) {\n            pos = mid;\n            ___(2)___;\n        }\n        else if (a[mid] > key)\n            high = mid - 1;\n        else\n            ___(3)___;\n    }\n    return pos;\n}\n\nint CountKey(int a[], int n, int key) {\n    int first = FirstOccur(a, n, key);\n    if (first == -1)\n        return 0;\n    int low = first, high = n - 1, pos = first;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (a[mid] == key) {\n            pos = mid;\n            ___(4)___;\n        }\n        else\n            ___(5)___;\n    }\n    return pos - first + 1;\n}\n\n【问题】请补全代码中的空缺 (1)~(5)。每空只填一条语句或一个表达式，与上下文语法保持一致。\n（本题共15分，每空3分）\n例如：a[] = {1, 3, 5, 5, 5, 7, 9}，key = 5 时，FirstOccur 返回 2，CountKey 返回 3；该算法的时间复杂度为 O(log n)。',
    diagram: {
      type: 'svg',
      caption: '二分查找区间收缩示意（每次比较后区间减半）',
      spec: {
        viewBox: '0 0 560 150',
        content: '<text x="20" y="24" font-size="13" fill="#1e293b">数组：1  3  5  5  5  7  9 （升序，key = 5）</text>' +
          '<rect x="40" y="44" width="60" height="34" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />' +
          '<text x="70" y="66" font-size="13" fill="#1e293b" text-anchor="middle">low=0</text>' +
          '<rect x="240" y="44" width="80" height="34" fill="#fffbeb" stroke="#f59e0b" stroke-width="2" />' +
          '<text x="280" y="66" font-size="13" fill="#b45309" text-anchor="middle">mid=3</text>' +
          '<rect x="460" y="44" width="60" height="34" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />' +
          '<text x="490" y="66" font-size="13" fill="#166534" text-anchor="middle">high=6</text>' +
          '<line x1="100" y1="61" x2="240" y2="61" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<polygon points="240,61 230,57 230,65" fill="#dc2626" />' +
          '<line x1="320" y1="61" x2="460" y2="61" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,4" />' +
          '<polygon points="460,61 450,57 450,65" fill="#dc2626" />' +
          '<text x="280" y="106" font-size="12" fill="#dc2626" text-anchor="middle">a[mid]==key 命中后：求“第一个”则 high=mid-1 继续向左；求“最后一个”则 low=mid+1 继续向右</text>' +
          '<text x="280" y="128" font-size="12" fill="#1e293b" text-anchor="middle">未命中时按大小关系砍掉一半：a[mid]>key → high=mid-1；a[mid]<key → low=mid+1</text>'
      }
    },
    approach: '手把手五步：\n第一步认框架：两个函数都是标准二分骨架 while (循环条件) { 取 mid; 三种比较分支 }。循环条件直接默写：只要区间 [low, high] 非空就继续，即 low <= high，这就是 (1)。写成 low < high 会漏查最后一个元素，是真题头号陷阱。\n第二步看“pos = mid”这句：它表示“已找到一个候选答案，先记下来”。记下来之后往哪边走，决定你找的是“第一个”还是“最后一个”——题解说 FirstOccur 要找“第一个”，那就还得去左半边碰碰运气，左半边是 [low, mid-1]，所以 (2) 填 high = mid - 1。\n第三步填“比 key 小”分支：a[mid] < key 说明答案只可能在右半边，左边界右移，(3) 填 low = mid + 1。这就是二分的肌肉记忆：大了动 high，小了动 low。\n第四步镜像迁移：CountKey 的第二次二分要找“最后一个”，结构跟 FirstOccur 完全对称，只是命中后改向右收缩，(4) 填 low = mid + 1；不命中时（后半段不会有比 key 小的元素）只能大，(5) 填 high = mid - 1。\n第五步验证：代入 a[]={1,3,5,5,5,7,9}、key=5 手工走一遍：FirstOccur：low=0,high=6,mid=3 命中5→pos=3,high=2；mid=1(3<5)→low=2；mid=2 命中→pos=2,high=1 退出，返回 2。CountKey：low=2,high=6,mid=4 命中→pos=4,low=5；mid=5(7>5)→high=4；low>high 退出，4-2+1=3。与题解一致，过关。\n答题格式：写 high=mid-1 这类语句时必须带分号语义自洽（空后原文没有分号的要自己补上）。',
    scorePoints: [
      '(1) low <= high（等价写法 high >= low）得3分——写 low < high 不得分，这是本题最大陷阱',
      '(2) high = mid - 1 得3分（找“第一个”：命中后向左收缩）',
      '(3) low = mid + 1 得3分（a[mid] < key：答案在右半区）',
      '(4) low = mid + 1 得3分（找“最后一个”：命中后向右收缩，与(2)正好镜像）',
      '(5) high = mid - 1 得3分（第二次二分中 a[mid]!=key 时必为 a[mid]>key）',
      '阅卷习惯：表达式写法等价即可给分（如 mid=(low+high)/2 不扣分但建议沿用题中防溢出写法）；语句漏写等号或写成 mid+1/mid-1 单独成句不得分'
    ],
    referenceAnswer: '(1) low <= high\n(2) high = mid - 1\n(3) low = mid + 1\n(4) low = mid + 1\n(5) high = mid - 1\n\n解析：FirstOccur 是“下界二分”：循环不变式为“只要 low<=high，区间 [low,high] 仍可能藏着 key”；命中时先登记 pos=mid，再令 high=mid-1 继续到左半区找更靠前的相等元素；a[mid]<key 时答案只能在右半区，low=mid+1。CountKey 的第二次二分是其镜像——命中后 low=mid+1 向右找“最后一个等于 key”的位置，a[mid]!=key 时（first 右侧不存在更小元素）必是 a[mid]>key，故 high=mid-1。最终出现次数 = pos-first+1 = 3（对示例数组）。\n补充考点：本算法每次比较将区间减半，时间复杂度 O(log n)；若写成顺序扫描则为 O(n)。空间复杂度 O(1)。',
    quickScoringTip: '二分填空固定三步默写法：①循环条件永远是 low<=high；②凡是 a[mid] 比 key 大就动 high（high=mid-1），比 key 小就动 low（low=mid+1）——“大了砍上界，小了砍下界”；③若命中后还要继续找，就记住“找最左命中后 high=mid-1，找最右命中后 low=mid+1”。填完必用题目给的例子（或 {1,2,2,2,3} 这类含重复的最小例子）代进去走 3 步，两分钟换一个 3 分空。'
  },
  {
    id: 'sub_algo_02',
    type: 'algo',
    typeName: '算法与数据结构应用',
    title: '合并与去重——单链表的归并拼接与删除重复元素',
    stem: '【说明】某图书盘点程序用带头节点的单链表存储书号，链表按 data 值递增有序。要求完成两个功能：\n功能1：把两条递增有序链表 A、B 合并成一条递增有序链表，要求不新申请数据节点（直接搬运原节点，称“就地归并”）。算法设置哨兵头节点 h，工作指针 r 始终指向结果链表的最后一个节点：每轮比较 A、B 当前节点的数据域，把较小者摘下来接到 r 之后，并令 r 后移；某一链表走空后，把另一条链表的剩余部分整段接在 r 之后。\n功能2：盘点发现有序链表中同一书号被重复登记，需要删除多余节点使每个值只保留一个：指针 p 从首元节点出发，只要 p 和 p 的下一节点同时存在，就比较 p->data 与 p->next->data；相等则删除 q = p->next（注意：删除后 p 不后移，因为可能连续多个重复），否则 p 后移。\n\n【C代码】\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\n/* 功能1：合并两条递增有序链表（就地复用节点） */\nNode *MergeList(Node *A, Node *B) {\n    Node h;                     /* 哨兵（虚拟）头节点 */\n    Node *r = &h;               /* r 始终指向结果链当前尾节点 */\n    h.next = NULL;\n    while (A != NULL && B != NULL) {\n        if (___(1)___) {\n            r->next = A;\n            r = A;\n            A = A->next;\n        } else {\n            r->next = B;\n            r = B;\n            B = B->next;\n        }\n    }\n    if (A != NULL)\n        ___(2)___;\n    else\n        ___(3)___;\n    return h.next;\n}\n\n/* 功能2：删除递增有序带头节点链表中重复的多余节点（同一值只留一个） */\nvoid DelSame(Node *head) {\n    Node *p = head->next;\n    while (p != NULL && p->next != NULL) {\n        if (___(4)___) {\n            Node *q = p->next;\n            p->next = q->next;\n            free(q);\n        } else {\n            ___(5)___;\n        }\n    }\n}\n\n【问题】请补全代码中的空缺 (1)~(5)。\n（本题共15分，每空3分）\n提示：示例 A: 1→3→5，B: 2→3→4，合并结果为 1→2→3→3→4→5。',
    diagram: {
      type: 'svg',
      caption: '有序单链表就地归并示意（r 为结果链尾指针）',
      spec: {
        viewBox: '0 0 560 210',
        content: '<text x="20" y="22" font-size="13" fill="#2563eb" font-weight="bold">链表 A</text>' +
          '<rect x="70" y="8" width="44" height="26" fill="#eff6ff" stroke="#2563eb" stroke-width="2" /><text x="92" y="26" font-size="13" text-anchor="middle" fill="#1e293b">1</text>' +
          '<line x1="114" y1="21" x2="148" y2="21" stroke="#64748b" stroke-width="1.5" /><polygon points="152,21 143,17 143,25" fill="#64748b" />' +
          '<rect x="152" y="8" width="44" height="26" fill="#eff6ff" stroke="#2563eb" stroke-width="2" /><text x="174" y="26" font-size="13" text-anchor="middle" fill="#1e293b">3</text>' +
          '<line x1="196" y1="21" x2="230" y2="21" stroke="#64748b" stroke-width="1.5" /><polygon points="234,21 225,17 225,25" fill="#64748b" />' +
          '<rect x="234" y="8" width="44" height="26" fill="#eff6ff" stroke="#2563eb" stroke-width="2" /><text x="256" y="26" font-size="13" text-anchor="middle" fill="#1e293b">5</text>' +
          '<text x="20" y="74" font-size="13" fill="#16a34a" font-weight="bold">链表 B</text>' +
          '<rect x="70" y="60" width="44" height="26" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" /><text x="92" y="78" font-size="13" text-anchor="middle" fill="#1e293b">2</text>' +
          '<line x1="114" y1="73" x2="148" y2="73" stroke="#64748b" stroke-width="1.5" /><polygon points="152,73 143,69 143,77" fill="#64748b" />' +
          '<rect x="152" y="60" width="44" height="26" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" /><text x="174" y="78" font-size="13" text-anchor="middle" fill="#1e293b">3</text>' +
          '<line x1="196" y1="73" x2="230" y2="73" stroke="#64748b" stroke-width="1.5" /><polygon points="234,73 225,69 225,77" fill="#64748b" />' +
          '<rect x="234" y="60" width="44" height="26" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" /><text x="256" y="78" font-size="13" text-anchor="middle" fill="#1e293b">4</text>' +
          '<text x="20" y="128" font-size="13" fill="#b45309" font-weight="bold">结果链</text>' +
          '<rect x="70" y="112" width="44" height="26" fill="#fffbeb" stroke="#f59e0b" stroke-width="2" /><text x="92" y="130" font-size="13" text-anchor="middle" fill="#1e293b">h</text>' +
          '<line x1="114" y1="125" x2="148" y2="125" stroke="#64748b" stroke-width="1.5" /><polygon points="152,125 143,121 143,129" fill="#64748b" />' +
          '<rect x="152" y="112" width="34" height="26" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="169" y="130" font-size="13" text-anchor="middle">1</text>' +
          '<line x1="186" y1="125" x2="208" y2="125" stroke="#64748b" stroke-width="1.5" /><polygon points="212,125 203,121 203,129" fill="#64748b" />' +
          '<rect x="212" y="112" width="34" height="26" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5" /><text x="229" y="130" font-size="13" text-anchor="middle">2</text>' +
          '<line x1="246" y1="125" x2="268" y2="125" stroke="#64748b" stroke-width="1.5" /><polygon points="272,125 263,121 263,129" fill="#64748b" />' +
          '<rect x="272" y="112" width="34" height="26" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="289" y="130" font-size="13" text-anchor="middle">3</text>' +
          '<line x1="306" y1="125" x2="328" y2="125" stroke="#64748b" stroke-width="1.5" /><polygon points="332,125 323,121 323,129" fill="#64748b" />' +
          '<rect x="332" y="112" width="34" height="26" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5" /><text x="349" y="130" font-size="13" text-anchor="middle">3</text>' +
          '<line x1="366" y1="125" x2="388" y2="125" stroke="#64748b" stroke-width="1.5" /><polygon points="392,125 383,121 383,129" fill="#64748b" />' +
          '<rect x="392" y="112" width="34" height="26" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5" /><text x="409" y="130" font-size="13" text-anchor="middle">4</text>' +
          '<line x1="426" y1="125" x2="448" y2="125" stroke="#64748b" stroke-width="1.5" /><polygon points="452,125 443,121 443,129" fill="#64748b" />' +
          '<rect x="452" y="112" width="34" height="26" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="469" y="130" font-size="13" text-anchor="middle">5</text>' +
          '<text x="469" y="152" font-size="11" fill="#dc2626" text-anchor="middle">r 指向尾</text>' +
          '<text x="280" y="186" font-size="12" fill="#1e293b" text-anchor="middle">规则：每轮把 A、B 队头较小者接到 r 之后；有一方为空时，另一方剩余整段挂到 r->next</text>'
      }
    },
    approach: '链表填空的保命第一步：在草稿上画出三个方框（哨兵 h、尾指针 r、两条链的队头 A 和 B），所有空都围绕“谁指向谁”。\n(1) 判断条件：代码要把“较小者”摘下来接到 r 后，if 分支摘的是 A，所以条件是 A 的数据不大于 B 的数据：A->data <= B->data。带等号保证相等时取 A 的先（顺序稳定），写 < 一般也判对。\n(2)(3) 收尾：while 因“某条链走空”而退出，剩下一条链后面所有节点本来就有序，不必逐个搬，直接整段挂到尾部：A 非空就 r->next = A，否则 r->next = B。千万别手痒写循环逐节点插入——多写反而错。\n(4) 去重条件：链表有序，重复元素必然相邻，所以只需比较相邻两个节点：p->data == p->next->data。注意是 == 不是 =（写单等号是 C 语言经典零分错误）。\n(5) 关键细节：删除节点后 p 原地不动！因为 5→5→5 连着三个时，删掉第一个 next 后还要再比一次；只有“不相等”时才允许 p = p->next 前进。\n验证习惯：拿提示里的 A、B 在草稿纸上走两轮归并，再拿 2→2→3 走一遍 DelSame，能对上 1→2→3→3→4→5 和 2→3 就稳了。',
    scorePoints: [
      '(1) A->data <= B->data 得3分（答 A->data < B->data 亦可；写成指针比较或漏箭头扣分）',
      '(2) r->next = A 得3分（把剩余链整段挂尾）',
      '(3) r->next = B 得3分（与(2)可互换位置但必须与 if 条件对应）',
      '(4) p->data == p->next->data 得3分（== 与 -> 两个符号是得分关键，写 = 不得分）',
      '(5) p = p->next 得3分（答“不移动 p”思路错误不得分：删除分支后 p 不动、else 分支 p 才动）',
      '概念配套分（真题常追问）：归并时间复杂度 O(m+n)、空间 O(1)；DelSame 时间复杂度 O(n)'
    ],
    referenceAnswer: '(1) A->data <= B->data\n(2) r->next = A\n(3) r->next = B\n(4) p->data == p->next->data\n(5) p = p->next\n\n解析：MergeList 采用哨兵头节点简化边界处理——r 是结果链的尾指针，每轮把两条有序链队头中较小（可相等）的节点接入结果链并令该链后移；循环结束时至多一条链未空，剩余部分保持有序，直接 r->next = A（或 = B）整段链接即可，返回 h.next 即合并后的首元节点。示例 A:1→3→5、B:2→3→4 合并得 1→2→3→3→4→5。\nDelSame 利用“有序 ⇒ 重复必相邻”：p 与 p->next 数据相等时用 q 暂存后继、跨过它再 free，删除后 p 不动以便继续吞掉连续重复；不相等时 p = p->next 前进。循环条件 p!=NULL && p->next!=NULL 保证比较 p->next->data 时不解引用空指针（短路求值）。\n复杂度：MergeList O(m+n) 时间、O(1) 空间；DelSame O(n) 时间、O(1) 空间。',
    quickScoringTip: '链表题三步定式：①先找“哨兵头/尾指针”，看到 r->next=… 的模板就知道考的是“挂接”而非“新建”；②凡是“某一方走空”之后的空，答案几乎都是“把剩余链整段挂上”（r->next = A / = B）；③删除三句半默写：q 暂存、跨接（p->next = q->next）、free(q)，并且“删后指针不走，不等才走”。判断条件里 == 和 -> 两个符号各值半分，落笔前先默念两遍。'
  },
  {
    id: 'sub_algo_03',
    type: 'algo',
    typeName: '算法与数据结构应用',
    title: '两种经典策略——最长公共子序列（动态规划）与活动安排（贪心）',
    stem: '【说明】本程序包含两个独立的经典算法。\n算法1（动态规划）：求字符串 A（长 m）与 B（长 n）的最长公共子序列（LCS）长度。子序列允许跳着取但不许乱序。设 dp[i][j] 表示 A 的前 i 个字符与 B 的前 j 个字符的 LCS 长度。边界：任何串与空串的 LCS 为 0，即 dp[i][0]=0、dp[0][j]=0。转移：若 A 的第 i 个字符与 B 的第 j 个字符相等，则它们一定同时进入公共子序列，dp[i][j] = dp[i-1][j-1] + 1；否则“末位不能配对”，最优解要么丢弃 A 的第 i 个字符（继承 dp[i-1][j]），要么丢弃 B 的第 j 个字符（继承 dp[i][j-1]），两者取大。注意 C 语言字符串下标从 0 开始，第 i 个字符应写成 a[i-1]。最终答案存于 dp[m][n]。\n算法2（贪心）：有 n 个活动，s[]、f[] 分别存开始与结束时间，输入已按结束时间 f 从小到大排好。贪心策略：每次选取“在当前已选活动结束之后才开始、且结束最早”的活动，即可安排的活动数最多。变量 last 记录最近选中的活动下标（初始为 0，第 0 个活动必选），count 记录已选个数。\n\n【C代码】\n#define MAXN 100\nint dp[MAXN][MAXN];\nint max(int x, int y) { return x > y ? x : y; }\n\n/* 算法1：最长公共子序列长度 */\nint LCS(char a[], char b[]) {\n    int m = strlen(a), n = strlen(b);\n    int i, j;\n    for (i = 0; i <= m; i++) dp[i][0] = 0;\n    for (j = 0; j <= n; j++) dp[0][j] = 0;\n    for (i = 1; i <= m; i++)\n        for (j = 1; j <= n; j++)\n            if (___(1)___)\n                dp[i][j] = ___(2)___;\n            else\n                dp[i][j] = max(___(3)___, dp[i][j-1]);\n    return ___(4)___;\n}\n\n/* 算法2：最多相容活动数（f[] 已按结束时间升序） */\nint BestActivities(int s[], int f[], int n) {\n    int count = 1, last = 0, i;\n    for (i = 1; i < n; i++) {\n        if (___(5)___) {\n            count++;\n            ___(6)___;\n        }\n    }\n    return count;\n}\n\n【问题】请补全代码中的空缺 (1)~(6)。\n（本题共15分，每空约2.5分）\n示例：LCS("ABCBDAB", "BDCABA") 返回 4；活动 s={1,3,0,5,8,8}、f={4,5,6,7,9,10} 时 BestActivities 返回 3。',
    diagram: {
      type: 'svg',
      caption: 'LCS 动态规划填表示意（A=ABC，B=AC，加粗格为路径）',
      spec: {
        viewBox: '0 0 560 220',
        content: '<text x="20" y="24" font-size="13" fill="#1e293b">dp 表（行：A=ABC 的前 i 个；列：B=AC 的前 j 个；相等取左上+1，不等取上/左较大）</text>' +
          '<text x="118" y="52" font-size="12" fill="#64748b" text-anchor="middle">j=0</text>' +
          '<text x="178" y="52" font-size="12" fill="#64748b" text-anchor="middle">1(A)</text>' +
          '<text x="238" y="52" font-size="12" fill="#64748b" text-anchor="middle">2(C)</text>' +
          '<text x="70" y="82" font-size="12" fill="#64748b" text-anchor="middle">i=0</text>' +
          '<text x="70" y="118" font-size="12" fill="#64748b" text-anchor="middle">1(A)</text>' +
          '<text x="70" y="154" font-size="12" fill="#64748b" text-anchor="middle">2(B)</text>' +
          '<text x="70" y="190" font-size="12" fill="#64748b" text-anchor="middle">3(C)</text>' +
          '<rect x="96" y="62" width="44" height="32" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="118" y="83" font-size="13" text-anchor="middle">0</text>' +
          '<rect x="156" y="62" width="44" height="32" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="178" y="83" font-size="13" text-anchor="middle">0</text>' +
          '<rect x="216" y="62" width="44" height="32" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="238" y="83" font-size="13" text-anchor="middle">0</text>' +
          '<rect x="96" y="98" width="44" height="32" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="118" y="119" font-size="13" text-anchor="middle">0</text>' +
          '<rect x="156" y="98" width="44" height="32" fill="#fffbeb" stroke="#f59e0b" stroke-width="2" /><text x="178" y="119" font-size="13" font-weight="bold" text-anchor="middle">1</text>' +
          '<rect x="216" y="98" width="44" height="32" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="238" y="119" font-size="13" text-anchor="middle">1</text>' +
          '<rect x="96" y="134" width="44" height="32" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="118" y="155" font-size="13" text-anchor="middle">0</text>' +
          '<rect x="156" y="134" width="44" height="32" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="178" y="155" font-size="13" text-anchor="middle">1</text>' +
          '<rect x="216" y="134" width="44" height="32" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="238" y="155" font-size="13" text-anchor="middle">1</text>' +
          '<rect x="96" y="170" width="44" height="32" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="118" y="191" font-size="13" text-anchor="middle">0</text>' +
          '<rect x="156" y="170" width="44" height="32" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" /><text x="178" y="191" font-size="13" text-anchor="middle">1</text>' +
          '<rect x="216" y="170" width="44" height="32" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" /><text x="238" y="191" font-size="13" font-weight="bold" text-anchor="middle">2 = dp[m][n]</text>' +
          '<text x="300" y="110" font-size="12" fill="#1e293b">A[0]==B[0]（都是A）：dp[1][1]=dp[0][0]+1=1</text>' +
          '<text x="300" y="132" font-size="12" fill="#1e293b">B 的 C 与 A 的 B 不等：取 max(上, 左)</text>' +
          '<text x="300" y="154" font-size="12" fill="#1e293b">答案在右下角 dp[3][2] = 2（子序列 AC）</text>' +
          '<text x="300" y="188" font-size="12" fill="#dc2626">复杂度：时间 O(m*n)，空间 O(m*n)</text>'
      }
    },
    approach: '这是“填表 DP + 排序贪心”两张王牌，各教一遍：\n算法1 四步：\n第一步写下标换算：C 数组从 0 起，而 dp[i][j] 里 i 是“前 i 个字符”，所以第 i 个字符是 a[i-1]。空(1) 就是末位字符比较：a[i-1] == b[j-1]。漏掉 -1 是本空唯一死法。\n第二步“相等左上加一”：配上了，这对字符进入公共子序列，答案 = 都去掉末位后的规模 +1：(2) 填 dp[i-1][j-1] + 1。\n第三步“不等取上下左右里大的”：max 的第一个参数与第二个参数 dp[i][j-1]（弃 B 末位）并列，那它必是弃 A 末位：(3) 填 dp[i-1][j]。口诀“相等看左上，不等比上左”。\n第四步答案位置：全表算完后右下角即全局解：(4) 填 dp[m][n]。拿 A=ABC、B=AC 在草稿纸画 4×3 小表核对，右下角应为 2。\n算法2 两步：\n第五步：贪心规则“下一个活动的开始时间必须不早于已选活动的结束时间”。last 是最近选中活动下标，它的结束时间是 f[last]，所以 (5) 填 s[i] >= f[last]（写 > 视题意，本例用 >=：首尾相接允许）。\n第六步：一旦选中活动 i，它就成为新的“最近活动”，(6) 填 last = i。\n验证：s={1,3,0,5,8,8}、f={4,5,6,7,9,10} 已按 f 升序：选0（f=4）→ i=1,2 的 s=3,0 <4 跳过 → i=3 s=5>=4 选（count=2,last=3,f=7）→ i=4 s=8>=7 选（count=3）→ i=5 s=8>=10? 否。返回 3，与示例吻合。',
    scorePoints: [
      '(1) a[i-1] == b[j-1] 得2.5分——少写 -1 或写成 a[i]==b[j] 不得分，这是 DP 下标的送命点',
      '(2) dp[i-1][j-1] + 1 得2.5分（“相等取左上加一”）',
      '(3) dp[i-1][j] 得2.5分（与 dp[i][j-1] 分别对应“弃A末位/弃B末位”，填 dp[i-1][j] 才使两分支齐备）',
      '(4) dp[m][n] 得2.5分（答案在右下角，写 dp[n][m] 位置颠倒不得分）',
      '(5) s[i] >= f[last] 得2.5分（相容条件：开始时间不早于最近选中活动的结束时间）',
      '(6) last = i 得2.5分（选中后更新基准活动）；另：若追问复杂度，LCS 为 O(m*n)，贪心为 O(n)（排序后）'
    ],
    referenceAnswer: '(1) a[i-1] == b[j-1]\n(2) dp[i-1][j-1] + 1\n(3) dp[i-1][j]\n(4) dp[m][n]\n(5) s[i] >= f[last]\n(6) last = i\n\n解析（LCS）：dp[i][j] 定义为 A 前 i 个字符与 B 前 j 个字符的最长公共子序列长度。边界 dp[i][0]=dp[0][j]=0。转移方程：a[i-1]==b[j-1] 时 dp[i][j]=dp[i-1][j-1]+1；否则 dp[i][j]=max(dp[i-1][j], dp[i][j-1])。行优先填表后右下角 dp[m][n] 即答案，如 LCS("ABCBDAB","BDCABA") = 4（如 BCBA）。时间/空间复杂度均为 O(m*n)。\n解析（贪心）：活动按结束时间升序后，“最早结束且相容”的局部最优选择可推出整体最优。第 0 个活动必选（count=1, last=0）；扫描后续活动，凡 s[i] >= f[last] 即与最近选中活动相容，选中并使 count++，同时令 last=i 更新基准。示例返回 3。时间复杂度 O(n)（含排序则 O(n log n)）。\n易错提醒：(1) 中 -1 是 C 下标换算；(5) 中是 f[last] 不是 f[i]（要和“已选中活动”的结束时间比）。',
    quickScoringTip: 'DP 填空题只背一张“转移图”：相等←左上+1，不等↑左↖取大；答案永远在 dp[m][n]；字符串与 dp 下标错位 1（a[i-1]）。贪心填空只问两句：①相容条件（和上一个“已选中”的结束时间比：s[i]>=f[last]）；②选中后更新基准（last=i）。考前用 A=ABC、B=AC 画 3 行小表自测一遍，这两题的 15 分就是送分题。'
  }
]
