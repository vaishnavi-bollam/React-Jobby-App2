import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header/index'
import JobCard from '../JobCard/index'
import FiltersGroup from '../FiltersGroup/index'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsData: [],
    apiStatus: apiStatusConstants.initial,
    activeEmployId: '',
    activeSalaryId: '',
    searchInput: '',
    profileData: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updateProfileDetails = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileData: updateProfileDetails,
      })
      console.log(updateProfileDetails)
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobs = async () => {
    const {activeEmployId, activeSalaryId, searchInput} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    // const url = 'https://apis.ccbp.in/jobs'

    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmployId}&minimum_package=${activeSalaryId}&search=${searchInput}`

    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeEmployee = activeEmployId => {
    this.setState({activeEmployId}, this.getJobs)
  }

  changeSalary = activeSalaryId => {
    this.setState({activeSalaryId}, this.getJobs)
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput}, this.getJobs)
  }

  enterSearchInput = () => {
    this.getJobs()
  }

  renderJobsListView = () => {
    const {jobsData, profileData} = this.state
    return (
      <div className="job-container">
        <div>
          <FiltersGroup
            employmentTypesList={employmentTypesList}
            changeEmployee={this.changeEmployee}
            salaryRangesList={salaryRangesList}
            changeSalary={this.changeSalary}
            changeSearchInput={this.changeSearchInput}
            enterSearchInput={this.enterSearchInput}
            profileData={profileData}
          />
        </div>
        <div>
          {jobsData.map(each => (
            <JobCard each={each} key={each.id} />
          ))}
        </div>
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

  renderAllJobs = () => {
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
    return (
      <div>
        <Header />
        {this.renderAllJobs()}
      </div>
    )
  }
}

export default Jobs
