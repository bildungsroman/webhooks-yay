exports.githubWebhookListener = (event, context, callback) => {
  const token = process.env.GITHUB_WEBHOOK_SECRET;
  const headers = event.headers;
  const body = JSON.parse(event.body);
  const { repository, pusher } = body;
  const repo = repository.name;
  const username = pusher.name;
  const url = repository.url;
  const githubEvent = headers['X-GitHub-Event'];

  // check that a GitHub webhook secret variable exists, if not, return an error
  if (typeof token !== 'string') {
    let errMsg = 'Must provide a \'GITHUB_WEBHOOK_SECRET\' env variable';
    return callback(null, {
      statusCode: 401,
      headers: { 'Content-Type': 'text/plain' },
      body: errMsg,
    });
  }

  // print some messages to the CloudFormation console
  console.log('---------------------------------');
  console.log(`Github-Event: "${githubEvent}" on this repo: "${repo}" at the url: ${url}.\n ${username} is to blame if something was broken.`);
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
