//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.13;

import {IFakeDAI} from "./IFakeDAI.sol";

import {ISuperfluid, ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

// For deployment on Goerli Testnet
contract FlowSender {
    address public eq;
    address[] public totalCompanies;
    mapping(address => bool) public isCompanyAdded;
    address[] public totalCandidates;
    mapping(address => bool) public isCandidateAdded;
    address[] public totalCreators;
    mapping(address => bool) public isCreatorAdded;

    struct Company {
        address company_address;
        uint256 company_id;
        uint256 company_staked_amount;
    }
    mapping(uint256 => Company) public idToCompany;
    mapping(uint256 => uint256[]) public companyToDrives;
    mapping(uint256 => mapping(uint256 => bool)) public isCompnayToDriveRunning;
    mapping(uint256 => mapping(uint256 => address[]))
        public companyDrivesToInvitedCandidates;
    mapping(uint256 => mapping(uint256 => string[]))
        public companyDrivesToInvitedCandidatesEmail;
    mapping(uint256 => mapping(uint256 => uint256[]))
        public companyToDrivesToCandidates;
    mapping(uint256 => mapping(uint256 => mapping(address => bool)))
        public companyToDriveToCandidateToOnlyonetime;
    mapping(uint256 => mapping(uint256 => mapping(string => bool)))
        public companyToDriveToCandidateToOnlyonetimeEmail;
    mapping(address => mapping(uint256 => uint256[]))
        public candidateToCompanyDrives;
    mapping(string => mapping(uint256 => uint256[]))
        public candidateToCompanyDrivesEmail;
    // mapping(address=>mapping (uint=>mapping (uint=>uint))) public candidateToCompanyDriveToTime;
    mapping(address => mapping(uint256 => mapping(uint256 => uint256)))
        public candidateToCompanyDriveStartTime;
    mapping(address => mapping(uint256 => mapping(uint256 => uint256)))
        public candidateToCompanyDriveEndTime;
    mapping(string => mapping(uint256 => mapping(uint256 => uint256)))
        public candidateToCompanyDriveStartTimeEmail;
    mapping(string => mapping(uint256 => mapping(uint256 => uint256)))
        public candidateToCompanyDriveEndTimeEmail;

    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData public cfaV1; //initialize cfaV1 variable

    mapping(address => bool) public accountList;

    ISuperToken public goerliDaiX;

    // Host address on Goerli = 0xEB796bdb90fFA0f28255275e16936D25d3418603
    // fDAIx address on Goerli = 0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f
    constructor(ISuperfluid _host, ISuperToken _goerliDaiX) {
        //initialize InitData struct, and set equal to cfaV1
        cfaV1 = CFAv1Library.InitData(
            _host,
            //here, we are deriving the address of the CFA using the host contract
            IConstantFlowAgreementV1(
                address(
                    _host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
                        )
                    )
                )
            )
        );

        goerliDaiX = _goerliDaiX;
    }

    /// @dev Mints 10,000 fDAI to this contract and wraps it all into fDAIx
    function gainDaiX() external {
        // Get address of fDAI by getting underlying token address from DAIx token
        IFakeDAI fdai = IFakeDAI(goerliDaiX.getUnderlyingToken());

        // Mint 10,000 fDAI
        fdai.mint(address(this), 10000e18);

        // Approve fDAIx contract to spend fDAI
        fdai.approve(address(goerliDaiX), 20000e18);

        // Wrap the fDAI into fDAIx
        goerliDaiX.upgrade(10000e18);
    }

    /// @dev creates a stream from this contract to desired receiver at desired rate
    function startTest(
        int96 flowRate,
        address receiver,
        uint256 c_id,
        uint256 index,
        uint256 user,
        address candidate,
        string memory email
    ) external {
        if (isCompnayToDriveRunning[c_id][index] == true) {
            if (candidate != eq) {
                for (
                    uint256 i = 0;
                    i < companyDrivesToInvitedCandidates[c_id][index].length;
                    i++
                ) {
                    if (
                        companyDrivesToInvitedCandidates[c_id][index][i] ==
                        candidate
                    ) {
                        if (
                            companyToDriveToCandidateToOnlyonetime[c_id][index][
                                candidate
                            ] == true
                        ) {
                            companyToDrivesToCandidates[c_id][index].push(user);
                            candidateToCompanyDrives[candidate][c_id].push(
                                index
                            );
                            candidateToCompanyDriveStartTime[candidate][c_id][
                                index
                            ] = block.timestamp;
                            // Create stream
                            cfaV1.createFlow(receiver, goerliDaiX, flowRate);
                            companyToDriveToCandidateToOnlyonetime[c_id][index][
                                candidate
                            ] == false;
                        }
                    }
                }
            } else {
                for (
                    uint256 i = 0;
                    i <
                    companyDrivesToInvitedCandidatesEmail[c_id][index].length;
                    i++
                ) {
                    if (
                        keccak256(
                            abi.encodePacked(
                                (
                                    companyDrivesToInvitedCandidatesEmail[c_id][
                                        index
                                    ][i]
                                )
                            )
                        ) == keccak256(abi.encodePacked((email)))
                    ) {
                        if (
                            companyToDriveToCandidateToOnlyonetimeEmail[c_id][
                                index
                            ][email] == true
                        ) {
                            companyToDrivesToCandidates[c_id][index].push(user);
                            candidateToCompanyDrivesEmail[email][c_id].push(
                                index
                            );
                            candidateToCompanyDriveStartTimeEmail[email][c_id][
                                index
                            ] = block.timestamp;
                            // Create stream
                            cfaV1.createFlow(receiver, goerliDaiX, flowRate);
                            companyToDriveToCandidateToOnlyonetimeEmail[c_id][
                                index
                            ][email] == false;
                        }
                    }
                }
            }
        }
    }

    /// @dev deletes a stream from this contract to desired receiver
    function deleteStream(
        address receiver,
        uint256 c_id,
        uint256 index,
        address candidate,
        string memory email
    ) external {
        // Delete stream
        if (candidate != eq) {
            for (
                uint256 i = 0;
                i < companyDrivesToInvitedCandidates[c_id][index].length;
                i++
            ) {
                if (
                    companyDrivesToInvitedCandidates[c_id][index][i] ==
                    candidate
                ) {
                    cfaV1.deleteFlow(address(this), receiver, goerliDaiX);
                    candidateToCompanyDriveEndTime[candidate][c_id][
                        index
                    ] = block.timestamp;
                    uint256 time = candidateToCompanyDriveEndTime[candidate][
                        c_id
                    ][index] =
                        block.timestamp -
                        candidateToCompanyDriveStartTime[candidate][c_id][
                            index
                        ];
                    uint256 payed = (time * 1) / 1000;
                    idToCompany[c_id].company_staked_amount -= payed;
                }
            }
        } else {
            for (
                uint256 i = 0;
                i < companyDrivesToInvitedCandidatesEmail[c_id][index].length;
                i++
            ) {
                if (
                    keccak256(
                        abi.encodePacked(
                            (
                                companyDrivesToInvitedCandidatesEmail[c_id][
                                    index
                                ][i]
                            )
                        )
                    ) == keccak256(abi.encodePacked((email)))
                ) {
                    cfaV1.deleteFlow(address(this), receiver, goerliDaiX);
                    candidateToCompanyDriveEndTimeEmail[email][c_id][
                        index
                    ] = block.timestamp;
                    uint256 time = candidateToCompanyDriveEndTimeEmail[email][
                        c_id
                    ][index] =
                        block.timestamp -
                        candidateToCompanyDriveStartTime[candidate][c_id][
                            index
                        ];
                    uint256 payed = (time * 1) / 1000;
                    idToCompany[c_id].company_staked_amount -= payed;
                }
            }
        }
    }

    function registerCompany(uint256 id) public {
        if (isCompanyAdded[msg.sender] == false) {
            totalCompanies.push(msg.sender);
            idToCompany[id] = Company(msg.sender, id, 0);
            isCompanyAdded[msg.sender] = true;
        }
    }

    function registerCandidate() public {
        if (isCandidateAdded[msg.sender] == false) {
            totalCandidates.push(msg.sender);
            isCandidateAdded[msg.sender] = true;
        }
    }

    function registerCreator() public {
        if (isCreatorAdded[msg.sender] == false) {
            totalCreators.push(msg.sender);
            isCreatorAdded[msg.sender] = true;
        }
    }

    function createDrive(uint256 c_id, uint256 index) public {
        require(
            idToCompany[c_id].company_address == msg.sender,
            "only company can create drive"
        );
        companyToDrives[c_id].push(index);
        isCompnayToDriveRunning[c_id][index] = true;
    }

    function endDrive(uint256 c_id, uint256 index) public {
        require(
            idToCompany[c_id].company_address == msg.sender,
            "only company can end drive"
        );
        isCompnayToDriveRunning[c_id][index] = false;
    }

    function stake(uint256 id, uint256 amount) public payable {
        //require(msg.value==amount,"not proper amount");
        require(
            idToCompany[id].company_address == msg.sender,
            "only company can stake"
        );
        payable(msg.sender).transfer(msg.value);
        idToCompany[id].company_staked_amount = amount;
    }

    function InviteCandidatesToDrive(
        uint256 c_id,
        uint256 index,
        address[] memory user
    ) public {
        require(
            idToCompany[c_id].company_address == msg.sender,
            "You are not allowed to invite candidates"
        );
        for (uint256 i = 0; i < user.length; i++) {
            companyDrivesToInvitedCandidates[c_id][index].push(user[i]);
            companyToDriveToCandidateToOnlyonetime[c_id][index][user[i]] = true;
        }
    }

    function InviteCandidatesViaEmail(
        uint256 c_id,
        uint256 index,
        string memory email
    ) public {
        require(
            idToCompany[c_id].company_address == msg.sender,
            "You are not allowed to invite candidates"
        );
        companyDrivesToInvitedCandidatesEmail[c_id][index].push(email);
        companyToDriveToCandidateToOnlyonetimeEmail[c_id][index][email] = true;
    }

    function approveCandidate(
        uint256 c_id,
        uint256 index,
        address user
    ) public {
        require(
            idToCompany[c_id].company_address == msg.sender,
            "You are not allowed to approve candidates"
        );
        companyDrivesToInvitedCandidates[c_id][index].push(user);
        companyToDriveToCandidateToOnlyonetime[c_id][index][user] = true;
    }

    function withdraw(uint256 c_id) public payable {
        uint256 amount = idToCompany[c_id].company_staked_amount;
        require(
            idToCompany[c_id].company_address == msg.sender,
            "You can not withdraw it!"
        );
        payable(address(this)).transfer(amount);
        idToCompany[c_id].company_staked_amount = 0;
    }
}
