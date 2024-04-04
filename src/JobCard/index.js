import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {each} = props
  console.log(each.id)
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = each
  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`}>
        <img src={companyLogoUrl} />
        <h1>{title}</h1>
        <p>{id}</p>
        <p>{employmentType}</p>
        <p>{location}</p>
        <p>{packagePerAnnum}</p>
        <p>{rating}</p>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
