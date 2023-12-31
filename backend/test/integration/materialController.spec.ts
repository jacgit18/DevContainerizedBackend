import chai from "chai"
import chaiHttp from "chai-http"
import "mocha"
import { beforeEach } from "mocha"

import app from "../../src/app.js"
import { addFixtures, getFixture, flushFixtures } from "../fixtures/index.js"
import { generateJwt } from "../../src/auth/jwtUtil.js"
import { db } from "../../src/data/db.js"
import { authHeaderProperty } from "../../src/middlewares/authenticateToken.js"
import { companyHeaderProperty } from "../../src/middlewares/companyIdFromHeaders.js"
import { Material } from "../../src/model/index.js"

chai.use(chaiHttp)
const expect = chai.expect

describe("materialController", () => {
  let adminUserAuth: string
  let company_id: string

  beforeEach(async () => {
    await addFixtures()
    // setup admin authentication
    const userInfo: any = getFixture("tfuser", "email", "superadmin@email.com")
    adminUserAuth = `Auth ${generateJwt(userInfo)}`
    // get company_id
    const company = getFixture("company", "name", "getProjectCompany")
    company_id = company.id
  })

  afterEach(async () => {
    await flushFixtures()
  })

  describe("POST material", () => {
    const materialWithAllCorrectPropsOne: any = {
      notes: "Material created with unit test.",
      name: "Mock Material 1",
      unit: "kg",
      rate: 5.0,
    }

    it("correctly formed request should succeed", () => {
      // first material created
      const company = getFixture("company", "name", "postMaterialCompany")
      company_id = company.id

      return chai
        .request(app)
        .post(`/v2/material/`)
        .send(materialWithAllCorrectPropsOne)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
        .then(async (res) => {
          expect(res.status).to.equal(200)

          const materialCompanyConnection = await db("material_type")
            .select("*")
            .where("company_id", company_id)
          expect(materialCompanyConnection).to.not.be.undefined
          expect(materialCompanyConnection.length).to.equal(1)
          expect(materialCompanyConnection[0].company_id).to.equal(company_id)
        })
    })

    describe("should error if", () => {
      describe("it is missing necessary field:", () => {
        for (let necessaryFieldDefinition of Material.fieldDefinitions.filter(
          (fs) => fs.requiredForCreateRequest
        )) {
          it(`${necessaryFieldDefinition.name}`, () => {
            const testObj: any = { ...materialWithAllCorrectPropsOne }
            testObj[necessaryFieldDefinition.name] = undefined
            return chai
              .request(app)
              .post(`/v2/material/`)
              .send(testObj)
              .set(authHeaderProperty, adminUserAuth)
              .set(companyHeaderProperty, company_id)
              .then((res) => {
                expect(res.status).to.equal(400)
                expect(res.text).to.include("Data validation failed")
              })
          })
        }
      })
    })

    describe("auth user role error ", () => {
      describe("if user role is super admin:", () => {
        const materialWithAllCorrectPropsTwo: any = {
          notes: "Material created with unit test.",
          name: "Mock Material 2",
          unit: "kg",
          rate: 7.0,
        }

        it("should be able create material", () => {
          const company = getFixture("company", "name", "postMaterialCompany2")
          company_id = company.id

          const userInfo: any = getFixture("tfuser", "email", "postMaterialUserTwo@email.com")
          const adminUserAuth = `Auth ${generateJwt(userInfo)}`

          return chai
            .request(app)
            .post(`/v2/material/`)
            .send(materialWithAllCorrectPropsTwo)
            .set(authHeaderProperty, adminUserAuth)
            .set(companyHeaderProperty, company_id)
            .then((res) => {
              expect(res.status).to.equal(200)
            })
        })
      })
    })

    describe("if user not in this company:", () => {
      const materialWithAllCorrectPropsThree: any = {
        notes: "Material created with unit test.",
        name: "Mock Material 3",
        unit: "kg",
        rate: 7.0,
      }

      it("should not be able to create materials", () => {
        const company = getFixture("company", "name", "postMaterialCompany3")
        company_id = company.id

        const userInfo: any = getFixture("tfuser", "email", "postMaterialUserThree@email.com")
        const adminUserAuth = `Auth ${generateJwt(userInfo)}`

        return chai
          .request(app)
          .post(`/v2/material/`)
          .send(materialWithAllCorrectPropsThree)
          .set(authHeaderProperty, adminUserAuth)
          .set(companyHeaderProperty, company_id)
          .then((res) => {
            expect(res.status).to.equal(401)
            expect(res.text).to.include("Not authorized for access")
          })
      })
    })

    describe("if user in company but is crew:", () => {
      const materialWithAllCorrectPropsFour: any = {
        notes: "Material created with unit test.",
        name: "Mock Material 4",
        unit: "kg",
        rate: 7.0,
      }

      it("should not be able to create materials", () => {
        const company = getFixture("company", "name", "postMaterialCompany4")
        company_id = company.id

        const userInfo: any = getFixture("tfuser", "email", "postMaterialUserFour@email.com")
        const adminUserAuth = `Auth ${generateJwt(userInfo)}`

        return chai
          .request(app)
          .post(`/v2/material/`)
          .send(materialWithAllCorrectPropsFour)
          .set(authHeaderProperty, adminUserAuth)
          .set(companyHeaderProperty, company_id)
          .then((res) => {
            expect(res.status).to.equal(401)
            expect(res.text).to.include("Not authorized for access")
          })
      })
    })

    describe("if user in company & is super:", () => {
      const materialWithAllCorrectPropsFive: any = {
        notes: "Material created with unit test.",
        name: "Mock Material 5",
        unit: "kg",
        rate: 7.0,
      }

      it("should be able to create materials", () => {
        const company = getFixture("company", "name", "postMaterialCompany5")
        company_id = company.id

        const userInfo: any = getFixture("tfuser", "email", "postMaterialUserFive@email.com")
        const adminUserAuth = `Auth ${generateJwt(userInfo)}`

        return chai
          .request(app)
          .post(`/v2/material/`)
          .send(materialWithAllCorrectPropsFive)
          .set(authHeaderProperty, adminUserAuth)
          .set(companyHeaderProperty, company_id)
          .then((res) => {
            expect(res.status).to.equal(200)
          })
      })
    })

    describe("if user role is in company:", () => {
      const materialWithAllCorrectPropsSix: any = {
        notes: "Material created with unit test.",
        name: "Mock Material 6",
        unit: "kg",
        rate: 7.0,
      }

      it("should be able to create materials", () => {
        const company = getFixture("company", "name", "postMaterialCompany6")
        company_id = company.id

        const userInfo: any = getFixture("tfuser", "email", "postMaterialUserSix@email.com")
        const adminUserAuth = `Auth ${generateJwt(userInfo)}`

        return chai
          .request(app)
          .post(`/v2/material/`)
          .send(materialWithAllCorrectPropsSix)
          .set(authHeaderProperty, adminUserAuth)
          .set(companyHeaderProperty, company_id)
          .then((res) => {
            expect(res.status).to.equal(200)
          })
      })
    })
  })

  describe("GET ALL materials", () => {
    it("correctly formed request should succeed", () => {
      return chai
        .request(app)
        .get(`/v2/material/`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
        .then((res) => {
          expect(res.status).to.equal(200)
          expect(res.body.length).to.be.greaterThan(0)
        })
    })

    it("only get the material in the include query param", () => {
      const { id: material_id } = getFixture("material_type", "name", "getMaterial1")
      return chai
        .request(app)
        .get(`/v2/material/?include=${material_id}`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
        .then((res) => {
          expect(res.status).to.equal(200)
          expect(res.body.length).to.equal(1)
          expect(res.body[0].id).to.equal(material_id)
        })
    })

    it("get multiple material in the include query param", () => {
      const { id: id1 } = getFixture("material_type", "name", "getMaterial2")
      const { id: id2 } = getFixture("material_type", "name", "getMaterial1")
      return chai
        .request(app)
        .get(`/v2/material/?include=${id1},${id2}`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
        .then((res) => {
          const correctIds = [id1, id2]
          expect(res.status).to.equal(200)
          expect(res.body.length).to.equal(2)
          // has the correct ids
          expect(correctIds).to.include(res.body[0].id)
          expect(correctIds).to.include(res.body[1].id)
        })
    })

    it("get active materials only", async () => {
      const { body: activeMaterials } = await chai
        .request(app)
        .get(`/v2/material/?active=true`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
      expect(activeMaterials.length).to.be.lessThanOrEqual(
        getFixture("material_type").filter(
          (material: any) => material.is_active === true || material.is_active === undefined
        ).length
      )
    })

    it("get inactive materials only", async () => {
      const { body: inactiveMaterials } = await chai
        .request(app)
        .get(`/v2/material/?active=false`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
      expect(inactiveMaterials.length).to.be.lessThanOrEqual(
        getFixture("material_type").filter((material: any) => material.is_active === false).length
      )
      expect(inactiveMaterials.length).to.be.greaterThan(0)
    })

    it("gets with pagination", async () => {
      const limit: number = 1
      let page: number = 1
      const { body: firstMaterial } = await chai
        .request(app)
        .get(`/v2/material/?limit=${limit}&page=${page}`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
      expect(firstMaterial.length).to.equal(limit)
      page += 1
      const { body: secondMaterial } = await chai
        .request(app)
        .get(`/v2/material/?limit=${limit}&page=${page}`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
      expect(secondMaterial.length).to.equal(limit)
      expect(firstMaterial[0].id).to.not.equal(secondMaterial[0].id)
    })

    it("super admin should get all materials", async () => {
      const res = await chai
        .request(app)
        .get(`/v2/material/`)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
      expect(res.status).to.equal(200)
      expect(res.body.length).to.be.greaterThan(0)
      const projectForCompany = getFixture("material_type").filter(
        (mt: any) => mt.company_id === company_id
      )
      expect(res.body.length).to.equal(projectForCompany.length)
    })

    it("user not connected to any company should get 401", async () => {
      const userInfo: any = getFixture("tfuser", "email", "imjustnormal@email.com")
      const notConnectedNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const res = await chai
        .request(app)
        .get(`/v2/material/`)
        .set(authHeaderProperty, notConnectedNonAdminUserAuth)
        .set(companyHeaderProperty, company_id)
      expect(res.status).to.equal(401)
    })

    it("user connected to company with no materials should get zero rows", async () => {
      const userInfo: any = getFixture(
        "tfuser",
        "email",
        "connectedToOneCompanyZeroProjects@email.com"
      )
      const noProjectsNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const noProjectsCompanyId = getFixture("company", "name", "Company2").id
      const res = await chai
        .request(app)
        .get(`/v2/material/`)
        .set(authHeaderProperty, noProjectsNonAdminUserAuth)
        .set(companyHeaderProperty, noProjectsCompanyId)
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(0)
    })

    it("user connected to one company and one material", async () => {
      const userInfo: any = getFixture(
        "tfuser",
        "email",
        "connectedToOneCompanyAndOneProject@email.com"
      )
      const oneProjectsNonAdminUserAuth = `Auth ${generateJwt(userInfo)}`
      const oneProjectCompanyId = getFixture("company", "name", "CompanyOneProject").id
      const res = await chai
        .request(app)
        .get(`/v2/material/`)
        .set(authHeaderProperty, oneProjectsNonAdminUserAuth)
        .set(companyHeaderProperty, oneProjectCompanyId)
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(1)
    })
  })

  describe('PATCH material', async () => {
    const changeTheseFields: any = {
      size: '2',
      unit: '7',
      name: 'updatedMaterial1',
    }

    it("correctly formed request should succeed", () => {
      const {id} = getFixture('material_type', 'name', 'getMaterialForPatchOne')
      const company = getFixture("company", "name", "patchMaterialCompanyOne")
      company_id = company.id
      return chai.request(app).patch(`/v2/material/${id}`)
        .send(changeTheseFields)
        .set(authHeaderProperty, adminUserAuth)
        .set(companyHeaderProperty, company_id)
        .then(res => {
          expect(res.status).to.equal(200)
          for (let key of Object.keys(changeTheseFields)) {
            expect(res.body[key], `${key} was not updated correctly`).to.equal(changeTheseFields[key])
          }
        })
    })

    describe("auth tests", () => {
      it("company admin should be able to update", () => {
        const {id} = getFixture('material_type', 'name', 'getMaterialForPatchTwo')
        const company = getFixture("company", "name", "patchMaterialCompanyTwo")
        company_id = company.id
        const userInfo: any = getFixture("tfuser", "email", "patchMaterialTwo@email.com")
        const userAuth = `Auth ${generateJwt(userInfo)}`
        return chai
          .request(app)
          .patch(`/v2/material/${id}`)
          .send(changeTheseFields)
          .set(authHeaderProperty, userAuth)
          .set(companyHeaderProperty, company_id)
          .then((res) => {
            expect(res.status).to.equal(200)
        })
      })

      it("super allowed to update", () => {
        const {id} = getFixture('material_type', 'name', 'getMaterialForPatchFive')
        const company = getFixture("company", "name", "patchMaterialCompanyFive")
        company_id = company.id
        const userInfo: any = getFixture("tfuser", "email", "patchMaterialFive@email.com")
        const userAuth = `Auth ${generateJwt(userInfo)}`
        return chai
          .request(app)
          .patch(`/v2/material/${id}`)
          .send(changeTheseFields)
          .set(authHeaderProperty, userAuth)
          .set(companyHeaderProperty, company_id)
          .then((res) => {
            expect(res.status).to.equal(200)
          })
      })

      it("not in company should get 401", () => {
        const {id} = getFixture('material_type', 'name', 'getMaterialForPatchThree')
        const company = getFixture("company", "name", "patchMaterialCompanyThree")
        company_id = company.id
        const userInfo: any = getFixture("tfuser", "email", "patchMaterialThree@email.com")
        const userAuth = `Auth ${generateJwt(userInfo)}`
        return chai
          .request(app)
          .patch(`/v2/material/${id}`)
          .send(changeTheseFields)
          .set(authHeaderProperty, userAuth)
          .set(companyHeaderProperty, company_id)
          .then((res) => {
            expect(res.status).to.equal(401)
            expect(res.text).to.include("Not authorized to perform this action.")
        })
      })

      it("crew not allowed to update", () => {
        const {id} = getFixture('material_type', 'name', 'getMaterialForPatchFour')
        const company = getFixture("company", "name", "patchMaterialCompanyFour")
        company_id = company.id
        const userInfo: any = getFixture("tfuser", "email", "patchMaterialFour@email.com")
        const userAuth = `Auth ${generateJwt(userInfo)}`
        return chai
          .request(app)
          .patch(`/v2/material/${id}`)
          .send(changeTheseFields)
          .set(authHeaderProperty, userAuth)
          .set(companyHeaderProperty, company_id)
          .then((res) => {
            expect(res.status).to.equal(401)
            expect(res.text).to.include("Not authorized to perform this action.")
          })
      })
    })
  })
})
