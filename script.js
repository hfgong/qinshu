document.addEventListener('DOMContentLoaded', () => {
    // --- 数据定义 ---
    const relationData = {
        '我': {
            'f': '爸爸', 'm': '妈妈', 'h': '老公', 'w': '老婆',
            'ob': '哥哥', 'yb': '弟弟', 'os': '姐姐', 'ys': '妹妹',
            's': '儿子', 'd': '女儿'
        },
        '爸爸': {
            'f': '爷爷', 'm': '奶奶', 'ob': '伯父', 'yb': '叔叔',
            'os': '姑妈', 'ys': '姑妈', 'w': '妈妈'
        },
        '妈妈': {
            'f': '外公', 'm': '外婆', 'ob': '舅舅', 'yb': '舅舅',
            'os': '姨妈', 'ys': '姨妈', 'h': '爸爸'
        },
        '老公': { 'f': '公公', 'm': '婆婆', 'w': '我', 'ob': '大伯哥', 'yb': '小叔子', 'os': '大姑姐', 'ys': '小姑妹' },
        '老婆': { 'f': '岳父', 'm': '岳母', 'h': '我', 'ob': '大舅哥', 'yb': '小舅子', 'os': '姨姐', 'ys': '姨妹' },
        '哥哥': { 'w': '嫂子', 's': '侄子', 'd': '侄女' },
        '弟弟': { 'w': '弟妹', 's': '侄子', 'd': '侄女' },
        '姐姐': { 'h': '姐夫', 's': '外甥', 'd': '外甥女' },
        '妹妹': { 'h': '妹夫', 's': '外甥', 'd': '外甥女' },
        '儿子': { 'w': '儿媳', 's': '孙子', 'd': '孙女' },
        '女儿': { 'h': '女婿', 's': '外孙', 'd': '外孙女' },
        
        '爷爷': { 'f': '太爷爷', 'm': '太奶奶', 'ob': '伯公', 'yb': '叔公', 'os': '姑奶奶', 'ys': '姑奶奶' },
        '奶奶': { 'f': '太姥爷', 'm': '太姥姥', 'ob': '舅公', 'yb': '舅公', 'os': '姨奶奶', 'ys': '姨奶奶' },
        '外公': { 'f': '外太爷爷', 'm': '外太奶奶', 'ob': '伯外公', 'yb': '叔外公', 'os': '姑姥姥', 'ys': '姑姥姥' },
        '外婆': { 'f': '外太姥爷', 'm': '外太姥姥', 'ob': '舅姥爷', 'yb': '舅姥爷', 'os': '姨姥姥', 'ys': '姨姥姥' },

        '伯父': { 'w': '伯母', 's': '堂兄弟', 'd': '堂姐妹' },
        '叔叔': { 'w': '婶婶', 's': '堂兄弟', 'd': '堂姐妹' },
        '姑妈': { 'h': '姑父', 's': '表兄弟', 'd': '表姐妹' },
        '舅舅': { 'w': '舅妈', 's': '表兄弟', 'd': '表姐妹' },
        '舅妈': { 's': '表兄弟', 'd': '表姐妹' },
        '姨妈': { 'h': '姨父', 's': '表兄弟', 'd': '表姐妹' },

        '伯公': { 's': '堂伯/堂叔', 'd': '堂姑' },
        '叔公': { 's': '堂伯/堂叔', 'd': '堂姑' },
        '姑奶奶': { 's': '表伯/表叔', 'd': '表姑' },
        '舅公': { 's': '表伯/表叔', 'd': '表姑' },
        '姨奶奶': { 's': '表伯/表叔', 'd': '表姑' },
        '伯外公': { 's': '堂舅/堂姨', 'd': '堂舅/堂姨' },
        '叔外公': { 's': '堂舅/堂姨', 'd': '堂舅/堂姨' },
        '姑姥姥': { 's': '表舅/表姨', 'd': '表舅/表姨' },
        '舅姥爷': { 's': '表舅/表姨', 'd': '表舅/表姨' },
        '姨姥姥': { 's': '表舅/表姨', 'd': '表舅/表姨' },

        '嫂子': { 's': '侄子', 'd': '侄女' },
        '弟妹': { 's': '侄子', 'd': '侄女' },
        '姐夫': { 's': '外甥', 'd': '外甥女' },
        '妹夫': { 's': '外甥', 'd': '外甥女' },
        '儿媳': { 'f': '亲家公', 'm': '亲家母' },
        '女婿': { 'f': '亲家公', 'm': '亲家母' },

        '大舅哥': { 'w': '姻嫂', 's': '内侄', 'd': '内侄女' },
        '小舅子': { 'w': '姻妹', 's': '内侄', 'd': '内侄女' },
        '姨姐': { 'h': '连襟', 's': '外侄', 'd': '外侄女' },
        '姨妹': { 'h': '连襟', 's': '外侄', 'd': '外侄女' },

        '大伯哥': { 'w': '妯娌', 's': '外侄', 'd': '外侄女' },
        '小叔子': { 'w': '妯娌', 's': '外侄', 'd': '外侄女' },
        '大姑姐': { 'h': '姑姐夫', 's': '外甥', 'd': '外甥女' },
        '小姑妹': { 'h': '姑妹夫', 's': '外甥', 'd': '外甥女' },

        '侄子': { 'w': '侄媳', 's': '侄孙', 'd': '侄孙女' },
        '侄女': { 'h': '侄婿', 's': '侄外孙', 'd': '侄外孙女' },
        '外甥': { 's': '甥孙', 'd': '甥孙女' },
        '外甥女': { 's': '甥外孙', 'd': '甥外孙女' },

        '堂兄弟': { 's': '堂侄', 'd': '堂侄女' },
        '堂姐妹': { 's': '堂外甥', 'd': '堂外甥女' },
        '表兄弟': { 's': '表侄', 'd': '表侄女' },
        '表姐妹': { 's': '表外甥', 'd': '表外甥女' },

        '孙子': { 's': '曾孙', 'd': '曾孙女' },
        '孙女': { 's': '曾外孙', 'd': '曾外孙女' },
        '外孙': { 's': '外曾孙', 'd': '外曾孙女' },
        '外孙女': { 's': '外曾外孙', 'd': '外曾外孙女' },
    };

    const relationTextMap = {
        'f': '的爸爸', 'm': '的妈妈', 'h': '的老公', 'w': '的老婆',
        'ob': '的哥哥', 'yb': '的弟弟', 'os': '的姐姐', 'ys': '的妹妹',
        's': '的儿子', 'd': '的女儿'
    };

    // --- DOM 元素 ---
    const chainDisplay = document.getElementById('relation-chain');
    const resultDisplay = document.getElementById('result');
    const buttons = document.querySelectorAll('.btn');
    const clearBtn = document.getElementById('clear');
    const backspaceBtn = document.getElementById('backspace');

    // --- 状态变量 ---
    let chain = []; // ['m', 'ob'] -> 妈妈的哥哥

    // --- 函数 ---
    function updateDisplay() {
        if (chain.length === 0) {
            chainDisplay.textContent = '我的';
            resultDisplay.textContent = '我';
            return;
        }

        let chainText = '我';
        chain.forEach(code => {
            chainText += relationTextMap[code] || '';
        });
        chainDisplay.textContent = chainText;

        calculate();
    }

    function calculate() {
        let currentRelation = '我';
        let found = true;

        for (const code of chain) {
            if (relationData[currentRelation] && relationData[currentRelation][code]) {
                currentRelation = relationData[currentRelation][code];
            } else {
                currentRelation = '超出计算范围';
                found = false;
                break;
            }
        }
        resultDisplay.textContent = currentRelation;
    }

    function handleButtonClick(event) {
        const key = event.target.dataset.key;
        if (key) {
            chain.push(key);
            updateDisplay();
        }
    }

    function handleClear() {
        chain = [];
        updateDisplay();
    }



    function handleBackspace() {
        if (chain.length > 0) {
            chain.pop();
            updateDisplay();
        }
    }

    // --- 事件监听 ---
    buttons.forEach(button => button.addEventListener('click', handleButtonClick));
    clearBtn.addEventListener('click', handleClear);
    backspaceBtn.addEventListener('click', handleBackspace);

    // --- 初始化 ---
    updateDisplay();
});
