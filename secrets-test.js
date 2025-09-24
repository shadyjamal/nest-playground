// AWS credentials (common pattern)
const awsAccessKeyId = "AKIAIOSFODNN7EXAMPLE";
const awsSecretAccessKey = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

// GitHub personal access token
const githubToken = "ghp_16characterstoKEyexamplE4567";

// Azure secret
const azureClientSecret = "6d6bfe13-21b2-4ac8-8e3b-example-client-secret";

// Generic HTTP bearer token
const bearerToken = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.exampletoken";

// SSH private key (start only, avoid full key for test)
const sshPrivateKeyStart = "-----BEGIN OPENSSH PRIVATE KEY-----\n..."

function testSecrets() {
  console.log("AWS ID:", awsAccessKeyId);
  console.log("GitHub Token:", githubToken);
  console.log("Stripe Key:", stripeApiKey);
  console.log("Slack Token:", slackBotToken);
  console.log("Azure Secret:", azureClientSecret);
  console.log("Bearer Token:", bearerToken);
  console.log("SSH Private Key Start:", sshPrivateKeyStart);
}

testSecrets();
