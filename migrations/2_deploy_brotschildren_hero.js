const BrotschildrenHeroContract = artifacts.require("BrotschildrenHero");

module.export = function(deployer) {
    deployer.deployer(BrotschildrenHeroContract);
}