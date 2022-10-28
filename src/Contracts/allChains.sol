// SPDX-License-Identifier:MIT
/// @title A smart contract for managing all users/tests and their respective Stake for project dehitas(A Decentralised hiring & talent assessment platform).
/// 
/// @dev All function calls are currently implemented without side

pragma solidity ^0.8.0;

contract data {
    address owner;
    uint256 public countTests;
    uint256 public testId;

    constructor() {
        owner = msg.sender;
    }

    //-----------------------------------------------------------------------------company metadata struct
    struct companyMetadata {
        uint256 reservePrice;
        uint256 testCount;
    }

    mapping(address => uint256) public stakeMapping; ///@notice User address to its stake mapping.
    mapping(address => uint256[]) public testIdsMapping; ///@notice Company address to its testIds mapping.
    mapping(uint256 => companyMetadata) public metadataMapping; ///@notice TestId to metadata struct mapping.

    //modifier onlyOwner
    modifier onlyOwner() {
        require(owner == msg.sender, "Are you owner?");
        _;
    }

    ///@notice Lets user to stake tokens.
    function stakeByCompany() public payable {
        stakeMapping[msg.sender] += msg.value; //stake value to contract
    }

    ///@notice Function for creating Test.
    function createTest(uint256 _reservePrice) public {
        require(stakeMapping[msg.sender] > _reservePrice, "stake more first");
        testId++; //increasing Test Id
        companyMetadata memory company = companyMetadata(_reservePrice, 0);
        metadataMapping[testId] = company;
        testIdsMapping[msg.sender].push(testId);
    }

    ///@notice This function returns Test Details i.e Reserve Price and Test Count.
    function getTestDetails(uint256 _testId)
        public
        view
        returns (companyMetadata memory)
    {
        return metadataMapping[_testId];
    }

    ///@notice This function returns company's all test Ids.
    function getAllUserIds(address _companyAddress)
        public
        view
        returns (uint256[] memory)
    {
        return testIdsMapping[_companyAddress];
    }

    ///@notice This function returns Total test taken from test created.
    function getTestCount(uint256 _testId) public view returns (uint256) {
        return metadataMapping[_testId].testCount;
    }

    ///@notice This function lets user Withdraw your stake amount.
    function withdraw(address payable _companyAddress) public payable {
        // require only msg.sender so that people can only withdraw their own funds
        require(
            msg.sender == _companyAddress,
            "You can only withdraw your funds only!"
        );
        _companyAddress.transfer(stakeMapping[_companyAddress]);
        stakeMapping[_companyAddress] = 0;
    }

    //start exam
    ///@notice This function lets user send reservePrice to Creator.
    function sendToCreator(
        address payable _creatorAddress,
        address payable _companyAddress,
        uint256 _testId
    ) public payable onlyOwner {
        metadataMapping[_testId].testCount++; //increasing test count by +1
        uint256[] memory _companies;
        uint256 length = testIdsMapping[_companyAddress].length;
        _companies = new uint256[](length);

        uint256 rPrice;
        rPrice = metadataMapping[_testId].reservePrice;
        // 1000000000000000000
        stakeMapping[_companyAddress] -= rPrice;
        stakeMapping[_creatorAddress] += rPrice;
    }

    ///@notice This function returns contract balance.
    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    ///@notice This function returns perticular user's stake(not withdrawn yet).
    function showUserStake(address _userAddress) public view returns (uint256) {
        return stakeMapping[_userAddress];
    }
}
