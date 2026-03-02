import type { DateSort, LevelSort, MatchSort } from '../types/open-projects.types'

type OpenProjectsSortMenuProps = {
  sortOpen: boolean
  matchSortOpen: boolean
  dateSortOpen: boolean
  levelSortOpen: boolean
  matchSort: MatchSort
  dateSort: DateSort
  levelSort: LevelSort
  onMatchEnter: () => void
  onMatchLeave: () => void
  onMatchToggle: () => void
  onDateEnter: () => void
  onDateLeave: () => void
  onDateToggle: () => void
  onLevelEnter: () => void
  onLevelLeave: () => void
  onLevelToggle: () => void
  onApplyMatchSort: (value: MatchSort) => void
  onApplyDateSort: (value: DateSort) => void
  onApplyLevelSort: (value: LevelSort) => void
  onApplyBudgetSort: () => void
}

export default function OpenProjectsSortMenu({
  sortOpen,
  matchSortOpen,
  dateSortOpen,
  levelSortOpen,
  matchSort,
  dateSort,
  levelSort,
  onMatchEnter,
  onMatchLeave,
  onMatchToggle,
  onDateEnter,
  onDateLeave,
  onDateToggle,
  onLevelEnter,
  onLevelLeave,
  onLevelToggle,
  onApplyMatchSort,
  onApplyDateSort,
  onApplyLevelSort,
  onApplyBudgetSort,
}: OpenProjectsSortMenuProps) {
  return (
    <div className={`open-projects-sort-menu ${sortOpen ? 'is-open' : ''}`} role="listbox">
      <div className="open-projects-sort-item-wrap" onMouseEnter={onMatchEnter} onMouseLeave={onMatchLeave}>
        <button className="open-projects-sort-item" type="button" onClick={onMatchToggle}>
          <span>По % совпадения</span>
          <span className="open-projects-sort-item__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 7L15 12L10 17" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <div className={`open-projects-submenu ${matchSortOpen ? 'is-open' : ''}`} role="listbox">
          <button className="open-projects-subitem" type="button" onClick={() => onApplyMatchSort('high')}>
            <span className="open-projects-subitem__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V19M12 6L16 10M12 6L8 10" stroke="#0B1215" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Сначала высокий %</span>
            {matchSort === 'high' && (
              <span className="open-projects-subitem__check" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_74_907_match_high" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                    <path
                      d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path d="M8 12L11 15L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </mask>
                  <g mask="url(#mask0_74_907_match_high)">
                    <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
                  </g>
                </svg>
              </span>
            )}
          </button>

          <button className="open-projects-subitem" type="button" onClick={() => onApplyMatchSort('low')}>
            <span className="open-projects-subitem__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18V5M12 18L16 14M12 18L8 14" stroke="#0B1215" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Сначала низкий %</span>
            {matchSort === 'low' && (
              <span className="open-projects-subitem__check" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_74_907_match_low" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                    <path
                      d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path d="M8 12L11 15L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </mask>
                  <g mask="url(#mask0_74_907_match_low)">
                    <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
                  </g>
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="open-projects-sort-item-wrap" onMouseEnter={onDateEnter} onMouseLeave={onDateLeave}>
        <button className="open-projects-sort-item" type="button" onClick={onDateToggle}>
          <span>По дате появления</span>
          <span className="open-projects-sort-item__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 7L15 12L10 17" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <div className={`open-projects-submenu ${dateSortOpen ? 'is-open' : ''}`} role="listbox">
          <button className="open-projects-subitem" type="button" onClick={() => onApplyDateSort('old')}>
            <span className="open-projects-subitem__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V19M12 6L16 10M12 6L8 10" stroke="#0B1215" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Сначала старые</span>
            {dateSort === 'old' && (
              <span className="open-projects-subitem__check" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_74_907" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                    <path
                      d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path d="M8 12L11 15L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </mask>
                  <g mask="url(#mask0_74_907)">
                    <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
                  </g>
                </svg>
              </span>
            )}
          </button>

          <button className="open-projects-subitem" type="button" onClick={() => onApplyDateSort('new')}>
            <span className="open-projects-subitem__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18V5M12 18L16 14M12 18L8 14" stroke="#0B1215" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Сначала новые</span>
            {dateSort === 'new' && (
              <span className="open-projects-subitem__check" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_74_907_new" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                    <path
                      d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path d="M8 12L11 15L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </mask>
                  <g mask="url(#mask0_74_907_new)">
                    <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
                  </g>
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="open-projects-sort-item-wrap" onMouseEnter={onLevelEnter} onMouseLeave={onLevelLeave}>
        <button className="open-projects-sort-item" type="button" onClick={onLevelToggle}>
          <span>По уровню квалификации</span>
          <span className="open-projects-sort-item__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 7L15 12L10 17" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <div className={`open-projects-submenu ${levelSortOpen ? 'is-open' : ''}`} role="listbox">
          <button className="open-projects-subitem" type="button" onClick={() => onApplyLevelSort('junior')}>
            <span>Junior</span>
            {levelSort === 'junior' && (
              <span className="open-projects-subitem__check" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_74_907_level_junior" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                    <path
                      d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path d="M8 12L11 15L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </mask>
                  <g mask="url(#mask0_74_907_level_junior)">
                    <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
                  </g>
                </svg>
              </span>
            )}
          </button>

          <button className="open-projects-subitem" type="button" onClick={() => onApplyLevelSort('middle')}>
            <span>Middle</span>
            {levelSort === 'middle' && (
              <span className="open-projects-subitem__check" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_74_907_level_middle" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                    <path
                      d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path d="M8 12L11 15L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </mask>
                  <g mask="url(#mask0_74_907_level_middle)">
                    <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
                  </g>
                </svg>
              </span>
            )}
          </button>

          <button className="open-projects-subitem" type="button" onClick={() => onApplyLevelSort('senior')}>
            <span>Senior</span>
            {levelSort === 'senior' && (
              <span className="open-projects-subitem__check" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_74_907_level_senior" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                    <path
                      d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path d="M8 12L11 15L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </mask>
                  <g mask="url(#mask0_74_907_level_senior)">
                    <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
                  </g>
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>

      <button
        className="open-projects-sort-item open-projects-sort-item--inline"
        type="button"
        onClick={onApplyBudgetSort}
      >
        <span>По бюджету</span>
      </button>
    </div>
  )
}
