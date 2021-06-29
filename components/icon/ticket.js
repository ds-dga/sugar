import * as React from "react";

function TicketIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M9 10a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1zm12 1a1 1 0 001-1V6a1 1 0 00-1-1H3a1 1 0 00-1 1v4a1 1 0 001 1 1 1 0 010 2 1 1 0 00-1 1v4a1 1 0 001 1h18a1 1 0 001-1v-4a1 1 0 00-1-1 1 1 0 010-2zm-1-1.82a3 3 0 000 5.64V17H10a1 1 0 00-2 0H4v-2.18a3 3 0 000-5.64V7h4a1 1 0 002 0h10z" />
    </svg>
  );
}

export default TicketIcon;
