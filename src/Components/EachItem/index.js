import './index.css'

const EachItem = props => {
  const {listDetails, isChecked, updateList} = props
  const {username, password, website, number} = listDetails

  const onClickDelete = () => {
    updateList(password)
  }
  return (
    <li className="each-list">
      <p className={`profile list${number}`}>{website[0]}</p>
      <ul className="details">
        <li>{website}</li>
        <li>{username}</li>
        {isChecked ? (
          <li>{password}</li>
        ) : (
          <div className="star-img">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="star"
            />
          </div>
        )}
      </ul>
      <button type="button" className="delete-button" onClick={onClickDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}
export default EachItem
