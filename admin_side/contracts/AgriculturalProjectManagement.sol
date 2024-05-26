// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Agricultural Project Management
 * @dev Implements project management for agricultural projects with flexible access control and enhanced error messages.
 */
contract AgriculturalProjectManagement {
    address public owner;
    mapping(address => bool) public admins;

    /**
     * @dev Enum for defining possible states of a project.
     */
    enum ProjectStatus { Planning, InProgress, Completed }

    /**
     * @dev Struct to store detailed information about a project.
     */
    struct Project {
        string name;
        uint256 startDate;
        uint256 endDate;
        ProjectStatus status;
    }

    mapping(uint256 => Project) public projects;

    /**
     * @dev Event to be emitted when a project is updated.
     * @param projectId The unique identifier of the project.
     * @param name The name of the project.
     * @param startDate The start date of the project.
     * @param endDate The end date of the project.
     * @param status The current status of the project.
     */
    event ProjectUpdated(uint256 projectId, string name, uint256 startDate, uint256 endDate, ProjectStatus status);

    /**
     * @dev Sets the original `owner` of the contract to the sender account.
     */
    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true; // Owner is also an admin by default
    }

    /**
     * @dev Modifier to restrict functions to admins.
     * @notice Restricts function access to admins of the contract.
     */
    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admin can call this function.");
        _;
    }

    /**
     * @dev Updates or adds a new project.
     * @param projectId The unique identifier of the project.
     * @param name The name of the project.
     * @param startDate The start date of the project.
     * @param endDate The end date of the project.
     * @param status The status of the project.
     * @notice Ensures endDate is later than startDate and emits the ProjectUpdated event.
     */
    function updateProject(uint256 projectId, string memory name, uint256 startDate, uint256 endDate, ProjectStatus status) public onlyAdmin {
        require(endDate > startDate, "End date must be after start date.");
        projects[projectId] = Project(name, startDate, endDate, status);
        emit ProjectUpdated(projectId, name, startDate, endDate, status);
    }

    /**
     * @dev Retrieves the details of a project by its ID.
     * @param projectId The unique identifier of the project.
     * @return Project The project details including name, startDate, endDate, and status.
     */
    function getProject(uint256 projectId) public view returns (Project memory) {
        return projects[projectId];
    }

    /**
     * @dev Adds or removes an admin.
     * @param adminAddress The address to be added or removed as an admin.
     * @param isAdmin True if adding as admin, false if removing.
     */
    function setAdmin(address adminAddress, bool isAdmin) public onlyOwner {
        admins[adminAddress] = isAdmin;
    }

    /**
     * @dev Fallback function to handle incoming Ether transactions.
     */
    receive() external payable {
        // Handle incoming Ether transactions as needed
    }
}
