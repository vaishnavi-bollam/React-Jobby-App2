import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SkillsData from '../SkillsData/index'
// import SimilarJobs from '../SimilarJobs/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    eachJobList: [],
    apiStatus: apiStatusConstants.initial,
    skillsData: [],
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    description: data.life_at_company.description,
    imageUrl: data.life_at_company.image_url,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getJobsData = async props => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData.job_details.similar_jobs)
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSkillsData = fetchedData.job_details.skills.map(
        eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        }),
      )
      //   const updatedSimilarJobs = fetchedData.job_details.similar_jobs.map(
      //     eachSimilarJob => ({
      //       companyLogoUrl: eachSimilarJob.company_logo_url,
      //       employmentType: eachSimilarJob.employment_type,
      //       id: eachSimilarJob.id,
      //       jobDescription: eachSimilarJob.job_description,
      //       location: eachSimilarJob.location,
      //       rating: eachSimilarJob.rating,
      //       title: eachSimilarJob.title,
      //     }),
      //   )

      this.setState({
        eachJobList: updatedData,
        apiStatus: apiStatusConstants.success,
        skillsData: updatedSkillsData,
        // similarJobsData: updatedSimilarJobs,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobsListView = () => {
    const {eachJobList, skillsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      description,
      imageUrl,
      location,
      packagePerAnnum,
      rating,
      title,
    } = eachJobList
    return (
      <div>
        <h1>{title}</h1>
        <img src={companyLogoUrl} alt="logo" />
        <p>{rating}</p>
        <p>{employmentType}</p>
        <h1>{packagePerAnnum}</h1>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <p>{location}</p>
        <a href={companyWebsiteUrl}>visit</a>

        <ul>
          {skillsData.map(product => (
            <SkillsData product={product} key={product.name} />
          ))}
        </ul>
        <div>
          <h1>About Us</h1>
          <img src={imageUrl} />
          <p>{description}</p>
        </div>
        {/* <ul>
          {similarJobsData.map(product => (
            <SimilarJobs product={product} key={product.id} />
          ))}
        </ul> */}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderEachJob = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderEachJob()}</div>
  }
}

export default JobDetails
