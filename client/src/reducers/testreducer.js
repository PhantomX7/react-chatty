export default function(state = '', action) {
  console.log('aaaaa');
  switch (action.type) {
    case 'A':
      return `${state}A`;
    case 'B':
      return `${state}B`;

    default:
      return state;
  }
}
