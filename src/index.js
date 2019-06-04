/**
 * mktest的主文件
 */
const YAML = require('yaml');
const fs = require('fs');

class Mktest {
    // 程序的入口
    run(testCasePath) {
        if (!testCasePath) {
            throw new Error('请输入测试用例地址!');
        }

        const file = fs.readFileSync(testCasePath, 'utf8');
        const testCase = this.testCase = YAML.parse(file);
        console.log(testCase);
    }
}

const mktest = new Mktest();
mktest.run('./test/example.yml');