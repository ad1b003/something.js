# something.js

**Reactive JavaScript Framework**

## Template

_${ `JavaScript Code` }_

use `reactive` attribute in the element which will become reactive 

## Update

`updateAll()` : to update the DOM

## Example

```javascript
<script>
  var count = 0;
  const time = () => ' ' + count > 1 ? 'times' : 'time';
  var loggedIn = false;
</script>
<div>
  <p reactive>You have clicked ${count} ${time()} !</p>
  <p>
    <span reactive>${count}</span>
    <sup reactive>${count}</sup>
    =
    <span reactive>${Math.pow(count, count)}</span>
  </p>
  <button onclick="
      ++count;
      time();
      updateAll();
      //updateWhere('count');
    ">Click</button>
</div>
<div reactive>
  ${count} x ${count} x ${count} = ${Math.pow(count, 3)}
</div>
<div reactive>
  We're ${count > 9 ? count.toString() + " now" : "still " + count.toString()}
</div>
<script src="something.min.js"></script>
```
