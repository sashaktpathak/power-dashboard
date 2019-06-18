# Location of Function where get address Button is called

- I have created an API to get Response Data i.e Whenever get Response Button is Pressed
- This api is located in `app/routes.js` at `line 77`
- search `getResp` in `main.js(frontend)` where post request is send to `route.js(Backend)`
- In This Function We can Call our required Command Line

## Line Number may Change just Search `getResp` to locate the Function

# Executing Command Line Commands using Nodejs

```javascript
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function ls() {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}
ls()
```
This is the example where we can see the execution of `ls` command using Nodejs

## For more details refer   https://stackoverflow.com/questions/20643470/execute-a-command-line-binary-with-node-js