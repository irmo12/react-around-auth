function InfoTooltip({
    isOpen,
    onClose,
    heading,
    image
  }) {
    return (
      <div className={`popup ${isOpen ? "popup_active" : ""}`}>
        <button
          type="button"
          className="popup__container-close"
          aria-label="close"
          onClick={onClose}
        />
        <div className="popup__container">
            <h1 className="tooltip__heading">{heading}</h1>
            <img className="tooltip__img" src={image} alt='sucess or failure' />
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;
  