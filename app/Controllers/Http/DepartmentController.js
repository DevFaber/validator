'use strict'

const Department = use('App/Models/Department')

/**
 * Resourceful controller for interacting with departments
 */
class DepartmentController {
  /**
   * Show a list of all departments.
   * GET departments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { company_id } = request.all()

    let departments = []

    if (company_id) {
      departments = await Department.query()
        .where('company_id', company_id)
        .orderBy('id', 'asc')
        .fetch()
    } else {
      departments = await Department.all()
    }

    return departments
  }

  async store ({ request }) {
    const data = request.only(['name', 'company_id'])

    const department = await Department.create(data)

    return department
  }

  async show ({ params }) {
    const department = await Department.findOrFail(params.id)

    return department
  }

  async update ({ params, request, response }) {
    const department = await Department.findOrFail(params.id)
    const data = request.only(['name'])

    department.merge(data)

    await department.save()

    return department
  }

  async destroy ({ params }) {
    const department = await Department.findOrFail(params.id)

    await department.delete()
  }
}

module.exports = DepartmentController
