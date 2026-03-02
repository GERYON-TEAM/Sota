type OpenProjectsFilterButtonProps = {
  onClick: () => void
}

export default function OpenProjectsFilterButton({ onClick }: OpenProjectsFilterButtonProps) {
  return (
    <button className="open-projects-filter" type="button" onClick={onClick}>
      <span className="open-projects-filter__icon" aria-hidden="true">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.796 5H5.20398C5.01174 4.99984 4.82352 5.05509 4.66187 5.15914C4.50022 5.26319 4.37199 5.41164 4.29253 5.58669C4.21308 5.76175 4.18577 5.956 4.21387 6.14618C4.24197 6.33636 4.32429 6.51441 4.45098 6.659L9.75298 12.717C9.91245 12.8995 10.0002 13.1337 9.99998 13.376V18.25C9.99998 18.3276 10.0181 18.4042 10.0528 18.4736C10.0875 18.543 10.1379 18.6034 10.2 18.65L13.2 20.9C13.2743 20.9557 13.3626 20.9896 13.4551 20.998C13.5476 21.0063 13.6405 20.9887 13.7236 20.9472C13.8066 20.9057 13.8765 20.8419 13.9253 20.7629C13.9741 20.6839 14 20.5929 14 20.5V13.376C13.9997 13.1337 14.0875 12.8995 14.247 12.717L19.549 6.658C20.115 6.012 19.655 5 18.796 5Z"
            stroke="#696E82"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      Фильтр
    </button>
  )
}
