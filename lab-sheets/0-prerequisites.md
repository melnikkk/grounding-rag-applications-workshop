# Lab 0: Setup

So you want to build a RAG app with React? Brilliant, as this is exactly what this workshop is for! 

There are a couple of things you'll need before we start:

## 0: Assumed installations

Please ensure you have the following tools installed:

1. [Node.js](https://nodejs.org/en)
2. [npm](https://www.npmjs.com/)
 
To check you have Node.js and npm installed, run the following commands:

```bash
node -v
npm -v
```

3. [tsx](https://www.npmjs.com/package/tsx)

If you don't have tsx installed please make sure you have a global install configured by running the below command:

```zsh
npm install -g tsx
```

If you receive an error, [download and install Node.js and npm using these instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## 2: Ollama installation

There are many open source and proprietary machine learning models out there that can be used when building RAG applications. To make local development easy, we shall be using [Ollama](https://ollama.com/) to run our models locally.

```zsh
brew install ollama
```

We'll cover how to pull and run models locally in the workshop.

## 3. Initialization of the starting point application:

To help you get started, a very simple web application is included in this repository under the `movie-rag` folder. To initialize the application, please follow the below commands in a terminal to start the application. 

```bash
cd movie-rag
npm install
npm run start
```

Please ensure that you are present in the top-level folder for this project when you start. These steps should be the same for Windows and Mac.

## 4: direnv (or alternative) [OPTIONAL]

This lab makes use of environment variables for some attributes that are loaded using `process.env` within our application. For ease in the workshop I recommend using a shell environment loading tool such as [direnv](https://github.com/direnv/direnv) configured to support `env` files.

If using `direnv` also make sure that you have configured your profile to accept `.env` files:

```zsh
cat $HOME/.config/direnv/direnv.toml 
```

Example config:

```toml
[global]
load_dotenv=true
```

## 5. An Elastic cluster to store your documents and perform searches against [OPTIONAL] 

If you're attending the workshop at React Day Berlin, check out the cluster credentials .env file for your assigned group ont he day. You will see configuration that looks a bit like this:

```zsh
ELASTIC_DEPLOYMENT=https://my-random-elastic-deployment:123
ELASTIC_API_KEY=ARandomKey!
INDEX_NAME="movies"
```

For those following along outside this time, or who want their own cluster, please follow either the [start-local steps](https://www.elastic.co/guide/en/elasticsearch/reference/current/run-elasticsearch-locally.html) or register for an Elastic Cloud free trial via the below steps:

1. Create a trial account at [https://cloud.elastic.co/](https://cloud.elastic.co/) using the *Start free trial* button.
2. Add the basic settings for your new cluster:
    * Name your deployment something interesting.
    * Choose your preferred cloud provider (any is fine).
    * Choose your region, ideally one close to your physical location.
    * Keeping the *Hardware profile* as the default of *Storage optimized* is fine.
    * Keep *Version* as the latest.
3. Configure the advanced cluster settings:
    * Set zone availability on the *Hot tier* of Elasticsearch to 1 (you don't need to worry about data loss for our toy project).
    * Make sure you have autoscaling enabled on the *Machine Learning instances*.
    * Keep the default settings for Kibana (the UI and data visualization layer).
    * Remove the Integrations Server instances. These are used for application monitoring which is out of scope of today's workshop.
4. Hit the *Create deployment* button.
5. Take a note of your deployment credentials somewhere safe. Especially the password!
6. Navigate to your deployment once ready with the *Continue* button.

Happy workshopping!