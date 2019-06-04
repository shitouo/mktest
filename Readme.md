## 目标

根据配置文件就可以完成端对端测试，不用编写复杂的测试代码，大大简化自动化测试的难度

## 实现方式



## 实现步骤

1. 敲定配置文件的大致样式，
2. 完成yaml文件到json的转换
3. 使用puppeteer完成页面的自动化流程
4. 使用Python或者nodejs完成图片diff工作
5. 考虑如何友好地给出测试结果


## 痛点

1. 找选择器，直接人去点击，很容易就能找到target，但是选择器的方式就不是很容易
2. 如何快速描述期望。截图，然后图像识别判断两张图片是否一致
3. 