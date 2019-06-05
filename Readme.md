## 目标

根据配置文件就可以完成端对端测试，不用编写复杂的测试代码，大大简化自动化测试的难度

## 实现方式



## 实现步骤

1. 敲定配置文件的大致样式，done
2. 解析yaml文件 done
3. 使用puppeteer完成页面的自动化流程
4. 使用Python或者nodejs完成图片diff工作
5. 考虑如何友好地给出测试结果


## 难点

1. 找选择器，直接人去点击，很容易就能找到target，但是选择器的方式就不是很容易
2. 如何快速描述期望。截图，然后图像识别判断两张图片是否一致
3. 条件判断时，如何描述条件，改为用代码
4. 是否需要达到在不知道这个页面是做什么的情况下，写出测试用例（可以考虑用截图，但是这样的话。其实就会很受限制）
5. 登录时，碰到了滑块限制。---解决方案采用写cookie的方式。但是一个页面的cookie可能很多，所以我们需要一款工具来帮助我们提取一个页面的cookie，EditThisCookie---chrome的扩展程序
6. 如何精确地找到targetElement。如果使用简单的字符串识别或者切割，碰到各种不规则的写法就没有办法了。但是我们的HTML解析器却从来不受这些不规范写法的影响，所以考虑是否能够借鉴或者直接使用HTML解析器。 htmlparser2

## 后续计划

1. 自己惯用工程的脚手架
2. json2yml在设置cookie的时候还是很有必要的