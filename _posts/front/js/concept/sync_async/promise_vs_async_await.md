await を使いすぎると重い

Promise は別の thread で動く

```
const hoge = async () => {
    const a = await runA(); //2
    const b = await runB(); //3
    const c = await runC(); //5
    console.log('aaaa'); //10
}

const hoge =  () => {
    const a = runA(); //2
    const b = runB(); //3
    const c = runC(); //5
    Promise.all([a,b,c]).then(() => {
        console.log('aaaa'); //5
    })
}
```

Collapse

11:38 PM
無題

```
const runA = (a) => {
    return new Promise((resolve, reject) => {
        resolve(t);
    })
}

const runB = (t) => {
    return new Promise((resolve, reject) => {

    })
}

const hoge = () => {
    runA().then(runB);
}
```
