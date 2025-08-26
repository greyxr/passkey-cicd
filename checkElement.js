const fs = require("fs");
// Playwright element screenshot
async function screenshotElement(potentialFields, page, factor) {
  const element = await getElement(potentialFields, page);
  const screenshotPath = `screenshots/${factor.pageName}-${Date.now()}.png`;
  if (!fs.existsSync("screenshots")) fs.mkdirSync("screenshots");
  if (element) {
    await element.screenshot({ path: screenshotPath });
    return { description: factor.description, passed: true, screenshot: screenshotPath };
  } else {
    return { description: factor.description, passed: false, screenshot: null };
  }
}

async function getElement(potentialFields, page) {
  let element = null;
  for (const field of potentialFields) {
    // element = await page.$(field);
    // if (element) break;
  element = await getText(field, page);
    if (element) break;
  }
  return element;
}

// TODO: Pass in strategies by factor in order to be more precise
async function getText(field, page) {
  const strategies = [
    () => page.getByRole('button', { name: field }),
    () => page.getByLabel(field),
    () => page.getByText(field)
  ];

  for (const strategy of strategies) {
    const element = await strategy();
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
    "#user"
    // TODO: Add more potential selectors
  ];
  // return await getElement(potentialUsernameFields, page);
}

async function getPasswordField(page) {
  const potentialPasswordFields = [
    "#password",
    "#pass"
    // TODO: Add more potential selectors
  ];
  return potentialPasswordFields;
}

// FACTOR checks
async function checkSignInWithPasskeyButton(page) {
  console.log("Checking for Sign-In with Passkey Button");
  const potentialFields = [
    "Signin with Passkey"
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "loginPage", description: "Sign-In with Passkey Button" };
  return await screenshotElement(potentialFields, page, factor);
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
  return await screenshotElement(potentialFields, page, factor);
}

async function checkEducationalResources(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "userSettingsPage", description: "Educational resources about passkeys are available in account settings" };
  return await screenshotElement(potentialFields, page, factor);
}
async function checkPriority(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "userSettingsPage", description: "Passkey-related settings are given priority in the UI" };
  return await screenshotElement(potentialFields, page, factor);
}
async function checkSetupAuthentication(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "userSettingsPage", description: "Authentication setup options are available in account settings" };
  return await screenshotElement(potentialFields, page, factor);
}
async function checkPromotion(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "userSettingsPage", description: "Passkey promotion banners or messages are shown to the user" };
  return await screenshotElement(potentialFields, page, factor);
}
async function checkSecurityKeysAwareness(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "userSettingsPage", description: "UI raises awareness about security keys and passkeys" };
  return await screenshotElement(potentialFields, page, factor);
}

async function checkNamingConventions(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "Passkey naming conventions are enforced or suggested in the UI" };
  return await screenshotElement(potentialFields, page, factor);
}
async function checkManagementUI(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI for managing passkeys is present and functional" };
  return await screenshotElement(potentialFields, page, factor);
}

async function addPasskeyAccountSettingsSetup(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "Option to add a passkey from account settings is available" };
  return await screenshotElement(potentialFields, page, factor);
}
async function addPasskeySecurityKeySetup(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI supports adding a security key as a passkey" };
  return await screenshotElement(potentialFields, page, factor);
}
async function addPasskeyCrossDeviceSetup(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI supports cross-device passkey setup" };
  return await screenshotElement(potentialFields, page, factor);
}
async function addPasskeyAccountRecoverySetup(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI supports setting up account recovery with passkeys" };
  return await screenshotElement(potentialFields, page, factor);
}
async function addPasskeyMultiselection(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI allows selecting multiple passkeys or authenticators" };
  return await screenshotElement(potentialFields, page, factor);
}
async function addPasskeySetupNotification(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "User receives notification after setting up a passkey" };
  return await screenshotElement(potentialFields, page, factor);
}

async function updatePasskeyUpdateOption(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI provides an option to update an existing passkey" };
  return await screenshotElement(potentialFields, page, factor);
}
async function updatePasskeyUpdateNotification(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "User receives notification after updating a passkey" };
  return await screenshotElement(potentialFields, page, factor);
}

async function deletePasskeyDeleteOption(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "UI provides an option to delete a passkey" };
  return await screenshotElement(potentialFields, page, factor);
}
async function deletePasskeyAuthenticatorCleanUp(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "Authenticator is properly cleaned up after passkey deletion" };
  return await screenshotElement(potentialFields, page, factor);
}
async function deletePasskeyDeletionAuthentication(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "User is required to authenticate before deleting a passkey" };
  return await screenshotElement(potentialFields, page, factor);
}
async function deletePasskeyDeletionNotification(page) {
  const potentialFields = [
    // TODO: Add more potential selectors
  ];
  const factor = { pageName: "passkeyPage", description: "User receives notification after deleting a passkey" };
  return await screenshotElement(potentialFields, page, factor);
}

module.exports = {
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