import './index.css'

const Tags = props => {
  const {tagDetails, activeTag, onClickTag} = props
  const {displayText, optionId} = tagDetails

  return (
    <li className="tag-list-item">
      <button
        type="button"
        className={activeTag === optionId ? 'tag-btn active' : 'tag-btn'}
        onClick={() => onClickTag(optionId)}
      >
        {displayText}
      </button>
    </li>
  )
}

export default Tags
