import { pick } from 'lodash'
import { HttpStatusCode } from '../../core-utils/miscs/http-error-codes'
import { Job, JobState, JobType, ResultList } from '../../models'
import { AbstractCommand, OverrideCommandOptions } from '../shared'

export class JobsCommand extends AbstractCommand {

  getJobsList (options: OverrideCommandOptions & {
    state?: JobState
    jobType?: JobType
    start?: number
    count?: number
    sort?: string
  } = {}) {
    const path = this.buildJobsUrl(options.state)

    const query = pick(options, [ 'start', 'count', 'sort', 'jobType' ])

    return this.getRequestBody<ResultList<Job>>({
      ...options,

      path,
      query,
      defaultExpectedStatus: HttpStatusCode.OK_200
    })
  }

  private buildJobsUrl (state?: JobState) {
    let path = '/api/v1/jobs'

    if (state) path += '/' + state

    return path
  }
}
