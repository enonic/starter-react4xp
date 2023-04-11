/** Wraps Regions from https://www.npmjs.com/package/react4xp-regions */
import React from 'react';
//import {toStr} from '@enonic/js-utils/dist/cjs';
import {Regions} from '@enonic/react-components';
import dayjs from 'dayjs';

/*function testNashornPolyfills() {
  console.debug('context', toStr(context)); // undefined
  console.debug('typeof context', typeof context); // object

  const map1 = new Map();
  map1.set('a', 1);
  map1.set('b', 2);
  console.debug('map1', toStr(map1));
  map1.delete('b');
  console.debug('map1.size', map1.size); // undefined
  console.debug("map1.get('a')", map1.get('a'));

  const mySet1 = new Set();
  mySet1.add(1);
  mySet1.add(5);
  console.debug('mySet1', toStr(mySet1));
  console.debug('mySet1.has(1)', mySet1.has(1));
  console.debug('mySet1.has(2)', mySet1.has(2));
  mySet1.delete(5)
  console.debug('mySet1.size', mySet1.size); // undefined

  console.debug('typeof window', typeof window); // object
  console.debug('typeof window.addEventListener', typeof window.addEventListener); // function
  console.debug('typeof window.document', typeof window.document); // object
  console.debug('typeof window.Map', typeof window.Map); // function
  console.debug('typeof window.Set', typeof window.Set); // function

  const target = { a: 1, b: 2 };
  const source = { b: 4, c: 5 };
  const returnedTarget = Object.assign(target, source);
  console.log('source', toStr(source));
  console.log('target', toStr(target));
  console.log('Object.assign(target, source)', toStr(returnedTarget));

  // com.enonic.lib.react4xp.ssr.errors.RenderException: Timer already cancelled.
  /*setTimeout(() => {console.log("This should appear last after 5 seconds")}, 5000);
  setTimeout(() => {console.log("This should appear in the middle after 3 seconds")}, 3000);
  setTimeout(() => {console.log("This should appear first after 1 second")}, 1000);

  // com.enonic.lib.react4xp.ssr.errors.RenderException: Timer already cancelled.
  var intervalID = setInterval(() => {
    console.debug('setInterval() delay:100');
  }, 100)
  setTimeout(() => {
    console.debug('setTimeout() delay:1000');
    clearTimeout(intervalID);
  }, 1000)*
} // testNashornPolyfills*/


export default (props) => {
  //testNashornPolyfills();
  return (
    <div className="default-page">
        <Regions {...props} />
		<div>{dayjs().format()}</div>
    </div>
  );
};
