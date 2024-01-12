import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai"

Given(/^Google page is opened$/, async function () {
    await browser.url("https://www.google.com");
    await browser.pause(1000);
});

When(/^Search with (.*)$/, async function (searchItem) {
    //console.log(`>> searchItem:  ${searchItem}`);
    let ele = await $(`[name=q]`);
    await ele.setValue(searchItem);
    await browser.keys("Enter");
    //console.log(`>> Element: ${JSON.stringify(ele)}`)
});

Then(/^Click on the first search result$/, async function () {
    let ele = await $(`<h3>`);
    ele.click();
});

Then(/^URL should match (.*)$/, async function (expectedURL) {
    //console.log(`>>expectedURL: ${expectedURL}`);
    await browser.waitUntil(async function () {
        return await browser.getTitle() === "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
    }, { timeout: 20000, interval: 500, timeoutMsg: `Failed loading, current title: ${await browser.getTitle()}` })
    let url = await browser.getUrl()
    chai.expect(url).to.equal(expectedURL);
});


//Web Interactions
Given(/^A web page is opened$/, async function () {
    await browser.url("https://www.amazon.com.au/");
    await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
    await browser.maximizeWindow();
});

When(/^performing web interactions$/, async function () {
    // Input typing
    // let ele = await $(`[type=number]`);
    // await ele.setValue("12345");
    // await browser.pause(3000);

    // Assert default option in Dropdown
    // let ele = await $('//select/option[@selected="selected"]');
    // let val = await ele.getText();
    // chai.expect(val).to.equal("Please select an option");
    // await browser.pause(2000);

    // Select a specific option
    // let ddEle = await $(`#dropdown`);
    // ddEle.selectByAttribute("value", "1");
    // await browser.pause(2000);

    // Get a list of options
    // let eleArray = await $$(`select > option`);
    // let optionValues = [];
    // for (let eleIndex = 0; eleIndex < eleArray.length; eleIndex++) {
    //     let element = eleArray[eleIndex];
    //     let value = await element.getText();
    //     optionValues.push(value);
    //     console.log(await element.getText());
    // }
    // console.log(`>> Options: ${optionValues}`);

    // Select a checkbox
    // let element = await $(`//form[@id="checkboxes"]/input[1]`);
    // if (!await element.isSelected()) {
    //     await element.click();
    // }
    // await browser.pause(2000);

    // Assert if option is selected
    // let element = await $(`//form[@id="checkboxes"]/input[2]`);
    // let isChecked = await element.isSelected();
    // chai.expect(isChecked).to.be.true;

    // Select all options
    // let checkboxArray = await $$(`//form[@id="checkboxes"]/input`);
    // for (let index = 0; index < checkboxArray.length; index++) {
    //     let checkboxElement = checkboxArray[index];
    //     if (!await checkboxElement.isSelected()) {
    //         checkboxElement.click();
    //     }
    // }
    // await browser.pause(2000);

    // //open a separate window
    // await $(`=Click Here`).click();
    // await $(`=Elemental Selenium`).click();
    // let currentWindowTitle = await browser.getTitle();
    // let parentWindowHandle = await browser.getWindowHandle();
    // console.log(`>> Window Title: ${currentWindowTitle}`);

    // // Switch to specific window
    // let windowHandles = await browser.getWindowHandles();
    // for (let index = 0; index < windowHandles.length; index++) {
    //     console.log(`>> Window Handle: ${windowHandles[index]}`);
    //     await browser.switchToWindow(windowHandles[index]);
    //     currentWindowTitle = await browser.getTitle();
    //     if (currentWindowTitle === "Elemental Selenium | Elemental Selenium") {
    //         await browser.switchToWindow(windowHandles[index]);
    //         let headerTxtEleSel = await $(`<h1>`).getText();
    //         console.log(`>> headerTextEleSel: ${headerTxtEleSel}`);

    //         break;
    //     }
    // }

    // //Switch to parent window
    // await browser.switchToWindow(parentWindowHandle);
    // let parentWindowHeaderText = await $(`<h3>`).getText();
    // console.log(`>> parentheadertext: ${parentWindowHeaderText}`);

    // // Checking Alert is open
    // await $(`button=Click for JS Alert`).click();
    // if (await browser.isAlertOpen()) {
    //     await browser.acceptAlert();
    // }

    // File upload
    // await $(`#file-upload`).addValue(`${process.cwd()}/data/fileupload/dummy.txt`);
    // await $(`#file-submit`).click();

    // //Frames
    // await $(`=iFrame`).click();
    // let ele = await $(`#mce_0_ifr`);
    // await browser.switchToFrame(ele);
    // // Interact with the iFrame
    // await $(`#tinymce`).setValue(`Typing into a new frame...`);
    // await browser.switchToParentFrame();

    //Key commands
    // await $(`=iFrame`).click();
    // let ele = await $(`#mce_0_ifr`);
    // await browser.switchToFrame(ele);
    // // Interact with the iFrame
    // await browser.keys(["Meta", "A"])
    // await browser.pause(1000);
    // await browser.keys("Delete");

    // await $(`#tinymce`).setValue(`Typing into a new frame...`);
    // await browser.switchToParentFrame();

    //Check Number of rows and columns
    // let rowCount = await $$(`//table[@id='table1']/tbody/tr`).length
    // chai.expect(rowCount).to.equal(4)
    // let columnCount = await $$(`//table[@id='table1']/thead/tr/th`).length
    // chai.expect(columnCount).to.equal(6)

    //Get whole table data
    // let personArray = []
    // for (let i = 0; i < rowCount; i++) {
    //     let personObject = {
    //         lastName: "",
    //         firstName: "",
    //         email: "",
    //         due: "",
    //         website: "",
    //     }
    //     for (let j = 0; j < columnCount; j++) {
    //         let cellValue = await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`).getText()
    //         if (j === 0) personObject.lastName = cellValue
    //         if (j === 1) personObject.firstName = cellValue
    //         if (j === 2) personObject.email = cellValue
    //         if (j === 3) personObject.due = cellValue
    //         if (j === 4) personObject.website = cellValue
    //     }
    //     personArray.push(personObject)
    // }
    // console.log(`>>> Whole Table: ${JSON.stringify(personArray)}`)

    // Get a specific row based on a condition
    // let personArray = []
    // for (let i = 0; i < rowCount; i++) {
    //     let personObject = {
    //         lastName: "",
    //         firstName: "",
    //         email: "",
    //         due: "",
    //         website: "",
    //     }
    //     for (let j = 0; j < columnCount; j++) {
    //         let cellValue = await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`).getText()
    //         let firstName = await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[2]`).getText()
    //         if (firstName === "Jason") {
    //             if (j === 0) personObject.lastName = cellValue
    //             if (j === 1) personObject.firstName = cellValue
    //             if (j === 2) personObject.email = cellValue
    //             if (j === 3) personObject.due = cellValue
    //             if (j === 4) personObject.website = cellValue
    //         }
    //     }
    //     if (personObject.firstName) {
    //         personArray.push(personObject)
    //     }
    // }
    // console.log(`>>> Whole Table: ${JSON.stringify(personArray)}`)

    // Get single column
    // let priceColumn = [];
    // for (let i = 0; i < rowCount; i++) {
    //     priceColumn.push(await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`).getText())
    // }
    // console.log(`>>> Price Column: ${priceColumn}`);
    //Get single cell value
    // let names = []
    // for (let i = 0; i < rowCount; i++) {
    //     let price = await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`).getText()
    //     if (+(price.replace("$", "")) > 50) {
    //         names.push(await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[2]`).getText())
    //     }
    // }
    // console.log(`>> First names: ${names}`);

    //Scrolling
    //Scroll down
    // await browser.execute(() => {
    //     window.scrollBy(0, window.innerHeight)
    // })

    // await browser.pause(2000)

    // //Scroll top
    // await browser.execute(() => {
    //     window.scrollBy(0, -window.innerHeight)
    // })
    // await browser.pause(2000)
    // await browser.execute(() => {
    //     window.scrollTo(0, document.body.scrollHeight)
    // })

    // await browser.pause(2000)
    // await browser.execute(() => {
    //     window.scrollTo(0, document.body.scrollTop)
    // })

    await browser.pause(2000);
});