/*global globalObject, virtualfs*/

const Filer = require('filer');

let virtualGlobalObject = {};
let env = 'browser';
function setupGlobalObject() {
    if(typeof window !== 'undefined'){
        window.globalObject = window;
        env = 'browser';
        return window; // browser
    }
    if(typeof self !== 'undefined'){
        self.globalObject = self;
        self.import = importScripts;
        env = 'web-worker';
        return self; // web worker
    }
    if(typeof global !== 'undefined'){
        global.globalObject = global;
        env = 'nodejs. Not sure why you need virtual fs in node!';
        return global; //nodejs
    }
    return virtualGlobalObject;
}
setupGlobalObject();

const urlParams = new URLSearchParams(location.search);
globalObject.Filer = Filer;
globalObject.virtualfs = {
    urlParams : urlParams,
    debugMode : urlParams.get('debug'),
    env: env
};

console.log('virtual fs started on environment: ', virtualfs.env);
if(!virtualfs.debugMode){
    console.log = function () {
        // dont log anything
    };
} else {
    console.log('virtualFs started in debug mode');
}
