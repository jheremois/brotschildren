const { isTypedArray } = require("util/types");

const BrotschildrenHeroContract = artifacts.require("BrotschildrenHeroContract");
const FundraiserContract = artifacts.require("Fundraiser");

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

  contract("FundraiserFactory: fundraisers", (accounts) => {
    async function createFundraiserFactory(fundraiserCount, accounts) {
      const factory = await FundraiserFactoryContract.new();
      await addFundraisers(factory, fundraiserCount, accounts);
      return factory;
    }
  
    async function addFundraisers(factory, count, accounts) {
      const name = "Beneficiary";
      const lowerCaseName = name.toLowerCase();
      const beneficiary = accounts[1];
  
      for (let i=0; i < count; i++) {
        await factory.createFundraiser(
          // create a series of fundraisers. The index will be used
          // to make them each unique
          `${name} ${i}`,
          `${lowerCaseName}${i}.com`,
          `${lowerCaseName}${i}.png`,
          `Description for ${name} ${i}`,
          beneficiary
        );
      }
    }
  
    describe("when fundraisers collection is empty", () => {
      it("returns an empty collection", async () => {
        const factory = await createFundraiserFactory(0, accounts);
        const fundraisers = await factory.fundraisers(10, 0);
        assert.equal(
          fundraisers.length,
          0,
          "collection should be empty"
        );
      });
    });
  });

  describe("varying limits", async () => {
    let factory;
    beforeEach(async () => {
      factory = await createFundraiserFactory(30, accounts);
    })
  
    it("returns 10 results when limit requested is 10", async ()=>{
      const fundraisers = await factory.fundraisers(10, 0);
      assert.equal(
        fundraisers.length,
        10,
        "results size should be 10"
      );
    });
  
    // xit marks the test as pending
    xit("returns 20 results when limit requested is 20", async ()=>{
      const fundraisers = await factory.fundraisers(20, 0);
      assert.equal(
        fundraisers.length,
        20,
        "results size should be 20"
      );
    });
  
    xit("returns 20 results when limit requested is 30", async ()=>{
      const fundraisers = await factory.fundraisers(30, 0);
      assert.equal(
        fundraisers.length,
        20,
        "results size should be 20"
      );
    });
  })

  describe("varying offset", () => {
    let factory;
    beforeEach(async () => {
      factory = await createFundraiserFactory(10, accounts);
    });
  
    it("contains the fundraiser with the appropriate offset",  async ()=>{
      const fundraisers = await factory.fundraisers(1, 0);
      const fundraiser = await FundraiserContract.at(fundraisers[0]);
      const name = await fundraiser.name();
      assert.ok(await name.includes(0), `${name} did not include the offset`);
    });
  
    xit("contains the fundraiser with the appropriate offset",  async ()=>{
      const fundraisers = await factory.fundraisers(1, 7);
      const fundraiser = await FundraiserContract.at(fundraisers[0]);
      const name = await fundraiser.name();
      assert.ok(await name.includes(7), `${name} did not include the offset`);
    });
  });

  describe("boundary conditions", () => {
    let factory;
    beforeEach(async () => {
      factory = await createFundraiserFactory(10, accounts);
    });
  
    it("raises out of bounds error", async () => {
      try {
        await factory.fundraisers(1, 11);
        assert.fail("error was not raised")
      } catch(err) {
        const expected = "offset out of bounds";
        assert.ok(err.message.includes(expected), `${err.message}`);
      }
    });
  
    xit("adjusts return size to prevent out of bounds error", async () => {
      try {
        const fundraisers = await factory.fundraisers(10, 5);
        assert.equal(
          fundraisers.length,
          5,
          "collection adjusted"
        );
      } catch(err) {
        assert.fail("limit and offset exceeded bounds");
      }
    });
  });