const BrotschildrenContract = artifacts.require("Brotschildren");

contract("Brotschildren", accounts => {
    let brotschildren;
    const name = "Beneficiary Name";
    const url = "beneficiaryname.org";
    const imageURL = "https://placekitten.com/500/250";
    const description = "beneficiary description";
    const beneficiary = accounts[1];
    const custodian = accounts[0];
    const owner = accounts[0];

    beforeEach(async () => {
        brotschildren = await BrotschildrenContract.new(
            name,
            url,
            imageURL,
            description,
            beneficiary,
            owner
        )
    });

    describe("initialization", () => {
        beforeEach (async () => {
            brotschildren = await BrotschildrenContract.new(
                name,
                url,
                imageURL,
                description,
                beneficiary,
                owner
                )
            });   
            
            it("gets the beneficiary name", async () => {
                const actual = await brotschildren.name();
                assert.equal(actual, name, "names should match");
            });

            it("gets the beneficiary URL", async () => {
                const actual = await brotschildren.url();
                assert.equal(actual, url, "url should match");
            });

            it("gets the beneficiary image url", async () => {
                const actual = await brotschildren.imageURL();
                assert.equal(actual, imageURL, "imageURL should match");
            });

            it("gets the beneficiary description", async () => {
                const actual = await brotschildren.descripton();
                assert.equal(actual, description, "description should match");
            });

            it("gets the beneficiary", async () => {
                const actual = await brotschildren.beneficiary();
                assert.equal(actual, beneficiary, "beneficiary should match");
            });

            it("gets the owner", async () => {
                const actual = await brotschildren.owner();
                assert.equal(actual, owner, "bios should match");
            });

            describe("making donations", () => {
              const value = web3.utils.toWei('0.0289');
              const donor = accounts[2];
          
              it("increases myDonationsCount");
              it("includes donation in myDonations");
            });
          });
           
          it("increases myDonationsCount", async () => {
            const currentDonationsCount = await brotschildren.myDonationsCount(
              {from: donor}
            );
          
            await brotschildren.donate({from: donor, value});
          
            const newDonationsCount = await brotschildren.myDonationsCount(
              {from: donor}
            );
          
            assert.equal(
              1,
              newDonationsCount - currentDonationsCount,
              "myDonationsCount should increment by 1");
          })
          
          it("includes donation in myDonations", async () => {
            await brotschildren.donate({from: donor, value});
            const {values, dates} = await brotschildren.myDonations(
              {from: donor}
            );
          
            assert.equal(
              value,
              values[0],
              "values should match"
            );
            assert(dates[0], "date should be present");
          });
          
          it("increases the totalDonations amount", async () => {
            const currentTotalDonations = await brotschildren.totalDonations();
            await brotschildren.donate({from: donor, value});
            const newTotalDonations = await brotschildren.totalDonations();
          
            const diff = newTotalDonations - currentTotalDonations;
          
            assert.equal(
              diff,
              value,
              "difference should match the donation value"
            )
          });
          it("increases donationsCount", async () => {
            const currentDonationsCount = await brotschildren.donationsCount();
            await brotschildren.donate({from: donor, value});
            const newDonationsCount = await brotschildren.donationsCount();
          
            assert.equal(
              1,
              newDonationsCount - currentDonationsCount,
              "donationsCount should increment by 1");
          });
          
          it("emits the DonationReceived event", async () => {
            const tx = await brotschildren.donate({from: donor, value});
            const expectedEvent = "DonationReceived";
            const actualEvent = tx.logs[0].event;
          
            assert.equal(actualEvent, expectedEvent, "events should match");
          });

     describe("setBeneficiary", () => {
          const newBeneficiary = accounts[2];

          it("update beneficiary when called by owner account", async () =>
          await brotschildren.setBeneficiary(newBeneficiary, {from: owner});
          const actualBeneficiary = await brotschildren.beneficiary();
          assert.equal(actualBeneficiary, newBeneficiary, "beneficiaries should match");
       });

          it("throws an error when called from a non-owner account", async () => {
            try {
              await brotschildren.setBeneficiary(newBeneficiary, {from: accounts[3]});
              assert.fail("withdraw was not restricted to owners")
            } catch(err) {
              const expectedError = "Ownable: caller is not the owner"
              const actualError = err.reason;
              assert.equal(actualError, expectedError, "should not be permitted")
            }
          })
        });
          
        describe("withdrawing funds", () => {
            beforeEach(async () => {
              await brotschildren.donate(
                {from: accounts[2], value: web3.utils.toWei('0.1')}
              );
            });
          
        describe("access controls", () => {
              it("throws an error when called from a non-owner account", async () => {
                try {
                  await brotschildren.withdraw({from: accounts[3]});
                  assert.fail("withdraw was not restricted to owners")
                } catch(err) {
                  const expectedError = "Ownable: caller is not the owner"
                  const actualError = err.reason;
                  assert.equal(actualError, expectedError, "should not be permitted")
                }
              });
          
              it("permits the owner to call the function", async () => {
                try {
                  await brotschildren.withdraw({from: owner});
                  assert(true, "no errors were thrown");
                } catch(err) {
                  assert.fail("should not have thrown an error");
                }
              });
            });
          });

          it("transfers balance to beneficiary", async () => {
            const currentContractBalance = await web3.eth.getBalance(brotschildren.address);
            const currentBeneficiaryBalance = await web3.eth.getBalance(beneficiary);
          
            await brotschildren.withdraw({from: owner});
          
            const newContractBalance = await web3.eth.getBalance(brotschildren.address);
            const newBeneficiaryBalance = await web3.eth.getBalance(beneficiary);
            const beneficiaryDifference = newBeneficiaryBalance - currentBeneficiaryBalance;
          
            assert.equal(
              newContractBalance,
              0,
              "contract should have a 0 balance"
            );
            assert.equal(
              beneficiaryDifference,
              currentContractBalance,
              "beneficiary should receive all the funds"
            );
          });

          it("emits Withdraw event", async () => {
            const tx = await brotschildren.withdraw({from: owner});
            const expectedEvent = "Withdraw";
            const actualEvent = tx.logs[0].event;
          
            assert.equal(
              actualEvent,
              expectedEvent,
              "events should match"
            );
          });

          describe("fallback function", () => {
            const value = web3.utils.toWei('0.0289');
          
            it("increases the totalDonations amount", async () => {
              const currentTotalDonations = await brotschildren.totalDonations();
              await web3.eth.sendTransaction(
                {to: brotschildren.address, from: accounts[9], value}
              );
              const newTotalDonations = await brotschildren.totalDonations();
          
              const diff = newTotalDonations - currentTotalDonations;
          
              assert.equal(
                diff,
                value,
                "difference should match the donation value"
              )
            });
          
            it("increases donationsCount", async () => {
              const currentDonationsCount = await brotschildren.donationsCount();
              await web3.eth.sendTransaction(
                {to: brotschildren.address, from: accounts[9], value}
              );
              const newDonationsCount = await brotschildren.donationsCount();
          
              assert.equal(
                1,
                newDonationsCount - currentDonationsCount,
                "donationsCount should increment by 1");
            });
          });