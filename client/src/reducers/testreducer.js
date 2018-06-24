export default function(state = '', action) {
  switch (action.type) {
    case 'A':
      return `${state}A`;
    case 'B':
      return `${state}B`;

    default:
      return state;
  }
}
