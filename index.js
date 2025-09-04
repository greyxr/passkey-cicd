const { chromium } = require("playwright");
const fs = require("fs");
const config = require("./config.json");
const utils = require("./checkElement.js");


(async () => {
  // overwrite navigator.credentials.get() to check options
  const originalCredentialsGet = navigator.credentials.get;
  navigator.credentials.get = async (options) => {
    console.log("navigator.credentials.get called with options:", options);
    return originalCredentialsGet(options);
  };

  console.log("Starting browser")
 const browser = await chromium.launch();
  const context = await browser.newContext();
  console.log("Opening new page")
  const page = await context.newPage();
  const results = [];


  // 1. Login

  // Navigate to login
  await page.goto(config.loginPage);
  // Get username and password fields
  const usernameField = await utils.getUsernameField();
  const passwordField = await utils.getPasswordField();
  // const element = await page.getByRole('button', { name: 'Sign in' })
  // const button = page.getByRole('button', { name: 'Signin with Passkey' });
  // FACTOR: Check for sign-in with passkey button
  results.push(await utils.checkSignInWithPasskeyButton(page));

  const submitButton = await utils.getSubmitButton();
  // If no submit button, check for continue button
  if (!submitButton) {
    const checkContinueButtonResult = await utils.checkContinueButton();
    // push continue button
  } else {
    // push submit button
  }
  // FACTOR: Check for passkey sign-in options
  await utils.checkPasskeySignInOptions();

  // 2. Account settings

  // Navigate to account settings
  // await page.goto(config.accountSettingsPage);
  // FACTOR: Educational resources
  await utils.checkEducationalResources();
  // FACTOR: Priority
  await utils.checkPriority();
  // FACTOR: Setup-Authentication
  await utils.checkSetupAuthentication();
  // FACTOR: Promotion
  await utils.checkPromotion();
  // FACTOR: Security-Keys-Awareness
  await utils.checkSecurityKeysAwareness();


  // 3. Passkey settings
  // await page.goto(config.passkeyPage, { waitUntil: "networkidle0" });
  // FACTOR: Promotion
  await utils.checkPromotion();
  // FACTOR: Security-Keys-Awareness
  await utils.checkSecurityKeysAwareness();
  // FACTOR: Naming-Conventions
  await utils.checkNamingConventions();
  // FACTOR: Management-UI
  await utils.checkManagementUI();

  // Add a passkey

  // FACTOR: Account-Settings-Setup
  await utils.addPasskeyAccountSettingsSetup();
  // FACTOR: Security-Key-Setup
  await utils.addPasskeySecurityKeySetup();
  // FACTOR: Cross-Device-Setup
  await utils.addPasskeyCrossDeviceSetup();
  // FACTOR: Account-Recovery-Setup
  await utils.addPasskeyAccountRecoverySetup();
  // FACTOR: Multiselection
  await utils.addPasskeyMultiselection();
  // FACTOR: Setup-Notification
  await utils.addPasskeySetupNotification();

  // Update a passkey

  // FACTOR: Update-Option
  await utils.updatePasskeyUpdateOption();
  // FACTOR: Update-Notification
  await utils.updatePasskeyUpdateNotification();

  // Delete a passkey

  // FACTOR: Delete-Option
  await utils.deletePasskeyDeleteOption();
  // FACTOR: Authenticator-Clean-Up
  await utils.deletePasskeyAuthenticatorCleanUp();
  // FACTOR: Deletion-Authentication
  await utils.deletePasskeyDeletionAuthentication();
  // FACTOR: Deletion-Notification
  await utils.deletePasskeyDeletionNotification();

  // for (const check of config.checks) {
  //   const url = config[check.page];
  //   await page.goto(url, { waitUntil: "networkidle0" });
    
  //   const element = await page.$(check.selector);
  // }

  await browser.close();

  // 4. Generate HTML report
  let html = "<html><body><h1>Passkey UI Test Report</h1><ul>";
  for (const r of results) {
    html += `<li>${r.passed ? "✅" : "❌"} ${r.description}`;
    if (r.screenshot) html += `<br><img src="${r.screenshot}" width="300">`;
    html += `</li>`;
  }
  html += "</ul></body></html>";

  fs.writeFileSync("report.html", html);
  console.log("Report generated: report.html");
})();
