"use strict";
// const { Client, Event } = require('@harnessio/ff-nodejs-server-sdk');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ff_nodejs_server_sdk_1 = require("@harnessio/ff-nodejs-server-sdk");
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // set apiKey to your SDK API Key
    const apiKey = (_a = process.env['FF_API_KEY']) !== null && _a !== void 0 ? _a : 'YOUR_API_KEY';
    // set flagName to your flag identifier from the UI
    const flagName = (_b = process.env['FF_FLAG_NAME']) !== null && _b !== void 0 ? _b : 'harnessappdemodarkmode';
    console.log('Harness SDK Getting Started');
    // Create Client
    const client = new ff_nodejs_server_sdk_1.Client(apiKey);
    // Create a target (different targets can receive different results based on rules.
    // Here we are including "location" as a custom attribute)
    const target = {
        identifier: 'nodeserversdk',
        name: 'NodeServerSDK',
        attributes: {
            location: 'emea',
        },
    };
    yield client.waitForInitialization();
    try {
        // Log the state of the flag every 10 seconds
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            const value = yield client.boolVariation(flagName, target, false);
            console.log('Flag variation:', value);
        }), 10000);
        // We can also watch for the event when a flag changes
        client.on(ff_nodejs_server_sdk_1.Event.CHANGED, (flagIdentifier) => __awaiter(void 0, void 0, void 0, function* () {
            const value = yield client.boolVariation(flagIdentifier, target, false);
            console.log(`${flagIdentifier} changed: ${value}`);
        }));
    }
    catch (e) {
        console.error('Error:', e);
    }
}))();
