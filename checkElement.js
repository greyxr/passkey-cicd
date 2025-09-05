const fs = require("fs");
// Playwright element screenshot
async function screenshotElement(element, factor) {
  const screenshotPath = `screenshots/${factor.pageName}-${Date.now()}.png`;
  if (!fs.existsSync("screenshots")) fs.mkdirSync("screenshots");
  if (element) {
    await element.screenshot({ path: screenshotPath });
    return { description: factor.description, passed: true, screenshot: screenshotPath };
  } else {
    return { description: factor.description, passed: false, screenshot: null };
  }
}

async function screenshotPage(page, pageName) {
  const screenshotPath = `screenshots/${pageName}-${Date.now()}.png`;
  if (!fs.existsSync("screenshots")) fs.mkdirSync("screenshots");
  if (page) {
    await page.screenshot({ path: screenshotPath });
    return { description: pageName, passed: true, screenshot: screenshotPath };
  } else {
    return { description: pageName, passed: false, screenshot: null };
  }
}

async function getElement(potentialFields, page, preferredStrategies = []) {
  let element = null;
  for (const field of potentialFields) {
    // element = await page.$(field);
    // if (element) break;
  element = await getText(field, page, preferredStrategies);
    if (element) break;
  }
  return element;
}

// TODO: Pass in strategies by factor in order to be more precise
async function getText(field, page, preferredStrategies) {
  const strategies = [
    {"strategy": () => page.getByRole('button', { name: field }), "name": "button"},
    {"strategy": () => page.getByLabel(field), "name": "label"},
    {"strategy": () => page.getByText(field), "name": "text"}
  ];

  // Filter strategies based on preferredStrategies if provided, otherwise use all strategies
  const strategiesToUse = preferredStrategies && preferredStrategies.length > 0
    ? strategies.filter(strategy => preferredStrategies.includes(strategy.name))
    : strategies;

  for (const entry of strategiesToUse) {
    const element = await entry.strategy();
    if (await element.isVisible()) {
      console.log("Element found:", await element.evaluate(el => el.outerHTML));
      return element;
    }
  }

  console.log("Element not found or not visible for field:", field);
  return null;
}
async function getUsernameField(page) {
  const potentialUsernameFields = [
    "#username",
    "#user",
    "username"
    // TODO: Add more potential selectors
  ];
  return await getElement(potentialUsernameFields, page);
}

async function getPasswordField(page) {
  const potentialPasswordFields = [
    "#password",
    "#pass",
    "password"
    // TODO: Add more potential selectors
  ];
  return await getElement(potentialPasswordFields, page);
}

// FACTOR checks
async function checkSignInWithPasskeyButton(page) {
  console.log("Checking for Sign-In with Passkey Button");
  const potentialFields = [
    "Signin with Passkey"
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "loginPage", description: "Sign-In with Passkey Button" };
  const element = await getElement(potentialFields, page);
  return await screenshotElement(element, factor);
}
async function getSubmitButton(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
    "Login",
    "login",
    "Submit",
    "Log In"
  ];
  const element = await getElement(potentialFields, page, ["button"])
  return element;
}

async function checkContinueButton(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  return potentialFields;
}
async function checkPasskeySignInOptions(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "loginPage", description: "Passkey sign-in options are present on the login page" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}

async function checkEducationalResources(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "userSettingsPage", description: "Educational resources about passkeys are available in account settings" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function checkPriority(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "userSettingsPage", description: "Passkey-related settings are given priority in the UI" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function checkSetupAuthentication(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "userSettingsPage", description: "Authentication setup options are available in account settings" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function checkPromotion(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "userSettingsPage", description: "Passkey promotion banners or messages are shown to the user" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function checkSecurityKeysAwareness(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "userSettingsPage", description: "UI raises awareness about security keys and passkeys" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}

async function checkNamingConventions(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "Passkey naming conventions are enforced or suggested in the UI" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function checkManagementUI(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI for managing passkeys is present and functional" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}

async function addPasskeyAccountSettingsSetup(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "Option to add a passkey from account settings is available" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function addPasskeySecurityKeySetup(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI supports adding a security key as a passkey" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function addPasskeyCrossDeviceSetup(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI supports cross-device passkey setup" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function addPasskeyAccountRecoverySetup(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI supports setting up account recovery with passkeys" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function addPasskeyMultiselection(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI allows selecting multiple passkeys or authenticators" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function addPasskeySetupNotification(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "User receives notification after setting up a passkey" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}

async function updatePasskeyUpdateOption(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI provides an option to update an existing passkey" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function updatePasskeyUpdateNotification(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "User receives notification after updating a passkey" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}

async function deletePasskeyDeleteOption(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI provides an option to delete a passkey" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function deletePasskeyAuthenticatorCleanUp(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "Authenticator is properly cleaned up after passkey deletion" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function deletePasskeyDeletionAuthentication(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "User is required to authenticate before deleting a passkey" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}
async function deletePasskeyDeletionNotification(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "User receives notification after deleting a passkey" };
const element = await getElement(potentialFields, page);
return await screenshotElement(element, factor);
}

module.exports = {
  screenshotPage,
  getElement,
  screenshotElement,
  getSubmitButton,
  getUsernameField,
  getPasswordField,
  checkSignInWithPasskeyButton,
  checkContinueButton,
  checkPasskeySignInOptions,
  checkEducationalResources,
  checkPriority,
  checkSetupAuthentication,
  checkPromotion,
  checkSecurityKeysAwareness,
  checkNamingConventions,
  checkManagementUI,
  addPasskeyAccountSettingsSetup,
  addPasskeySecurityKeySetup,
  addPasskeyCrossDeviceSetup,
  addPasskeyAccountRecoverySetup,
  addPasskeyMultiselection,
  addPasskeySetupNotification,
  updatePasskeyUpdateOption,
  updatePasskeyUpdateNotification,
  deletePasskeyDeleteOption,
  deletePasskeyAuthenticatorCleanUp,
  deletePasskeyDeletionAuthentication,
  deletePasskeyDeletionNotification
};