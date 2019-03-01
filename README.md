# KnightHacks Azure Functions & Azure Cognitive Services Face Emotion Demo

A simple Azure Function App that uses Cognitive Services to determine the emotions of faces in pictures. This was demoed at Knight Hacks 2019!

The function app has two functions inside of it:

- App - The form UI of the function app that lets you put in an image URL and submit.
- Submit - The function that queries Azure Cognitive Services and returns the results.

## Getting started

- Free $100 credit: https://aka.ms/azureforstudents
- Take survey to get t-shirt or socks: https://aka.ms/azure-hackathon

### Cognitive Services prereqs

For this demo, we'll be using the [Vision Face API](https://azure.microsoft.com/en-us/try/cognitive-services/).

1. On that page, click "Get API Key", which will take you to the [Cognitive Services create page](https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesFace).
1. For pricing tier, choose "F0", which gives you 30K calls per month for free.
1. Choose or create a resource group, then click Create!
1. You'll get to the Quick Start page once it's ready for you to use.

### Azure Functions prereqs

#### Install tools

For this demo, we'll be using the [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#install-the-azure-functions-core-tools). You could also use the [Visual Studio Code extension](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-vs-code).

In addition to that, you'll need the [LTS version of Node.js](https://nodejs.org/en/). As of writing this, it's `10.15`.

### Working with the code

Open up your favorite terminal/shell app... PowerShell, Command Prompt, Terminal.app, etc.

Change directories into a folder you want to work in (Desktop, Documents, etc):

```sh
cd ~/Desktop
```

Then use `git` to clone the repository:

```sh
git clone https://github.com/TylerLeonhardt/AzureFunctions-CognitiveServices-FaceEmotion-Demo.git
```

If you don't have git, you can get it [from the website](https://git-scm.com).

Change directories into the folder you just cloned:

```sh
cd AzureFunctions-CognitiveServices-FaceEmotion-Demo
```

You'll be working out of this folder.

#### Install dependencies

To install the dependencies for this project, simply run:

```sh
npm install
```

This will install `node-fetch` and its dependencies. They'll show up in the `node_modules` folder.

#### Configure the function app

You'll need to create a `local.settings.json` with the Cognitive Services secrets so that everything works properly.

Create a `local.settings.json` in the root of the repository and add the following:

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "{AzureWebJobsStorage}",
    "CognitiveServicesKey":"<REPLACE WITH YOUR KEY>",
    "CognitiveServicesUrlBase":"<REPLACE WITH YOUR BASE URL>/detect"
  }
}
```

Replace the parts with your key and url base. You can get those from the Azure Portal where you created your Cognitive Services instance.

MAKE SURE YOU INCLUDE `/detect` AT THE END OF THE `CognitiveServicesUrlBase`!

## Running the Function App

To run the function app, simply run:

```sh
func start
```

You'll see something like:

```none
PS > func start

                  %%%%%%
                 %%%%%%
            @   %%%%%%    @
          @@   %%%%%%      @@
       @@@    %%%%%%%%%%%    @@@
     @@      %%%%%%%%%%        @@
       @@         %%%%       @@
         @@      %%%       @@
           @@    %%      @@
                %%
                %

