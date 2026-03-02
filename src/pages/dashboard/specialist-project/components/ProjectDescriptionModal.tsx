type ProjectDescriptionModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDescriptionModal({
  isOpen,
  onClose,
}: ProjectDescriptionModalProps) {
  if (!isOpen) return null

  return (
    <div className="project-modal__overlay" onClick={onClose}>
      <div className="project-modal" onClick={(event) => event.stopPropagation()}>
        <div className="project-modal__head">
          <h3>Описание проекта</h3>
          <button
            className="project-modal__close"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.75 15L15 24.75M15 15L24.75 24.75"
                stroke="#696E82"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="project-modal__body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec augue sed justo
            fermentum aliquet a et nisi. Curabitur eget dictum quam. Duis a odio eu dolor
            pharetra mollis. Maecenas auctor eros id hendrerit sollicitudin. Mauris nisl nunc,
            aliquam at lobortis et, vestibulum vitae justo. In feugiat velit ipsum, vitae
            rhoncus mauris ultricies ut. Praesent et velit consequat nisl sollicitudin suscipit.
            Cras nec mattis dui. Vivamus molestie ipsum vitae bibendum euismod.
          </p>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae; Fusce gravida urna et dolor pretium, vitae viverra ante imperdiet. Duis nec
            ullamcorper sapien. Nulla facilisi. Maecenas urna enim, mattis ut congue et, iaculis
            eget eros. Pellentesque porttitor, risus eu lobortis pretium, nisi ligula tincidunt
            ante, nec lacinia sapien enim a nunc. Sed leo nisi, sodales egestas odio ut, molestie
            interdum sapien. Maecenas eu felis turpis. Mauris sed hendrerit arcu. Pellentesque
            varius orci eu lectus ornare fringilla. Integer dignissim elit ac arcu sagittis,
            dapibus tristique ante suscipit. Vivamus sodales magna vitae felis rhoncus, non mattis
            nulla dictum.
          </p>
          <p>
            Donec et congue lorem. Suspendisse congue facilisis euismod. Curabitur vitae nibh
            vehicula, convallis sapien et, venenatis arcu. Pellentesque scelerisque, arcu sit amet
            dictum feugiat, tellus odio imperdiet metus, at iaculis erat lacus id felis. Donec
            dignissim, tellus nec iaculis auctor, arcu ipsum pellentesque nunc, eu finibus felis
            nulla quis sem. Maecenas ut urna eu erat vehicula fringilla eu sed sapien. Vivamus
            posuere lacus diam, et vestibulum odio mollis vitae. Etiam vel dignissim sapien. Nullam
            mollis blandit urna convallis finibus.
          </p>
          <p>
            Etiam a elit in nisl dapibus imperdiet a et nunc. Phasellus iaculis eros ligula, vel
            congue lacus rhoncus ut. Proin eleifend eget mi eu feugiat. Duis semper viverra neque,
            et consectetur nunc egestas ut. Vivamus a purus elit. Suspendisse nisl mi, pretium id
            fringilla at, lacinia ut velit. Pellentesque eget purus tincidunt, faucibus felis non,
            blandit velit. Quisque ыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыfermentum posuere quam, in elementum metus rhoncus non.
          </p>
        </div>
      </div>
    </div>
  )
}
