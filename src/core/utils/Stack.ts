// TypeScript file
class Stack {
    public constructor() {
        this.push = function (ele) {
            this.top++;
            this.dataStore.unshift(ele);
            if (this.top > 10) this.pop();
        };;//入栈
        this.pop = function () {
            this.top--;
            return this.dataStore.pop();
        };//出栈
        this.peek = function () {
            return this.dataStore[this.top - 1];
        };//查看栈顶元素
        this.clear = function () {
            this.top = 0;
            this.dataStore = [];
        };//清空栈
        this.length = function () {
            return this.top;
        };//栈内存放元素的个数
    }
    public dataStore = [];//保存栈内元素，初始化为一个空数组
    public top = 0;//栈顶位置，初始化为0
    public push//入栈
    public pop;//出栈
    public peek;//查看栈顶元素
    public clear;//清空栈
    public length;//栈内存放元素的个数
}