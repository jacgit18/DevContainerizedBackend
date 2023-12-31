import chai from "chai"
import chaiHttp from "chai-http"
import "mocha"
import { v4 as createUuid } from "uuid"
import {beforeEach} from "mocha"

import app from "../../src/app.js"
import {addFixtures, getFixture, flushFixtures} from "../fixtures/index.js"
import {db} from "../../src/data/db.js"
import {generateJwt} from "../../src/auth/jwtUtil.js"
import {authHeaderProperty} from "../../src/middlewares/authenticateToken.js"
import { Company } from "../../src/model/index.js"
import {companyHeaderProperty} from "../../src/middlewares/companyIdFromHeaders.js"

chai.use(chaiHttp)
const expect = chai.expect

describe("companyController", () => {

  let adminUserAuth: string

  beforeEach(async () => {
    await addFixtures()
    // setup admin authentication
    const userInfo: any = getFixture('tfuser', 'email', 'superadmin@email.com')
    adminUserAuth = `Auth ${generateJwt(userInfo)}`
  })

  afterEach(async () => {
    await flushFixtures()
  })

  describe('GET by id company', async () => {
    it("should return something!", () => {
      const {id: company_id} = getFixture('company', 'name', 'Company1')
      return chai.request(app)
        .get(`/v2/user/companies/${company_id}`)
        .set(authHeaderProperty, adminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.not.be.null
          expect(res.body.id).to.equal(company_id)
        }
      )
    })

    it("No id empty body returned ", () => {
      const company_id = createUuid()
      return chai.request(app)
        .get(`/v2/user/companies/${company_id}`)
        .set(authHeaderProperty, adminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.not.be.null
          expect(Object.keys(res.body).length).to.equal(0)
        }
      )
    })

    it("should 400 with multiple company id inputs", () => {
      const {id: company_id} = getFixture('company', 'name', 'Company1')
      const {id: company_id2} = getFixture('company', 'name', 'Company2')
      return chai.request(app)
        .get(`/v2/user/companies/${company_id},${company_id2}`)
        .set(authHeaderProperty, adminUserAuth)
        .then(res => {
          expect(res.status).to.equal(400)
        }
      )
    })

    it("for a nonadmin user requesting a company id they have access to returns the object", async () =>  {
      const userInfo: any = getFixture('tfuser', 'email', 'imjustnormalandconnected@email.com')
      const {id: company_id} = getFixture('company', 'name', 'Company1')
      const connectedNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const res = await chai.request(app)
        .get(`/v2/user/companies/${company_id}`)
        .set(authHeaderProperty, connectedNonAdminUserAuth)
      expect(res.status).to.equal(200)
      expect(res.body.id).to.equal(company_id)
    }
    )

    it("for a nonadmin user requesting a company id they dont have access to returns 401", async () =>  {
      const userInfo: any = getFixture('tfuser', 'email', 'imjustnormalandconnected@email.com')
      const {id: company_id} = getFixture('company', 'name', 'Company2')
      const connectedNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const res = await chai.request(app)
        .get(`/v2/user/companies/${company_id}`)
        .set(authHeaderProperty, connectedNonAdminUserAuth)
      expect(res.status).to.equal(401)
    }
    )
  })

  describe('GET ALL companies', () => {
    it("correctly formed request should succeed", () => {
      return chai.request(app)
        .get(`/v2/user/companies`)
        .set(authHeaderProperty, adminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body.length).to.be.greaterThan(0)
          // admins should get admin company role
          expect(res.body.filter((c: any) => c.company_user_role === 'admin').length).to.equal(res.body.length)
        })
    })

    it("only get the company in the include query param", () => {
      const {id: company_id} = getFixture('company', 'name', 'Company2')
      return chai.request(app)
        .get(`/v2/user/companies/?include=${company_id}`)
        .set(authHeaderProperty, adminUserAuth)
        .then(res => {
            expect(res.status).to.equal(200)
            expect(res.body.length).to.equal(1)
            expect(res.body[0].id).to.equal(company_id)
          }
        )
    })

    it("get multiple companies in the include query param", () => {
      const {id: id1} = getFixture('company', 'name', 'Company1')
      const {id: id2} = getFixture('company', 'name', 'Company2')
      return chai.request(app)
        .get(`/v2/user/companies/?include=${id1},${id2}`)
        .set(authHeaderProperty, adminUserAuth)
        .then(res => {
            const correctIds = [id1, id2]
            expect(res.status).to.equal(200)
            expect(res.body.length).to.equal(2)
            // has the correct ids
            expect(correctIds).to.include(res.body[0].id)
            expect(correctIds).to.include(res.body[1].id)
          }
        )
    })

    it("get active companies only", async () => {
      const {body: activeCompanies} = await chai.request(app)
      .get(`/v2/user/companies/?active=true`)
      .set(authHeaderProperty, adminUserAuth)
      expect(activeCompanies.length).to.be.lessThanOrEqual(
        getFixture('company').filter((company: any) => company.is_active === true || company.is_active === undefined).length
      )
    })

    it("get inactive companies only", async () => {
      const {body: inactiveCompanies} = await chai.request(app)
      .get(`/v2/user/companies/?active=false`)
      .set(authHeaderProperty, adminUserAuth)
      expect(inactiveCompanies.length).to.be.lessThanOrEqual(
        getFixture('company').filter((company: any) => company.is_active === false).length
      )
      expect(inactiveCompanies.length).to.be.greaterThan(0)
    })

    it("gets with pagination", async () => {
      const limit: number = 1
      let page: number = 1
      const {body: firstCompany} = await chai.request(app)
        .get(`/v2/user/companies/?limit=${limit}&page=${page}`)
        .set(authHeaderProperty, adminUserAuth)
      expect(firstCompany.length).to.equal(limit)
      page += 1
      const {body: secondCompany} = await chai.request(app)
        .get(`/v2/user/companies/?limit=${limit}&page=${page}`)
        .set(authHeaderProperty, adminUserAuth)
      expect(secondCompany.length).to.equal(limit)
      expect(firstCompany[0].id).to.not.equal(secondCompany[0].id)
    })

    it('gets all companies for a super admin', async () => {
      const res = await chai.request(app)
        .get(`/v2/user/companies`)
        .set(authHeaderProperty, adminUserAuth)
      expect(res.status).to.equal(200)
      expect(res.body.length).to.be.greaterThan(0)
      expect(res.body.length).to.equal(
        getFixture('company').length
      )
    })

    it('only gets connected companies for a non-admin user', async () => {
      const userInfo: any = getFixture('tfuser', 'email', 'imjustnormalandconnected@email.com')
      const connectedNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const res = await chai.request(app)
        .get(`/v2/user/companies`)
        .set(authHeaderProperty, connectedNonAdminUserAuth)
      expect(res.status).to.equal(200)
      expect(res.body.length).to.be.greaterThan(0)
      expect(res.body.length).to.be.lessThan(
        getFixture('company').length
      )
      // they should also have the company_user_role
      expect(res.body.filter((c: any) => c.company_user_role == null).length).to.equal(0)
    })

    it('no companies returned for non-connected user', async () => {
      const userInfo: any = getFixture('tfuser', 'email', 'imjustnormal@email.com')
      const notConnectedNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const res = await chai.request(app)
        .get(`/v2/user/companies`)
        .set(authHeaderProperty, notConnectedNonAdminUserAuth)
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(0)
      expect(res.body.length).to.be.lessThan(
        getFixture('company').length
      )
    })
  })

  describe('PATCH update company', () => {
    it("succesfully updated company", () => {
      const {id: company_id} = getFixture('company', 'name', 'Company1')
      const changeTheseFields: any =
      {
        address: "801 Mulberry Street",
        name: 'Spiral',
        phone: '1234567890'
      }
      return chai.request(app)
        .patch(`/v2/user/companies/${company_id}`)
        .send(changeTheseFields)
        .set(authHeaderProperty, adminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          // double check that all of these properties and the generated id were returned
          for (let key of Object.keys(changeTheseFields)) {
            expect(res.body[key], `${key} was not updated correctly`).to.equal(changeTheseFields[key])
          }
        })
    })
    it("Succesfully update company being a company admin", () => {
      const userInfo: any = getFixture('tfuser', 'email', 'imjustnormalandconnected@email.com')
      const {id: company_id} = getFixture('company', 'name', 'Company1')
      const connectedNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`

      const changeTheseFields: any =
      {
        address: "801 Mulberry Street",
        name: 'Spiral',
        phone: '1234567890'
      }
      return chai.request(app)
        .patch(`/v2/user/companies/${company_id}`)
        .send(changeTheseFields)
        .set(authHeaderProperty, connectedNonAdminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          // double check that all of these properties and the generated id were returned
          for (let key of Object.keys(changeTheseFields)) {
            expect(res.body[key], `${key} was not updated correctly`).to.equal(changeTheseFields[key])
          }
        })
    })
    it("Attempt to update company being a super", () => {
      const userInfo: any = getFixture('tfuser', 'email', 'getAllTicketSubSuper@email.com')
      const {id: company_id} = getFixture('company', 'name', 'getAllTicketSub')
      const connectedSubSuperUserAuth = `Auth ${generateJwt(userInfo)}`

      const changeTheseFields: any =
      {
        address: "801 Mulberry Street",
        name: 'Spiral',
        phone: '1234567890'
      }
      return chai.request(app)
        .patch(`/v2/user/companies/${company_id}`)
        .send(changeTheseFields)
        .set(authHeaderProperty, connectedSubSuperUserAuth)
        .then(res => {
          expect(res.status).to.equal(401)
        })
    })
    it("Attempt to update company being a crew member", () => {
      const userInfo: any = getFixture('tfuser', 'email', 'getAllTicketSubCrew@email.com')
      const {id: company_id} = getFixture('company', 'name', 'getAllTicketSub')
      const connectedNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`

      const changeTheseFields: any =
      {
        address: "801 Mulberry Street",
        name: 'Spiral',
        phone: '1234567890'
      }
      return chai.request(app)
        .patch(`/v2/user/companies/${company_id}`)
        .send(changeTheseFields)
        .set(authHeaderProperty, connectedNonAdminUserAuth)
        .then(res => {
          expect(res.status).to.equal(401)
        })
    })
    it("Attempt to update company not being part of it", () => {
      const userInfo: any = getFixture('tfuser', 'email', 'connectedToOneCompanyAndOneProject@email.com')
      const {id: company_id} = getFixture('company', 'name', 'getAllTicketSub')
      const connectedNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`

      const changeTheseFields: any =
      {
        address: "801 Mulberry Street",
        name: 'Spiral',
        phone: '1234567890'
      }
      return chai.request(app)
        .patch(`/v2/user/companies/${company_id}`)
        .send(changeTheseFields)
        .set(authHeaderProperty, connectedNonAdminUserAuth)
        .then(res => {
          expect(res.status).to.equal(401)
        })
    })
    it("Attempt to modify fields that should not be modifiable", () => {
      const {id: company_id} = getFixture('company', 'name', 'Company1')
      const changeTheseFields: any =
      {
        id: createUuid(),
        is_active: true,
        logo_url: "djdcmkcm",
        company_type: "trade",
        created_by: createUuid(),
        date_created: new Date(),
        address: "801 Mulberry Street",
        name: 'Spiral',
        phone: '1234567890'
      }

      return chai.request(app)
        .patch(`/v2/user/companies/${company_id}`)
        .send(changeTheseFields)
        .set(authHeaderProperty, adminUserAuth)
        .then(res => {
          expect(res.status).to.equal(200)
          const fieldsThatCannotBeModified = Company.fieldDefinitions.filter((fs) =>
            !fs.canBeModifiedByUser
          )
          for (let i = 0; i < fieldsThatCannotBeModified.length; i++) {
            expect(changeTheseFields[fieldsThatCannotBeModified[i].name]).to.not.be.equal(res.body[fieldsThatCannotBeModified[i].name])
          }
        })
    })
  })

  describe('POST create company', () => {
    const companyWithAllCorrectProps: any = {
      name: "Construction Company",
    }
    it("Successfully create a GC", async () => {
      companyWithAllCorrectProps.company_type = "cm"

      return chai.request(app)
        .post(`/v2/company`)
        .send(companyWithAllCorrectProps)
        .set(authHeaderProperty, adminUserAuth)
        .then(async (res) => {
          expect(res.status).to.equal(200)
          const selectCompany = await db('company').select('*').where('id', res.body.id)
          expect(res.body.id).to.equal(selectCompany[0].id)
          expect(selectCompany.length).to.equal(1)
          // double check that all of these properties and the generated id were returned
         for (let key of Object.keys(companyWithAllCorrectProps)) {
           expect(res.body[key], `${key} was not updated correctly`).to.equal(companyWithAllCorrectProps[key])
          }
        })
    })
    it("Successfully create a Sub", async () => {
      companyWithAllCorrectProps.company_type = "trade"

      return chai.request(app)
        .post(`/v2/company`)
        .send(companyWithAllCorrectProps)
        .set(authHeaderProperty, adminUserAuth)
        .then(async (res) => {
          expect(res.status).to.equal(200)

          const selectCompany = await db('company').select('*').where('id', res.body.id)
          expect(res.body.id).to.equal(selectCompany[0].id)
          expect(selectCompany.length).to.equal(1)

         // double check that all of these properties and the generated id were returned
         for (let key of Object.keys(companyWithAllCorrectProps)) {
          expect(res.body[key], `${key} was not updated correctly`).to.equal(companyWithAllCorrectProps[key])
          }
        })
    })

    describe('should error if', () => {
      describe('it is missing necessary field:', () => {
        for (let necessaryFieldDefinition of Company.fieldDefinitions.filter((fs) => fs.requiredForCreateRequest)) {
          it(`${necessaryFieldDefinition.name}`, () => {
            const testObj: any = {...companyWithAllCorrectProps}
            testObj[necessaryFieldDefinition.name] = undefined
            return chai.request(app).post(`/v2/company`)
              .send(testObj)
              .set(authHeaderProperty, adminUserAuth)
              .then(res => {
                expect(res.status).to.equal(400)
                expect(res.text).to.include('Data validation failed')
              })
          })
        }
      })
    })
    it("Attempt to Create Company when you're not a superadmin", () => {
      const userInfo: any = getFixture('tfuser', 'email', 'imjustnormalandconnected@email.com')
      const connectedNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`

      return chai.request(app)
        .post(`/v2/company`)
        .send(companyWithAllCorrectProps)
        .set(authHeaderProperty, connectedNonAdminUserAuth)
        .then(res => {
          expect(res.status).to.equal(401)
        })
    })
    it('Attempt to create a company with an invalid type', async () => {
      companyWithAllCorrectProps.created_by = getFixture('tfuser', 'email', 'superadmin@email.com').id
      companyWithAllCorrectProps.company_type = "TrAdE"

      return chai.request(app)
        .post(`/v2/company`)
        .send(companyWithAllCorrectProps)
        .set(authHeaderProperty, adminUserAuth)
        .then(async (res) => {
          expect(res.status).to.equal(400)
        })
    })

  })

  describe('GET sender and receiver of ticket', () => {
    it('correctly formed request succeeds', async () => {
      const company = getFixture('company', 'name', 'getAllTicketSub')
      const project = getFixture('project', 'name', 'getAllTicketProject')
      const ticket = getFixture('ticket', 'description', 'getTicketSubPmSubmitted')
      const res = await chai.request(app)
        .get(`/v2/project/${project.id}/ticket/${ticket.id}/sender_receiver_company_info`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company.id)
      expect(res.status).to.equal(200)
      expect(res.body.sender).to.not.be.undefined
      expect(res.body.sender.id).to.equal(company.id)
      expect(res.body.receiver).to.not.be.undefined
      // get receiver id
      const receiver = getFixture('company', 'name', 'getAllTicketGc')
      expect(res.body.receiver.id).to.equal(receiver.id)
    })

    describe('auth tests', () => {
      it('GC allowed to get sub info if connected to project', async () => {
        const company = getFixture('company', 'name', 'getAllTicketGc')
        const project = getFixture('project', 'name', 'getAllTicketProject')
        const ticket = getFixture('ticket', 'description', 'getTicketSubPmSubmitted')
        const userInfo = getFixture('tfuser', 'email', 'getAllTicketGcSuper@email.com')
        const gcSuperAuth = `Auth ${generateJwt(userInfo)}`
        const res = await chai.request(app)
          .get(`/v2/project/${project.id}/ticket/${ticket.id}/sender_receiver_company_info`)
          .set(authHeaderProperty, gcSuperAuth)
          .set(companyHeaderProperty, company.id)
        expect(res.status).to.equal(200)
        expect(res.body.receiver.id).to.equal(company.id)
        // sender is not the GC
        expect(res.body.sender.id).to.not.equal(company.id)
      })

      it('GC not allowed if not connected to project', async () => {
        const company = getFixture('company', 'name', 'postMaterialCompany6')
        const project = getFixture('project', 'name', 'getAllTicketProject')
        const ticket = getFixture('ticket', 'description', 'getTicketSubPmSubmitted')
        const userInfo = getFixture('tfuser', 'email', 'postMaterialUserSix@email.com')
        const gcUserAuth = `Auth ${generateJwt(userInfo)}`
        const res = await chai.request(app)
          .get(`/v2/project/${project.id}/ticket/${ticket.id}/sender_receiver_company_info`)
          .set(authHeaderProperty, gcUserAuth)
          .set(companyHeaderProperty, company.id)
        expect(res.status).to.equal(401)
      })

      it('Sub allowed to get info if created ticket', async () => {
        const company = getFixture('company', 'name', 'getAllTicketSub')
        const project = getFixture('project', 'name', 'getAllTicketProject')
        const ticket = getFixture('ticket', 'description', 'getTicketSubPmSubmitted')
        const userInfo = getFixture('tfuser', 'email', 'getAllTicketSubPm@email.com')
        const subPmAuth = `Auth ${generateJwt(userInfo)}`
        const res = await chai.request(app)
          .get(`/v2/project/${project.id}/ticket/${ticket.id}/sender_receiver_company_info`)
          .set(authHeaderProperty, subPmAuth)
          .set(companyHeaderProperty, company.id)
        expect(res.status).to.equal(200)
        expect(res.body.sender.id).to.equal(company.id)
      })

      it('Sub not allowed if not created ticket', async () => {
        const company = getFixture('company', 'name', 'getAllTicketSub2')
        const project = getFixture('project', 'name', 'getAllTicketProject')
        const ticket = getFixture('ticket', 'description', 'getTicketSubPmSubmitted')
        const userInfo = getFixture('tfuser', 'email', 'getAllTicketSubPm2@email.com')
        const subPmAuth = `Auth ${generateJwt(userInfo)}`
        const res = await chai.request(app)
          .get(`/v2/project/${project.id}/ticket/${ticket.id}/sender_receiver_company_info`)
          .set(authHeaderProperty, subPmAuth)
          .set(companyHeaderProperty, company.id)
        expect(res.status).to.equal(401)
      })
    })
  })

  describe('get subcontractors for project', () => {

    let project_id: string
    let gc_company_id: string
    let sub_company_id: string

    beforeEach(() => {
      const project = getFixture('project', 'name', 'postLaborType')
      project_id = project.id
      const gc = getFixture('company', 'name', 'postLaborTypeGc')
      gc_company_id = gc.id
      const sub = getFixture('company', 'name', 'postLaborTypeSub')
      sub_company_id = sub.id
    })

    describe('auth tests', () => {
      it('does not allow superadmins', async () => {
        const res = await chai.request(app).get(`/v2/project/${project_id}/trade_company_list`)
          .set(authHeaderProperty, adminUserAuth)
          .set(companyHeaderProperty, gc_company_id)
        expect(res.status).to.equal(401)
      })

      it('does not allow sub crew', async () => {
        const user = getFixture('tfuser', 'email', 'postLaborTypeSubCrew@email.com')
        const userAuth = `Auth ${generateJwt(user)}`
        const res = await chai.request(app).get(`/v2/project/${project_id}/trade_company_list`)
          .set(authHeaderProperty, userAuth)
          .set(companyHeaderProperty, sub_company_id)
        expect(res.status).to.equal(401)
      })

      it('does not allow sub super', async () => {
        const user = getFixture('tfuser', 'email', 'postLaborTypeSubSuper@email.com')
        const userAuth = `Auth ${generateJwt(user)}`
        const res = await chai.request(app).get(`/v2/project/${project_id}/trade_company_list`)
          .set(authHeaderProperty, userAuth)
          .set(companyHeaderProperty, sub_company_id)
        expect(res.status).to.equal(401)
      })

      it('does not allow sub pm', async () => {
        const user = getFixture('tfuser', 'email', 'postLaborTypeSubPm@email.com')
        const userAuth = `Auth ${generateJwt(user)}`
        const res = await chai.request(app).get(`/v2/project/${project_id}/trade_company_list`)
          .set(authHeaderProperty, userAuth)
          .set(companyHeaderProperty, sub_company_id)
        expect(res.status).to.equal(401)
      })

      it('does not allow GC super', async () => {
        const user = getFixture('tfuser', 'email', 'postLaborTypeGcSuper@email.com')
        const userAuth = `Auth ${generateJwt(user)}`
        const res = await chai.request(app).get(`/v2/project/${project_id}/trade_company_list`)
          .set(authHeaderProperty, userAuth)
          .set(companyHeaderProperty, gc_company_id)
        expect(res.status).to.equal(401)
      })

      it('allows GC pm', async () => {
        const user = getFixture('tfuser', 'email', 'postLaborTypeGcPm@email.com')
        const userAuth = `Auth ${generateJwt(user)}`
        const res = await chai.request(app).get(`/v2/project/${project_id}/trade_company_list`)
          .set(authHeaderProperty, userAuth)
          .set(companyHeaderProperty, gc_company_id)
        expect(res.status).to.equal(200)
      })
    })

    it('only returns subcontractors', async () => {
      const user = getFixture('tfuser', 'email', 'postLaborTypeGcPm@email.com')
      const userAuth = `Auth ${generateJwt(user)}`
      const res = await chai.request(app).get(`/v2/project/${project_id}/trade_company_list`)
        .set(authHeaderProperty, userAuth)
        .set(companyHeaderProperty, gc_company_id)
      expect(res.status).to.equal(200)
      expect(res.body.length).to.be.greaterThan(0)
      for (let sub of res.body) {
        expect(sub.project_company_role).to.equal('trade')
      }
    })
  })
})
