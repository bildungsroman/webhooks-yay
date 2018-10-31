const stackery = require('stackery')
const fs = require('fs');
const AWS = require('aws-sdk');
const CwLogs = require('aws-cwlogs');

module.exports.githubWebhookListener = (event, context, callback) => {
  // get environment variables
  const stackeryKey = process.env.STACKERY_KEY;
  const stackerySecret = process.env.STACKERY_SECRET;

  // get the GitHub secret from the environment variables
  const token = process.env.GITHUB_WEBHOOK_SECRET;
  // get the remaining variables from the GitHub event
  const headers = event.headers;
  const githubEvent = headers['X-GitHub-Event'];
  const body = JSON.parse(event.body);
  // this prevents errors from the GitHub ping event
  const username = body.pusher ? body.pusher.name : body.repository.owner.login;
  const message = body.pusher ? `${username} pushed this awesomeness/atrocity through (delete as necessary)` : `Pinging ${username}'s repo.`
  // get repo variables
  const { repository } = body;
  const repo = repository.full_name;
  const url = repository.url;
  
  // check that a GitHub webhook secret variable exists, if not, return an error
  if (typeof token !== 'string') {
    let errMsg = 'Must provide a \'GITHUB_WEBHOOK_SECRET\' env variable';
    return callback(null, {
      statusCode: 401,
      headers: { 'Content-Type': 'text/plain' },
      body: errMsg,
    });
  }
  
  // install stackery with configs

  // make or overwrite .stackery.toml
  // will look like:
  // [stackery]
  //   key = "1rUx**********************T7"
  //   secret = "Kojh**********************Da0r3m9"

  // deploy 






  // We'll keep logging to CloudWatch in case we need to debug
  console.log('---------------------------------');
  console.log(`Github-Event: "${githubEvent}" on this repo: "${repo}" at the url: ${url}.\n ${message}`);
  console.log('---------------------------------');
  console.log(event.body);
  console.log('---------------------------------');

  // return a 200 response if the GitHub tokens match
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
    }),
  };

  return callback(null, response);
};
