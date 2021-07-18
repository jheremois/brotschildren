const { isTypedArray } = require("util/types");

const BrotschildrenHeroContract = artifacts.require("BrotschildrenHeroContract");

contract("BrotschildrenHero : createBrotschildren", (accounts) => {
  let BrotschildrenHero;
  // fundraiser args
  const name =  "Beneficiary Name";
  const url = "beneficiaryname.org";
  const imageURL = "https://placekitten.com/600/350"
  const bio = "Beneficiary Description"
  const beneficiary = accounts[1];

  it("increments the brotschildrensCount", async () => {
    BrotschildrenHero = await BrotschildrenHeroContract.deployed();
    const currentBrotschildrensCount = await BrotschildrenHero.brotschildrensCount();

    await brotschildrensHero.createBrotschildren(
      name,
      url,
      imageURL,
      description,
      beneficiary
    );
    const newBrotschildrensCount = await brotschildrensHero.brotschildrensCount();

    assert.equal(
      newBrotschildrensCount - currentBrotschildrensCount,
      1,
      "should increment by 1"
    )
  });

  it("emits the BrotschildrenCreated event", async () => {
    brotschildrensHero = await brotschildrenHeroContract.deployed();
    const tx = await brotschildrensHero.createBrotschildren(
      name,
      url,
      imageURL,
      description,
      beneficiary
    );
    const expectedEvent = "BrotschildrenCreated";
    const actualEvent = tx.logs[0].event;
  
    assert.equal(
      actualEvent,
      expectedEvent,
      "events should match"
    );
  });