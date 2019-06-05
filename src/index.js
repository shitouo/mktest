/**
 * mktest的主文件
 */
const YAML = require('yaml');
const fs = require('fs');
const puppeteer = require('puppeteer');

class Mktest {

    // 执行具体的一步test
    async exctTestStep(testStep) {
        // 获取到targetElement
        // 执行targetElement的event事件
        // 等待1s后执行截图
        // 保存截图
        // 判断是否是录制样板，如果不是，请求图片diff接口
        // 根据图片识别结果，判断时否通过测试，并给出相应提示
    }

    // 执行测试
    async exct({ testCase }) {
        if (!testCase) {
            return;
        }
        const { testUrl, width, height, cookies, testSteps } = testCase;
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        page.setViewport({
            width,
            height
        });
        page.setCookie(...cookies);
        await page.goto(testUrl);
        await page.waitFor(500);
        testSteps.forEach(testStep => {
            this.exctTestStep(testStep);
        });
    }

    // 解析yml文件
    parseYml(ymlContent) {
        const testCase = this.testCase = YAML.parse(ymlContent);
        return testCase;
    }

    // 程序的入口
    run(testCasePath) {
        if (!testCasePath) {
            throw new Error('请输入测试用例地址!');
        }

        const file = fs.readFileSync(testCasePath, 'utf8');
        const testCase = this.parseYml(file);
        console.log(testCase);
        this.exct(testCase);
    }
}

const mktest = new Mktest();
mktest.run('./test/example.yml');