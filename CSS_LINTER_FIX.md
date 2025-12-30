# Tailwind CSS 配置文件
# 禁用 CSS 验证以避免 @tailwind 指令的警告

**问题说明：**

VS Code 的 CSS linter 默认不认识 Tailwind CSS 的自定义指令（`@tailwind base`, `@tailwind components`, `@tailwind utilities`），因此会显示 "Unknown at rule" 警告。

**解决方案：**

已在 `.vscode/settings.json` 中添加以下配置：

```json
{
  "css.validate": false,
  "stylelint.validate": [
    "css",
    "scss"
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

**配置说明：**

1. `"css.validate": false` - 禁用 VS Code 内置的 CSS 验证
2. `"files.associations": { "*.css": "tailwindcss" }` - 将 CSS 文件关联到 Tailwind CSS 语言模式
3. `"stylelint.validate": ["css", "scss"]` - 如果使用 stylelint，只验证 CSS 和 SCSS 文件

**注意：**

- 这些警告不会影响项目的正常运行
- Tailwind CSS 的指令在构建时会被正确处理
- 如果仍然看到警告，请重启 VS Code
- 确保已安装 Tailwind CSS IntelliSense 扩展以获得更好的开发体验

**推荐扩展：**

- Tailwind CSS IntelliSense - 提供 Tailwind 类名自动补全和语法高亮
- PostCSS Language Support - 支持 PostCSS 语法
