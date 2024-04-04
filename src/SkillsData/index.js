const SkillsData = props => {
  const {product} = props
  const {name, imageUrl} = product
  return (
    <div>
      <img src={imageUrl} />
      <p>{name}</p>
    </div>
  )
}

export default SkillsData
