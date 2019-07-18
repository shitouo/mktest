/**
 * mktest的主文件
 */
const YAML = require('yaml');
const fs = require('fs');
const puppeteer = require('puppeteer');
const htmlparser = require('htmlparser2');
const child_process = require('child_process');

class Mktest {
    getTargetElementSelector(targetElement) {
        const domObj = htmlparser.parseDOM(targetElement)[0];
        const attribs = domObj.attribs;
        let targetElementSelector = domObj.name;
        if (!attribs) {
            return targetElementSelector;
        }
        for (let attrKey in attribs) {
            if (!Object.prototype.hasOwnProperty.call(attribs, attrKey)) {
                continue;
            }
            const attrValue = attribs[attrKey];
            if (attrKey === 'class') {
                const classNameList = attrValue.split(' ');
                targetElementSelector = classNameList.reduce((result, className) => {
                    return result + `.${className}`;
                }, targetElementSelector);
            } else if (attrKey === 'id') {
                targetElementSelector = `${targetElementSelector}#${attrValue}`;
            } else {
                if (!attrValue) {
                    targetElementSelector = `${targetElementSelector}[${attrKey}]`;
                } else {
                    targetElementSelector = `${targetElementSelector}[${attrKey}="${attrValue}"]`;
                }
            }
        }
        return targetElementSelector;
    }

    // 用户事件处理
    async eventHandle(page, eventType, targetElementSelector) {
        switch (eventType) {
            case 'click': {
                await page.click(targetElementSelector);
                break;
            }
            case 'hover': {
                await page.hover(targetElementSelector);
                break;
            }
        }
    }

    // 执行具体的一步test
    async exctTestStep(testStep, page, isRecordTemplate) {
        if (!testStep) {
            return false;
        }
        const { targetElement, event, screenshotName, timeout, index } = testStep;
        // 获取到targetElement
        const targetElementSelector = this.getTargetElementSelector(targetElement);
        // 等待当前targetElement出现到页面上
        await page.waitForSelector(targetElementSelector);
        // 执行targetElement的event事件
        // await this.eventHandle(page, event, targetElementSelector);
        if (event === 'click') {
            await page.click(targetElementSelector);
        }
        // 等待timeout后执行截图，并保存
        await page.waitFor(timeout);
        await page.screenshot({
            path: isRecordTemplate ? `./recordTemplate/${screenshotName}.jpeg` : `./testResult/${screenshotName}.jpeg`,
            type: 'jpeg',
            fullPage: true
        });

        // test
        const workerProcess = await child_process.exec(`python ./src/test.py './recordTemplate/${screenshotName}.jpeg' './testResult/${screenshotName}.jpeg'`, function(error, stdout, stderr) {
            if (error) {
                console.log(`python脚本执行错误：${error.stack}`);
            }
            if (stdout.trim() == 'true') {
                // 图片一致
                console.log(`步骤${index}通过测试`);
            } else {
                // 图片不一致
                throw new Error(`步骤${index}未通过测试`);
            }
        });
        workerProcess.on('exit', function() {
            console.log('子进程已经退出');
        });

        // 判断是否是录制样板，如果不是，请求图片diff接口
        if (!isRecordTemplate) {
            // 请求diff图片的接口
        }
        // 根据图片识别结果，判断时否通过测试，并给出相应提示
    }

    // 执行测试
    async exct({ testCase }) {
        if (!testCase) {
            return;
        }
        const { testUrl, width, height, cookies, testSteps, isRecordTemplate } = testCase;
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

        // 在开始执行实际的测试步骤前，添加对网络请求的劫持
        await page.setRequestInterception(true);
        let dataRecord = [];
        page.on('request', request => {
            if (request._resourceType === 'xhr') {
                if (isRecordTemplate) {
                    // 记录时需要保存所有的请求记录
                    let key = request.url();
                    page.on('response', async response => {
                        if (response.url() === key) {
                            const responseResult = await response.text();
                            dataRecord.push({
                                [key]: responseResult,
                            });
                            console.log(dataRecord);
                        }
                    });
                }
            }
            request.continue();
        });
        testSteps.forEach(async testStep => {
            await this.exctTestStep(testStep, page, isRecordTemplate);
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
        this.exct(testCase);
    }
}

const mktest = new Mktest();
mktest.run('./test/example.yml');