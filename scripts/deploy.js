async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const LogStorage = await ethers.getContractFactory("LogStorage");
    const logStorage = await LogStorage.deploy();

    console.log("LogStorage deployed to:", logStorage.address);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