Azure Functions Core Tools (2.4.317 Commit hash: 63e1996b6c281079427e7c9b8a0a1c633988a195)
Function Runtime Version: 2.0.12285.0
[3/1/19 4:46:42 AM] Starting Rpc Initialization Service.
[3/1/19 4:46:42 AM] Initializing RpcServer
[3/1/19 4:46:42 AM] Building host: startup suppressed:False, configuration suppressed: False
[3/1/19 4:46:43 AM] Reading host configuration file '/Users/tyler/Code/JavaScript/testfunc/host.json'
[3/1/19 4:46:43 AM] Host configuration file read:
[3/1/19 4:46:43 AM] {
[3/1/19 4:46:43 AM]   "version": "2.0"
[3/1/19 4:46:43 AM] }
[3/1/19 4:46:44 AM] Initializing Host.
[3/1/19 4:46:44 AM] Host initialization: ConsecutiveErrors=0, StartupCount=1
[3/1/19 4:46:44 AM] LoggerFilterOptions
[3/1/19 4:46:44 AM] {
[3/1/19 4:46:44 AM]   "MinLevel": "None",
[3/1/19 4:46:44 AM]   "Rules": [
[3/1/19 4:46:44 AM]     {
[3/1/19 4:46:44 AM]       "ProviderName": null,
[3/1/19 4:46:44 AM]       "CategoryName": null,
[3/1/19 4:46:44 AM]       "LogLevel": null,
[3/1/19 4:46:44 AM]       "Filter": "<AddFilter>b__0"
[3/1/19 4:46:44 AM]     },
[3/1/19 4:46:44 AM]     {
[3/1/19 4:46:44 AM]       "ProviderName": "Microsoft.Azure.WebJobs.Script.WebHost.Diagnostics.SystemLoggerProvider",
[3/1/19 4:46:44 AM]       "CategoryName": null,
[3/1/19 4:46:44 AM]       "LogLevel": "None",
[3/1/19 4:46:44 AM]       "Filter": null
[3/1/19 4:46:44 AM]     },
[3/1/19 4:46:44 AM]     {
[3/1/19 4:46:44 AM]       "ProviderName": "Microsoft.Azure.WebJobs.Script.WebHost.Diagnostics.SystemLoggerProvider",
[3/1/19 4:46:44 AM]       "CategoryName": null,
[3/1/19 4:46:44 AM]       "LogLevel": null,
[3/1/19 4:46:44 AM]       "Filter": "<AddFilter>b__0"
[3/1/19 4:46:44 AM]     }
[3/1/19 4:46:44 AM]   ]
[3/1/19 4:46:44 AM] }
[3/1/19 4:46:44 AM] FunctionResultAggregatorOptions
[3/1/19 4:46:44 AM] {
[3/1/19 4:46:44 AM]   "BatchSize": 1000,
[3/1/19 4:46:44 AM]   "FlushTimeout": "00:00:30",
[3/1/19 4:46:44 AM]   "IsEnabled": true
[3/1/19 4:46:44 AM] }
[3/1/19 4:46:44 AM] SingletonOptions
[3/1/19 4:46:44 AM] {
[3/1/19 4:46:44 AM]   "LockPeriod": "00:00:15",
[3/1/19 4:46:44 AM]   "ListenerLockPeriod": "00:00:15",
[3/1/19 4:46:44 AM]   "LockAcquisitionTimeout": "10675199.02:48:05.4775807",
[3/1/19 4:46:44 AM]   "LockAcquisitionPollingInterval": "00:00:05",
[3/1/19 4:46:44 AM]   "ListenerLockRecoveryPollingInterval": "00:01:00"
[3/1/19 4:46:44 AM] }
[3/1/19 4:46:44 AM] Starting JobHost
[3/1/19 4:46:44 AM] Starting Host (HostId=tylersmacbookpro-680785488, InstanceId=36f5f3c0-1a4e-435c-b68a-4f25e4577f16, Version=2.0.12285.0, ProcessId=50145, AppDomainId=1, InDebugMode=False, InDiagnosticMode=False, FunctionsExtensionVersion=)
[3/1/19 4:46:44 AM] Loading functions metadata
[3/1/19 4:46:44 AM] 2 functions loaded
[3/1/19 4:46:44 AM] WorkerRuntime: node. Will shutdown other standby channels
[3/1/19 4:46:44 AM] Starting language worker process:node  "/usr/local/Cellar/azure-functions-core-tools/2.4.317/workers/node/dist/src/nodejsWorker.js" --host 127.0.0.1 --port 62167 --workerId 47af59a0-3119-4281-854f-cceb0e9f4f31 --requestId 59122cb6-03b6-441d-b3eb-5e875d325e02 --grpcMaxMessageLength 134217728
[3/1/19 4:46:44 AM] node process with Id=50146 started
[3/1/19 4:46:44 AM] Generating 2 job function(s)
[3/1/19 4:46:44 AM] Found the following functions:
[3/1/19 4:46:44 AM] Host.Functions.ui
[3/1/19 4:46:44 AM] Host.Functions.HttpTrigger
[3/1/19 4:46:44 AM]
[3/1/19 4:46:44 AM] Host initialized (739ms)
[3/1/19 4:46:44 AM] Host started (767ms)
[3/1/19 4:46:44 AM] Job host started
[3/1/19 4:46:45 AM] Worker 47af59a0-3119-4281-854f-cceb0e9f4f31 connecting on 127.0.0.1:62167
[3/1/19 4:46:45 AM] (node:50146) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
[3/1/19 4:46:45 AM] Adding language worker channel for runtime: node.
Hosting environment: Production
Content root path: /Users/tyler/Code/JavaScript/testfunc
Now listening on: http://0.0.0.0:7071
Application started. Press Ctrl+C to shut down.

Http Functions:

	ui: [GET,POST] http://localhost:7071/api/App

	HttpTrigger: [GET,POST] http://localhost:7071/api/Submit
```

From here, navigate to `http://localhost:7071/api/App` in your browser and try it out!
