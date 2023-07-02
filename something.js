// find rest of the template ${}
function findRest(pos, text, key, relement, ending) {
  let varName = '';
  while (text[pos] !== ending) {
    varName += text[pos];
    ++pos;
  }
  //console.log(varName);
  relement['content'].push(varName);
  let idx = relement['content'].indexOf(varName);
  while (relement['rVarIdx'].includes(idx)) {
    idx = relement['content'].indexOf(varName, idx + 1);
    //console.log(key, idx);
  }
  relement['rVarIdx'].push(idx);
  //console.log(relement['rVarIdx']);
  reactiveVar[varName] = {
    ...reactiveVar[varName]
  };
  if (!Object.hasOwn(reactiveVar[varName], key)) {
    reactiveVar[varName][key] = {
      'element': relement['element'],
      'idx': []
    };
  }
  reactiveVar[varName][key]['idx'].push(idx);
  pos += 1;
  //console.table(reactiveVar);
  return pos;
}

function lexer(text, key, relement) {
  let prevIdx = 0,
    idx = 0;
  for (; idx < text.length; idx++) {
    if (text[idx] === '$') {
      if (text[idx + 1] === '{') {
        relement['content'].push(text.substring(prevIdx, idx));
        idx += 2;
        idx = findRest(idx, text, key, relement, '}');
        prevIdx = idx;
      }
    }
  }
  relement['content'].push(text.substring(prevIdx, text.length));
}

function execute(code) {
  const fn = Function('return ' + code);
  return fn();
}

function show(element, object) {
  let text = '';
  const content = object['content'];
  console.log(content);
  for (let idx = 0; idx < content.length; idx++) {
    if (object['rVarIdx'].includes(idx)) {
      const result = execute(content[idx]);
      object['newValue'][object['rVarIdx'].indexOf(idx)] = result;
      text += result;
      continue;
    }
    text += content[idx];
  }
  element.innerText = text;
}

let reactiveElement = {};
let reactiveVar = {};

const rElem = document.querySelectorAll('[reactive]');

rElem.forEach((element, idx) => {
  const key = 'rID-' + element.tagName.toLowerCase() + `-${idx+1}`;
  //${Math.random() - idx}`;
  //console.log(key);
  element.setAttribute('reactive', key);
  reactiveElement[key] = {
    'element': element,
    'content': [],
    'rVarIdx': [],
    'newValue': []
  };
  lexer(element.textContent, key, reactiveElement[key]);
  //console.log(reactiveElement[key]['newValue']);
  show(element, reactiveElement[key]);
});

function updateAll() {
  for (const element in reactiveElement) {
    show(reactiveElement[element]['element'], reactiveElement[element]);
  }
}

function updateWhere(code) {
  Object.keys(reactiveVar[code]).forEach(key => {
    let text = '';
    const object = reactiveVar[code][key];
    //console.log(object['idx']);
    const content = reactiveElement[key]['content'];
    for (let i = 0; i < content.length; i++) {
      if (object['idx'].includes(i)) {
        text += execute(code);
        continue;
      }
      else if ((!object['idx'].includes(i)) && reactiveElement[key]['rVarIdx'].includes(i)) {
        text += reactiveElement[key]['newValue'][reactiveElement[key]['rVarIdx'].indexOf(i)];
        continue;
      }
      text += content[i];
    }
    reactiveElement[key]['element'].innerText = text;
  });
  //console.log('updating...');
}

/*
function replaceBetween(origin, insertion, startIndex, endIndex) {
  return origin.substring(0, startIndex) + insertion + origin.substring(endIndex);
}
*/

/*
 * track all elements with _-_-_ attributes
 * find all the ${} or $'' in the content
 * register the element and their start position and end position
 * evaluate inside ${} or $''
 * replace ${} with evaluated values
 */

/*
 * call updateUI() with the variable or function name
 * find all elements with the value
 * update
 */

/*
 * updateAll();
 * updateUIOf(element);
 * updateWhere(variable);
 */
 
/*
  * Implement if-else
  * find <template> tag with conditional attribute
  * find its parent
  * make a list of its children
  * iterate over the list
      evaluates the condition
      if true render and break
  * first element has to be if
  * last element has to be else
*/