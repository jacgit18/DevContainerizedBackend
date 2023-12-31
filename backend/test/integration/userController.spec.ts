import chai from "chai"
import chaiHttp from "chai-http"
import jwt from "jsonwebtoken"
import "mocha"
import { beforeEach } from "mocha"
import { v4 as createUuid } from "uuid"

import app from "../../src/app.js"

import sgMail from "../../libs/sgMail.js"
import { generateJwt, tfJwtAlgo, verifyJwt } from "../../src/auth/jwtUtil.js"
import { db } from "../../src/data/db.js"
import { authHeaderProperty } from "../../src/middlewares/authenticateToken.js"
import { companyHeaderProperty } from "../../src/middlewares/companyIdFromHeaders.js"
import { addFixtures, flushFixtures, getFixture } from "../fixtures/index.js"


chai.use(chaiHttp)
const expect = chai.expect

describe("userController", () => {

  let adminUserAuth: string
  const adminUserEmail: string = 'superadmin@email.com'

  beforeEach(async () => {
    await flushFixtures()
    await addFixtures()
    // setup admin authentication
    const userInfo: any = getFixture('tfuser', 'email', adminUserEmail)
    adminUserAuth = `Auth ${generateJwt(userInfo)}`
    // @ts-ignore
    sgMail.flushEmails()
  })

  afterEach(async () => {
    await flushFixtures()
    // @ts-ignore
    sgMail.flushEmails()
  })

  describe('POST create user', () => {
    it('Succesfully create a new user', async () => {
      const {id: company_id} = getFixture('company', 'name', 'Company1')
      const newUser =
      {
        avatar_url: "",
        email: "alfredo+test@tracflo.io",
        first_name: "Fred",
        last_name: "Doe",
        phone: "8889992345",
        company_user_role_id: 2
      }

      return chai.request(app)
        .post(`/v2/companies/${company_id}/user`)
        .set(authHeaderProperty, adminUserAuth)
        .send(newUser)
        .then(async (res)=> {
          expect(res.status).to.equal(200)
          const selectUser = await db('tfuser').select('*').where('email', newUser.email)
          const selectCompanyUser = await db('company_user').select('*').where('tfuser_id', selectUser[0].id)
          expect(res.body.id).to.equal(selectUser[0].id)
          expect(selectCompanyUser.length).to.equal(1)
        })
    })
    it('Attempt to create a new user as a super', async () => {
      const userInfo: any = getFixture('tfuser', 'email', 'getAllTicketSubSuper@email.com')
      const {id: company_id} = getFixture('company', 'name', 'getAllTicketSub')
      const connectedSubSuperUserAuth = `Auth ${generateJwt(userInfo)}`
      const newUser =
      {
        avatar_url: "",
        email: "alfredo+test@tracflo.io",
        first_name: "Fred",
        last_name: "Doe",
        phone: "8889992345",
      }

      return chai.request(app)
        .post(`/v2/companies/${company_id}/user`)
        .set(authHeaderProperty, connectedSubSuperUserAuth)
        .send(newUser)
        .then(res => {
          expect(res.status).to.equal(401)
        })
    })
    it('Attempt to create a new user as crew member', async () => {
      const userInfo: any = getFixture('tfuser', 'email', 'getAllTicketSubCrew@email.com')
      const {id: company_id} = getFixture('company', 'name', 'getAllTicketSub')
      const connectedNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const newUser =
      {
        avatar_url: "",
        email: "alfredo+test@tracflo.io",
        first_name: "Fred",
        last_name: "Doe",
        phone: "8889992345",
      }

      return chai.request(app)
        .post(`/v2/companies/${company_id}/user`)
        .set(authHeaderProperty, connectedNonAdminUserAuth)
        .send(newUser)
        .then(res => {
          expect(res.status).to.equal(401)
        })
    })
    it('Succesfully create a new admin user', async () => {
      const {id: company_id} = getFixture('company', 'name', 'Company1')
      const newUser =
      {
        avatar_url: "",
        email: "alfredo+test@tracflo.io",
        first_name: "Fred",
        last_name: "Doe",
        phone: "8889992345",
        company_user_role_id: 1
      }

      return chai.request(app)
        .post(`/v2/companies/${company_id}/user`)
        .set(authHeaderProperty, adminUserAuth)
        .send(newUser)
        .then(async (res)=> {
          expect(res.status).to.equal(200)
          const selectUser = await db('tfuser').select('*').where('email', newUser.email)
          const selectCompanyUser = await db('company_user').select('*').where('tfuser_id', selectUser[0].id)
          expect(res.body.id).to.equal(selectUser[0].id)
          expect(selectCompanyUser.length).to.equal(1)
          expect(selectCompanyUser[0].company_user_role_id).to.equal(1)
        })
    })
    it('Succesfully create a new crew user', async () => {
      const {id: company_id} = getFixture('company', 'name', 'getAllTicketSub')
      const newUser =
      {
        avatar_url: "",
        email: "alfredo+test@tracflo.io",
        first_name: "Fred",
        last_name: "Doe",
        phone: "8889992345",
        company_user_role_id: 3
      }

      return chai.request(app)
        .post(`/v2/companies/${company_id}/user`)
        .set(authHeaderProperty, adminUserAuth)
        .send(newUser)
        .then(async (res)=> {
          expect(res.status).to.equal(200)
          const selectUser = await db('tfuser').select('*').where('email', newUser.email)
          const selectCompanyUser = await db('company_user').select('*').where('tfuser_id', selectUser[0].id)
          expect(res.body.id).to.equal(selectUser[0].id)
          expect(selectCompanyUser.length).to.equal(1)
          expect(selectCompanyUser[0].company_user_role_id).to.equal(3)
        })
    })
    it('Attempt to create a new crew user as a GC', async () => {
      const userInfo: any = getFixture('tfuser', 'email', 'getAllTicketGcPm@email.com')
      const {id: company_id} = getFixture('company', 'name', 'getAllTicketGc')
      const connectedGCAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const newUser =
      {
        avatar_url: "",
        email: "alfredo+test@tracflo.io",
        first_name: "Fred",
        last_name: "Doe",
        phone: "8889992345",
        company_user_role_id: 3
      }
      return chai.request(app)
        .post(`/v2/companies/${company_id}/user`)
        .set(authHeaderProperty, connectedGCAdminUserAuth)
        .send(newUser)
        .then(async (res)=> {
          expect(res.status).to.equal(400)
        })
    })
    it(`Email was succesfully sent`, async () => {
      const {id: company_id} = getFixture('company', 'name', 'Company1')
      const newUser =
      {
        avatar_url: "",
        email: "alfredo+test@tracflo.io",
        first_name: "Fred",
        last_name: "Doe",
        phone: "8889992345",
        company_user_role_id: 2
      }

      return chai.request(app)
        .post(`/v2/companies/${company_id}/user`)
        .set(authHeaderProperty, adminUserAuth)
        .send(newUser)
        .then(async (res)=> {
          expect(res.status).to.equal(200)
          // sent email
          // @ts-ignore
          expect(sgMail.sentEmails.length).to.equal(1)
        })
    })
    it(`Email was not successfully sent`, async () => {
      const {id: company_id} = getFixture('company', 'name', 'Company1')
      const newUser =
      {
        avatar_url: "",
        email: "alfredothrow+test@tracflo.io",
        first_name: "Fred",
        last_name: "Doe",
        phone: "8889992345",
        company_user_role_id: 2
      }

      return chai.request(app)
        .post(`/v2/companies/${company_id}/user`)
        .set(authHeaderProperty, adminUserAuth)
        .send(newUser)
        .then(async (res)=> {
          expect(res.status).to.equal(200)
          // sent email
          // @ts-ignore
          expect(sgMail.sentEmails.length).to.equal(0)
        })
    })
  })
  describe('POST Add user to project', () => {
    it('Succesfully add a new user to a project', async () => {
      const userInfo: any = getFixture('tfuser', 'email', 'testUserToAddToProject@email.com')
      const {id: company_id} = getFixture('company', 'name', 'CompanyTwoProject')
      const {id: project_id} = getFixture('project', 'name', 'projectAccess2')
      const addedUser={
          id: userInfo.id,
          project_user_role_code: userInfo.project_user_role_code = "pm"
      }

      return chai.request(app)
        .post(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
        .send(addedUser)
        .then(async (res)=> {
          expect(res.status).to.equal(200)
          const selectUser = await db('tfuser').select('*').where('email', userInfo.email)
          const selectProjectUser = await db('project_user').select('*').where('tfuser_id', selectUser[0].id)
          expect(res.body.id).to.equal(selectUser[0].id)
          expect(selectProjectUser.length).to.equal(1)
        })
    })
    it('Attempt to add a user not linked to the company', async () => {
      const userInfo: any = getFixture('tfuser', 'email', 'connectedToOneCompanyAndTwoProject@email.com')
      const {id: company_id} = getFixture('company', 'name', 'Company1')
      const {id: project_id} = getFixture('project', 'name', 'projectAccess1')
      const addedUser={
        id: userInfo.id,
        project_user_role_code: userInfo.project_user_role_code = "pm"
      }

      return chai.request(app)
        .post(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
        .send(addedUser)
        .then(async (res)=> {
          expect(res.status).to.equal(400)
        })
    })
    it('Attempt from user not in project to add another user.', async () => {
      const requestingUser: any = getFixture('tfuser', 'email', 'connectedToTwoCompanyAndOneProject@email.com')
      const userInfo: any = getFixture('tfuser', 'email', 'testUserToAddToProject@email.com')
      const {id: company_id} = getFixture('company', 'name', 'CompanyTwoProject')
      const {id: project_id} = getFixture('project', 'name', 'projectAccess2')
      const connectedToTwoCompanyAndOneProject = `Auth ${generateJwt(requestingUser)}`

      const addedUser={
        id: userInfo.id,
        project_user_role_code: userInfo.project_user_role_code = "pm"
      }

      return chai.request(app)
        .post(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, connectedToTwoCompanyAndOneProject)
        .set(companyHeaderProperty, company_id)
        .send(addedUser)
        .then(async (res)=> {
          expect(res.status).to.equal(401)
        })
    })
    it('Attempt from crew to add another user', async () => {
      const requestingUser: any = getFixture('tfuser', 'email', 'getAllTicketOwnerCrew@email.com')
      const userInfo: any = getFixture('tfuser', 'email', 'testUserToAddToProject@email.com')
      const {id: company_id} = getFixture('company', 'name', 'CompanyTwoProject')
      const {id: project_id} = getFixture('project', 'name', 'projectAccess2')
      const getAllTicketOwnerCrew = `Auth ${generateJwt(requestingUser)}`

      const addedUser={
        id: userInfo.id,
        project_user_role_code: userInfo.project_user_role_code = "pm"
      }

      return chai.request(app)
        .post(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, getAllTicketOwnerCrew)
        .set(companyHeaderProperty, company_id)
        .send(addedUser)
        .then(async (res)=> {
          expect(res.status).to.equal(401)
        })
    })
    it('Attempt by a user not in company to add a user', async () => {
      const requestingUser: any = getFixture('tfuser', 'email', 'connectedToOneCompanyAndOneProject@email.com')
      const userInfo: any = getFixture('tfuser', 'email', 'testUserToAddToProject@email.com')
      const {id: company_id} = getFixture('company', 'name', 'CompanyTwoProject')
      const {id: project_id} = getFixture('project', 'name', 'projectAccess2')
      const connectedToOneCompanyAndOneProject = `Auth ${generateJwt(requestingUser)}`

      const addedUser={
        id: userInfo.id,
        project_user_role_code: userInfo.project_user_role_code = "pm"
      }
      return chai.request(app)
        .post(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, connectedToOneCompanyAndOneProject)
        .set(companyHeaderProperty, company_id)
        .send(addedUser)
        .then(async (res)=> {
          expect(res.status).to.equal(401)
        })
    })
    it('Attempt by superadmin to add another superadmin', async () => {
      const requestingUser: any = getFixture('tfuser', 'email', 'superadmin@email.com')
      const userInfo: any = getFixture('tfuser', 'email', 'connectedToTwoCompanyAndOneProject@email.com')
      const {id: company_id} = getFixture('company', 'name', 'CompanyOneProject')
      const {id: project_id} = getFixture('project', 'name', 'projectAccess1')
      const connectedToOneCompanyAndOneProject = `Auth ${generateJwt(requestingUser)}`

      const addedUser={
        id: userInfo.id,
        project_user_role_code: userInfo.project_user_role_code = "pm"
      }
      return chai.request(app)
        .post(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, connectedToOneCompanyAndOneProject)
        .set(companyHeaderProperty, company_id)
        .send(addedUser)
        .then(async (res)=> {
          expect(res.status).to.equal(400)
        })
    })
    it('Attempt to add a user added already in project', async () => {
      const requestingUser: any = getFixture('tfuser', 'email', 'connectedToOneCompanyAndOneProject@email.com')
      const userInfo: any = getFixture('tfuser', 'email', 'connectedToTwoCompanyAndOneProject@email.com')
      const {id: company_id} = getFixture('company', 'name', 'CompanyOneProject')
      const {id: project_id} = getFixture('project', 'name', 'projectAccess1')
      const connectedToOneCompanyAndOneProject = `Auth ${generateJwt(requestingUser)}`

      const addedUser={
        id: userInfo.id,
        project_user_role_code: userInfo.project_user_role_code = "pm"
      }

      return chai.request(app)
        .post(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, connectedToOneCompanyAndOneProject)
        .set(companyHeaderProperty, company_id)
        .send(addedUser)
        .then(async (res)=> {
          expect(res.status).to.equal(400)
        })
    })
    it('Attempt to add a user that does not exist', async () => {
      const requestingUser: any = getFixture('tfuser', 'email', 'connectedToOneCompanyAndOneProject@email.com')
      const {id: company_id} = getFixture('company', 'name', 'CompanyOneProject')
      const {id: project_id} = getFixture('project', 'name', 'projectAccess1')
      const connectedToOneCompanyAndOneProject = `Auth ${generateJwt(requestingUser)}`

      const addedUser={
        id: createUuid(),
        project_user_role_code: "pm"
      }

      return chai.request(app)
        .post(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, connectedToOneCompanyAndOneProject)
        .set(companyHeaderProperty, company_id)
        .send(addedUser)
        .then(async (res)=> {
          expect(res.status).to.equal(400)
        })
    })
    it('Attempt to add a user with invalid project_user_role_code', async () => {
      const userInfo: any = getFixture('tfuser', 'email', 'testUserToAddToProject@email.com')
      const {id: company_id} = getFixture('company', 'name', 'CompanyTwoProject')
      const {id: project_id} = getFixture('project', 'name', 'projectAccess2')

      const addedUser={
        id: userInfo.id,
        project_user_role_code: "productmanager"
      }

      return chai.request(app)
        .post(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
        .send(addedUser)
        .then(async (res)=> {
          expect(res.status).to.equal(400)
        })
    })

    it('Attempt to add a crew user as a GC' , () =>{
      const requestingUser : any = getFixture('tfuser', 'email', 'getAllTicketGcPm@email.com')
      const userInfo: any = getFixture('tfuser', 'email', 'addGcCrew@email.com')
      const {id: company_id} = getFixture('company', 'name', 'getAllTicketGc')
      const {id: project_id} = getFixture('project', 'name', 'getAllTicketProject')
      const connectedGCAdminUserAuth = `Auth ${generateJwt(requestingUser)}`
      const addedUser={
        id:userInfo.id,
        project_user_role_code:'crew'
      }
      return chai.request(app)
        .post(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, connectedGCAdminUserAuth)
        .set(companyHeaderProperty, company_id)
        .send(addedUser)
        .then((res)=>{
          expect(res.status).to.equal(400)
          expect(res.text).to.include("GCs are not allowed to add crew to a project.")
        })
    })
  })
  describe('change password', () => {
    it('401 status if auth token is invalid', async () => {
      const fakeToken = jwt.sign(
        {
          email: 'email',
          id: 'some id',
          firstName: 'first_name',
          lastName: 'last_name',
          name: `somename`,
        },
        'woeijfwodfijwoeirjwo0vij0rg9uw09u8wf0iveoirfg',
        { algorithm: tfJwtAlgo, expiresIn: '7d' }
      )
      const res = await chai.request(app)
        .patch(`/v2/password`)
        .set(authHeaderProperty, `Auth ${fakeToken}`)
        .send({ password: 'fakenewpassword' })
      expect(res.status).to.equal(401)
    })

    it('400 status if password is invalid', async () => {
      const badPasswordBody = {
        password: 400
      }
      const res = await chai.request(app)
        .patch(`/v2/password`)
        .set(authHeaderProperty, adminUserAuth)
        .send(badPasswordBody)
      expect(res.status).to.equal(400)
    })

    it('correctly formed request should be successful', async () => {
      const body = {
        password: 'thisisareallystrongpassword'
      }
      const res = await chai.request(app)
        .patch(`/v2/password`)
        .set(authHeaderProperty, adminUserAuth)
        .send(body)
      // should be 200, with a new token, token should be valid
      expect(res.status).to.equal(200)
      expect(res.body?.data?.jwt).to.not.be.undefined
      expect(() => verifyJwt(res.body.data.jwt)).to.not.throw()
      // need to check that password was updated
      const { rows: data } = await db.raw(`
          SELECT *
          FROM tfuser
          WHERE password = crypt(:password, password)
          ;
        `,
        { password: body.password }
      )
      expect(data.length).to.equal(1)
      expect(data[0].email).equal(adminUserEmail)
    })

  })
  describe("get users in project", () => {
    it("should return users in project", async () => {
      const { id: subCompanyId } = getFixture('company', 'name', 'CompanyOneProject')
      const { id: project_id } = getFixture('project', 'name', 'projectAccess1')
      return await chai.request(app)
        .get(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, subCompanyId)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.not.be.null
        })
    })

    it("Getting project users as an admin", async () => {
      const { id: subCompanyId } = getFixture('company', 'name', 'CompanyOneProject')
      const { id: project_id } = getFixture('project', 'name', 'projectAccess1')
      const res = await chai.request(app)
        .get(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, subCompanyId)
      expect(res.status).to.equal(200)
      expect(res.body.length).to.be.greaterThan(0)
      const usersForProject = getFixture('project_user').filter((up: any) => (up.project_id === project_id) && (up.project_user_role_id === 1))
      expect(res.body.length).to.equal(usersForProject.length)
    })

    it("user connected to company and project", async () => {
      const { id: subCompanyId } = getFixture('company', 'name', 'CompanyOneProject')
      const { id: project_id } = getFixture('project', 'name', 'projectAccess1')
      return await chai.request(app)
        .get(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, subCompanyId)
        .then(res => {
          expect(res.status).to.be.equal(200)
          expect(res.body).to.not.be.null
        })

    })

    it("fake project id", async () => {
      const project_id = createUuid()
      const company_id = createUuid()
      return await chai.request(app)
        .get(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body.length).to.equal(0)
        })
    })

    it('user connected to the company but not the project should return nothing', async () => {
      const userInfo: any = getFixture('tfuser', 'email', 'superadmin@email.com')
      const noProjectsNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const noProjectsCompanyId = getFixture('company', 'name', 'Company1').id
      const project_id = getFixture('project', 'name', 'projectAccess1').id
      const res = await chai.request(app)
        .get(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, noProjectsNonAdminUserAuth)
        .set(companyHeaderProperty, noProjectsCompanyId)
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(0)
    })

    it('user connected to the project but not the company should return nothing', async () => {
      const userInfo: any = getFixture('tfuser', 'email', 'superadmin@email.com')
      const notConnectedNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const company_id = getFixture('company', 'name', 'getProjectCompany').id
      const project_id = getFixture('project', 'name', 'projectAccess1').id
      const res = await chai.request(app)
        .get(`/v2/project/${project_id}/users`)
        .set(authHeaderProperty, notConnectedNonAdminUserAuth)
        .set(companyHeaderProperty, company_id)
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(0)

    })
  })
  describe('GET users in company', () => {
    it("should return users in company!", () => {
      const { id: company_id } = getFixture('company', 'name', 'Company1')
      return chai.request(app)
        .get(`/v2/companies/${company_id}/users`)
        .set(authHeaderProperty, adminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.not.be.null
        }
        )
    })

    //company does not exist?
    it("Company does not exist", () => {
      const company_id = createUuid()
      return chai.request(app)
        .get(`/v2/companies/${company_id}/users`)
        .set(authHeaderProperty, adminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body.length).to.equal(0)
        }
        )
    })

    it("Getting users as an admin", () => {
      const { id: company_id } = getFixture('company', 'name', 'Company2')
      return chai.request(app)
        .get(`/v2/companies/${company_id}/users`)
        .set(authHeaderProperty, adminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.not.be.null
        }
        )
    })
    it("Getting users as a GC admin", () => {
      const userInfo: any = getFixture('tfuser', 'email', 'getAllTicketGcPm@email.com')
      const { id: company_id } = getFixture('company', 'name', 'getAllTicketGc')
      const connectedGCAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      return chai.request(app)
        .get(`/v2/companies/${company_id}/users`)
        .set(authHeaderProperty, connectedGCAdminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.not.be.null
        }
        )
    })

    it("Getting users as a Sub admin", () => {
      const userInfo: any = getFixture('tfuser', 'email', 'getAllTicketSubPm@email.com')
      const { id: company_id } = getFixture('company', 'name', 'getAllTicketSub')
      const connectedSubAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      return chai.request(app)
        .get(`/v2/companies/${company_id}/users`)
        .set(authHeaderProperty, connectedSubAdminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.not.be.null
        }
        )
    })

    it("Getting users as a Sub super", () => {
      const userInfo: any = getFixture('tfuser', 'email', 'getAllTicketSubSuper@email.com')
      const { id: company_id } = getFixture('company', 'name', 'getAllTicketSub')
      const connectedSubSuperUserAuth = `Auth ${generateJwt(userInfo)}`
      return chai.request(app)
        .get(`/v2/companies/${company_id}/users`)
        .set(authHeaderProperty, connectedSubSuperUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.not.be.null
        }
        )
    })

    it("Getting users as a super", () => {
      const userInfo: any = getFixture('tfuser', 'email', 'getAllTicketGcSuper@email.com')
      const { id: company_id } = getFixture('company', 'name', 'getAllTicketGc')
      const connectedNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      return chai.request(app)
        .get(`/v2/companies/${company_id}/users`)
        .set(authHeaderProperty, connectedNonAdminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.not.be.null
        }
        )
    })

    it("Getting company with no users", () => {
      const { id: company_id } = getFixture('company', 'name', 'getInactiveCompany')
      return chai.request(app)
        .get(`/v2/companies/${company_id}/users`)
        .set(authHeaderProperty, adminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body.length).to.equal(0)
        }
        )
    })

  })
  describe('GET users in company but not in project', () => {
    it("should return users in company but not in project", () => {
      const { id: subCompanyId } = getFixture('company', 'name', 'CompanyOneProject')
      const { id: project_id } = getFixture('project', 'name', 'projectAccess1')

      return chai.request(app)
        .get(`/v2/project/${project_id}/users_not_in_project`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, subCompanyId)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.not.be.null
        }
        )
    })
    it("Attempt to show list being a crew member", () => {
      const userInfo: any = getFixture('tfuser', 'email', 'connectedToOneCompanyAndTwoProject@email.com')
      const connectedToOneCompanyAndTwoProject = `Auth ${generateJwt(userInfo)}`
      const { id: subCompanyId } = getFixture('company', 'name', 'CompanyTwoProject')
      const { id: project_id } = getFixture('project', 'name', 'projectAccess1')

      return chai.request(app)
        .get(`/v2/project/${project_id}/users_not_in_project`)
        .set(authHeaderProperty, connectedToOneCompanyAndTwoProject)
        .set(companyHeaderProperty, subCompanyId)
        .then(res => {
          expect(res.status).to.equal(401)
        }
        )
    })
    it("fake project id", async () => {
      const userInfo: any = getFixture('tfuser', 'email', 'getAllTicketGcPm@email.com')
      const connectedGCAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const project_id = createUuid()
      const company_id = createUuid()
      return await chai.request(app)
        .get(`/v2/project/${project_id}/users_not_in_project`)
        .set(authHeaderProperty, connectedGCAdminUserAuth)
        .set(companyHeaderProperty, company_id)
        .then(res => {
          expect(res.status).to.equal(401)
        })
    })
    it('user connected to the company but not the project should return nothing', async () => {
      const userInfo: any = getFixture('tfuser', 'email', 'connectedToTwoCompanyAndOneProject@email.com')
      const noProjectsNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const noProjectsCompanyId = getFixture('company', 'name', 'CompanyOneProject').id
      const project_id = getFixture('project', 'name', 'projectAccess2').id
      await chai.request(app)
        .get(`/v2/project/${project_id}/users_not_in_project`)
        .set(authHeaderProperty, noProjectsNonAdminUserAuth)
        .set(companyHeaderProperty, noProjectsCompanyId)
        .then(res => {
          expect(res.status).to.equal(401)
        })

    })
  })

  // TODO DEV-236 add testing for get clients endpoint
})
