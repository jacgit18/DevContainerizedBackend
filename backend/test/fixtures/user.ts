import { FixtureTable } from "./util/index.js"

const superAdminUser = {
  email: "superadmin@email.com",
  first_name: "Super",
  last_name: "Admin",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const superAdminUser2 = {
  email: "superadmin2@email.com",
  first_name: "Super",
  last_name: "Admin2",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const normalUserNotConnectedToCompany = {
  email: "imjustnormal@email.com",
  first_name: "Normal",
  last_name: "1",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const normalUserConnectedToCompany = {
  email: "imjustnormalandconnected@email.com",
  first_name: "Normal",
  last_name: "Connected",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const normalUserConnectedToMultipleCompany = {
  email: "normalUserConnectedToMultipleCompany@email.com",
  first_name: "Normal",
  last_name: "MultiConnected",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const connectedToOneCompanyZeroProjects = {
  email: "connectedToOneCompanyZeroProjects@email.com",
  first_name: "Normal",
  last_name: "ConnectedOneZero",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const connectedToOneCompanyAndOneProject = {
  email: 'connectedToOneCompanyAndOneProject@email.com',
  first_name: 'Normal',
  last_name: 'ConnectedOneOne',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const connectedToOneCompanyAndTwoProject = {
  email: 'connectedToOneCompanyAndTwoProject@email.com',
  first_name: 'Normal',
  last_name: 'ConnectedOneTwo',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const connectedToTwoCompanyAndOneProject = {
  email: 'connectedToTwoCompanyAndOneProject@email.com',
  first_name: 'Normal',
  last_name: 'ConnectedTwoOne',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const makeSendGridErrorStatus = {
  email: 'makeSendGriderrorstatus@email.com',
  first_name: 'Normal',
  last_name: 'makeSendGridError',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const makeSendGridThrow = {
  email: 'makeSendGridthrow@email.com',
  first_name: 'Normal',
  last_name: 'makeSendGridThrow',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const postTicketUser = {
  email: "postTicketUser@email.com",
  first_name: "post",
  last_name: "postTicketUser",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const postEquipmentUser = {
  email: "postEquipmentUser@email.com",
  first_name: "post",
  last_name: "admin",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const postEquipmentUserTwo = {
  email: "postEquipmentUserTwo@email.com",
  first_name: "post",
  last_name: "crew",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const postEquipmentUserThree = {
  email: "postEquipmentUserThree@email.com",
  first_name: "post",
  last_name: "crew",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const postEquipmentUserFour = {
  email: "postEquipmentUserFour@email.com",
  first_name: "post",
  last_name: "crew",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const postEquipmentUserFive = {
  email: "postEquipmentUserFive@email.com",
  first_name: "post",
  last_name: "crew",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const postEquipmentUserSix = {
  email: "postEquipmentUserSix@email.com",
  first_name: "post",
  last_name: "crew",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const postMaterialUser = {
  email: 'postMaterialUser@email.com',
  first_name: 'post',
  last_name: 'admin',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const postMaterialUserTwo = {
  email: 'postMaterialUserTwo@email.com',
  first_name: 'post',
  last_name: 'crew',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const postMaterialUserThree = {
  email: 'postMaterialUserThree@email.com',
  first_name: 'post',
  last_name: 'crew',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}


const postMaterialUserFour = {
  email: 'postMaterialUserFour@email.com',
  first_name: 'post',
  last_name: 'crew',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}


const postMaterialUserFive = {
  email: 'postMaterialUserFive@email.com',
  first_name: 'post',
  last_name: 'crew',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}


const postMaterialUserSix = {
  email: 'postMaterialUserSix@email.com',
  first_name: 'post',
  last_name: 'crew',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const getAllTicketSubCrew = {
  email: "getAllTicketSubCrew@email.com",
  first_name: "get",
  last_name: "AllTicketUser",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const getAllTicketSubPm = {
  email: "getAllTicketSubPm@email.com",
  first_name: "get",
  last_name: "AllTicketUser",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const getAllTicketSubPm2 = {
  email: "getAllTicketSubPm2@email.com",
  first_name: "get",
  last_name: "AllTicketUser",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const getAllTicketSubSuper = {
  email: "getAllTicketSubSuper@email.com",
  first_name: "get",
  last_name: "AllTicketUser",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const getAllTicketGcPm = {
  email: "getAllTicketGcPm@email.com",
  first_name: "get",
  last_name: "AllTicketUser",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const getAllTicketGcSuper = {
  email: "getAllTicketGcSuper@email.com",
  first_name: "get",
  last_name: "AllTicketUser",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const getAllTicketOwnerPm = {
  email: 'getAllTicketOwnerPm@email.com',
  first_name: 'get',
  last_name: 'AllTicketUser',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const getAllTicketOwnerCrew = {
  email: 'getAllTicketOwnerCrew@email.com',
  first_name: 'get',
  last_name: 'AllTicketUser',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const patchProject = {
  email: "patchProject@email.com",
  first_name: "get",
  last_name: "patchProject",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const patchMaterialUserOne = {
  email: "patchMaterialOne@email.com",
  first_name: "get",
  last_name: "patchMaterial",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const patchMaterialUserTwo = {
  email: "patchMaterialTwo@email.com",
  first_name: "get",
  last_name: "patchMaterial",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const patchMaterialUserThree = {
  email: "patchMaterialThree@email.com",
  first_name: "get",
  last_name: "patchMaterial",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const patchMaterialUserNotThree = {
  email: "patchMaterialNotThree@email.com",
  first_name: "get",
  last_name: "patchMaterial",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const patchMaterialUserFour = {
  email: "patchMaterialFour@email.com",
  first_name: "get",
  last_name: "patchMaterial",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const patchMaterialUserFive = {
  email: "patchMaterialFive@email.com",
  first_name: "get",
  last_name: "patchMaterial",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const patchMaterialUserSix = {
  email: "patchMaterialSix@email.com",
  first_name: "get",
  last_name: "patchMaterial",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const patchMaterialUserSeven = {
  email: "patchMaterialSeven@email.com",
  first_name: "get",
  last_name: "patchMaterial",
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const testUserToAddToProject = {
  email: 'testUserToAddToProject@email.com',
  first_name: 'post',
  last_name: 'addToProject',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const connectedToOneCompanyNoProjects = {
  email: 'connectedToOneCompanyNoProjects@email.com',
  first_name: 'get',
  last_name: 'connectedToOneCompanyNoProjects',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const getGCLaborType = {
  email: 'getAllLaborGcPm@email.com',
  first_name: 'get',
  last_name: 'AllLaborUser',
  password: "doesntmatter",
  date_created: new Date(),
  date_modified: new Date(),
}

const getSubLaborType = {
  email: 'getAllLaborSubPm@email.com',
  first_name: 'get',
  last_name: 'AllLaborUser',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const addGcCrew={
  email:'addGcCrew@email.com',
  first_name:'get',
  last_name: "GcCrew",
  password:"doesntmatter",
  date_created: new Date(),
  date_modified: new Date()
}

const getSubCrewLaborType = {
  email: 'getAllLaborSubCrew@email.com',
  first_name: 'get',
  last_name: 'AllLaborUser',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const postLaborTypeSubPm = {
  email: 'postLaborTypeSubPm@email.com',
  first_name: 'post',
  last_name: 'LaborUser',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const postLaborTypeSubCrew = {
  email: 'postLaborTypeSubCrew@email.com',
  first_name: 'post',
  last_name: 'LaborUser',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const postLaborTypeSubSuper = {
  email: 'postLaborTypeSubSuper@email.com',
  first_name: 'post',
  last_name: 'LaborUser',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const postLaborTypeGcSuper = {
  email: 'postLaborTypeGcSuper@email.com',
  first_name: 'post',
  last_name: 'LaborUser',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}

const postLaborTypeGcPm = {
  email: 'postLaborTypeGcPm@email.com',
  first_name: 'post',
  last_name: 'LaborUser',
  password: 'doesntmatter',
  date_created: new Date(),
  date_modified: new Date(),
}


const userFixtures: FixtureTable = {
  tableName: "tfuser",
  alwaysFlush: true,
  data: {
    // put new fixtures here
    superAdminUser,
    superAdminUser2,
    normalUserNotConnectedToCompany,
    normalUserConnectedToCompany,
    normalUserConnectedToMultipleCompany,
    connectedToOneCompanyAndOneProject,
    connectedToOneCompanyZeroProjects,
    connectedToOneCompanyAndTwoProject,
    connectedToTwoCompanyAndOneProject,
    makeSendGridErrorStatus,
    makeSendGridThrow,
    postTicketUser,
    postMaterialUser,
    postMaterialUserTwo,
    postMaterialUserThree,
    postMaterialUserFour,
    postMaterialUserFive,
    postMaterialUserSix,
    postEquipmentUser,
    postEquipmentUserTwo,
    postEquipmentUserThree,
    postEquipmentUserFour,
    postEquipmentUserFive,
    postEquipmentUserSix,
    getAllTicketSubPm,
    getAllTicketSubCrew,
    getAllTicketSubSuper,
    getAllTicketGcPm,
    getAllTicketGcSuper,
    getAllTicketOwnerPm,
    getAllTicketOwnerCrew,
    patchProject,
    patchMaterialUserOne,
    patchMaterialUserTwo,
    patchMaterialUserThree,
    patchMaterialUserNotThree,
    patchMaterialUserFour,
    patchMaterialUserFive,
    patchMaterialUserSix,
    patchMaterialUserSeven,
    connectedToOneCompanyNoProjects,
    getGCLaborType,
    getSubLaborType,
    getSubCrewLaborType,
    testUserToAddToProject,
    getAllTicketSubPm2,
    postLaborTypeSubPm,
    postLaborTypeSubSuper,
    postLaborTypeSubCrew,
    postLaborTypeGcPm,
    postLaborTypeGcSuper,
    addGcCrew,
  },
}

export default userFixtures
