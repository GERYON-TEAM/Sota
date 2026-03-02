type SearchInputProps = {
  placeholder?: string
}

export default function SearchInput({ placeholder = 'Поиск' }: SearchInputProps) {
  return (
    <label className="project-workspace__search">
      <span className="project-workspace__search-icon" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.25 13.5C10.7018 13.5 13.5 10.7018 13.5 7.25C13.5 3.79822 10.7018 1 7.25 1C3.79822 1 1 3.79822 1 7.25C1 10.7018 3.79822 13.5 7.25 13.5Z"
            stroke="#696E82"
            strokeWidth="1.5"
          />
          <path d="M15 15L12.1 12.1" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <input type="search" placeholder={placeholder} aria-label="Поиск" />
    </label>
  )
}
