## 目标

在现有单页静态网页 [index.html](file:///workspace/index.html) 中增加“仅登录界面”能力（不改动地图/社区等既有功能逻辑）：

- 登录信息字段：头像（上传图片）/ 手机号 / 昵称
- 首次进入页面：若未登录则自动弹出登录遮罩，禁止操作页面其他区域
- 点击右上角头像按钮（#profileBtn）：打开个人中心抽屉（#profileDrawer），可查看与修改资料
- 数据持久化：localStorage，刷新页面保持登录态

## 非目标

- 不接入任何后端 API
- 不引入 React/Vite/Tailwind 等工程化依赖
- 不增加验证码、短信登录、用户协议等扩展项

## 集成方式（方案 A）

仅修改现有 [index.html](file:///workspace/index.html)：

1. 在 body 中新增一个全屏登录遮罩（modal overlay），用于“首次进入强制登录”
2. 用真实表单替换现有 `#profileDrawer` 抽屉中的占位内容，使其成为“资料编辑抽屉”
3. 在现有脚本中新增一段 profile/login 的本地存储、校验与开关逻辑，并与 `#profileBtn/#profileClose` 绑定

## 数据模型与存储

localStorage key：

- `zlxw_profile_v1`

结构：

- avatarDataUrl: string（上传图片后转 base64 Data URL）
- phoneDigits: string（11 位数字）
- nickname: string（2–12 字符）
- updatedAt: string（ISO 时间串）

## 交互规则

### 首次进入

- 页面加载后读取 `zlxw_profile_v1`
- 若不存在或字段不完整：
  - 打开登录遮罩（modal）
  - 将 `aria-hidden="true"` 应用到主内容区域（至少对地图交互层禁用）
  - 禁止滚动/点击穿透（遮罩阻挡）

### 登录提交

- 头像必须上传且可预览
- 手机号校验：`/^1\\d{10}$/`
- 昵称校验：去首尾空格后长度 2–12
- 提交成功：
  - 写入 localStorage
  - 关闭遮罩
  - 更新右上角头像按钮展示：
    - 优先显示用户头像（img 圆形裁切）
    - 未加载成功则回退为默认 SVG

### 个人中心抽屉

- 点击 `#profileBtn` 打开 `#profileDrawer`
- 抽屉内展示当前资料（头像预览/手机号/昵称）
- 支持重新上传头像、修改手机号、修改昵称
- 保存按钮写入 localStorage，并即时更新右上角头像按钮
- 退出登录按钮（可选，默认提供）：
  - 清空 localStorage 的 profile key
  - 自动打开登录遮罩

## 结构变更（HTML）

### 1) 新增登录遮罩

新增节点（建议放在 `#overlay` 后、`#profileDrawer` 前，便于 z-index 管理）：

- `div#loginOverlay`：全屏遮罩容器（默认隐藏）
- `div.login-modal`：居中纸感卡片
  - 左侧：水墨品牌区（渐变模拟 + “浙里寻味” + slogan + 小宝箱点缀）
  - 右侧：表单区
    - 头像上传 input[type=file] + 预览
    - 手机号 input
    - 昵称 input
    - 提交按钮
    - 错误提示区域

### 2) 替换 #profileDrawer 内容

将 `#profileDrawer .profile-drawer-body` 内的 `section-placeholder` 替换为 profile 表单：

- 头像预览 + 上传
- 手机号
- 昵称
- 保存按钮
- 退出登录按钮

## 样式变更（CSS）

沿用现有页面“宣纸 + 墨色 + 朱砂”风格变量（例如 `--paper/--ink/--cinnabar`）并新增少量 class：

- `.login-overlay`：fixed inset 0，半透明墨色遮罩
- `.login-modal`：纸感背景（与现有 header/纸张阴影一致），圆角与轻阴影
- `.login-brand`：水墨渐变底纹（radial + linear）
- `.login-avatar`：圆形裁切预览
- `.login-error`：朱砂色错误文案

## JS 变更（行为）

新增函数：

- `readProfile()` / `writeProfile(profile)` / `clearProfile()`
- `openLoginOverlay()` / `closeLoginOverlay()`
- `openProfileDrawer()` / `closeProfileDrawer()`（复用现有开关，补齐 profile 场景）
- `syncProfileUI(profile)`：刷新右上角头像按钮、抽屉表单值、遮罩默认值
- `fileToDataUrl(file)`：上传头像转 base64

事件绑定：

- DOMContentLoaded：检查 profile，决定是否打开登录遮罩
- `#profileBtn`：打开 profile 抽屉（无 profile 时也打开遮罩）
- `#loginSubmitBtn`：校验 + 保存 + 关闭
- `#profileSaveBtn`：校验 + 保存
- `#logoutBtn`：清空 + 打开遮罩

## 验收标准

- 首次进入无资料：必须看到登录遮罩，无法操作地图
- 输入头像/手机号/昵称后点击提交：遮罩关闭、资料持久化、右上角头像按钮显示为用户头像
- 刷新页面：保持已登录（不再弹遮罩）
- 点击右上角头像按钮：打开抽屉，资料可编辑并保存
- 退出登录：清空资料并重新弹出登录遮罩

