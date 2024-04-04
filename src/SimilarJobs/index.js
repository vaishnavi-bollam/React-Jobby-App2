const SimilarJobs = props => {
  const {product} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = product
  return (
    <div>
      <h1>Similar Jobs</h1>
    </div>
  )
}

export default SimilarJobs
