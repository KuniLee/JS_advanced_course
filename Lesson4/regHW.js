// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные
// кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на
// двойную

// (?<=\W)' ищет любые кавычки ДО которых есть небуквенный символ (пробел, знак препинатия итд)
//'(?=\W)  ищет любые кавычки ПОСЛЕ которых есть небуквенный символ
// | - или

function replaceQuotes(text){
return text.replace(/(?<=\W)'|'(?=\W)/g,`"`)
}

console.log(replaceQuotes(`
Lorem ipsu'm dolor si't amet, 'consectetur' adipiscing elit. Donec ullamcorper felis vitae augue luctus, ut viverra quam
 vehicula. In luctus urna quis ligula molesti'e tempus sit amet quis nunc. 'Nunc a ullamcorper nisl', at sempe'r nulla.
 Interdum et malesuada fames ac ante ipsum primis in faucibus.
`))

// Lorem ipsu'm dolor si't amet, "consectetur" adipiscing elit. Donec ullamcorper felis vitae augue luctus, ut viverra
// quam vehicula. In luctus urna quis ligula molesti'e tempus sit amet quis nunc. "Nunc a ullamcorper nisl", at semp
// e'r nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus.

