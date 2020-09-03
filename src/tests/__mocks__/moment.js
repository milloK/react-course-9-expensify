const moment = jest.requireActual('moment') // replace `require.requireActual` (deprecated) with `jest.requireActual` 

export default (timestamp = 0) => {
  return moment(timestamp)
}