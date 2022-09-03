function PopupWithForm(props) {
    return (
        <>
    <div className={`popup popup${props.name} ${props.isOpen ? 'popup__open' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <button className="popup__botton-close" onClick={props.onClose} type="button">
        </button>
        <form className="popup__form" name={`${props.name}`} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__button" type="submit">
              <span className="popup__button-text">{props.button}</span>
            </button>
        </form>
      </div>
    </div>
    </>
    )
}

export default PopupWithForm;