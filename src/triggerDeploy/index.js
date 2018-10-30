module.exports.githubWebhookListener = (event, context, callback) => {
  const token = process.env.GITHUB_WEBHOOK_SECRET;
  const headers = event.headers;
  const body = JSON.parse(event.body);
  const { repository, sender } = body;
  const repo = repository.name;
  const username = sender.login;
  const url = repository.url;
  const githubEvent = headers['X-GitHub-Event'];

  if (typeof token !== 'string') {
    let errMsg = 'Must provide a \'GITHUB_WEBHOOK_SECRET\' env variable';
    return callback(null, {
      statusCode: 401,
      headers: { 'Content-Type': 'text/plain' },
      body: errMsg,
    });
  }

  console.log('---------------------------------');
  console.log(`Github-Event: "${githubEvent}" on this repo: "${repo}" at the url: ${url}.\n ${username} is to blame if something was broken.`);
  console.log('---------------------------------');
  console.log(event.body);
  console.log('---------------------------------');

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
    }),
  };

  return callback(null, response);
};
